import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';

// Basic rate limiting map (in-memory, resets on restart, fine for this)
const rateLimit = new Map<string, { count: number, timestamp: number }>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { projectNo, name, email, hp } = body;

    // Honeypot check
    if (hp) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    if (!projectNo || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // IP rate limit (basic)
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const limit = rateLimit.get(ip);
    if (limit && now - limit.timestamp < 3600000) { // 1 hour
      if (limit.count >= 5) {
        return NextResponse.json({ error: "Too many attempts from this IP" }, { status: 429 });
      }
      limit.count++;
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now });
    }

    const token = crypto.randomBytes(32).toString('hex');

    let claim;
    try {
      claim = await prisma.rAGClaim.create({
        data: {
          projectNo,
          studentName: name.trim(),
          email: email.trim().toLowerCase(),
          submissionToken: token,
          claimIp: ip
        },
        include: {
          project: true
        }
      });
    } catch (e: any) {
      if (e.code === 'P2002') {
        if (e.meta?.target?.includes('projectNo')) {
          return NextResponse.json({ error: `Project ${projectNo} was just claimed by someone else. Pick another.` }, { status: 409 });
        }
        if (e.meta?.target?.includes('email')) {
          return NextResponse.json({ error: "You've already claimed a project. Check your email, or resend your link." }, { status: 409 });
        }
      }
      throw e;
    }

    // Send Brevo email (Template A equivalent)
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    let emailSuccess = false;
    let emailErrorStr = "";

    if (BREVO_API_KEY) {
      const submitUrl = `http://localhost:8000/assignment/submit?t=${token}`;
      const corpusUrl = `http://localhost:8000/api/corpus?t=${token}`;
      const instructionsUrl = `http://localhost:8000/api/instructions?t=${token}`;
      
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your SkillCred RAG Assignment: Project ${claim.project.projectNo}</h2>
          <p>Hi ${claim.studentName},</p>
          <p>You have successfully claimed <strong>${claim.project.title}</strong>.</p>
          
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your Use Case:</strong> ${claim.project.useCase}</p>
            <p><strong>Your Constraint:</strong> <code style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">${claim.project.constraintText}</code></p>
          </div>

          <p><strong>Step 1: Download your corpus</strong><br/>
          <a href="${corpusUrl}" style="display: inline-block; background-color: #F26522; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin-top: 8px;">Download Corpus</a></p>

          <p><strong>Step 2: Read your specific assignment instructions</strong><br/>
          <a href="${instructionsUrl}">Download Assignment Manual (PDF)</a></p>

          <p><strong>Step 3: Submit your work</strong><br/>
          When you are finished (or if you need to update a submission), use your personal magic link below:<br/>
          <a href="${submitUrl}">${submitUrl}</a></p>

          <p style="color: #6b7280; font-size: 0.9em; margin-top: 40px;">Due: 21 August 2026, 11:59 PM IST. Do not forward this email; your links are personal and tied to your GitHub submission.</p>
        </div>
      `;

      try {
        const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            sender: { name: "SkillCred Admin", email: "admin@skillcred.in" },
            to: [{ email: claim.email, name: claim.studentName }],
            subject: `RAG Assignment - Project ${claim.project.projectNo}`,
            htmlContent: emailHtml
          })
        });

        if (!emailRes.ok) {
          const errData = await emailRes.text();
          emailErrorStr = `HTTP ${emailRes.status}: ${errData}`;
          console.error("Brevo Error:", emailErrorStr);
        } else {
          emailSuccess = true;
          console.log("Email sent successfully!");
        }
      } catch (err: any) {
        emailErrorStr = err.message;
        console.error("Brevo Catch Error:", emailErrorStr);
      }
    } else {
      emailErrorStr = "BREVO_API_KEY not configured";
      console.log("No Brevo API key, skipping email");
    }

    if (emailSuccess) {
      await prisma.rAGClaim.update({
        where: { id: claim.id },
        data: { briefSentAt: new Date() }
      });
    } else {
      await prisma.rAGClaim.update({
        where: { id: claim.id },
        data: { briefSendError: emailErrorStr }
      });
    }

    return NextResponse.json({ ok: true, token });
  } catch (error) {
    console.error("Error processing claim:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
