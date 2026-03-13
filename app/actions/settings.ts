"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateProfileSettings(data: { name?: string }) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: { name: data.name }
        });
        revalidatePath('/dashboard/mentor/settings');
        return { success: true };
    } catch (error) {
        console.error("Failed to update profile:", error);
        return { error: "Failed to update profile" };
    }
}

export async function updateNotificationSettings(data: { emailNotifications?: boolean, projectUpdateNotifications?: boolean }) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                ...(data.emailNotifications !== undefined && { emailNotifications: data.emailNotifications }),
                ...(data.projectUpdateNotifications !== undefined && { projectUpdateNotifications: data.projectUpdateNotifications })
            }
        });
        revalidatePath('/dashboard/mentor/settings');
        return { success: true };
    } catch (error) {
        console.error("Failed to update settings:", error);
        return { error: "Failed to update settings" };
    }
}
