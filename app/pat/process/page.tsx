"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { Badge } from "@/components/ui/badge";
import { ListChecks, Code, BookOpen, Presentation, CheckCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PatProcessPage() {
    const steps = [
        {
            num: "01",
            title: "Skill Acquisition & Tutorials",
            desc: "Immerse yourself in our curated tech stacks. Complete modules focusing on core fundamentals, framework mastery, and system design tailored to your chosen stream (e.g. Next.js, FastAPI, Docker).",
            icon: BookOpen,
            color: "text-blue-400"
        },
        {
            num: "02",
            title: "Guided Sandbox Projects",
            desc: "Start with guided projects where the architecture is partially provided. Implement the missing business logic, connect to databases, and write basic tests to understand the workflow.",
            icon: Code,
            color: "text-indigo-400"
        },
        {
            num: "03",
            title: "Independent Capstone Development",
            desc: "Given a PRD (Product Requirements Document) and Figma designs, build a complex application entirely from scratch. You must make architectural decisions, implement security measures, and optimize performance.",
            icon: Presentation,
            color: "text-purple-400"
        },
        {
            num: "04",
            title: "Mentor Code Review & Feedback loop",
            desc: "Submit your code via GitHub. A senior mentor will review it for best practices (Clean Code, SOLID principles). You will receive feedback and must iterate until the code meets production standards.",
            icon: RefreshCcw,
            color: "text-pink-400"
        },
        {
            num: "05",
            title: "The Final Technical Interview",
            desc: "A 45-minute technical deep-dive with an expert. You will defend your architectural choices, explain your database schema, and demonstrate your application live.",
            icon: ListChecks,
            color: "text-rose-400"
        },
        {
            num: "06",
            title: "PAT Certification Awarded",
            desc: "Upon passing, you receive your PAT credential, your portfolio is unlocked, and your profile is pushed directly to the front of the queue for our enterprise hiring partners.",
            icon: CheckCircle,
            color: "text-emerald-400"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <LandingNavbar />

            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center space-y-6 max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 px-4 py-1.5 mb-2">
                            The Journey to Mastery
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">
                            The Certification <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Process</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Earning a PAT is not easy. It’s designed to simulate the rigorous training and evaluation you would experience at a top-tier tech company.
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="relative max-w-4xl mx-auto">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-emerald-500/50 -translate-x-1/2 rounded-full" />

                        <div className="space-y-12">
                            {steps.map((step, index) => (
                                <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Timeline Node */}
                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black border-2 border-slate-700 items-center justify-center z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                        <step.icon className={`w-5 h-5 ${step.color}`} />
                                    </div>

                                    {/* Content Card */}
                                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12 text-left md:text-left' : 'md:pr-12 text-left md:text-right'}`}>
                                        <Card className="p-6 bg-white/5 border-white/10 hover:border-white/20 transition-colors group relative overflow-hidden">
                                            {/* Hover Glow */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <div className={`text-6xl font-black text-white/5 absolute -top-4 ${index % 2 === 0 ? 'right-4' : 'left-4'}`}>
                                                {step.num}
                                            </div>

                                            <div className="relative z-10">
                                                <div className="flex items-center gap-3 mb-3 justify-start md:justify-start">
                                                    <span className={`text-lg font-bold ${step.color}`}>{step.num}.</span>
                                                    <h3 className="text-xl font-bold">{step.title}</h3>
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-relaxed">
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </Card>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info Block */}
                    <div className="mt-32 max-w-3xl mx-auto text-center border-t border-white/10 pt-16">
                        <h3 className="text-2xl font-bold mb-4">Mastery Through Iteration</h3>
                        <p className="text-slate-400 mb-8">
                            The tech industry thrives on continuous improvement, and the PAT is designed to champion that mindset. Every piece of feedback from our expert mentors is a stepping stone. We work alongside you to refine your code, build your confidence, and ensure you emerge as an elite, production-ready software engineer.
                        </p>
                        <Button asChild className="bg-white text-black font-semibold hover:bg-white/90">
                            <Link href="/enroll">
                                Begin Your First Module
                            </Link>
                        </Button>
                    </div>

                </div>
            </main>
        </div>
    );
}
