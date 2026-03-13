"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, Search, Filter, CalendarCheck, FolderGit2 } from "lucide-react";

export default function HowItWorksHR() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <LandingNavbar />

            <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-8 text-sm font-medium">
                        <Briefcase className="w-4 h-4" />
                        <span>HR Portal Features</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-6">
                        Inside the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Recruiter Dashboard
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mb-10">
                        A powerful hiring command center to source, evaluate, and interview
                        pre-vetted engineering talent.
                    </p>
                    <div className="flex gap-4">
                        <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                            <Link href="/auth/signup?role=hr">Access HR Portal</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors">
                        <Search className="w-10 h-10 text-cyan-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Verified Talent Database</h3>
                        <p className="text-muted-foreground text-lg">
                            Instead of browsing standard resumes, query our database of verified students. View exactly which industry projects they have successfully completed.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors">
                        <Filter className="w-10 h-10 text-cyan-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Skill-Based Filtering</h3>
                        <p className="text-muted-foreground text-lg">
                            Filter candidates not by keywords, but by demonstrated proficiency. Find developers who scored top marks on specific tech stacks (e.g. React, Node, Docker) in their vivas.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors">
                        <FolderGit2 className="w-10 h-10 text-cyan-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Deep Project Inspection</h3>
                        <p className="text-muted-foreground text-lg">
                            Click into any candidate to view their deployed applications, GitHub code, and crucially, the verbatim feedback left by the senior engineers who reviewed them.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-colors">
                        <CalendarCheck className="w-10 h-10 text-cyan-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Integrated Interview Scheduling</h3>
                        <p className="text-muted-foreground text-lg">
                            Bypass preliminary technical screening. Shortlist candidates and immediately send automated interview invites directly from the ATS dashboard.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
