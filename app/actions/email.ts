"use server";

import { auth } from "@/auth";
import { google } from "googleapis";

/**
 * Send an email via Gmail API
 * Requires the user to have connected their Google account with Gmail scope
 */
export async function sendEmail(to: string, subject: string, body: string) {
    const session = await auth();
    if (!session?.accessToken) {
        return { error: "Not authenticated with Google" };
    }

    try {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: session.accessToken });

        const gmail = google.gmail({ version: "v1", auth: oauth2Client });

        // Create the email message
        const message = [
            `To: ${to}`,
            `Subject: ${subject}`,
            "Content-Type: text/html; charset=utf-8",
            "",
            body.replace(/\n/g, "<br>")
        ].join("\n");

        // Base64 encode the message
        const encodedMessage = Buffer.from(message)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        await gmail.users.messages.send({
            userId: "me",
            requestBody: {
                raw: encodedMessage
            }
        });

        return { success: true };
    } catch (error: any) {
        console.error("Gmail send error:", error);
        return { error: error.message || "Failed to send email" };
    }
}
