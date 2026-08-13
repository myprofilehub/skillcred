import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { join } from "path";
import { existsSync } from "fs";

// Fallback to global prisma if @/lib/prisma fails
const db = prisma || require("@prisma/client").PrismaClient;

const API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);
const fileManager = new GoogleAIFileManager(API_KEY);
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

import { writeFile } from "fs/promises";
import { tmpdir } from "os";

async function uploadMediaToGemini(urlPath: string, mimeType: string) {
  if (!API_KEY) return null;
  
  try {
    const fullUrl = urlPath.startsWith("/") ? `https://skillcred.in${urlPath}` : urlPath;
    const res = await fetch(fullUrl);
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const tempFilePath = join(tmpdir(), `upload-${Date.now()}.webm`);
    await writeFile(tempFilePath, buffer);

    const uploadResult = await fileManager.uploadFile(tempFilePath, {
      mimeType,
      displayName: urlPath.split('/').pop()?.split('?')[0] || "video.webm",
    });
    let file = await fileManager.getFile(uploadResult.file.name);
    while (file.state === "PROCESSING") {
      await delay(2000);
      file = await fileManager.getFile(uploadResult.file.name);
    }
    if (file.state === "FAILED") return null;
    return uploadResult.file.uri;
  } catch (error) {
    console.error("Error uploading:", error);
    return null;
  }
}

export async function GET() {
  const email = "gmsai35@gmail.com";
  // @ts-ignore
  const a = await db.counselorAssessment.findFirst({ where: { candidateEmail: email } });
  
  if (!a) {
    return NextResponse.json({ error: "Candidate not found" });
  }

  const urls = [a.objection1Url, a.objection2Url, a.objection3Url, a.objection4Url, a.objection5Url, a.objection6Url];
  
  const uris = [];
  for (let i = 0; i < urls.length; i++) {
    if (urls[i]) {
      uris.push(await uploadMediaToGemini(urls[i] as string, "video/webm"));
      await delay(5000); 
    } else {
      uris.push(null);
    }
  }

  const scores: (number | null)[] = [null, null, null, null, null, null];
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" }});

  for (let i = 0; i < uris.length; i++) {
    if (uris[i]) {
      const prompt = `Watch this video of a sales counselor handling Objection ${i+1}. Evaluate their body language, confidence, tone, and spoken response. Provide a score from 1 to 5. Format exactly as JSON: {"score": <number>}`;
      try {
        const res = await model.generateContent([ prompt, { fileData: { fileUri: uris[i] as string, mimeType: "video/webm" } } ]);
        const j = JSON.parse(res.response.text());
        scores[i] = j.score;
        await delay(5000);
      } catch (e) {
        console.error(`Video ${i+1} error:`, e);
      }
    }
  }

  let cumulativeScore = null;
  let cumulativeFeedback = null;
  const finalPrompt = `Provide a final cumulative assessment for this candidate.
They scored:
- Voice: 3 out of 5
- Empathy: Checked in Section 2.
- Video Objection Scores: ${JSON.stringify(scores)} out of 5.
Provide a cumulative Score from 0 to 100, and a 2-3 sentence final feedback verdict on whether they should be hired.
Format exactly as JSON: {"score": <number>, "feedback": "<string>"}`;

  try {
    const cumResult = await model.generateContent(finalPrompt);
    const cumJson = JSON.parse(cumResult.response.text());
    cumulativeScore = cumJson.score;
    cumulativeFeedback = cumJson.feedback;
  } catch (err) {
    console.error("Cumulative grading error:", err);
  }

  // @ts-ignore
  await db.counselorAssessment.update({
    where: { id: a.id },
    data: {
      objection1Score: scores[0], objection2Score: scores[1], objection3Score: scores[2],
      objection4Score: scores[3], objection5Score: scores[4], objection6Score: scores[5],
      cumulativeScore, cumulativeFeedback
    }
  });

  return NextResponse.json({ 
    success: true, 
    message: "Candidate regraded successfully",
    scores,
    cumulativeScore,
    cumulativeFeedback
  });
}
