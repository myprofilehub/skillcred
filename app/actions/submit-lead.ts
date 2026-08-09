"use server"

import { prisma } from "@/lib/db";

export async function submitLead(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const track = formData.get("track") as string;

  if (!email) {
    return { error: "Email is required" };
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY is not set.");
    // We still return success to the user so we don't block them if env is missing in dev,
    // but in prod this should be handled properly.
    return { success: true };
  }


  try {
    await prisma.lead.create({
      data: {
        name: name || "",
        email,
        phone: phone || "",
        track: track || "",
      },
    });
  } catch (dbError) {
    console.error("Failed to save lead to database:", dbError);
    // Continue executing so we still attempt the Brevo email
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
        sender: { name: "SkillCred Leads", email: "admin@skillcred.in" },
        to: [{ email: "ganesan.m@skillcred.in", name: "Ganesan" }],
        subject: `New Lead: ${track}`,
        htmlContent: `
          <h3>New Lead Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Track of Interest:</strong> ${track}</p>
        `,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Brevo API error:", text);
      return { error: "Failed to send lead notification." };
    }

    // Send curriculum email to student if requested
    if (track.includes("Curriculum Download") && email) {
      const studentRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": apiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Ganesan M", email: "admin@skillcred.in" },
          to: [{ email: email, name: name || "Student" }],
          subject: `Free live AI/ML Webinar on 17 August — book your seat`,
          htmlContent: `
            <p>Hi ${name || "there"},</p>
            <br/>
            <p>Thanks for downloading the AI/ML curriculum.</p>
            <br/>
            <p><a href="https://skillcred.in/SkillCred_AI_ML_Track_Curriculum.pdf" style="background-color: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Download Curriculum (PDF)</a></p>
            <br/>
            <p>If you're still weighing it up, the fastest way to decide is to watch us teach. Free live build on 17 August, 7 PM IST — Build a RAG System in 90 Minutes. You write the code and leave with a working pipeline.</p>
            <br/>
            <p>We keep the room small, so seats go through a quick 15-minute call.</p>
            <br/>
            <p>Book: <a href="https://calendly.com/admin-skillcred/seat-confirmation">https://calendly.com/admin-skillcred/seat-confirmation</a></p>
            <p>Questions before booking? Reply here or WhatsApp: <a href="https://skillcred.in/whatsapp">https://skillcred.in/whatsapp</a></p>
            <br/>
            <p>Best Regards,</p>
            <p><strong>Ganesan M</strong> | Co-Founder & CTO | <a href="https://www.skillcred.in">www.skillcred.in</a></p>
          `,
        }),
      });

      if (!studentRes.ok) {
        console.error("Failed to send curriculum email to student:", await studentRes.text());
        // We do not return an error to the user here since the admin notification succeeded
      }
    }

    // Send Free Live Session confirmation email to student if requested (also triggers for Request a Callback forms on the Landing Page)
    if ((track.includes("Free Session Registration") || track.includes("Landing Page:")) && email) {
      const sessionRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": apiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Ganesan M", email: "admin@skillcred.in" },
          to: [{ email: email, name: name || "Student" }],
          subject: `AI/ML Webinar Seat Confirmation — RAG build session on 17 August, 7 PM IST.`,
          htmlContent: `
            <p>Hi ${name || "there"},</p>
            <br/>
            <p>Thanks for registering interest in the RAG build session on 17 August, 7 PM IST.</p>
            <br/>
            <p>Next step is a 15-minute call to confirm your seat. Book here:</p>
            <br/>
            <p><a href="https://calendly.com/admin-skillcred/seat-confirmation">https://calendly.com/admin-skillcred/seat-confirmation</a></p>
            <br/>
            <p>On the call we'll cover your Python setup, send you the pre-work, and talk through whether the AI/ML cohort starting 1 September is a fit. We'll be direct with you either way.</p>
            <br/>
            <p>One note: this is a hands-on session. You'll be writing code for most of the 90 minutes and leaving with something that runs. Arriving with your environment ready makes that possible.</p>
            <br/>
            <p>Questions before booking? Reply here or WhatsApp: <a href="https://skillcred.in/whatsapp">skillcred.in/whatsapp</a></p>
            <br/>
            <p>Best Regards,</p>
            <p><strong>Ganesan M</strong> | Co Founder & CTO | <a href="https://www.skillcred.in">www.skillcred.in</a></p>
          `,
        }),
      });

      if (!sessionRes.ok) {
        console.error("Failed to send live session email to student:", await sessionRes.text());
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return { error: "An unexpected error occurred." };
  }
}
