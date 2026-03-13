"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// ============================================================================
// INVESTOR PROFILE & DASHBOARD
// ============================================================================

export async function getInvestorProfile() {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        const investor = await prisma.investor.findUnique({
            where: { userId: session.user.id },
            include: {
                pitchRequests: {
                    include: {
                        showcase: true,
                        student: {
                            include: { user: true }
                        }
                    },
                    orderBy: { updatedAt: 'desc' }
                },
                workshops: { orderBy: { date: 'asc' } },
                posts: { orderBy: { createdAt: 'desc' } }
            }
        });

        if (!investor) return { error: "Investor profile not found" };
        return { investor };
    } catch (error) {
        console.error("Error fetching investor profile:", error);
        return { error: "Failed to fetch profile" };
    }
}

// ============================================================================
// POSTS (Calls for Startups)
// ============================================================================

export async function createInvestorPost(data: any) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        const investor = await prisma.investor.findUnique({
            where: { userId: session.user.id }
        });

        if (!investor) return { error: "Investor profile not found" };

        await prisma.investorPost.create({
            data: {
                investorId: investor.id,
                title: data.title,
                description: data.description,
                type: data.type,
                deadline: data.deadline ? new Date(data.deadline) : null
            }
        });

        revalidatePath("/dashboard/investor/posts");
        return { success: true };
    } catch (error) {
        console.error("Error creating post:", error);
        return { error: "Failed to create post" };
    }
}

export async function getActiveInvestorPosts() {
    try {
        return await prisma.investorPost.findMany({
            where: { isActive: true },
            include: { investor: true },
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

// ============================================================================
// WORKSHOPS
// ============================================================================

export async function createWorkshop(data: any) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        const investor = await prisma.investor.findUnique({
            where: { userId: session.user.id }
        });

        if (!investor) return { error: "Investor profile not found" };

        await prisma.workshop.create({
            data: {
                investorId: investor.id,
                title: data.title,
                description: data.description,
                date: new Date(data.date),
                duration: data.duration,
                meetingLink: data.meetingLink,
                maxCapacity: data.maxCapacity ? parseInt(data.maxCapacity) : null
            }
        });

        revalidatePath("/dashboard/investor/workshops");
        return { success: true };
    } catch (error) {
        console.error("Error creating workshop:", error);
        return { error: "Failed to create workshop" };
    }
}

export async function getUpcomingWorkshops() {
    try {
        return await prisma.workshop.findMany({
            where: { date: { gte: new Date() } },
            include: { investor: true, registrations: true }, // Include registrations count logic ideally
            orderBy: { date: 'asc' }
        });
    } catch (error) {
        console.error("Error fetching workshops:", error);
        return [];
    }
}

export async function registerForWorkshop(workshopId: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        const student = await prisma.student.findUnique({
            where: { userId: session.user.id }
        });

        if (!student) return { error: "Student profile not found" };

        await prisma.workshopRegistration.create({
            data: {
                workshopId: workshopId,
                studentId: student.id
            }
        });
        revalidatePath("/dashboard/student/investors");
        return { success: true };
    } catch (error) {
        return { error: "Failed to register" };
    }
}

// ============================================================================
// PUBLIC FETCH
// ============================================================================

export async function getInvestorsWithFilters(filter?: string) {
    try {
        const whereClause = filter && filter !== 'all'
            ? { focusAreas: { has: filter } }
            : {};

        const investors = await prisma.investor.findMany({
            where: {
                isActive: true,
                ...whereClause
            },
            include: {
                posts: { where: { isActive: true } },
                user: true
            }
        });

        return investors;
    } catch (error) {
        console.error("Error fetching investors:", error);
        return [];
    }
}

// ============================================================================
// PROFILE MANAGEMENT
// ============================================================================

export async function updateInvestorProfile(data: any) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        const focusAreasList = typeof data.focusAreas === "string"
            ? data.focusAreas.split(",").map((s: string) => s.trim()).filter((s: string) => s.length > 0)
            : data.focusAreas;

        await prisma.investor.update({
            where: { userId: session.user.id },
            data: {
                company: data.company,
                position: data.position,
                bio: data.bio,
                focusAreas: focusAreasList,
                investmentRange: data.investmentRange,
                portfolioUrl: data.portfolioUrl,
                linkedinUrl: data.linkedinUrl,
            }
        });

        revalidatePath("/dashboard/investor/profile");
        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { error: "Failed to update profile" };
    }
}
