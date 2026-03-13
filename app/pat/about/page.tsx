"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle2, Award, Zap, Building2, Code2, LineChart, Briefcase } from "lucide-react";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function PatAboutPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <LandingNavbar />

            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center space-y-6 max-w-3xl mx-auto mb-20">
                        <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10 px-4 py-1.5 mb-2">
                            The Standard of Excellence
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tight">
                            What is the <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">PAT</span>?
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            The Project Assessment Test (PAT) is the industry's most rigorous, objective, and skills-first accreditation for software engineers.
                        </p>
                    </div>

                    {/* Problem / Solution */}
                    <div className="grid md:grid-cols-2 gap-12 mb-24">
                        <Card className="bg-white/5 border-white/10 p-8">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <span className="text-red-400">✗</span> The Old Way
                            </h3>
                            <ul className="space-y-4 text-slate-400">
                                <li>Relying on college pedigree instead of actual skill.</li>
                                <li>Filtering resumes by keywords, missing top talent.</li>
                                <li>Draining engineering time on repetitive technical interviews.</li>
                                <li>Testing leetcode puzzles instead of real-world project ability.</li>
                            </ul>
                        </Card>
                        <Card className="bg-indigo-900/20 border-indigo-500/30 p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 relative z-10">
                                <span className="text-emerald-400">✓</span> The SkillCred PAT
                            </h3>
                            <ul className="space-y-4 text-slate-300 relative z-10">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                                    <span>Verified proof of work through complex, mentor-reviewed projects.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                                    <span>Standardized evaluation rubrics mimicking enterprise code reviews.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                                    <span>Instant credibility recognized by 500+ hiring partners.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                                    <span>A comprehensive talent graph showcasing exact technical proficiencies.</span>
                                </li>
                            </ul>
                        </Card>
                    </div>

                    {/* How Industry Uses PAT */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Industry Leaders Trust the PAT</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">It's simple: developers who pass the PAT perform like mid-level engineers on day one.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-24">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
                            <Zap className="w-8 h-8 text-yellow-400" />
                            <h3 className="text-xl font-bold">50% Faster Hiring</h3>
                            <p className="text-sm text-slate-400">Companies skip the first two technical screening rounds entirely, trusting our rigorous vetting process.</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
                            <LineChart className="w-8 h-8 text-emerald-400" />
                            <h3 className="text-xl font-bold">Predictive Performance</h3>
                            <p className="text-sm text-slate-400">A high PAT score directly correlates to high on-the-job performance and faster onboarding times.</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
                            <Award className="w-8 h-8 text-purple-400" />
                            <h3 className="text-xl font-bold">Objective Bias-Free Metric</h3>
                            <p className="text-sm text-slate-400">Evaluate candidates solely on their code quality, architecture choices, and security practices.</p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-2xl p-12 text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6">Ready to Prove Your Skills?</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/enroll" className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                                View the Process
                            </Link>
                            <Link href="/enroll" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors border border-indigo-500">
                                Enroll to Get Certified
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
