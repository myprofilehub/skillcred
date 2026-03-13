"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Map, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const ROADMAPS = {
    "full-stack": [
        { title: "HTML/CSS Mastery", time: "Week 1-2" },
        { title: "JavaScript Logic", time: "Week 3-4" },
        { title: "React & Next.js", time: "Week 5-8" },
        { title: "Node.js & Databases", time: "Week 9-10" },
        { title: "Capstone Project", time: "Week 11-12" },
    ],
    "ai-ml": [
        { title: "Python Fundamentals", time: "Week 1-2" },
        { title: "Data Analysis (Pandas)", time: "Week 3-4" },
        { title: "Machine Learning Ops", time: "Week 5-8" },
        { title: "Deep Learning & LLMs", time: "Week 9-11" },
        { title: "AI Deployment", time: "Week 12" },
    ],
    "cyber": [
        { title: "Network Basics", time: "Week 1-2" },
        { title: "Linux Administration", time: "Week 3-4" },
        { title: "Ethical Hacking", time: "Week 5-8" },
        { title: "Security Ops (SOC)", time: "Week 9-11" },
        { title: "Cert Preparation", time: "Week 12" },
    ]
};

export function RoadmapGenerator() {
    const { data: session } = useSession();
    const [role, setRole] = useState<string>("full-stack");
    const [generated, setGenerated] = useState(false);

    return (
        <section id="roadmap-generator" className="py-24 px-6 bg-black relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 -z-10" />

            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <Map className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h2 className="text-4xl font-bold font-heading">
                        Stop guessing what to learn next.
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Our AI analyzes thousands of job descriptions to build the perfect curriculum for your dream role.
                    </p>

                    <div className="p-6 rounded-xl border border-white/10 bg-white/5 space-y-4">
                        <label className="text-sm font-medium">I want to become a...</label>
                        <Select value={role} onValueChange={(v) => { setRole(v); setGenerated(false); }}>
                            <SelectTrigger className="bg-black/50 border-white/20 h-12">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="full-stack">Full Stack Developer</SelectItem>
                                <SelectItem value="ai-ml">AI & Machine Learning Engineer</SelectItem>
                                <SelectItem value="cyber">Cybersecurity Specialist</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="w-full h-12" onClick={() => setGenerated(true)}>
                            Generate Roadmap
                        </Button>
                    </div>
                </div>

                <div className="relative">
                    {/* Timeline Graphic */}
                    <div className="relative space-y-8 pl-8 border-l-2 border-white/10 ml-4 py-4">
                        {(ROADMAPS[role as keyof typeof ROADMAPS] || ROADMAPS["full-stack"]).map((step, i) => (
                            <div key={i} className="relative animate-in slide-in-from-bottom-2 fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-black ${i < 3 ? "bg-indigo-500" : "bg-white/20"}`} />
                                <div className="p-4 rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm">
                                    <div className="text-xs text-indigo-400 font-bold mb-1">{step.time}</div>
                                    <div className="font-semibold">{step.title}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Gate Overlay - Only if NOT logged in */}
                    {!session && (
                        <div className={`absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col items-center justify-end pb-8 text-center transition-opacity duration-500 ${generated ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                            <div className="space-y-4 p-6">
                                <h3 className="text-xl font-bold flex items-center justify-center gap-2">
                                    <Lock className="w-5 h-5 text-indigo-400" />
                                    Unlock Full Curriculum
                                </h3>
                                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                                    Sign up to save this roadmap and access the detailed lesson plans for each module.
                                </p>
                                <Button className="bg-indigo-600 hover:bg-indigo-500" asChild>
                                    <Link href={`/auth/signup?ref=roadmap_${role}`}>
                                        Save Roadmap Free
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )}

                    {session && generated && (
                        <div className="absolute -bottom-16 left-0 right-0 text-center animate-in fade-in slide-in-from-top-4">
                            <Button variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/10 gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Roadmap Saved to Dashboard
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
