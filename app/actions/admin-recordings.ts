"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getAdminRecordings() {
    try {
        const recordings = await prisma.recording.findMany({
            include: {
                track: {
                    select: { title: true, slug: true }
                }
            },
            orderBy: { createdAt: "desc" }
        });
        return { success: true, recordings };
    } catch (error: any) {
        console.error("Error fetching admin recordings:", error);
        return { success: false, error: error.message };
    }
}

export async function createPreRecordedVideo(data: {
    title: string;
    description?: string;
    url: string;
    trackId: string;
    isPublic: boolean;
}) {
    try {
        const recording = await prisma.recording.create({
            data: {
                title: data.title,
                description: data.description,
                url: data.url,
                trackId: data.trackId,
                isPublic: data.isPublic,
                type: "PRE_RECORDED"
            }
        });
        
        revalidatePath("/dashboard/admin/recordings");
        revalidatePath("/library");
        revalidatePath("/"); // Update landing page free library section
        return { success: true, recording };
    } catch (error: any) {
        console.error("Error creating recording:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteRecording(id: string) {
    try {
        await prisma.recording.delete({
            where: { id }
        });
        
        revalidatePath("/dashboard/admin/recordings");
        revalidatePath("/library");
        revalidatePath("/");
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting recording:", error);
        return { success: false, error: error.message };
    }
}

export async function toggleRecordingVisibility(id: string, isPublic: boolean) {
    try {
        const recording = await prisma.recording.update({
            where: { id },
            data: { isPublic }
        });
        
        revalidatePath("/dashboard/admin/recordings");
        revalidatePath("/library");
        revalidatePath("/");
        return { success: true, recording };
    } catch (error: any) {
        console.error("Error toggling visibility:", error);
        return { success: false, error: error.message };
    }
}
