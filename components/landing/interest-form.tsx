"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Video, Layout, Code, Database, Shield, Cpu, Smartphone, Blocks, Terminal } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { VideoPlayer } from "@/components/ui/video-player";
import { getVideoThumbnail } from "@/lib/utils";

type Recording = {
    id: string;
    title: string;
    description: string | null;
    url: string;
    type: string;
    createdAt: Date;
    track: {
        title: string;
        slug: string;
        icon: string | null;
    } | null;
};

// Map icons to tracks purely for visual flair
const iconMap: Record<string, any> = {
    "Fullstack Web Development": Code,
    "AI & ML": Cpu,
    "Cybersecurity": Shield,
    "Devops & Cloud": Database,
    "Data Engineering": Layout,
    "Mobile Development": Smartphone,
    "IoT & Embedded": Blocks,
    "Data Science & Analytics": Terminal
};

export function LandingInterestForm({ recordings }: { recordings: Recording[] }) {
    return (
        <section id="interest-form" className="py-12 bg-black border-y border-white/5 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-12 gap-6">
                    <div className="max-w-2xl flex flex-col items-center">
                        <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 px-4 py-1 mb-4">
                            Resources
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                            Exclusive Masterclass
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Explore our public archive of real masterclasses and tutorials from across our engineering streams.
                        </p>
                    </div>
                    <Button 
                        asChild
                        className="h-12 px-6 text-md bg-white text-black hover:bg-white/90 font-bold tracking-wide rounded-full shadow-lg shadow-white/10 mt-2"
                    >
                        <Link href="/library">
                            Explore Resources
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>

                {recordings.length === 0 ? (
                    <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5">
                        <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-xl font-bold mb-2">No videos available yet</h3>
                        <p className="text-muted-foreground">Check back soon for free masterclasses.</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {recordings.map((recording) => {
                            const trackTitle = recording.track?.title || "General";
                            const Icon = iconMap[trackTitle] || Video;
                            const streamSlug = recording.track?.slug || "";

                            // Clicking a video card goes to the library filtered by its track
                            const href = streamSlug ? `/library?tracks=${streamSlug}` : "/library";

                            return (
                                <Dialog key={recording.id}>
                                    <DialogTrigger asChild>
                                        <div className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.08] hover:border-indigo-500/50 transition-all duration-300 cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                                            {/* Video Thumbnail Placeholder or Image */}
                                            <div className="aspect-video bg-gradient-to-br from-indigo-950 to-black relative flex items-center justify-center border-b border-white/10 overflow-hidden">
                                                {getVideoThumbnail(recording.url) && (
                                                    <img 
                                                        src={getVideoThumbnail(recording.url)!} 
                                                        alt={recording.title}
                                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                )}
                                                {/* Overlay glow */}
                                                <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                                                
                                                <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 group-hover:scale-110 group-hover:bg-indigo-500/30 transition-all duration-500 z-10 backdrop-blur-sm">
                                                    <Play className="w-6 h-6 text-indigo-300 ml-1" />
                                                </div>
                                                
                                                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-xs font-medium border border-white/10 flex items-center gap-1.5 z-20">
                                                    <Icon className="w-3 h-3 text-indigo-400" />
                                                    {trackTitle}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5 flex flex-col flex-1">
                                                <h3 className="font-bold text-lg mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
                                                    {recording.title}
                                                </h3>
                                                {recording.description && (
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                                                        {recording.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-white/5">
                                                    <span>
                                                        Added {formatDistanceToNow(new Date(recording.createdAt), { addSuffix: true })}
                                                    </span>
                                                    <span className="flex items-center text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
                                                        Watch Now <ArrowRight className="w-3 h-3 ml-1" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl p-0 bg-black border-white/10 overflow-hidden sm:rounded-xl">
                                        <DialogTitle className="sr-only">{recording.title}</DialogTitle>
                                        <VideoPlayer url={recording.url} />
                                        {recording.description && (
                                            <div className="p-6 pt-4 text-slate-300 text-sm">
                                                <h3 className="text-white font-semibold text-lg mb-2">{recording.title}</h3>
                                                {recording.description}
                                            </div>
                                        )}
                                    </DialogContent>
                                </Dialog>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
