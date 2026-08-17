import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, repoUrl } = body;

    if (!token || !repoUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate repo url format roughly
    if (!repoUrl.match(/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/)) {
      return NextResponse.json({ error: "Invalid GitHub repository URL format. Please provide a standard repo link (e.g., https://github.com/username/repo)" }, { status: 400 });
    }

    const claim = await prisma.rAGClaim.findUnique({
      where: { submissionToken: token },
      include: { project: true }
    });

    if (!claim) {
      return NextResponse.json({ error: "Invalid or expired submission token" }, { status: 401 });
    }

    // Check if late (due Aug 21, 2026, 11:59 PM IST)
    const deadline = new Date("2026-08-21T18:29:59.000Z"); // 11:59 PM IST is 6:29 PM UTC
    const isLate = new Date() > deadline;

    // Update claim
    await prisma.rAGClaim.update({
      where: { id: claim.id },
      data: {
        repoUrl: repoUrl,
        submittedAt: new Date(),
        submissionCount: { increment: 1 },
        isLate: isLate
      }
    });

    // Add to history
    await prisma.rAGSubmissionHistory.create({
      data: {
        claimId: claim.id,
        repoUrl: repoUrl
      }
    });

    // Send Brevo email to Admin
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (BREVO_API_KEY) {
      const emailHtml = `
        <div style="font-family: sans-serif;">
          <h2>New RAG Assignment Submission</h2>
          <p><strong>Student:</strong> ${claim.studentName} (${claim.email})</p>
          <p><strong>Project:</strong> ${claim.project.projectNo} - ${claim.project.title}</p>
          <p><strong>Repo URL:</strong> <a href="${repoUrl}">${repoUrl}</a></p>
          <p><strong>Late:</strong> ${isLate ? '<span style="color:red">Yes</span>' : 'No'}</p>
          <p><strong>Total Submissions:</strong> ${claim.submissionCount + 1}</p>
        </div>
      `;

      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            sender: { name: "SkillCred Assignment System", email: "noreply@skillcred.in" },
            to: [{ email: "admin@skillcred.in", name: "SkillCred Admin" }],
            replyTo: { email: claim.email, name: claim.studentName },
            subject: `[Submission] Project ${claim.project.projectNo} - ${claim.studentName}`,
            htmlContent: emailHtml
          })
        });
      } catch (err) {
        console.error("Admin notification failed:", err);
      }
    }

    return NextResponse.json({ ok: true, submittedAt: new Date(), isLate });
  } catch (error) {
    console.error("Error processing submission:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
