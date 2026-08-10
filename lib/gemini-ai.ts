import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { join } from "path";
import { existsSync } from "fs";

const API_KEY = process.env.GEMINI_API_KEY || "";
export const genAI = new GoogleGenerativeAI(API_KEY);
export const fileManager = new GoogleAIFileManager(API_KEY);

/**
 * Uploads a local file to Gemini and waits for processing to complete.
 * @param urlPath e.g. "/uploads/counselor/token-obj1.webm"
 * @param mimeType e.g. "video/webm" or "audio/webm"
 * @returns The file URI to pass to the generative model.
 */
export async function uploadMediaToGemini(urlPath: string, mimeType: string) {
  if (!API_KEY) return null;

  // The urlPath is served from public, so we prepend process.cwd() + "/public"
  // Make sure to remove leading slash if present to avoid absolute path resolution issues
  const cleanPath = urlPath.startsWith("/") ? urlPath.substring(1) : urlPath;
  const localPath = join(process.cwd(), "public", cleanPath);
  
  if (!existsSync(localPath)) {
    console.warn(`File not found: ${localPath}`);
    return null;
  }

  try {
    const uploadResult = await fileManager.uploadFile(localPath, {
      mimeType,
      displayName: urlPath.split('/').pop(),
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
