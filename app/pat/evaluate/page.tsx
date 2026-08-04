"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { Badge } from "@/components/ui/badge";
import { Database, Lock, ServerCog, Layers, TestTube, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PatEvaluatePage() {
    const categories = [
        {
            title: "Project Completion & Quality",
            marks: 40,
            icon: Layers,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
            borderColor: "border-indigo-500/20",
            criteria: [
                "Evaluated across the best 3 projects built during the program.",
                "Meets all functional and non-functional requirements.",
                "Code is clean, modular, and adheres to production standards.",
                "Includes proper error handling and edge-case management."
            ]
        },
        {
            title: "Milestone Reviews",
            marks: 20,
            icon: TestTube,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            borderColor: "border-emerald-500/20",
            criteria: [
                "Consistent performance across design, mid-build, and final reviews.",
                "Ability to incorporate mentor feedback effectively.",
                "Demonstrates steady progress and adherence to timelines.",
                "Clear documentation of architectural decisions."
            ]
        },
        {
            title: "Business Value",
            marks: 15,
            icon: Lightbulb,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            borderColor: "border-amber-500/20",
            criteria: [
                "Real problem framing: Does the project solve an actual business need?",
                "User-centric design and workflow considerations.",
                "Clear articulation of the project's impact and utility.",
                "Consideration of scalability and future business requirements."
            ]
        },
        {
            title: "Tool Proficiency",
            marks: 15,
            icon: ServerCog,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            borderColor: "border-cyan-500/20",
            criteria: [
                "Live modification of code under direct questioning.",
                "Fluency with modern tooling (Cursor, RAG stacks, LLM integrations).",
                "Efficient use of IDEs, debugging tools, and terminal.",
                "Ability to navigate and understand complex codebases quickly."
            ]
        },
        {
            title: "Final Defense",
            marks: 10,
            icon: Lock,
            color: "text-rose-400",
            bg: "bg-rose-500/10",
            borderColor: "border-rose-500/20",
            criteria: [
                "Clear explanation of the overall technical approach.",
                "Articulate breakdown of technical challenges faced.",
                "Honest reflection on lessons learned and alternative approaches.",
                "Confidence and clarity in verbal communication during the oral defense."
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30">
            <LandingNavbar />

            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center space-y-6 max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10 px-4 py-1.5 mb-2">
                            The Evaluation Rubric
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">
                            How Skills are <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Measured</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            The PAT is an auditable credential. Every project is orally defended in front of a mentor, mirroring real recruitment funnels.
                        </p>
                    </div>

                    {/* Rubric Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                        {categories.map((cat, idx) => (
                            <Card key={idx} className={`p-8 bg-card dark:bg-zinc-950/50 border-${cat.borderColor} hover:bg-muted dark:hover:bg-zinc-900 transition-colors relative overflow-hidden group`}>
                                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${cat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${cat.bg}`}>
                                            <cat.icon className={`w-6 h-6 ${cat.color}`} />
                                        </div>
                                        <Badge variant="outline" className={`${cat.color} border-${cat.color.replace('text-', '')}/30 ${cat.bg}`}>
                                            {cat.marks} Marks
                                        </Badge>
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{cat.title}</h3>

                                    <ul className="space-y-3 text-sm text-muted-foreground dark:text-muted-foreground dark:text-slate-400">
                                        {cat.criteria.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Final Grade Section */}
                    <div className="bg-muted/30 dark:bg-white/5 border border-border dark:border-border dark:border-border dark:border-white/10 rounded-2xl p-8 lg:p-12 mb-24">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h3 className="text-3xl font-bold">The Scoring System</h3>
                                <p className="text-muted-foreground dark:text-muted-foreground dark:text-slate-400 leading-relaxed">
                                    The PAT is graded out of 100 total marks. Achieving a passing score requires a solid performance across all mentor-verified defense rounds.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4">
                                        <div className="w-16 font-mono text-xl font-bold text-emerald-400">60+</div>
                                        <div className="text-emerald-200 text-sm">Pass (Mentor-verified and auditable by recruiters)</div>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="w-16 font-mono text-xl font-bold text-slate-500">&lt; 60</div>
                                        <div className="text-muted-foreground dark:text-muted-foreground dark:text-slate-400 text-sm">Fail (Does not meet the rigorous production standards)</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-card dark:bg-background dark:bg-background dark:bg-black border border-border dark:border-border dark:border-border dark:border-white/10 rounded-xl p-8 text-center space-y-4">
                                <h4 className="text-lg font-medium text-muted-foreground dark:text-muted-foreground dark:text-slate-400">Minimum Passing Score</h4>
                                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-400">
                                    60 / 100
                                </div>
                                <p className="text-sm text-slate-500 mt-4 px-8">
                                    Total marks across all 5 evaluation categories during the live oral defense.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-foreground dark:text-foreground dark:text-white font-semibold py-6 px-8 text-lg rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
                            <Link href="/enroll">
                                Start Building Your Portfolio
                            </Link>
                        </Button>
                    </div>

                </div>
            </main>
        </div>
    );
}
