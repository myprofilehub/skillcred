"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveRecommendation(studentDbId: string, url: string, note?: string) {
    const session = await auth();
    if (!session?.user?.email) return { error: "Unauthorized" };

    try {
        // 1. Get Mentor Profile
        const mentor = await prisma.mentor.findUnique({
            where: { userId: session.user.id }
        });

        if (!mentor) return { error: "Mentor profile not found" };

        // 2. Get or Create Student Portfolio
        // We need the portfolio because Recommendation is linked to Portfolio in schema
        let portfolio = await prisma.portfolio.findUnique({
            where: { studentId: studentDbId }
        });

        if (!portfolio) {
            portfolio = await prisma.portfolio.create({
                data: {
                    studentId: studentDbId,
                    skills: [], // Initialize empty
                }
            });
        }

        // 3. Create Recommendation
        await prisma.recommendation.create({
            data: {
                portfolioId: portfolio.id,
                mentorId: mentor.id,
                fileUrl: url,
                content: note || "Recommendation Letter",
            }
        });

        revalidatePath("/dashboard/mentor/students");
        return { success: true };

    } catch (error) {
        console.error("Error saving recommendation:", error);
        return { error: "Failed to save recommendation" };
    }
}
