const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

interface EmailParams {
    to: { email: string; name?: string }[];
    subject: string;
    htmlContent: string;
}

export async function sendEmail({ to, subject, htmlContent }: EmailParams) {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
        console.error("BREVO_API_KEY is missing");
        return { error: "Email configuration missing" };
    }

    try {
        const response = await fetch(BREVO_API_URL, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "api-key": apiKey,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                sender: { name: "SkillCred LMS", email: "admin@codequestzone.com" }, // Verified sender
                to: to,
                subject: subject,
                htmlContent: htmlContent,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Brevo API Error:", error);
            return { error: "Failed to send email" };
        }

        const data = await response.json();
        console.log("Brevo API Success:", data);
        return { success: true, data };
    } catch (error) {
        console.error("Email sending exception:", error);
        return { error: "Network error sending email" };
    }
}

export async function sendLMSCredentials(
    personalEmail: string,
    name: string,
    lmsEmail: string,
    tempPass: string
) {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #4f46e5;">Welcome to SkillCred LMS</h1>
            </div>
            
            <p>Hi ${name},</p>
            
            <p>Your enrollment was successful! We have generated your official credentials to access the Learning Management System (LMS).</p>
            
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>LMS Email:</strong> ${lmsEmail}</p>
                <p style="margin: 5px 0;"><strong>Temporary Password:</strong> ${tempPass}</p>
            </div>
            
            <p>Please log in immediately. You will be required to change your password upon your first login.</p>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXTAUTH_URL}/auth/lms" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Login to LMS</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 12px; color: #888;">If you did not request this, please ignore this email.</p>
        </div>
    </body>
    </html>
    `;

    return sendEmail({
        to: [{ email: personalEmail, name }],
        subject: "Your SkillCred LMS Credentials",
        htmlContent
    });
}

export async function sendOtpEmail(email: string, otp: string) {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #4f46e5;">Password Reset Request</h1>
            </div>
            
            <p>Hello,</p>
            
            <p>We received a request to reset the password for your SkillCred account associated with ${email}.</p>
            
            <p>Your One-Time Password (OTP) is:</p>
            
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
                <h2 style="margin: 0; letter-spacing: 5px; color: #333;">${otp}</h2>
            </div>
            
            <p>This code is valid for 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
    </body>
    </html>
    `;

    return sendEmail({
        to: [{ email }],
        subject: "Your Password Reset OTP - SkillCred",
        htmlContent
    });
}

export async function sendMentorAssignmentEmail(
    mentorEmail: string,
    mentorName: string,
    studentName: string,
    streamTitle: string
) {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #4f46e5;">New Student Assigned</h1>
            </div>
            
            <p>Hi ${mentorName},</p>
            
            <p>A new student has been assigned to you by the Admin. Here are the details:</p>
            
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Student:</strong> ${studentName}</p>
                <p style="margin: 5px 0;"><strong>Stream:</strong> ${streamTitle}</p>
            </div>
            
            <p><strong>Next Steps:</strong></p>
            <ol>
                <li>Create a Google Classroom for the <strong>${streamTitle}</strong> stream (if not already created)</li>
                <li>Create a batch for the student</li>
                <li>Assign a project from the catalog to the student</li>
            </ol>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXTAUTH_URL}/dashboard/mentor" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Mentor Dashboard</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 12px; color: #888;">This is an automated notification from SkillCred LMS.</p>
        </div>
    </body>
    </html>
    `;

    return sendEmail({
        to: [{ email: mentorEmail, name: mentorName }],
        subject: `New Student Assigned - ${streamTitle} | SkillCred`,
        htmlContent
    });
}

