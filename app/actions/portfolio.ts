"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

// Helper to ensure Student profile exists
async function getOrCreateStudent(userId: string) {
    return prisma.student.upsert({
        where: { userId },
        create: { userId },
        update: {},
        include: {
            portfolio: { include: { projects: true } },
            assessmentResults: true
        },
    });
}

// ============================================================================
// GET PORTFOLIO
// ============================================================================
export async function getPortfolio() {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        const student = await getOrCreateStudent(session.user.id);
        return { portfolio: student.portfolio, isPatEligible: student.patEligible };
    } catch (error) {
        console.error("Error fetching portfolio:", error);
        return { error: "Failed to fetch portfolio" };
    }
}

// ============================================================================
// CHECK PAT STATUS & UNLOCK
// ============================================================================
export async function checkPortfolioUnlockStatus() {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        const student = await getOrCreateStudent(session.user.id);

        if (student.portfolio?.isUnlocked) {
            return { status: "UNLOCKED" };
        }

        const hasPassedPAT = student.assessmentResults.some(r => r.passed);

        if (hasPassedPAT) {
            if (student.portfolio) {
                await prisma.portfolio.update({
                    where: { id: student.portfolio.id },
                    data: { isUnlocked: true, patPassedAt: new Date() },
                });
            } else {
                await prisma.portfolio.create({
                    data: {
                        studentId: student.id,
                        isUnlocked: true,
                        patPassedAt: new Date(),
                    }
                });
            }
            return { status: "JUST_UNLOCKED" };
        }

        return { status: "LOCKED" };
    } catch (error) {
        console.error("Error checking unlock status:", error);
        return { error: "Failed to check status" };
    }
}

