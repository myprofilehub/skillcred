"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full z-0 opacity-40 pointer-events-none">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[120px] animate-blob" />
                <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000" />
                <div className="absolute top-10 left-1/2 w-72 h-72 bg-violet-500 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-muted-foreground mb-6 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        Admissions Open for Winter Batch
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-200">
                        SkillCred <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-300">Learn. Build. Verify. Get Hired.</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10">
                        A platform where students across all streams work on live mentor-supported projects,
                        build verified portfolios, take assessment tests, and get discovered by top HRs.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="h-12 px-8 text-lg bg-gradient-to-r from-purple-600 to-pink-600 border-none hover:opacity-90 shadow-[0_0_15px_rgba(168,85,247,0.4)] text-white font-bold" asChild>
                            <Link href="/enroll">
                                Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-lg" asChild>
                            <Link href="/pat/about">
                                PAT Assessment
                            </Link>
                        </Button>
                    </div>
                </motion.div>

                {/* Code/Terminal Visual decorative */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-20 mx-auto max-w-4xl"
                >
                    <div className="rounded-xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl overflow-hidden text-left">
                        <div className="flex items-center gap-2 p-4 border-b border-white/10 bg-white/5">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="ml-4 text-xs text-muted-foreground font-mono">skill_verification.py</div>
                        </div>
                        <div className="p-6 font-mono text-sm text-gray-300 overflow-x-auto">
                            <div><span className="text-purple-400">class</span> <span className="text-yellow-300">StudentProfile</span>:</div>
                            <div className="pl-4"><span className="text-blue-400">def</span> <span className="text-blue-300">__init__</span>(self, name, streams):</div>
                            <div className="pl-8">self.name = name</div>
                            <div className="pl-8">self.streams = streams</div>
                            <div className="pl-8">self.projects = []</div>
                            <br />
                            <div className="pl-4"><span className="text-blue-400">def</span> <span className="text-blue-300">verify_project</span>(self, project, mentor):</div>
                            <div className="pl-8"><span className="text-purple-400">if</span> mentor.approve(project):</div>
                            <div className="pl-12">self.verified = <span className="text-blue-400">True</span></div>
                            <div className="pl-12">self.unlock_assessment()</div>
                            <div className="pl-12"><span className="text-green-400">print</span>(<span className="text-orange-300">"Portfolio Updated!"</span>)</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
