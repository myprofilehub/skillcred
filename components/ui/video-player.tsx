import { getVideoDetails } from "@/lib/utils";

interface VideoPlayerProps {
    url: string | null | undefined;
}

export function VideoPlayer({ url }: VideoPlayerProps) {
    const details = getVideoDetails(url);

    if (!details) {
        return (
            <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-[#1a1a1a] text-slate-400">
                Invalid or missing video URL
            </div>
        );
    }

    if (details.type === "html5") {
        return (
            <div className="aspect-video w-full bg-black flex items-center justify-center">
                <video 
                    src={details.embedUrl} 
                    controls 
                    autoPlay
                    controlsList="nodownload" // Basic protection
                    className="w-full h-full max-h-full max-w-full" 
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }

    // Embed iFrame fallback for YouTube, Vimeo, Drive, Unknown embeds
    return (
        <div className="aspect-video w-full bg-black">
            <iframe 
                src={details.embedUrl} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
            />
        </div>
    );
}
