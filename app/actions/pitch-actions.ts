"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPitch(data: { showcaseId: string, investorId: string, message: string }) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        const student = await prisma.student.findUnique({
            where: { userId: session.user.id }
        });

        if (!student) return { error: "Student profile not found" };

        await prisma.pitchRequest.create({
            data: {
                showcaseId: data.showcaseId,
                investorId: data.investorId,
                studentId: student.id,
                message: data.message,
                status: "PENDING"
            }
        });

        revalidatePath("/dashboard/student/investors");
        return { success: true };
    } catch (error) {
        console.error("Error creating pitch:", error);
        return { error: "Failed to submit pitch" };
    }
}

export async function updatePitchStatus(pitchId: string, status: any, data?: { notes?: string, scheduledAt?: string, meetingLink?: string }) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        const updateData: any = {
            status: status,
            investorNotes: data?.notes
        };

        if (status === "SCHEDULED" && data?.scheduledAt) {
            updateData.scheduledAt = new Date(data.scheduledAt);
            updateData.meetingLink = data.meetingLink;
        }

        await prisma.pitchRequest.update({
            where: { id: pitchId },
            data: updateData
        });

        revalidatePath("/dashboard/investor/pitches");
        return { success: true };
    } catch (error) {
        console.error("Error updating pitch:", error);
        return { error: "Failed to update pitch" };
    }
}