// ============================================================================
// GENERATE PORTFOLIO FROM RESUME (AI)
// ============================================================================
export async function generatePortfolioFromResume(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    const file = formData.get("resume") as File;
    if (!file) return { error: "No file provided" };

    if (!process.env.GEMINI_API_KEY) {
        return { error: "AI service not configured (Missing API Key)" };
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Data = buffer.toString('base64');

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
        You are an expert resume parser and portfolio builder.
        Analyze this PDF resume and extract the following information. Return it as a JSON object.
        
        JSON Structure:
        {
            "headline": "Professional Headline",
            "bio": "A short professional summary (max 300 chars)",
            "skills": ["Skill1", "Skill2"],
            "experience": [
                { "title": "Job Title", "company": "Company Name", "startDate": "YYYY-MM", "endDate": "YYYY-MM", "description": "Responsibilities" }
            ],
            "education": [
                { "school": "University Name", "degree": "Degree", "year": "Year", "field": "Field" }
            ],
            "projects": [
                { "title": "Project Title", "description": "Project Description", "skills": ["Tech1", "Tech2"] }
            ]
        }

        Return ONLY the JSON object, no markdown code blocks or additional text.
        `;

        // Use Gemini's file/document parsing capability
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    mimeType: "application/pdf",
                    data: base64Data
                }
            }
        ]);

        const response = result.response;
        const jsonString = response.text().replace(/```json|```/g, "").trim();
        console.log("Gemini response text:", jsonString.substring(0, 500));

        const data = JSON.parse(jsonString);
        console.log("Parsed data:", JSON.stringify(data, null, 2).substring(0, 1000));

        // Get student
        const student = await getOrCreateStudent(session.user.id);
        let portfolio = student.portfolio;
        console.log("Student found:", student.id, "Existing portfolio:", !!portfolio);

        if (!portfolio) {
            portfolio = await prisma.portfolio.create({
                data: {
                    studentId: student.id,
                    isUnlocked: true,
                },
                include: { projects: true }
            });
            console.log("Created new portfolio:", portfolio.id);
        }

        // Update with parsed data
        await prisma.portfolio.update({
            where: { id: portfolio.id },
            data: {
                headline: data.headline,
                bio: data.bio,
                skills: data.skills || [],
                experience: data.experience || [],
                education: data.education || [],
            }
        });
        console.log("Portfolio updated with:", data.headline);

        // Add Projects
        if (data.projects && Array.isArray(data.projects)) {
            console.log("Adding projects:", data.projects.length);
            for (const proj of data.projects) {
                await prisma.portfolioProject.create({
                    data: {
                        portfolioId: portfolio.id,
                        title: proj.title,
                        description: proj.description,
                        skills: proj.skills || [],
                    }
                });
            }
        }

        revalidatePath("/dashboard/student/portfolio");
        console.log("Portfolio generation complete!");
        return { success: true };

    } catch (error: any) {
        console.error("Error generating portfolio:", error);
        console.error("Error name:", error?.name);
        console.error("Error message:", error?.message);
        console.error("Error stack:", error?.stack);
        return { error: `Failed to process resume: ${error?.message || 'Unknown error'}` };
    }
}

// ============================================================================
// UPDATE PORTFOLIO
// ============================================================================
export async function updatePortfolio(data: any) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        const student = await getOrCreateStudent(session.user.id);

        await prisma.portfolio.update({
            where: { studentId: student.id },
            data: {
                headline: data.headline,
                bio: data.bio,
                skills: data.skills,
                linkedinUrl: data.linkedinUrl,
                githubUrl: data.githubUrl,
                publicSlug: data.publicSlug,
                isPublic: data.isPublic,
            }
        });

        revalidatePath("/dashboard/student/portfolio");
        return { success: true };
    } catch (error) {
        console.error("Error updating portfolio:", error);
        return { error: "Failed to update portfolio" };
    }
}

// ============================================================================
// SYNC PORTFOLIO WITH GITHUB
// ============================================================================
export async function syncPortfolioWithGithub() {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        // 1. Get GitHub Account Token
        const account = await prisma.account.findFirst({
            where: {
                userId: session.user.id,
                provider: "github"
            }
        });

        if (!account?.access_token) {
            return { error: "GitHub account not linked or token missing" };
        }

        // 2. Fetch GitHub Data
        const { getGithubProfile, getGithubRepos } = await import("@/lib/github");
        const profile = await getGithubProfile(account.access_token);
        const repos = await getGithubRepos(account.access_token);

        if (!profile) return { error: "Failed to fetch GitHub profile" };

        // 3. Update Portfolio Bio & Links
        const student = await getOrCreateStudent(session.user.id);

        // Ensure portfolio exists
        if (!student.portfolio) {
            await prisma.portfolio.create({ data: { studentId: student.id } });
        }

        // Re-fetch to be sure
        const updatedStudent = await prisma.student.findUnique({
            where: { id: student.id },
            include: { portfolio: true }
        });
        const portfolio = updatedStudent?.portfolio;

        if (!portfolio) throw new Error("Portfolio creation failed");

        await prisma.portfolio.update({
            where: { id: portfolio.id },
            data: {
                bio: profile.bio || undefined,
                githubUrl: profile.profileUrl || undefined,
                headline: profile.company ? `${profile.company} Developer` : undefined
            }
        });

        // 4. Add Repos as Projects
        // Add top 3 starred repos if they don't exist
        for (const repo of repos.slice(0, 3)) {
            const existingProject = await prisma.portfolioProject.findFirst({
                where: {
                    portfolioId: portfolio.id,
                    title: repo.name
                }
            });

            if (!existingProject) {
                await prisma.portfolioProject.create({
                    data: {
                        portfolioId: portfolio.id,
                        title: repo.name,
                        description: repo.description || "No description",
                        projectUrl: repo.url,
                        githubUrl: repo.url,
                        skills: repo.languages || [repo.language || "code"],
                    }
                });
            }
        }

        revalidatePath("/dashboard/student/portfolio");
        return { success: true };

    } catch (error) {
        console.error("Error syncing GitHub:", error);
        return { error: "Failed to sync GitHub" };
    }
}

// ============================================================================
// GENERATE FROM STORED RESUME
// ============================================================================
export async function generatePortfolioFromStoredResume() {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        const student = await getOrCreateStudent(session.user.id);
        const resumeUrl = student.portfolio?.resumeUrl;

        if (!resumeUrl) {
            return { error: "No stored resume found. Please upload one first." };
        }

        // Fetch the PDF from the URL
        const response = await fetch(resumeUrl);
        if (!response.ok) {
            return { error: "Failed to download stored resume" };
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Data = buffer.toString("base64");

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
        You are an expert resume parser and portfolio builder.
        Extract the following information from the provided resume:
        1. Professional Headline (short, catchy)
        2. Professional Bio (2 sentences max)
        3. Key Skills (array of strings)
        4. Work Experience (array of objects with title, company, startDate, endDate, description)
        5. Education (array of objects with school, degree, year, field)
        
        Return the result as a strictly valid JSON object.
        `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: "application/pdf",
                },
            },
        ]);

        const aiResponse = result.response;
        const text = aiResponse.text();

        const jsonString = text.replace(/```json|```/g, "").trim();
        const data = JSON.parse(jsonString);

        await prisma.portfolio.update({
            where: { id: student.portfolio!.id },
            data: {
                headline: data.headline,
                bio: data.bio,
                skills: data.skills || [],
                experience: data.experience || [],
                education: data.education || []
            }
        });

        revalidatePath("/dashboard/student/portfolio");
        return { success: true };

    } catch (error) {
        console.error("Error generating from stored resume:", error);
        return { error: "Failed to generate portfolio from stored resume" };
    }
}

// ============================================================================
// CHECK GITHUB LINK STATUS
// ============================================================================
export async function checkGithubStatus() {
    const session = await auth();
    if (!session?.user?.id) return { isLinked: false };

    try {
        const account = await prisma.account.findFirst({
            where: {
                userId: session.user.id,
                provider: "github"
            }
        });

        return { isLinked: !!account };
    } catch (error) {
        console.error("Error checking GitHub status:", error);
        return { isLinked: false };
    }
}
