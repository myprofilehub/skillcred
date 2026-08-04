"use server"

export async function submitLead(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const track = formData.get("track") as string;

  if (!name || !email || !phone) {
    return { error: "All fields are required" };
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY is not set.");
    // We still return success to the user so we don't block them if env is missing in dev,
    // but in prod this should be handled properly.
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
        sender: { name: "SkillCred Leads", email: "no-reply@skillcred.in" },
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

    return { success: true };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return { error: "An unexpected error occurred." };
  }
}
