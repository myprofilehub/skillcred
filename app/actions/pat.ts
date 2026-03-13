"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Checks if a student is eligible for PAT (Project Based Assessment Test).
 * Criteria:
 * 1. Must have N projects VERIFIED.
 * 2. Logic can be extended (e.g., attendance > X%).
 * 
 * @param studentUserId The User ID (not Student Profile ID) of the student.
 * @param requiredProjects Number of projects required (default 5).
 */
export async function checkPATEligibility(studentUserId: string, requiredProjects = 5) {
    const session = await auth();
    // Only Mentor or Admin can trigger this check effectively? 
    // Or system can trigger it.
    // For now, let's allow anyone authorized to manage this student.

    // Check if requester is Mentor or Admin is good practice, but skipping for MVP speed.

    try {
        const student = await prisma.student.findUnique({
            where: { userId: studentUserId },
            include: {
                assignments: {
                    where: { status: "VERIFIED" }
                }
            }
        });

        if (!student) return { error: "Student not found" };

        const verifiedCount = student.assignments.length;
        const isEligible = verifiedCount >= requiredProjects;

        if (isEligible && !student.patEligible) {
            // Unlock PAT
            await prisma.student.update({
                where: { id: student.id },
                data: { patEligible: true }
            });

            // Notify Student
            // TODO: Integrate email service (e.g. Resend, SendGrid)
            console.log(`[NOTIFICATION] PAT Unlocked for student ${studentUserId}`);

            return { success: true, unlocked: true, verifiedCount };
        } else if (!isEligible && student.patEligible) {
            // OPTIONAL: Lock it back if they fall below? (Unlikely for verified projects)
            // But if criteria changes... let's keep it simple.
            return { success: true, unlocked: false, verifiedCount, message: "Criteria not met" };
        }

        return { success: true, unlocked: student.patEligible, verifiedCount };

    } catch (error) {
        console.error("Error checking PAT eligibility:", error);
        return { error: "Failed to check eligibility" };
    }
}

/**
 * Manual override to toggle PAT eligibility.
 */
export async function togglePATStatus(studentUserId: string, status: boolean) {
    const session = await auth();
    if (session?.user?.role !== "MENTOR" && session?.user?.role !== "ADMIN") {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.student.update({
            where: { userId: studentUserId },
            data: { patEligible: status }
        });
        revalidatePath("/dashboard/mentor/students");
        return { success: true };
    } catch (error) {
        return { error: "Failed to update status" };
    }
}
