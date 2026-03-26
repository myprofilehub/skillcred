"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Video, Image as ImageIcon, FileText, Loader2, Play, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { aiEngine } from "@/lib/ai-engine";

export default function AIWorkspacePage() {
    const [loading, setLoading] = useState(false);
    const [videoId, setVideoId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        topic: "",
        style: "Cinematic and professional"
    });

    const handleGenerateVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.topic) return toast.error("Please enter a topic");

        setLoading(true);
        try {
            const res = await aiEngine.generateVideo({
                topic: formData.topic,
                style: formData.style
            });
            
            if (res.job_id) {
                setVideoId(res.job_id);
                toast.success("Video generation started! Job ID: " + res.job_id);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to start video generation");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">
                    SkillCred AI Workspace
                </h1>
                <p className="text-slate-400 text-lg">
                    Orchestrate high-end AI content generation across your platform.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Video Generation Card */}
                <Card className="bg-slate-900/60 border-orange-500/20 backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Video className="w-24 h-24 text-orange-500" />
                    </div>
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                                <Video className="w-5 h-5 text-orange-400" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-orange-500/80">Premium Engine</span>
                        </div>
                        <CardTitle className="text-2xl text-white">Video Pipeline</CardTitle>
                        <CardDescription className="text-slate-400">
                            Generate 60-second cinematic promotional videos with AI narration.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleGenerateVideo} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="topic" className="text-slate-300">Video Topic</Label>
                                <Input 
                                    id="topic" 
                                    placeholder="e.g. Benefits of learning Cloud Computing..." 
                                    className="bg-slate-950/50 border-slate-800 text-white focus:border-orange-500/50"
                                    value={formData.topic}
                                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="style" className="text-slate-300">Visual Style</Label>
                                <Input 
                                    id="style" 
                                    placeholder="Cinematic, professional, tech-focused..." 
                                    className="bg-slate-950/50 border-slate-800 text-white focus:border-orange-500/50"
                                    value={formData.style}
                                    onChange={(e) => setFormData({...formData, style: e.target.value})}
                                />
                            </div>
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white font-bold py-6 rounded-xl shadow-lg shadow-orange-500/20"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Analyzing & Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-5 w-5" />
                                        Launch Video Pipeline
                                    </>
                                )}
                            </Button>
                        </form>

                        {videoId && (
                            <div className="mt-6 p-4 rounded-lg bg-green-500/5 border border-green-500/20 animate-in fade-in slide-in-from-top-2">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    <div>
                                        <p className="text-sm font-medium text-green-400">Job Active</p>
                                        <p className="text-xs text-slate-500 font-mono">{videoId}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions / Status */}
                <div className="space-y-6">
                    <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-lg text-white font-medium flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-cyan-400" />
                                Image Generation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-500 italic">
                                Integration with Flux.1/SDXL via AI Engine coming soon to this UI...
                            </p>
                            <Button variant="outline" className="w-full mt-4 border-slate-800 text-slate-400" disabled>
                                Create Artwork
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-lg text-white font-medium flex items-center gap-2">
                                <FileText className="w-4 h-4 text-purple-400" />
                                Copywriter AI
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-500 italic">
                                Generate SEO-optimized blog drafts and social media captions...
                            </p>
                            <Button variant="outline" className="w-full mt-4 border-slate-800 text-slate-400" disabled>
                                Draft Content
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-500/10 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Sparkles className="w-32 h-32 text-cyan-400" />
                        </div>
                        <CardContent className="pt-6">
                            <h3 className="text-white font-bold mb-1">Engine Connectivity</h3>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                <span className="text-xs text-slate-400 font-mono">{process.env.NEXT_PUBLIC_AI_ENGINE_URL || "http://localhost:3001"}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
