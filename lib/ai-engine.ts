/**
 * SkillCred AI Engine Client
 * Provides a standardized interface for communicating with the skillcredaiengine.
 */

const AI_ENGINE_URL = process.env.NEXT_PUBLIC_AI_ENGINE_URL || "http://localhost:3001";

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
    // Ensure base URL doesn't have trailing slash and endpoint has leading slash
    const cleanBaseUrl = AI_ENGINE_URL.replace(/\/+$/, "");
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    
    const response = await fetch(`${cleanBaseUrl}${cleanEndpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      // If the error response is HTML (like a 404 page), don't include it all in the error message
      const errorMessage = error.includes("<!DOCTYPE html>") 
        ? `Received HTML error page (Status ${response.status})`
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
