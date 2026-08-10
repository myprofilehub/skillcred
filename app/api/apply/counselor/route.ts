import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  const assessment = await prisma.counselorAssessment.findUnique({
    where: { token },
  });

  if (!assessment) {
    return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  }

  if (assessment.expiresAt < new Date()) {
    return NextResponse.json({ error: "Token expired" }, { status: 403 });
  }

  return NextResponse.json({ assessment });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { token, section, payload } = data;

    if (!token || !section) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const assessment = await prisma.counselorAssessment.findUnique({
      where: { token },
    });

    if (!assessment) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    }

    if (assessment.expiresAt < new Date()) {
      return NextResponse.json({ error: "Token expired" }, { status: 403 });
    }

    if (section === "1") {
      // Auto fail logic
      const noticeDays = parseInt(payload.noticePeriod || "0", 10);
      const isAutoFail = noticeDays > 45 || payload.chennaiOnsite === false;
      // You can add more complex expected CTC ceiling logic here

      await prisma.counselorAssessment.update({
        where: { token },
        data: {
          noticePeriod: payload.noticePeriod,
          currentCTC: payload.currentCTC,
          expectedCTC: payload.expectedCTC,
          chennaiOnsite: payload.chennaiOnsite,
          yearsSales: payload.yearsSales,
          voiceTamilUrl: payload.voiceTamilUrl,
          voiceEnglishUrl: payload.voiceEnglishUrl,
          status: isAutoFail ? "STAGE_1_FAILED" : "STAGE_1_PASSED",
        },
      });

      return NextResponse.json({ success: true, status: isAutoFail ? "STAGE_1_FAILED" : "STAGE_1_PASSED" });
    }

    if (section === "2") {
      // Guarantee flag scoring
      const allText = `${payload.writtenQ1} ${payload.writtenQ2} ${payload.writtenQ3}`.toLowerCase();
      const guaranteeRegex = /guarantee|100%|assured|placement guarantee|nicchayam|kandippa/g;
      const guaranteeFlag = guaranteeRegex.test(allText);

      // Empathy Scoring using Gemini
      let empathyScore = null;
      let empathyFeedback = null;
      
      try {
        if (process.env.GEMINI_API_KEY) {
          const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" }
          });
          const prompt = `You are an expert sales manager reviewing a career counselor's written responses to student inquiries.
Grade their overall empathy, patience, and helpfulness on a scale of 1-10.
Provide a short 1-2 sentence feedback explaining the score.
Here are their responses:
Q1 (Student asked about fees): "${payload.writtenQ1}"
Q2 (Working professional asked if AI/ML is worth it at their age): "${payload.writtenQ2}"
Q3 (Parent asked about placement guarantee): "${payload.writtenQ3}"

Return the response in the following JSON format exactly:
{
  "score": <number>,
  "feedback": "<string>"
}`;
          const result = await model.generateContent(prompt);
          const jsonResponse = JSON.parse(result.response.text());
          empathyScore = jsonResponse.score;
          empathyFeedback = jsonResponse.feedback;
        } else {
          console.warn("GEMINI_API_KEY not found. Skipping empathy grading.");
        }
      } catch (err) {
        console.error("Gemini empathy grading error:", err);
      }

      await prisma.counselorAssessment.update({
        where: { token },
        data: {
          writtenQ1: payload.writtenQ1,
          writtenQ2: payload.writtenQ2,
          writtenQ3: payload.writtenQ3,
          triageData: payload.triageData,
          triageInsight: payload.triageInsight,
          guaranteeFlag,
          empathyScore,
          empathyFeedback,
          status: "STAGE_2_COMPLETED",
        },
      });

      return NextResponse.json({ success: true, status: "STAGE_2_COMPLETED" });
    }

    if (section === "3") {
      await prisma.counselorAssessment.update({
        where: { token },
        data: {
          objection1Url: payload.objection1Url,
          objection2Url: payload.objection2Url,
          objection3Url: payload.objection3Url,
          objection4Url: payload.objection4Url,
          objection5Url: payload.objection5Url,
          objection6Url: payload.objection6Url,
          status: "STAGE_3_COMPLETED",
        },
      });

      return NextResponse.json({ success: true, status: "STAGE_3_COMPLETED" });
    }

    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  } catch (e) {
    console.error("API error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
