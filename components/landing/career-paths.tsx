"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Briefcase,
    Rocket,
    TrendingUp,
    Users,
    Building2,
    Code2,
    Award,
    Lightbulb,
    DollarSign,
    Handshake,
    ArrowRight,
    CheckCircle2,
    Sparkles,
} from "lucide-react";
import Link from "next/link";

export function CareerPaths() {
    return (
        <section id="career-paths" className="py-12 px-6 bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)]" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                    <Badge variant="outline" className="border-white/20 text-white/80 px-4 py-1">
                        Choose Your Destiny
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading">
                        Two Paths.{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Infinite Possibilities.
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Whether you want to land your dream job or build your own empire —
                        SkillCred provides the platform, mentorship, and connections to make it happen.
                    </p>
                </div>

                {/* Two Paths Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">

                    {/* PATH 1: GET HIRED */}
                    <Card className="relative p-8 border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 via-black to-black overflow-hidden group hover:border-indigo-500/50 transition-all duration-500">
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all" />

                        <div className="relative z-10 space-y-6">
                            {/* Path Badge */}
                            <div className="flex items-center justify-between">
                                <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 px-3 py-1">
                                    Path 1
                                </Badge>
                                <Briefcase className="w-8 h-8 text-indigo-400" />
                            </div>

                            {/* Title */}
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                    Get Hired at{" "}
                                    <span className="text-indigo-400">Top Companies</span>
                                </h3>
                                <p className="text-muted-foreground">
                                    Master in-demand skills, build a verified portfolio, and connect with recruiters from leading tech companies.
                                </p>
                            </div>

                            {/* Journey Steps */}
                            <div className="space-y-4 py-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                                        <Code2 className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Technical Skill Training</h4>
                                        <p className="text-sm text-muted-foreground">Industry-aligned curriculum with 8 engineering streams</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                                        <Rocket className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Project-Based Development</h4>
                                        <p className="text-sm text-muted-foreground">Build 15+ real-world projects with mentor verification</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                                        <Award className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">PAT Certification</h4>
                                        <p className="text-sm text-muted-foreground">Earn verified credentials through Project Assessment Test</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                                        <Building2 className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-emerald-400">Career Hub Access</h4>
                                        <p className="text-sm text-muted-foreground">Get discovered by HR from top companies</p>
                                    </div>
                                </div>
                            </div>

                            {/* Outcome */}
                            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-4 h-4 text-indigo-400" />
                                    <span className="text-sm font-medium text-indigo-400">Outcome</span>
                                </div>
                                <p className="text-sm">Land high-paying roles at companies like Google, Microsoft, Amazon, and 500+ hiring partners.</p>
                            </div>

                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 group/btn" asChild>
                                <Link href="/enroll">
                                    Start Career Journey
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </Card>

                    {/* PATH 2: BUILD YOUR STARTUP */}
                    <Card className="relative p-8 border-amber-500/30 bg-gradient-to-br from-amber-900/20 via-black to-black overflow-hidden group hover:border-amber-500/50 transition-all duration-500">
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-all" />

                        <div className="relative z-10 space-y-6">
                            {/* Path Badge */}
                            <div className="flex items-center justify-between">
                                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 px-3 py-1">
                                    Path 2
                                </Badge>
                                <TrendingUp className="w-8 h-8 text-amber-400" />
                            </div>

                            {/* Title */}
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                    Build Your Own{" "}
                                    <span className="text-amber-400">Startup</span>
                                </h3>
                                <p className="text-muted-foreground">
                                    Transform your projects into products. Connect with investors and build a self-sustained business.
                                </p>
                            </div>

                            {/* Journey Steps */}
                            <div className="space-y-4 py-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                                        <Lightbulb className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Idea Validation</h4>
                                        <p className="text-sm text-muted-foreground">Refine your project into a viable product with mentor feedback</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                                        <Rocket className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Product Development</h4>
                                        <p className="text-sm text-muted-foreground">Scale your project with technical mentorship and resources</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                                        <Handshake className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Investor Connect</h4>
                                        <p className="text-sm text-muted-foreground">Pitch to VCs, angels, and startup accelerators</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                                        <DollarSign className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-emerald-400">Monetization & Growth</h4>
                                        <p className="text-sm text-muted-foreground">Launch, monetize, and scale your business</p>
                                    </div>
                                </div>
                            </div>

                            {/* Outcome */}
                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                    <span className="text-sm font-medium text-amber-400">Outcome</span>
                                </div>
                                <p className="text-sm">Own a self-sustained business. Be the founder, not the employee.</p>
                            </div>

                            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-black font-semibold group/btn" asChild>
                                <Link href="/enroll">
                                    Start Founder Journey
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Common Benefits */}
                <div className="text-center">
                    <p className="text-muted-foreground mb-6">Both paths include:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>1:1 Mentorship</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>Project-Based Learning</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>Verified Portfolio</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>Industry Connections</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
