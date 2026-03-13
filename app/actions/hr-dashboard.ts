"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function getHRDashboardStats() {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    try {
        // Get HR profile
        const hrProfile = await prisma.hRProtocol.findUnique({
            where: { userId: session.user.id },
        });

        if (!hrProfile) {
            return { error: "HR profile not found" };
        }

        // Get stats
        const [profilesViewed, pendingRequests, acceptedRequests, totalTalent] = await Promise.all([
            prisma.hRView.count({
                where: { hrId: hrProfile.id },
            }),
            prisma.interviewRequest.count({
                where: { hrId: hrProfile.id, status: "PENDING" },
            }),
            prisma.interviewRequest.count({
                where: { hrId: hrProfile.id, status: "ACCEPTED" },
            }),
            prisma.student.count({
                where: { hrVisibile: true },
            }),
        ]);

        return {
            stats: {
                profilesViewed,
                pendingRequests,
                acceptedRequests,
                totalTalent,
            },
            hrProfile: {
                company: hrProfile.company,
                position: hrProfile.position,
            },
        };
    } catch (error) {
        console.error("Error fetching HR dashboard stats:", error);
        return { error: "Failed to fetch stats" };
    }
}

export async function getRecentTalent(limit: number = 6) {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    try {
        // Get students with visible portfolios
        const students = await prisma.student.findMany({
            where: { hrVisibile: true },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                portfolio: {
                    select: {
                        headline: true,
                        skills: true,
                        isUnlocked: true,
                    },
                },
                enrollments: {
                    include: {
                        track: {
                            select: {
                                title: true,
                                slug: true,
                            },
                        },
                    },
                    take: 1,
                },
            },
            take: limit,
            orderBy: { updatedAt: "desc" },
        });

        return { students };
    } catch (error) {
        console.error("Error fetching talent pool:", error);
        return { error: "Failed to fetch talent" };
    }
}

export async function getInterviewRequests() {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    try {
        const hrProfile = await prisma.hRProtocol.findUnique({
            where: { userId: session.user.id },
        });

        if (!hrProfile) {
            return { error: "HR profile not found" };
        }

        const requests = await prisma.interviewRequest.findMany({
            where: { hrId: hrProfile.id },
            include: {
                student: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                                image: true,
                            },
                        },
                        portfolio: {
                            select: {
                                headline: true,
                                skills: true,
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return { requests };
    } catch (error) {
        console.error("Error fetching interview requests:", error);
        return { error: "Failed to fetch requests" };
    }
}

export async function sendInterviewRequest(studentId: string, message?: string) {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    try {
        const hrProfile = await prisma.hRProtocol.findUnique({
            where: { userId: session.user.id },
        });

        if (!hrProfile) {
            return { error: "HR profile not found" };
        }

        // Check if request already exists
        const existingRequest = await prisma.interviewRequest.findFirst({
            where: {
                hrId: hrProfile.id,
                studentId: studentId,
            },
        });

        if (existingRequest) {
            return { error: "Interview request already sent to this student" };
        }

        const request = await prisma.interviewRequest.create({
            data: {
                hrId: hrProfile.id,
                studentId: studentId,
                message: message,
                status: "PENDING",
            },
        });

        return { success: true, request };
    } catch (error) {
        console.error("Error sending interview request:", error);
        return { error: "Failed to send request" };
    }
}

export async function recordProfileView(studentId: string) {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    try {
        const hrProfile = await prisma.hRProtocol.findUnique({
            where: { userId: session.user.id },
        });

        if (!hrProfile) {
            return { error: "HR profile not found" };
        }

        await prisma.hRView.create({
            data: {
                hrId: hrProfile.id,
                studentId: studentId,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Error recording profile view:", error);
        return { error: "Failed to record view" };
    }
}
