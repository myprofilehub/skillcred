/**
 * SkillCred AI Engine Client
 * Provides a standardized interface for communicating with the skillcredaiengine.
 */

const AI_ENGINE_URL = process.env.NEXT_PUBLIC_AI_ENGINE_URL || "http://localhost:3001";

export interface GenerateTextRequest {
  prompt: string;
  systemPrompt?: string;
  model?: string;
}

export interface GenerateImageRequest {
  prompt: string;
  style?: string;
}

export interface GenerateVideoRequest {
  topic: string;
  style?: string;
  scenes?: any[];
}

class AIEngineClient {
  private async post(endpoint: string, body: any) {
    const response = await fetch(`${AI_ENGINE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`AI Engine Error (${response.status}): ${error}`);
    }

    return response.json();
  }

  /**
   * Generate text using the AI engine
   */
  async generateText(req: GenerateTextRequest) {
    return this.post("/api/generate/text", req);
  }

  /**
   * Generate an image using the AI engine
   */
  async generateImage(req: GenerateImageRequest) {
    return this.post("/api/generate/image", req);
  }

  /**
   * Generate a full video pipeline using the AI engine
   */
  async generateVideo(req: GenerateVideoRequest) {
    return this.post("/api/generate/video-pipeline", req);
  }

  /**
   * Get public gallery items from the AI engine
   */
  async getGallery() {
    const response = await fetch(`${AI_ENGINE_URL}/api/gallery`);
    if (!response.ok) throw new Error("Failed to fetch AI gallery");
    return response.json();
  }
}

export const aiEngine = new AIEngineClient();
