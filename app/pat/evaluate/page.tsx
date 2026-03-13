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
            title: "Architecture & System Design",
            icon: Layers,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
            borderColor: "border-indigo-500/20",
            criteria: [
                "Is the codebase predictably structured (e.g. MVC, Clean Architecture)?",
                "Are components modular, reusable, and appropriately decoupled?",
                "Is state managed efficiently without prop drilling or unnecessary re-renders?",
                "Is the API designed following RESTful or GraphQL best practices?"
            ]
        },
        {
            title: "Database & Data Modeling",
            icon: Database,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            borderColor: "border-emerald-500/20",
            criteria: [
                "Are schemas normalized appropriately to prevent data anomalies?",
                "Are indexes used effectively on querying fields?",
                "Are complex relations correctly implemented (One-to-Many, M-N)?",
                "Is there proper handling of transactions and concurrent operations?"
            ]
        },
        {
            title: "Security & Authentication",
            icon: Lock,
            color: "text-rose-400",
            bg: "bg-rose-500/10",
            borderColor: "border-rose-500/20",
            criteria: [
                "Are passwords hashed using secure algorithms (e.g. bcrypt, Argon2)?",
                "Are session tokens/JWTs handled securely (HTTP-only cookies)?",
                "Is authorization enforced at the API route level (RBAC)?",
                "Is user input sanitized to prevent SQL injection and XSS?"
            ]
        },
        {
            title: "Testing & Quality Assurance",
            icon: TestTube,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            borderColor: "border-amber-500/20",
            criteria: [
                "Does the project include a comprehensive suite of Unit and Integration tests?",
                "Are critical business logic paths covered securely?",
                "Are edge cases and error states tested and handled gracefully?",
                "Is a CI/CD pipeline integrated for automated testing?"
            ]
        },
        {
            title: "Performance & Optimization",
            icon: ServerCog,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            borderColor: "border-cyan-500/20",
            criteria: [
                "Are heavy database queries optimized (e.g. N+1 problem avoided)?",
                "Is caching implemented (Redis/CDN) for frequently accessed data?",
                "Are frontend bundles optimized and lazy-loaded where appropriate?",
                "Is backend pagination/cursor streaming used for large datasets?"
            ]
        },
        {
            title: "Problem Solving & Logic",
            icon: Lightbulb,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            borderColor: "border-purple-500/20",
            criteria: [
                "Did the candidate choose the right algorithmic approach for the business logic?",
                "Is the code readable, maintainable, and aligned with SOLID principles?",
                "Does the code anticipate future scaling requirements?",
                "Can the candidate articulately defend their technical decisions?"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
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
                            The PAT doesn't score you on how quickly you can invert a binary tree. We score you on how well you architect, build, and secure production-grade software.
                        </p>
                    </div>

                    {/* Rubric Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                        {categories.map((cat, idx) => (
                            <Card key={idx} className={`p-8 bg-zinc-950/50 border-${cat.borderColor} hover:bg-zinc-900 transition-colors relative overflow-hidden group`}>
                                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${cat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shrink-0 ${cat.bg}`}>
                                        <cat.icon className={`w-6 h-6 ${cat.color}`} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{cat.title}</h3>

                                    <ul className="space-y-3 text-sm text-slate-400">
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
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12 mb-24">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h3 className="text-3xl font-bold">The Scoring System</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Each category is graded on a scale from 0 to 5. Achieving a passing score requires a high minimum baseline across all categories, ensuring no weak links in foundational knowledge.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4">
                                        <div className="w-16 font-mono text-xl font-bold text-slate-500">0 - 2</div>
                                        <div className="text-slate-400 text-sm">Needs Improvement (Does not meet production standards)</div>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="w-16 font-mono text-xl font-bold text-indigo-400">3 - 4</div>
                                        <div className="text-indigo-200 text-sm">Proficient (Meets industry standards for junior/mid roles)</div>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="w-16 font-mono text-xl font-bold text-emerald-400">5</div>
                                        <div className="text-emerald-200 text-sm">Exceptional (Mastery of concepts, highly optimized)</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-black border border-white/10 rounded-xl p-8 text-center space-y-4">
                                <h4 className="text-lg font-medium text-slate-400">Minimum Passing Score</h4>
                                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-400">
                                    85%
                                </div>
                                <p className="text-sm text-slate-500 mt-4 px-8">
                                    Only the top tier of candidates achieve the SkillCred PAT Certification.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-6 px-8 text-lg rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
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
