"use server"

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function submitArenaSolution(formData: FormData) {
  const challengeTitle = formData.get("challengeTitle") as string;
  const githubLink = formData.get("githubLink") as string;
  const demoVideo = formData.get("demoVideo") as File | null;
  const participantName = formData.get("participantName") as string;
  const participantEmail = formData.get("participantEmail") as string;

  if (!challengeTitle || !githubLink || !participantEmail) {
    return { error: "Missing required fields" };
  }

  let videoUrl = "No video uploaded";

  if (demoVideo && demoVideo.size > 0) {
    try {
      const bytes = await demoVideo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create a unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `demo-${uniqueSuffix}-${demoVideo.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'arena');
      
      // Ensure directory exists
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {
        // ignore if exists
      }

      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      
      videoUrl = `/uploads/arena/${filename}`;
    } catch (e) {
      console.error("Error saving video:", e);
      return { error: "Failed to upload video" };
    }
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY is not set.");
    return { success: true };
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Code Arena", email: "no-reply@skillcred.in" },
        to: [{ email: "ganesan.m@skillcred.in", name: "Ganesan" }],
        subject: `Arena Solution Submitted: ${challengeTitle}`,
        htmlContent: `
          <h3>New Code Arena Submission</h3>
          <p><strong>Participant:</strong> ${participantName || 'N/A'}</p>
          <p><strong>Email:</strong> ${participantEmail}</p>
          <p><strong>Challenge:</strong> ${challengeTitle}</p>
          <p><strong>GitHub Link:</strong> <a href="${githubLink}">${githubLink}</a></p>
          <p><strong>Demo Video:</strong> ${videoUrl !== 'No video uploaded' ? `<a href="https://skillcred.in${videoUrl}">Download/View Local Video</a>` : videoUrl}</p>
        `,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Brevo API error:", text);
      return { error: "Failed to send notification." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting solution:", error);
    return { error: "An unexpected error occurred." };
  }
}
