"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Layout, Code, Database, Shield, Cpu, Smartphone, Blocks, Terminal } from "lucide-react";
import { Label } from "@/components/ui/label";

type Track = {
    id: string;
    title: string;
    description: string;
    slug: string;
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

export function LandingInterestForm({ tracks }: { tracks: Track[] }) {
    const router = useRouter();
    const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = (slug: string) => {
        setSelectedTracks((prev) =>
            prev.includes(slug)
                ? prev.filter((s) => s !== slug)
                : [...prev, slug]
        );
    };

    const handleSubmit = () => {
        setIsLoading(true);
        if (selectedTracks.length === 0) {
            router.push("/library"); // Go to library with all if none selected, or we could prevent it
        } else {
            const queryParams = new URLSearchParams();
            queryParams.set("tracks", selectedTracks.join(","));
            router.push(`/library?${queryParams.toString()}`);
        }
    };

    return (
        <section id="interest-form" className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                        Curate Your Free Library
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Select a few career streams below to instantly view our tailored public archive of masterclasses and tutorials—no login required.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {tracks.map((track) => {
                        const isSelected = selectedTracks.includes(track.slug);
                        const Icon = iconMap[track.title] || Layout;

                        return (
                            <div
                                key={track.id}
                                onClick={() => handleToggle(track.slug)}
                                className={`relative flex flex-col cursor-pointer rounded-xl border p-5 hover:bg-white/5 transition-all duration-300
                                ${isSelected ? "border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.15)]" : "border-white/10 bg-black/50"}`}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center border transition-colors
                                        ${isSelected ? "border-indigo-500 bg-indigo-500/20 text-indigo-400" : "border-white/20 text-muted-foreground"}`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 flex justify-end">
                                        <Checkbox
                                            id={`track-${track.id}`}
                                            checked={isSelected}
                                            onCheckedChange={() => handleToggle(track.slug)}
                                            className={`pointer-events-none rounded border-white/20 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500`}
                                        />
                                    </div>
                                </div>
                                <Label className="cursor-pointer font-bold text-lg mb-2">{track.title}</Label>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {track.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center">
                    <Button 
                        onClick={handleSubmit} 
                        className="h-14 px-8 text-lg bg-white text-black hover:bg-white/90 font-bold tracking-wide rounded-full shadow-lg shadow-white/10 w-full sm:w-auto"
                        disabled={isLoading}
                    >
                        {selectedTracks.length > 0 ? `Explore ${selectedTracks.length} Selected Streams` : "Explore Full Library"}
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
