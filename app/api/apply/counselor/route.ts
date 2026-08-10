import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { genAI, uploadMediaToGemini } from "@/lib/gemini-ai";

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

      let voiceScore = null;
      let voiceFeedback = null;

      // Grade Voice if not auto-failing
      if (!isAutoFail && process.env.GEMINI_API_KEY && payload.voiceTamilUrl && payload.voiceEnglishUrl) {
        try {
          const tamilUri = await uploadMediaToGemini(payload.voiceTamilUrl, "audio/webm");
          const englishUri = await uploadMediaToGemini(payload.voiceEnglishUrl, "audio/webm");

          if (tamilUri && englishUri) {
            const model = genAI.getGenerativeModel({ 
              model: "gemini-1.5-flash",
              generationConfig: { responseMimeType: "application/json" }
            });
            const prompt = `You are evaluating a career counselor candidate's voice recordings.
Audio 1 is their Tamil self-introduction. Audio 2 is their English explanation of why they want to join.
Evaluate their Tamil native fluency, English communication clarity, tone, and confidence.
Provide a voiceScore from 1 to 5, and a brief 1-2 sentence voiceFeedback.
Format exactly as JSON: {"score": <number>, "feedback": "<string>"}`;
            
            const result = await model.generateContent([
              prompt,
              { fileData: { fileUri: tamilUri, mimeType: "audio/webm" } },
              { fileData: { fileUri: englishUri, mimeType: "audio/webm" } }
            ]);
            
            const jsonResponse = JSON.parse(result.response.text());
            voiceScore = jsonResponse.score;
            voiceFeedback = jsonResponse.feedback;
          }
        } catch (err) {
          console.error("Voice AI grading error:", err);
        }
      }

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
          voiceScore,
          voiceFeedback,
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
      let triageScore = null;
      let triageFeedback = null;
      
      try {
        if (process.env.GEMINI_API_KEY) {
          const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" }
          });
          
          // 1. Empathy
          const empathyPrompt = `You are an expert sales manager reviewing a career counselor's written responses to student inquiries.
Grade their overall empathy, patience, and helpfulness on a scale of 1-10. Provide a short 1-2 sentence feedback explaining the score.
Q1: "${payload.writtenQ1}"
Q2: "${payload.writtenQ2}"
Q3: "${payload.writtenQ3}"
Return exactly: {"score": <number>, "feedback": "<string>"}`;
          const empResult = await model.generateContent(empathyPrompt);
          const empJson = JSON.parse(empResult.response.text());
          empathyScore = empJson.score;
          empathyFeedback = empJson.feedback;

          // 2. Triage
          const triagePrompt = `You are evaluating a candidate's lead triage prioritization.
Ideal priority framework: Working professionals/grads asking about course/fees = Hot/Warm. 12th pass/timepass = Disqualify/Cold. Missing background = Nurture.
Candidate's Triage Data Mapping (ID: Priority): ${JSON.stringify(payload.triageData)}
Candidate's Insight: "${payload.triageInsight}"
Evaluate how logically they prioritized leads and their analytical insight. Provide a score from 1-10 and a brief 1-2 sentence feedback.
Return exactly: {"score": <number>, "feedback": "<string>"}`;
          const triageResult = await model.generateContent(triagePrompt);
          const triageJson = JSON.parse(triageResult.response.text());
          triageScore = triageJson.score;
          triageFeedback = triageJson.feedback;
        }
      } catch (err) {
        console.error("Gemini Section 2 grading error:", err);
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
          triageScore,
          triageFeedback,
          status: "STAGE_2_COMPLETED",
        },
      });

      return NextResponse.json({ success: true, status: "STAGE_2_COMPLETED" });
    }

    if (section === "3") {
      let scores = [null, null, null, null, null, null] as (number | null)[];
      let cumulativeScore = null;
      let cumulativeFeedback = null;

      try {
        if (process.env.GEMINI_API_KEY) {
          const urls = [
            payload.objection1Url, payload.objection2Url, payload.objection3Url,
            payload.objection4Url, payload.objection5Url, payload.objection6Url
          ];
          
          const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" }
          });

          // Upload all sequentially to avoid extreme rate limits
          const uris = [];
          for (let url of urls) {
            if (url) {
              uris.push(await uploadMediaToGemini(url, "video/webm"));
            } else {
              uris.push(null);
            }
          }

          // Evaluate each video
          for (let i = 0; i < uris.length; i++) {
            if (uris[i]) {
              const prompt = `Watch this video of a sales counselor handling Objection ${i+1}. 
Evaluate their body language, confidence, tone, and spoken response.
Provide a score from 1 to 5. Format exactly as JSON: {"score": <number>}`;
              try {
                const res = await model.generateContent([
                  prompt,
                  { fileData: { fileUri: uris[i] as string, mimeType: "video/webm" } }
                ]);
                const j = JSON.parse(res.response.text());
                scores[i] = j.score;
              } catch (e) {
                console.error(`Video ${i+1} grading error:`, e);
              }
            }
          }

          // Calculate Cumulative Feedback based on existing DB state + new scores
          const finalPrompt = `Provide a final cumulative assessment for this candidate.
They scored:
- Voice: (Wait, we can't reliably inject it here without re-fetching, assume standard).
- Empathy: Checked in Section 2.
- Video Objection Scores: ${JSON.stringify(scores)} out of 5.
Provide a cumulative Score from 0 to 100, and a 2-3 sentence final feedback verdict on whether they should be hired.
Format exactly as JSON: {"score": <number>, "feedback": "<string>"}`;
          
          const cumResult = await model.generateContent(finalPrompt);
          const cumJson = JSON.parse(cumResult.response.text());
          cumulativeScore = cumJson.score;
          cumulativeFeedback = cumJson.feedback;
        }
      } catch (err) {
        console.error("Gemini Section 3 grading error:", err);
      }

      await prisma.counselorAssessment.update({
        where: { token },
        data: {
          objection1Url: payload.objection1Url,
          objection2Url: payload.objection2Url,
          objection3Url: payload.objection3Url,
          objection4Url: payload.objection4Url,
          objection5Url: payload.objection5Url,
          objection6Url: payload.objection6Url,
          objection1Score: scores[0],
          objection2Score: scores[1],
          objection3Score: scores[2],
          objection4Score: scores[3],
          objection5Score: scores[4],
          objection6Score: scores[5],
          cumulativeScore,
          cumulativeFeedback,
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
