"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Rocket, Award, ShieldCheck, Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <LandingNavbar />

            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center space-y-6 max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10 px-4 py-1.5 mb-2">
                            Our Mission
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tight">
                            Bridging the Gap Between <br />
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Education and Industry
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            We are building the world's most trusted accreditations platform for modern software engineering. We verify skills, not just degrees.
                        </p>
                    </div>

                    {/* Story Section */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">The Problem We Are Solving</h2>
                            <div className="space-y-4 text-slate-400">
                                <p>
                                    Every year, millions of students graduate with computer science degrees, yet companies struggle to find job-ready talent. Traditional education focuses on theory, while industry demands practical, production-ready skills.
                                </p>
                                <p>
                                    At the same time, recruiters spend countless hours filtering through padded resumes and conducting generic technical interviews that fail to evaluate true engineering potential.
                                </p>
                                <p className="font-medium text-white">
                                    SkillCred was born to fix this broken system.
                                </p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-900/20 to-black border border-white/10 rounded-2xl p-8 relative overflow-hidden h-full flex flex-col justify-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                            <div className="relative z-10 space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                                        <Target className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">For Students</h3>
                                        <p className="text-muted-foreground text-sm">A clear, project-based path to mastery and a verified portfolio that proves what they can build.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                                        <Building2 className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">For Companies</h3>
                                        <p className="text-muted-foreground text-sm">Instant access to pre-vetted, PAT-certified developers, reducing time-to-hire by 50%.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Core Values */}
                    <div className="mb-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">The principles that guide our platform and community.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
                                <Rocket className="w-8 h-8 text-indigo-400" />
                                <h3 className="text-xl font-bold">Practical Over Theoretical</h3>
                                <p className="text-sm text-slate-400">We believe you learn to code by coding. Our curriculum is 100% project-based, simulating real-world engineering environments.</p>
                            </div>
                            <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
                                <ShieldCheck className="w-8 h-8 text-emerald-400" />
                                <h3 className="text-xl font-bold">Trust Through Verification</h3>
                                <p className="text-sm text-slate-400">Every project submission is code-reviewed by a senior mentor. Our PAT certification is an objective measure of true capability.</p>
                            </div>
                            <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
                                <Users className="w-8 h-8 text-blue-400" />
                                <h3 className="text-xl font-bold">Community Driven</h3>
                                <p className="text-sm text-slate-400">We connect aspiring developers with industry veterans, creating a feedback loop that accelerates growth for everyone.</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-2xl p-12 text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Join the SkillCred Ecosystem</h2>
                        <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
                            Whether you're looking to launch your career, find top talent, or mentor the next generation.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/enroll" className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                                Start Learning
                            </Link>
                            <Link href="/contact" className="bg-transparent border border-white/20 px-8 py-3 rounded-lg font-semibold hover:bg-white/5 transition-colors">
                                Partner With Us
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black border-t border-white/10 py-12 px-6">
                <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Logo width={100} height={30} />
                        <span>© 2026 SkillCred Inc.</span>
                    </div>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-indigo-400 transition-colors"><Twitter className="w-4 h-4" /></Link>
                        <Link href="#" className="hover:text-indigo-400 transition-colors"><Github className="w-4 h-4" /></Link>
                        <Link href="#" className="hover:text-indigo-400 transition-colors"><Linkedin className="w-4 h-4" /></Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function Building2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01" />
            <path d="M16 6h.01" />
            <path d="M12 6h.01" />
            <path d="M12 10h.01" />
            <path d="M12 14h.01" />
            <path d="M16 10h.01" />
            <path d="M16 14h.01" />
            <path d="M8 10h.01" />
            <path d="M8 14h.01" />
        </svg>
    )
}
