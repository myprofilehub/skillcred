"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Video, Image as ImageIcon, FileText, Loader2, Play, CheckCircle2, ChevronRight, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { aiEngine } from "@/lib/ai-engine";
import { SKILLCRED_STREAMS, PLATFORM_GUIDELINES, CONTENT_TYPES } from "@/lib/skillcred-context";

export default function AIWorkspacePage() {
    const [loading, setLoading] = useState(false);
    
    // Video States
    const [videoId, setVideoId] = useState<string | null>(null);
    const [videoData, setVideoData] = useState({
        topic: "",
        style: "Cinematic and professional"
    });

    // Text (Copywriter) States
    const [textLoading, setTextLoading] = useState(false);
    const [textResult, setTextResult] = useState<string[] | null>(null);
    const [textData, setTextData] = useState({
        topic: "",
        stream: SKILLCRED_STREAMS[0].name,
        platform: "LinkedIn",
        contentType: "tip",
        tone: "professional yet engaging",
        numberOfVariations: 2
    });

    // Image States
    const [imageLoading, setImageLoading] = useState(false);
    const [imageResult, setImageResult] = useState<{url: string}[] | null>(null);
    const [imageData, setImageData] = useState({
        prompt: "",
        aspectRatio: "1:1",
        numberOfImages: 1
    });

    const handleGenerateVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!videoData.topic) return toast.error("Please enter a topic");

        setLoading(true);
        try {
            const res = await aiEngine.generateVideo({
                topic: videoData.topic,
                style: videoData.style
            });
            
            if (res.jobId) {
                setVideoId(res.jobId);
                toast.success("Video generation started! Job ID: " + res.jobId);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to start video generation");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateText = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!textData.topic) return toast.error("Please enter a topic");

        setTextLoading(true);
        setTextResult(null);
        try {
            const res = await aiEngine.generateText(textData);
            if (res.success && res.content) {
                setTextResult(res.content);
                toast.success("Content drafted successfully!");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to generate content");
        } finally {
            setTextLoading(false);
        }
    };

    const handleGenerateImage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageData.prompt) return toast.error("Please enter a prompt");

        setImageLoading(true);
        setImageResult(null);
        try {
            const res = await aiEngine.generateImage(imageData);
            if (res.success && res.images) {
                setImageResult(res.images);
                toast.success("Images generated successfully!");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to generate image");
        } finally {
            setImageLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    /**
     * Helper to resolve media URLs to bypass "double URL" issues
     */
    const getImageUrl = (url: string) => {
        if (!url) return "";
        // If the URL is already absolute (contains http), return it as is
        if (url.startsWith('http')) return url;
        // Otherwise, prepend the AI Engine URL
        const baseUrl = (process.env.NEXT_PUBLIC_AI_ENGINE_URL || "http://localhost:3001/ai-engine").replace(/\/+$/, '');
        return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">
                    SkillCred AI Workspace
                </h1>
                <p className="text-slate-400 text-lg">
                    Orchestrate high-end AI content generation across your platform.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
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
                                    value={videoData.topic}
                                    onChange={(e) => setVideoData({...videoData, topic: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="style" className="text-slate-300">Visual Style</Label>
                                <Input 
                                    id="style" 
                                    placeholder="Cinematic, professional, tech-focused..." 
                                    className="bg-slate-950/50 border-slate-800 text-white focus:border-orange-500/50"
                                    value={videoData.style}
                                    onChange={(e) => setVideoData({...videoData, style: e.target.value})}
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

                {/* Copywriter AI Card */}
                <Card className="bg-slate-900/60 border-purple-500/20 backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileText className="w-24 h-24 text-purple-500" />
                    </div>
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                <FileText className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-purple-500/80">Content Engine</span>
                        </div>
                        <CardTitle className="text-2xl text-white">Copywriter AI</CardTitle>
                        <CardDescription className="text-slate-400">
                            Draft high-conversion social posts and blog content for SkillCred.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleGenerateText} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Platform</Label>
                                    <Select 
                                        value={textData.platform} 
                                        onValueChange={(v) => setTextData({...textData, platform: v})}
                                    >
                                        <SelectTrigger className="bg-slate-950/50 border-slate-800 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            {Object.keys(PLATFORM_GUIDELINES).map(p => (
                                                <SelectItem key={p} value={p}>{p}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Content Type</Label>
                                    <Select 
                                        value={textData.contentType} 
                                        onValueChange={(v) => setTextData({...textData, contentType: v})}
                                    >
                                        <SelectTrigger className="bg-slate-950/50 border-slate-800 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            {CONTENT_TYPES.map(t => (
                                                <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-slate-300">Target Stream</Label>
                                <Select 
                                    value={textData.stream} 
                                    onValueChange={(v) => setTextData({...textData, stream: v})}
                                >
                                    <SelectTrigger className="bg-slate-950/50 border-slate-800 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                        {SKILLCRED_STREAMS.map(s => (
                                            <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="text-topic" className="text-slate-300">Topic / Key Message</Label>
                                <Input 
                                    id="text-topic" 
                                    placeholder="e.g. Why data engineering is the backbone of AI..." 
                                    className="bg-slate-950/50 border-slate-800 text-white focus:border-purple-500/50"
                                    value={textData.topic}
                                    onChange={(e) => setTextData({...textData, topic: e.target.value})}
                                />
                            </div>

                            <Button 
                                type="submit" 
                                disabled={textLoading}
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-6 rounded-xl shadow-lg shadow-purple-500/20"
                            >
                                {textLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Drafting variations...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="mr-2 h-5 w-5" />
                                        Draft Content
                                    </>
                                )}
                            </Button>
                        </form>

                        {textResult && (
                            <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2">
                                <Tabs defaultValue="var-0">
                                    <TabsList className="bg-slate-950 border border-slate-800">
                                        {textResult.map((_, i) => (
                                            <TabsTrigger key={i} value={`var-${i}`} className="text-xs">Var {i+1}</TabsTrigger>
                                        ))}
                                    </TabsList>
                                    {textResult.map((text, i) => (
                                        <TabsContent key={i} value={`var-${i}`} className="mt-2">
                                            <div className="relative group/text">
                                                <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar">
                                                    {text}
                                                </div>
                                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/text:opacity-100 transition-opacity">
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 bg-slate-900 border border-slate-800" onClick={() => copyToClipboard(text)}>
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Image Generation Card */}
                <Card className="bg-slate-900/60 border-cyan-500/20 backdrop-blur-md relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ImageIcon className="w-24 h-24 text-cyan-500" />
                    </div>
                    <CardHeader>
                         <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                                <ImageIcon className="w-5 h-5 text-cyan-400" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-cyan-500/80">Art Engine</span>
                        </div>
                        <CardTitle className="text-2xl text-white">Image Generation</CardTitle>
                        <CardDescription className="text-slate-400">
                            Create stunning marketing visuals via Flux.1 / SDXL.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleGenerateImage} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="img-prompt" className="text-slate-300">Prompt</Label>
                                <Input 
                                    id="img-prompt" 
                                    placeholder="e.g. A futuristic workspace with holograms of code..." 
                                    className="bg-slate-950/50 border-slate-800 text-white focus:border-cyan-500/50"
                                    value={imageData.prompt}
                                    onChange={(e) => setImageData({...imageData, prompt: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Aspect Ratio</Label>
                                    <Select 
                                        value={imageData.aspectRatio} 
                                        onValueChange={(v) => setImageData({...imageData, aspectRatio: v})}
                                    >
                                        <SelectTrigger className="bg-slate-950/50 border-slate-800 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            <SelectItem value="1:1">1:1 Square</SelectItem>
                                            <SelectItem value="16:9">16:9 Cinema</SelectItem>
                                            <SelectItem value="9:16">9:16 Story</SelectItem>
                                            <SelectItem value="4:3">4:3 Classic</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Count</Label>
                                    <Select 
                                        value={imageData.numberOfImages.toString()} 
                                        onValueChange={(v) => setImageData({...imageData, numberOfImages: parseInt(v)})}
                                    >
                                        <SelectTrigger className="bg-slate-950/50 border-slate-800 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            <SelectItem value="1">1 Image</SelectItem>
                                            <SelectItem value="2">2 Images</SelectItem>
                                            <SelectItem value="4">4 Images</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={imageLoading}
                                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-6 rounded-xl shadow-lg shadow-cyan-500/20"
                            >
                                {imageLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Rendering...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-5 w-5" />
                                        Create Artwork
                                    </>
                                )}
                            </Button>
                        </form>

                        {imageResult && (
                            <div className="mt-6 grid grid-cols-2 gap-3 animate-in fade-in zoom-in-95">
                                {imageResult.map((img, i) => (
                                    <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-800">
                                        <img 
                                            src={getImageUrl(img.url)} 
                                            alt="Generated" 
                                            className="object-cover w-full h-full" 
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button 
                                                size="icon" 
                                                variant="secondary" 
                                                className="h-8 w-8" 
                                                onClick={() => window.open(getImageUrl(img.url), '_blank')}
                                            >
                                                <Share2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Connectivity Status */}
                <Card className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 border-slate-800 backdrop-blur-md relative overflow-hidden flex flex-col justify-center">
                     <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Sparkles className="w-32 h-32 text-cyan-400" />
                    </div>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-white font-bold">Engine Status</h3>
                                <p className="text-xs text-slate-500">System orchestration layer</p>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">Connected</span>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                             <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-500 font-mono">GATEWAY:</span>
                                <span className="text-xs text-cyan-400 font-mono truncate">{process.env.NEXT_PUBLIC_AI_ENGINE_URL || "http://localhost:3001"}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

