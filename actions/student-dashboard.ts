"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function getStudentStats() {
    const session = await auth();
    if (!session?.user?.email) {
        redirect("/auth/signin");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            studentProfile: {
                include: {
                    enrollments: { include: { track: true } },
                    assignments: { where: { status: "VERIFIED" } }
                }
            }
        }
    });

    if (!user || !user.studentProfile) return null;

    const activeStreamsCount = user.studentProfile.enrollments.filter(e => e.status === "ACTIVE").length;
    const completedProjectsCount = user.studentProfile.assignments.length;

    // Placeholder logic for additional stats or future expansion
    // In a real app, skill score could be calculated based on project difficulty/grades
    const skillScore = 750 + (completedProjectsCount * 50);

    // Placeholder mock for global rank, could be a real query later
    const globalRank = "#" + Math.max(100 - completedProjectsCount, 1);

    return {
        activeStreams: activeStreamsCount,
        completedProjects: completedProjectsCount,
        skillScore,
        globalRank
    };
}

export async function getRecentActivity() {
    const session = await auth();
    if (!session?.user?.email) return null;

    // Fetch the most recent active enrollment
    const recentEnrollment = await prisma.enrollment.findFirst({
        where: {
            student: { user: { email: session.user.email } },
            status: "ACTIVE"
        },
        include: { track: true },
        orderBy: { updatedAt: 'desc' }
    });

    if (!recentEnrollment) return null;

    // Map to expected format if needed, or return as is but client needs to handle it
    // The previous code returned "recentStream" which implied the stream object directly?
    // "include: { stream: true }" suggests it returns enrollment with stream nested.
    // Client expects { stream: ... } ?

    return {
        progress: recentEnrollment.progress,
        // ... match whatever the UI expects
        ...recentEnrollment.track
    };
}
