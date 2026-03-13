'use server'

import { prisma } from "@/lib/db";
import { sendOtpEmail } from "@/lib/email";
import bcrypt from "bcryptjs";
import { randomInt } from "crypto";

export async function sendPasswordResetOtp(email: string) {
    console.log(`[Action] Starting sendPasswordResetOtp for ${email}`);
    try {
        console.log("[Action] 1. Finding user...");
        const user = await prisma.user.findUnique({
            where: { email }
        });
        console.log("[Action] User found:", !!user);

        if (!user) {
            return { error: "No account found with this email address." };
        }

        // Generate 6-digit OTP
        const otp = randomInt(100000, 999999).toString();
        const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        console.log("[Action] 2. Deleting old tokens...");
        await prisma.verificationToken.deleteMany({
            where: { identifier: email }
        });

        console.log("[Action] 3. Creating new token...");
        await prisma.verificationToken.create({
            data: {
                identifier: email,
                token: otp,
                expires
            }
        });
        console.log("[Action] Token created.");

        console.log("----------------------------------------");
        console.log("🔑 DEV OTP:", otp);
        console.log("----------------------------------------");

        // Send Email
        console.log("[Action] 4. Sending OTP Email...");
        const emailResult = await sendOtpEmail(email, otp);
        console.log("[Action] Email result:", emailResult);

        if (emailResult.error) {
            return { error: "Failed to send OTP email. Please try again." };
        }

        return { success: true };

    } catch (error) {
        console.error("Forgot Password Error:", error);
        return { error: "Something went wrong. Please try again." };
    }
}

export async function verifyOtpAndResetPassword(email: string, otp: string, newPassword: string) {
    try {
        // 1. Find Token
        const tokenRecord = await prisma.verificationToken.findFirst({
            where: {
                identifier: email,
                token: otp
            }
        });

        if (!tokenRecord) {
            return { error: "Invalid OTP. Please check and try again." };
        }

        // 2. Check Expiry
        if (new Date() > tokenRecord.expires) {
            await prisma.verificationToken.delete({ where: { token: otp } }); // Cleanup
            return { error: "OTP has expired. Please request a new one." };
        }

        // 3. Hash Password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 4. Update User Password
        // Search by email to update the correct user
        await prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
                forcePasswordChange: false // Reset this flag if it was set
            }
        });

        // 5. Cleanup Token
        await prisma.verificationToken.delete({
            where: {
                identifier_token: {
                    identifier: email,
                    token: otp
                }
            }
        });

        return { success: true };

    } catch (error) {
        console.error("Reset Password Error:", error);
        return { error: "Failed to reset password. Please try again." };
    }
}
