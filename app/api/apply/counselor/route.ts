import { NextRequest, NextResponse } from "next";
import { prisma } from "@/lib/db";

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

      await prisma.counselorAssessment.update({
        where: { token },
        data: {
          writtenQ1: payload.writtenQ1,
          writtenQ2: payload.writtenQ2,
          writtenQ3: payload.writtenQ3,
          triageData: payload.triageData,
          triageInsight: payload.triageInsight,
          guaranteeFlag,
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
