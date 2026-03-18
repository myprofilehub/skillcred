import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type VideoType = "youtube" | "vimeo" | "drive" | "html5" | "unknown";

export function getVideoDetails(url: string | null | undefined): { type: VideoType; embedUrl: string } | null {
  if (!url) return null;

  // 1. YouTube
  if (url.includes("youtu.be/") || url.includes("youtube.com/watch") || url.includes("youtube.com/embed/")) {
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(url.split("?")[1]);
      videoId = urlParams.get("v") || "";
    } else if (url.includes("youtube.com/embed/")) {
      return { type: "youtube", embedUrl: url };
    }
    return { type: "youtube", embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url };
  }

  // 2. Vimeo
  if (url.includes("vimeo.com/")) {
    const vimeoId = url.split("vimeo.com/")[1]?.split(/[?#]/)[0];
    if (vimeoId) {
      return { type: "vimeo", embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1` };
    }
  }

  // 3. Google Drive
  if (url.includes("drive.google.com/file/d/")) {
    // Convert /view to /preview for embedded playback
    const embedUrl = url.replace("/view", "/preview");
    return { type: "drive", embedUrl };
  }

  // 4. Raw HTML5 Video (mp4, webm, ogg)
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.endsWith(".mp4") || lowerUrl.endsWith(".webm") || lowerUrl.endsWith(".ogg") || lowerUrl.includes(".mp4?")) {
    return { type: "html5", embedUrl: url };
  }

  // 5. Unknown/Fallback (Let it render as an iframe if we don't know, it might be a pre-formatted embed hook)
  return { type: "unknown", embedUrl: url };
}

export function getVideoThumbnail(url: string | null | undefined): string | null {
  if (!url) return null;

  // YouTube
  if (url.includes("youtu.be/") || url.includes("youtube.com/watch") || url.includes("youtube.com/embed/")) {
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(url.split("?")[1]);
      videoId = urlParams.get("v") || "";
    } else if (url.includes("youtube.com/embed/")) {
        videoId = url.split("youtube.com/embed/")[1]?.split("?")[0];
    }
    
    if (videoId) {
        // hqdefault is generally more reliably available than maxresdefault for all videos
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  }

  // Vimeo
  if (url.includes("vimeo.com/")) {
    const vimeoId = url.split("vimeo.com/")[1]?.split(/[?#]/)[0];
    if (vimeoId) {
       // Vimeo requires an API call to get the exact thumbnail ideally, but we can't do that synchronously here.
       // Without API, Vimeo thumbnails are tricky. We'll return null to let the UI fall back to gradient.
       return null; 
    }
  }

  // For Drive or Raw HTML5, we can't synchronously generate a thumbnail image URL cleanly without a backend service.
  return null;
}
