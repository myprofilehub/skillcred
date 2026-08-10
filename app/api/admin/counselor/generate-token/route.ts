import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { name, email, expiresInDays = 7 } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Generate a secure random token
    const token = crypto.randomBytes(16).toString("hex");
    
    // Set expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    const assessment = await prisma.counselorAssessment.create({
      data: {
        token,
        expiresAt,
        candidateName: name,
        candidateEmail: email,
        status: "PENDING",
      }
    });

    return NextResponse.json({ success: true, token: assessment.token, assessment });
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
  }
}
