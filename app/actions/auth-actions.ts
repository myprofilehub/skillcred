
'use server';

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function resetPassword(password: string) {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: "Not authenticated" };
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                password: hashedPassword,
                forcePasswordChange: false // Reset flag
            }
        });

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error("Password reset error:", error);
        return { error: "Failed to update password" };
    }
}
