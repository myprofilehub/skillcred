'use server';

import { prisma } from "@/lib/db";
import { randomInt } from "crypto";
import * as xlsx from "xlsx";
import path from "path";
import fs from "fs";

// Helper to read the Excel file and find a row by email address
function getExcelDataByEmail(targetEmail: string) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'RAG-Workshop API Keys.xlsx');
        const fileBuffer = fs.readFileSync(filePath);
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);
        
        const cleanTarget = targetEmail.trim().toLowerCase();

        for (const row of data as any[]) {
            const cleanEmailCol = row['Email ID'] ? String(row['Email ID']).trim().toLowerCase() : '';
            const cleanNameCol = row['Name'] ? String(row['Name']).trim().toLowerCase() : '';
            
            if (cleanEmailCol === cleanTarget || cleanNameCol === cleanTarget) {
                return row;
            }
        }
        return null;
    } catch (error) {
        console.error("Error reading Excel file:", error);
        console.error("CWD was:", process.cwd());
        return null;
    }
}

export async function sendWorkshopOtp(email: string) {
    console.log(`[Workshop] Starting OTP send for ${email}`);
    try {
        // 1. Check if the email address exists in the Excel sheet
        const studentRecord = getExcelDataByEmail(email);
        if (!studentRecord) {
            return { error: "This email ID is not registered for the workshop. Please check the email and try again." };
        }

        // 2. Generate 6-digit OTP
        const otp = randomInt(100000, 999999).toString();
        const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // 3. Clear old tokens for this email
        await prisma.verificationToken.deleteMany({
            where: { identifier: email }
        });

        // 4. Create new token
        await prisma.verificationToken.create({
            data: {
                identifier: email,
                token: otp,
                expires
            }
        });

        console.log("----------------------------------------");
        console.log(`🔑 DEV OTP for ${email}:`, otp);
        console.log("----------------------------------------");

        // Send actual Email via Brevo
        const brevoApiKey = process.env.BREVO_API_KEY;
        if (brevoApiKey) {
            try {
                const response = await fetch("https://api.brevo.com/v3/smtp/email", {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "api-key": brevoApiKey,
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        sender: { name: "SkillCred", email: "admin@skillcred.in" },
                        to: [{ email: email }],
                        subject: "Your SkillCred Workshop API Key OTP",
                        htmlContent: `
                          <div style="font-family: sans-serif; padding: 20px;">
                            <h2>Workshop API Key Verification</h2>
                            <p>Hi ${studentRecord['Name'] || 'Student'},</p>
                            <p>Your one-time password (OTP) to claim your API Key is:</p>
                            <h1 style="font-size: 32px; letter-spacing: 5px; color: #4F46E5;">${otp}</h1>
                            <p>This code will expire in 10 minutes.</p>
                            <p>Best,<br/>SkillCred Team</p>
                          </div>
                        `
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    console.error("Brevo API error:", errorData);
                    return { error: "Failed to send email via Brevo. Please check your Brevo configuration." };
                }
                
                console.log(`[Workshop] Brevo Email successfully sent to ${email}`);
            } catch (brevoError) {
                console.error("Brevo Send Error:", brevoError);
                return { error: "Failed to send email. Please try again later." };
            }
        } else {
            console.log("[Workshop] BREVO_API_KEY not found in .env, falling back to console DEV OTP only.");
        }

        return { success: true };
    } catch (error) {
        console.error("Send OTP Error:", error);
        return { error: "Something went wrong while sending the OTP. Please try again." };
    }
}

export async function verifyWorkshopOtpAndFetchKey(email: string, otp: string) {
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
            await prisma.verificationToken.delete({ where: { token: otp } });
            return { error: "OTP has expired. Please request a new one." };
        }

        // 3. Fetch API Key from Excel
        const studentRecord = getExcelDataByEmail(email);
        if (!studentRecord || !studentRecord['Key']) {
            return { error: "Could not find your API key in our records." };
        }

        // 4. Cleanup Token after successful verification
        await prisma.verificationToken.delete({
            where: {
                identifier_token: {
                    identifier: email,
                    token: otp
                }
            }
        });

        // Return the API key and student details
        return { 
            success: true, 
            apiKey: studentRecord['Key'],
            name: studentRecord['Name'],
            keyName: studentRecord['Key Name']
        };

    } catch (error) {
        console.error("Verify OTP Error:", error);
        return { error: "Failed to verify OTP. Please try again." };
    }
}
