/**
 * SkillCred AI Engine Client
 * Provides a standardized interface for communicating with the skillcredaiengine.
 */

const AI_ENGINE_URL = process.env.NEXT_PUBLIC_AI_ENGINE_URL || "http://localhost:3001/ai-engine";

export interface GenerateTextRequest {
  topic: string;
  stream: string;
  platform: string;
  contentType: string;
  tone?: string;
  numberOfVariations?: number;
}

export interface GenerateImageRequest {
  prompt: string;
  aspectRatio?: string;
  numberOfImages?: number;
}

export interface GenerateVideoRequest {
  topic: string;
  style?: string;
  scenes?: any[];
}

class AIEngineClient {
  private async request(endpoint: string, options: RequestInit = {}) {
    // Ensure base URL doesn't have trailing slash
    let baseUrl = AI_ENGINE_URL.replace(/\/+$/, "");
    
    // RESILIENCE: Handle missing /ai-engine prefix in the base URL
    if ((baseUrl.includes(":3001") || baseUrl.includes("skillcred.in")) && !baseUrl.includes("/ai-engine")) {
      baseUrl += "/ai-engine";
    }

    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    // Forcefully remove any trailing slash from the endpoint
    const sanitizedEndpoint = cleanEndpoint.replace(/\/+$/, "");
    
    const fullUrl = `${baseUrl}${sanitizedEndpoint}`;
    
    console.log(`[AIEngine] Request URL: ${fullUrl}`);
    
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      const errorMessage = error.includes("<!DOCTYPE html>") 
        ? `Received HTML error page (Status ${response.status}) at ${fullUrl}. Check if the endpoint exists and the basePath is correct.`
        : error;
      throw new Error(`AI Engine Error (${response.status}): ${errorMessage}`);
    }

    return response.json();
  }

  /**
   * Generate text using the AI engine (Copywriter AI)
   */
  async generateText(req: GenerateTextRequest) {
    return this.request("/api/generate/text", {
      method: "POST",
      body: JSON.stringify(req),
    });
  }

  /**
   * Generate an image using the AI engine
   */
  async generateImage(req: GenerateImageRequest) {
    return this.request("/api/generate/image", {
      method: "POST",
      body: JSON.stringify(req),
    });
  }

  /**
   * Generate a full video pipeline using the AI engine
   */
  async generateVideo(req: GenerateVideoRequest) {
    return this.request("/api/generate/video-pipeline", {
      method: "POST",
      body: JSON.stringify(req),
    });
  }

  /**
   * Get public gallery items from the AI engine
   */
  async getGallery() {
    return this.request("/api/gallery");
  }
}

export const aiEngine = new AIEngineClient();
