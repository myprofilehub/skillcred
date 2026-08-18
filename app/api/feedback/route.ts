import { NextResponse } from 'next/server';
import * as xlsx from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, secret } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Optional: simple webhook security
    if (process.env.ADMIN_TOKEN && secret !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Read the Excel file securely using Node's fs module
    const excelPath = path.join(process.cwd(), 'public', 'RAG-Workshop API Keys.xlsx');
    const fileBuffer = fs.readFileSync(excelPath);
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const data = xlsx.utils.sheet_to_json<any>(sheet);
    
    // Verify email (case-insensitive, trimming spaces)
    const normalizedTargetEmail = email.trim().toLowerCase();
    
    const isValidParticipant = data.some(row => {
      const rowEmail = row['Email ID'];
      if (rowEmail && typeof rowEmail === 'string') {
        return rowEmail.trim().toLowerCase() === normalizedTargetEmail;
      }
      return false;
    });

    if (!isValidParticipant) {
      console.log(`Webhook rejected: Email ${email} not found in Excel sheet.`);
      return NextResponse.json({ error: "Email not found in registered participant list." }, { status: 403 });
    }

    // Send email via Brevo
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (BREVO_API_KEY) {
      const protocol = req.headers.get('x-forwarded-proto') || 'http';
      const host = req.headers.get('host') || 'localhost:8000';
      const baseUrl = `${protocol}://${host}`;
      
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
          <h2 style="color: #F26522;">Thank you for your feedback!</h2>
          <p>Hi ${name || 'there'},</p>
          <p>We appreciate you taking the time to share your feedback with us regarding the RAG Workshop.</p>
          
          <p>As promised, here are your workshop reference materials:</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin-top: 0;"><strong>1. Concepts Reference Guide (PDF)</strong></p>
            <a href="${baseUrl}/RAG_Concepts_Reference.pdf" style="display: inline-block; background-color: #F26522; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin-bottom: 15px;">Download Reference PDF</a>
            
            <p><strong>2. Takehome Assignment Notebook (IPYNB)</strong></p>
            <a href="${baseUrl}/RAG_Workshop_TAKEHOME.ipynb" style="display: inline-block; background-color: #4b5563; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">Download Notebook</a>
          </div>

          <p>If you have any questions, please reply to this email.</p>
          <p>Best regards,<br/>The SkillCred Team</p>
        </div>
      `;

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': BREVO_API_KEY,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: "SkillCred Platform", email: "admin@skillcred.in" },
          to: [{ email: normalizedTargetEmail, name: name || "Participant" }],
          subject: "Your RAG Workshop Materials",
          htmlContent: emailHtml
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Brevo API Error:", errorData);
        return NextResponse.json({ error: "Failed to send email via Brevo" }, { status: 500 });
      }
      
      console.log(`Successfully sent workshop materials to ${normalizedTargetEmail}`);
      return NextResponse.json({ success: true, message: "Email sent successfully" });

    } else {
      console.error("BREVO_API_KEY is not set");
      return NextResponse.json({ error: "Email configuration missing" }, { status: 500 });
    }

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
