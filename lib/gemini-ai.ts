import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { join } from "path";
import { existsSync } from "fs";

const API_KEY = process.env.GEMINI_API_KEY || "";
export const genAI = new GoogleGenerativeAI(API_KEY);
export const fileManager = new GoogleAIFileManager(API_KEY);

import { writeFile } from "fs/promises";
import { tmpdir } from "os";

/**
 * Uploads a local file to Gemini and waits for processing to complete.
 * @param urlPath e.g. "/uploads/counselor/token-obj1.webm"
 * @param mimeType e.g. "video/webm" or "audio/webm"
 * @returns The file URI to pass to the generative model.
 */
export async function uploadMediaToGemini(urlPath: string, mimeType: string) {
  if (!API_KEY) return null;

  try {
    const fullUrl = urlPath.startsWith("/") ? `https://skillcred.in${urlPath}` : urlPath;
    const res = await fetch(fullUrl);
    if (!res.ok) {
      console.warn(`Failed to fetch media from URL: ${fullUrl}`);
      return null;
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const tempFilePath = join(tmpdir(), `upload-${Date.now()}.webm`);
    await writeFile(tempFilePath, buffer);

    const uploadResult = await fileManager.uploadFile(tempFilePath, {
      mimeType,
      displayName: urlPath.split('/').pop()?.split('?')[0] || "media_file",
    });

    let file = await fileManager.getFile(uploadResult.file.name);
    
    // Wait for processing
    while (file.state === "PROCESSING") {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      file = await fileManager.getFile(uploadResult.file.name);
    }

    if (file.state === "FAILED") {
      console.error("Gemini Video processing failed.");
      return null;
    }

    return uploadResult.file.uri;
  } catch (error) {
    console.error("Error uploading to Gemini:", error);
    return null;
  }
}
