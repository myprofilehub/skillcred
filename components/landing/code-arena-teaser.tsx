"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export function CodeArenaTeaser() {
    return (
        <section className="py-24 bg-amber-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-100 to-transparent opacity-50 pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Column: Challenges Display */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-white/40 rounded-[2rem] transform rotate-3 z-0" />
                        
                        <div className="relative z-10 space-y-4">
                            {/* Challenge Card 1 */}
                            <Card className="p-4 bg-white border-slate-100 shadow-xl shadow-slate-200/50 flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                                    <Zap className="w-6 h-6 text-red-500" />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-slate-900">E-Commerce Microservices</h4>
                                        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">Hard</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Full Stack Track • 4-5 hours</p>
                                </div>
                            </Card>

                            {/* Challenge Card 2 */}
                            <Card className="p-4 bg-white border-slate-100 shadow-xl shadow-slate-200/50 flex gap-4 items-center ml-8">
                                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                                    <Code2 className="w-6 h-6 text-amber-500" />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-slate-900">Image Classification CNN</h4>
                                        <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">Medium</span>
                                    </div>
                                    <p className="text-xs text-slate-500">AI/ML Track • 2-3 hours</p>
                                </div>
                            </Card>

                            {/* Challenge Card 3 */}
                            <Card className="p-4 bg-white border-slate-100 shadow-xl shadow-slate-200/50 flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                    <Trophy className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-slate-900">Build a RESTful API</h4>
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Easy</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Full Stack Track • 1-2 hours</p>
                                </div>
                            </Card>
                        </div>
                    </motion.div>

                    {/* Right Column: Copy & CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-amber-700 text-sm font-bold mb-6 border border-amber-200 shadow-sm">
                            <Trophy className="w-4 h-4" />
                            Free Coding Challenges
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">
                            Enter the <span className="text-amber-500">Code Arena.</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Not ready to enroll yet? Test your skills against peers in our competitive Code Arena. Solve real-world engineering problems across Full Stack and AI/ML tracks, climb the leaderboard, and get noticed by recruiters.
                        </p>
                        
                        <Link href="/code-arena" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-slate-900/20">
                            Start a Challenge <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
