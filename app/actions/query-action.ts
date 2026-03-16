"use server";

import { z } from "zod";

const querySchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    inquiryType: z.string().min(1, "Please select an inquiry type"),
    message: z.string().min(10, "Message must be at least 10 characters long"),
});

export async function submitQuery(prevState: any, formData: FormData) {
    try {
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            inquiryType: formData.get("inquiryType"),
            message: formData.get("message"),
        };

        const validatedData = querySchema.parse(data);

        const brevoApiKey = process.env.BREVO_API_KEY;

        if (!brevoApiKey) {
            console.error("Missing BREVO_API_KEY");
            return { error: "Email service is temporarily unavailable.", success: false };
        }

        // Send Email via Brevo REST API
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "api-key": brevoApiKey,
            },
            body: JSON.stringify({
                sender: { name: "SkillCred Contact Form", email: "noreply@skillcred.com" }, // Ideally a verified sender in Brevo
                to: [{ email: "admin@skillcred.com", name: "SkillCred Admin" }], // Assuming admin's email
                replyTo: { email: validatedData.email, name: validatedData.name },
                subject: `New Landing Page Query: ${validatedData.inquiryType}`,
                htmlContent: `
                <h2>New Query from Landing Page</h2>
                <p><strong>Name:</strong> ${validatedData.name}</p>
                <p><strong>Email:</strong> ${validatedData.email}</p>
                <p><strong>Type:</strong> ${validatedData.inquiryType}</p>
                <p><strong>Message:</strong></p>
                <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
                `,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Brevo API error:", errorData);
            return { error: "Failed to send the query. Please try again later.", success: false };
        }

        return { success: true, error: null };
    } catch (error) {
        console.error("Query submission error:", error);
        if (error instanceof z.ZodError) {
            return { error: (error as any).errors[0].message, success: false };
        }
        return { error: "An unexpected error occurred.", success: false };
    }
}
