import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { join } from "path";
import { existsSync } from "fs";
import * as dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);
const fileManager = new GoogleAIFileManager(API_KEY);
const prisma = new PrismaClient();
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function uploadMediaToGemini(urlPath, mimeType) {
  if (!API_KEY) return null;
  const cleanPath = urlPath.startsWith("/") ? urlPath.substring(1) : urlPath;
  const localPath = join(process.cwd(), "public", cleanPath);
  if (!existsSync(localPath)) return null;

  try {
    const uploadResult = await fileManager.uploadFile(localPath, {
      mimeType,
      displayName: urlPath.split('/').pop(),
    });
    let file = await fileManager.getFile(uploadResult.file.name);
    while (file.state === "PROCESSING") {
      await delay(2000);
      file = await fileManager.getFile(uploadResult.file.name);
    }
    if (file.state === "FAILED") return null;
    return uploadResult.file.uri;
  } catch (error) {
    console.error("Error uploading:", error.message);
    return null;
  }
}

async function main() {
  console.log("Fetching candidate...");
  const a = await prisma.counselorAssessment.findFirst({ where: { candidateEmail: "gmsai35@gmail.com" } });
  if (!a) { console.log("Not found"); return; }
  
  const urls = [a.objection1Url, a.objection2Url, a.objection3Url, a.objection4Url, a.objection5Url, a.objection6Url];
  
  console.log("Uploading 6 videos sequentially (with a 5 second delay to avoid rate limit)...");
  const uris = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    if (url) {
      console.log(`Uploading video ${i+1}...`);
      uris.push(await uploadMediaToGemini(url, "video/webm"));
      await delay(5000); 
    } else {
      uris.push(null);
    }
  }

  const scores = [null, null, null, null, null, null];
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" }});

  console.log("Grading videos sequentially (with 5 second delays)...");
  for (let i = 0; i < uris.length; i++) {
    if (uris[i]) {
      const prompt = `Watch this video of a sales counselor handling Objection ${i+1}. Evaluate their body language, confidence, tone, and spoken response. Provide a score from 1 to 5. Format exactly as JSON: {"score": <number>}`;
      try {
        console.log(`Generating AI score for video ${i+1}...`);
        const res = await model.generateContent([ prompt, { fileData: { fileUri: uris[i], mimeType: "video/webm" } } ]);
        const j = JSON.parse(res.response.text());
        scores[i] = j.score;
        console.log(`-> Video ${i+1} Score: ${j.score}/5`);
        await delay(5000);
      } catch (e) {
        console.error(`Video ${i+1} grading error:`, e.message);
      }
    }
  }

  console.log("Calculating cumulative score...");
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
    console.log(`-> Cumulative Score: ${cumulativeScore}/100`);
    console.log(`-> Feedback: ${cumulativeFeedback}`);
  } catch (err) {
    console.error("Cumulative grading error:", err.message);
  }

  console.log("Saving new scores to Database...");
  await prisma.counselorAssessment.update({
    where: { id: a.id },
    data: {
      objection1Score: scores[0], objection2Score: scores[1], objection3Score: scores[2],
      objection4Score: scores[3], objection5Score: scores[4], objection6Score: scores[5],
      cumulativeScore, cumulativeFeedback
    }
  });
  console.log("Successfully updated! You can now refresh the Admin Dashboard.");
}
main().catch(console.error).finally(() => prisma.$disconnect());
