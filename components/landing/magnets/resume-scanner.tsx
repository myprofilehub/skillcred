"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UploadCloud, CheckCircle2, FileText, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export function ResumeScanner() {
    const { data: session } = useSession();
    const [state, setState] = useState<"idle" | "scanning" | "complete">("idle");
    const [score, setScore] = useState(0);

    const handleUpload = () => {
        setState("scanning");
        // Mock scan delay
        setTimeout(() => {
            setState("complete");
            // Mock score 60-80
            setScore(Math.floor(Math.random() * (85 - 65 + 1)) + 65);
        }, 2000);
    };

    return (
        <section id="resume-scanner" className="py-24 px-6 border-b border-white/5 bg-black/50">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Is your resume ATS-proof?
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Recruiters spend 6 seconds on a resume. Our AI analyzes your formatting, keywords, and project impact score instantly.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left: Uploader */}
                    <Card className="p-8 border-dashed border-2 border-white/20 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group flex flex-col items-center justify-center min-h-[300px]" onClick={state === "idle" ? handleUpload : undefined}>
                        {state === "idle" && (
                            <>
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <UploadCloud className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Drop your resume here</h3>
                                <p className="text-sm text-muted-foreground mb-6">PDF or DOCX (Max 5MB)</p>
                                <Button variant="secondary">Select File</Button>
                            </>
                        )}

                        {state === "scanning" && (
                            <div className="text-center space-y-6 w-full max-w-xs">
                                <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto" />
                                <div className="space-y-2">
                                    <div className="text-sm font-medium animate-pulse">Scanning keywords...</div>
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 animate-[width_2s_ease-in-out_forwards] w-full origin-left" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {state === "complete" && (
                            <div className="text-center space-y-6">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Analysis Complete</h3>
                                    <p className="text-muted-foreground">We found 4 critical improvements.</p>
                                </div>
                                <Button variant="outline" onClick={() => setState("idle")}>Scan Another</Button>
                            </div>
                        )}
                    </Card>

                    {/* Right: Results Preview */}
                    <Card className="relative overflow-hidden border-white/10 bg-black h-[300px]">
                        {state !== "complete" ? (
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground p-8 text-center bg-white/5">
                                <FileText className="w-12 h-12 mb-4 opacity-50 mx-auto" />
                                <p>Upload a resume to see the AI breakdown.</p>
                            </div>
                        ) : (
                            <div className="absolute inset-0 ">
                                {/* Content - Only blurred if NOT logged in */}
                                <div className={cn("p-6 space-y-4", !session && "blur-sm opacity-50 select-none pointer-events-none")}>
                                    <div className="flex items-center justify-between">
                                        <div className="font-bold">ATS Compatibility</div>
                                        <div className="text-emerald-400">{score}/100</div>
                                    </div>
                                    <div className="h-2 w-full bg-white/10 rounded overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: `${score}%` }} />
                                    </div>
                                    <div className="space-y-2 pt-4">
                                        <div className="flex justify-between text-sm">
                                            <span>Keyword Match</span>
                                            <span className="text-emerald-400">High</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Formatting</span>
                                            <span className="text-amber-400">Issue Found</span>
                                        </div>
                                         <div className="flex justify-between text-sm">
                                            <span>Impact Score</span>
                                            <span className="text-emerald-400">72/100</span>
                                        </div>
                                    </div>
                                    <div className="pt-4 text-xs text-muted-foreground">
                                        {session ? "Full detailed report sent to your email." : "Hidden details..."}
                                    </div>
                                </div>

                                {/* Gate Overlay - Only if NOT logged in */}
                                {!session && (
                                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm p-6 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                                        <Lock className="w-10 h-10 text-emerald-400" />
                                        <h3 className="text-xl font-bold">Unlock Full Report</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Your resume scored <strong>{score}/100</strong>. Sign up free to see exactly what to fix.
                                        </p>
                                        <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white" asChild>
                                            <Link href="/auth/signup?ref=resume_scanner">
                                                Reveal My Issues
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </section>
    );
}
