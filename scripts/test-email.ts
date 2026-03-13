import { sendEmail } from "../lib/email";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    console.log("Testing Brevo API...");

    if (!process.env.BREVO_API_KEY) {
        console.error("❌ BREVO_API_KEY is missing");
        return;
    }

    const result = await sendEmail({
        to: [{ email: "mgmags25@gmail.com", name: "Test User" }],
        subject: "SkillCred Brevo Test (Verified Domain)",
        htmlContent: "<p>This is a test email via Brevo API using <strong>admin@codequestzone.com</strong>.</p>"
    });

    console.log("Send Result:", result);
}

main().catch(console.error);
