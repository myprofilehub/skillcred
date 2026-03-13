"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const callbackUrl = formData.get("callbackUrl") as string;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || "/dashboard",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password." };
                default:
                    return { error: "Something went wrong." };
            }
        }
        throw error;
    }
}

export async function googleLogin(callbackUrl?: string, loginHint?: string) {
    await signIn("google", {
        redirectTo: callbackUrl || "/dashboard",
        authorization: {
            params: {
                scope: "openid email profile https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.announcements https://www.googleapis.com/auth/meetings.space.readonly https://www.googleapis.com/auth/gmail.send",
                access_type: "offline",
                response_type: "code",
                login_hint: loginHint,
                prompt: "consent"
            }
        }
    });
}
