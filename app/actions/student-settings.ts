"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// -----------------------------------------------------------------------------
// PROFILE SETTINGS
// -----------------------------------------------------------------------------
export async function updateStudentProfile(data: {
    name?: string;
    username?: string;
    headline?: string;
    bio?: string;
}) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        // Update User Model
        if (data.name !== undefined || data.username !== undefined) {
            await prisma.user.update({
                where: { id: session.user.id },
                data: {
                    ...(data.name !== undefined && { name: data.name }),
                    ...(data.username !== undefined && { username: data.username }),
                }
            });
        }

        // Update Student Profile
        if (data.bio !== undefined) {
            await prisma.student.upsert({
                where: { userId: session.user.id },
                create: {
                    userId: session.user.id,
                    bio: data.bio
                },
                update: { bio: data.bio }
            });
        }

        // Update Portfolio Profile
        // Headline and Bio for the public portfolio
        const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
        if (student && (data.headline !== undefined || data.bio !== undefined)) {
            await prisma.portfolio.upsert({
                where: { studentId: student.id },
                create: {
                    studentId: student.id,
                    headline: data.headline,
                    bio: data.bio
                },
                update: {
                    ...(data.headline !== undefined && { headline: data.headline }),
                    ...(data.bio !== undefined && { bio: data.bio })
                }
            });
        }

        revalidatePath('/dashboard/student/settings');
        return { success: true };
    } catch (error) {
        console.error("Failed to update profile:", error);
        return { error: "Failed to update profile" };
    }
}

// -----------------------------------------------------------------------------
// NOTIFICATION SETTINGS
// -----------------------------------------------------------------------------
export async function updateStudentNotifications(data: {
    emailNotifications?: boolean;
    projectUpdateNotifications?: boolean;
}) {
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
        revalidatePath('/dashboard/student/settings');
        return { success: true };
    } catch (error) {
        console.error("Failed to update notifications:", error);
        return { error: "Failed to update notification settings" };
    }
}

// -----------------------------------------------------------------------------
// ACCOUNT/SECURITY SETTINGS
// -----------------------------------------------------------------------------
export async function updateStudentPassword(data: {
    currentPassword?: string;
    newPassword?: string;
}) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        if (!data.currentPassword || !data.newPassword) {
            return { error: "Passwords are required" };
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { password: true }
        });

        if (!user || !user.password) {
            return { error: "User or password not found" };
        }

        const isValid = await bcrypt.compare(data.currentPassword, user.password);
        if (!isValid) {
            return { error: "Incorrect current password" };
        }

        const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);

        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedNewPassword }
        });

        revalidatePath('/dashboard/student/settings');
        return { success: true };
    } catch (error) {
        console.error("Failed to update password:", error);
        return { error: "Failed to update password" };
    }
}
