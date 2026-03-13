"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// ============================================================================
// VERIFY PROJECT SUBMISSION & UPDATE PORTFOLIO
// ============================================================================
export async function verifyProjectSubmission(
    assignmentId: string,
    feedback: string,
    grade: number
) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "MENTOR") {
        return { error: "Unauthorized" };
    }

    try {
        // 1. Get Assignment with Project Details
        const assignment = await prisma.projectAssignment.findUnique({
            where: { id: assignmentId },
            include: {
                project: true,
                student: { include: { portfolio: true } }
            }
        });

        if (!assignment) return { error: "Assignment not found" };
        if (assignment.status === "VERIFIED") return { error: "Already verified" };

        // 2. Update Assignment Status
        await prisma.projectAssignment.update({
            where: { id: assignmentId },
            data: {
                status: "VERIFIED"
            }
        });

        // 3. Create Review Record
        // (Assuming Review model exists and is linked to Submission, 
        // but here we are simplifying action for verification sake directly on assignment 
        // or creating a review if needed. Let's check schema. Review links to Submission.
        // We need a submission ID. If none exists, we might need one or just skip review creation here 
        // and focus on Portfolio update. 
        // Let's assume the mentor is verifying a specific submission if passed, OR just the assignment.
        // The UI usually passes assignmentId. We'll skip Review creation in this specific action 
        // to keep it focused on Portfolio Automation, or add if critical. 
        // Let's proceed with Portfolio Update.)

        // 4. Update Portfolio (The Automation Part)
        const studentId = assignment.studentId;
        const project = assignment.project;

        let portfolio = assignment.student.portfolio;
        if (!portfolio) {
            // Create portfolio if missing
            portfolio = await prisma.portfolio.create({
                data: { studentId }
            });
        }

        // 4a. Add Project to Portfolio
        const existingPortfolioItem = await prisma.portfolioProject.findFirst({
            where: {
                portfolioId: portfolio.id,
                projectId: project.id
            }
        });

        if (!existingPortfolioItem) {
            await prisma.portfolioProject.create({
                data: {
                    portfolioId: portfolio.id,
                    projectId: project.id,
                    title: project.title,
                    description: project.description,
                    // Use a placeholder or the project's skills
                    skills: project.skills || [],
                    verifiedBy: session.user.id,
                    grade: grade,
                    feedback: feedback
                }
            });
        }

        // 4b. Update Portfolio Skills (Union)
        const currentSkills = new Set(portfolio.skills || []);
        if (project.skills && Array.isArray(project.skills)) {
            project.skills.forEach(skill => currentSkills.add(skill));
        }

        await prisma.portfolio.update({
            where: { id: portfolio.id },
            data: {
                skills: Array.from(currentSkills)
            }
        });

        revalidatePath(`/dashboard/mentor/classroom`);
        return { success: true };

    } catch (error) {
        console.error("Error verifying project:", error);
        return { error: "Failed to verify project" };
    }
}
