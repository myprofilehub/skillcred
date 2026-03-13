"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Code2,
    BrainCircuit,
    Users,
    Trophy,
    Rocket,
    Terminal,
    Shield,
    Database,
    Cpu,
    Cloud,
    Globe,
    Smartphone,
    BarChart3,
    Lock,
    CheckCircle2,
    ArrowRight,
    FileCheck,
    Award,
} from "lucide-react";

// 8 Engineering Streams
const streams = [
    { name: "Full Stack Development", icon: Code2, color: "from-blue-500 to-indigo-500", projects: "15+ Projects" },
    { name: "AI & Machine Learning", icon: BrainCircuit, color: "from-purple-500 to-pink-500", projects: "12+ Projects" },
    { name: "Cybersecurity", icon: Shield, color: "from-red-500 to-orange-500", projects: "10+ Projects" },
    { name: "Data Engineering", icon: Database, color: "from-emerald-500 to-teal-500", projects: "14+ Projects" },
    { name: "DevOps & Cloud", icon: Cloud, color: "from-cyan-500 to-blue-500", projects: "11+ Projects" },
    { name: "Mobile Development", icon: Smartphone, color: "from-pink-500 to-rose-500", projects: "13+ Projects" },
    { name: "IoT & Embedded", icon: Cpu, color: "from-amber-500 to-orange-500", projects: "9+ Projects" },
    { name: "Data Science & Analytics", icon: BarChart3, color: "from-violet-500 to-purple-500", projects: "16+ Projects" },
];

// PAT Flow Steps
const patFlow = [
    { step: 1, title: "Learn", description: "Master concepts through structured curriculum", icon: Code2 },
    { step: 2, title: "Build", description: "Complete real-world projects with mentor guidance", icon: Rocket },
    { step: 3, title: "Verify", description: "Get projects reviewed & validated by industry mentors", icon: FileCheck },
    { step: 4, title: "PAT", description: "Pass Project Assessment Test to prove competency", icon: Award },
    { step: 5, title: "Hired", description: "Unlock Career Hub & connect with recruiters", icon: Trophy },
];

export function FeaturesSection() {
    return (
        <section id="features" className="py-24 px-6 bg-black relative">
            <div className="max-w-7xl mx-auto space-y-24">

                {/* ============================================== */}
                {/* 8 ENGINEERING STREAMS SECTION */}
                {/* ============================================== */}
                <div className="space-y-12">
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 px-4 py-1">
                            8 Engineering Streams
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold font-heading">
                            Choose Your Path.{" "}
                            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Master Your Craft.
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Industry-aligned learning tracks designed with 100+ real-world projects across diverse engineering domains.
                        </p>
                    </div>

                    {/* Streams Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {streams.map((stream) => (
                            <Card
                                key={stream.name}
                                className="p-6 border-white/10 bg-white/5 hover:bg-white/[0.08] transition-all duration-300 group cursor-pointer"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stream.color} p-0.5 mb-4`}>
                                    <div className="w-full h-full rounded-[10px] bg-black flex items-center justify-center">
                                        <stream.icon className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <h3 className="font-semibold text-sm md:text-base mb-1 group-hover:text-white transition-colors">
                                    {stream.name}
                                </h3>
                                <p className="text-xs text-muted-foreground">{stream.projects}</p>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* ============================================== */}
                {/* PROJECT-BASED LEARNING HIGHLIGHT */}
                {/* ============================================== */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 px-4 py-1">
                            Project-Based Learning
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading">
                            Stop Watching.{" "}
                            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                Start Building.
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Every concept you learn is immediately applied to building real applications.
                            From E-commerce microservices to AI RAG pipelines — you build what companies actually hire for.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                                <span className="text-sm">Production-ready projects with live deployments</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                                <span className="text-sm">Code reviews from Senior Engineers</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                                <span className="text-sm">Verified portfolio that proves your skills</span>
                            </div>
                        </div>
                    </div>
                    <Card className="p-8 border-white/10 bg-gradient-to-br from-emerald-900/20 to-black relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent)]" />
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="text-xs text-muted-foreground ml-2">project_submission.tsx</span>
                            </div>
                            <div className="space-y-2 font-mono text-sm">
                                <p className="text-emerald-400">// Your project journey</p>
                                <p><span className="text-purple-400">const</span> project = {"{"}</p>
                                <p className="pl-4"><span className="text-blue-400">name</span>: <span className="text-amber-400">"E-commerce Platform"</span>,</p>
                                <p className="pl-4"><span className="text-blue-400">commits</span>: <span className="text-emerald-400">247</span>,</p>
                                <p className="pl-4"><span className="text-blue-400">codeQuality</span>: <span className="text-emerald-400">94</span>,</p>
                                <p className="pl-4"><span className="text-blue-400">mentorVerified</span>: <span className="text-emerald-400">true</span>,</p>
                                <p className="pl-4"><span className="text-blue-400">deployed</span>: <span className="text-amber-400">"production"</span></p>
                                <p>{"}"}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ============================================== */}
                {/* PAT ASSESSMENT FLOW */}
                {/* ============================================== */}
                <div className="space-y-12">
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <Badge variant="outline" className="border-amber-500/30 text-amber-400 px-4 py-1">
                            Project Assessment Test (PAT)
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading">
                            From Learning to{" "}
                            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                                Getting Hired
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            A structured path from zero knowledge to job-ready credentials. Complete the PAT to unlock recruiter visibility.
                        </p>
                    </div>

                    {/* PAT Flow Timeline */}
                    <div className="relative">
                        {/* Connection Line */}
                        <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-emerald-500 to-amber-500 hidden md:block" />

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {patFlow.map((item, index) => (
                                <div key={item.step} className="relative">
                                    <Card className="p-6 border-white/10 bg-white/5 hover:bg-white/[0.08] transition-all text-center h-full">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                                            {item.step}
                                        </div>
                                        <item.icon className="w-6 h-6 mx-auto mb-3 text-indigo-400" />
                                        <h4 className="font-semibold mb-2">{item.title}</h4>
                                        <p className="text-xs text-muted-foreground">{item.description}</p>
                                    </Card>
                                    {index < patFlow.length - 1 && (
                                        <ArrowRight className="w-5 h-5 text-muted-foreground absolute -right-5 top-1/2 -translate-y-1/2 hidden md:block" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PAT Benefits */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="p-6 border-amber-500/20 bg-amber-500/5">
                            <Lock className="w-8 h-8 text-amber-500 mb-4" />
                            <h4 className="font-semibold mb-2">Unlock Career Hub</h4>
                            <p className="text-sm text-muted-foreground">Access job postings and apply directly to companies looking for verified talent</p>
                        </Card>
                        <Card className="p-6 border-purple-500/20 bg-purple-500/5">
                            <Users className="w-8 h-8 text-purple-500 mb-4" />
                            <h4 className="font-semibold mb-2">Recruiter Visibility</h4>
                            <p className="text-sm text-muted-foreground">Your verified profile becomes visible to HR professionals searching for talent</p>
                        </Card>
                        <Card className="p-6 border-emerald-500/20 bg-emerald-500/5">
                            <Award className="w-8 h-8 text-emerald-500 mb-4" />
                            <h4 className="font-semibold mb-2">Verified Credentials</h4>
                            <p className="text-sm text-muted-foreground">Earn a verifiable credential that proves your project work and competencies</p>
                        </Card>
                    </div>
                </div>

                {/* Section CTA */}
                <div className="text-center pt-12">
                    <Button size="lg" className="h-12 px-8 text-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold" asChild>
                        <Link href="/enroll">
                            Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>

            </div>
        </section>
    );
}
