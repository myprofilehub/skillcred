"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Landmark, Users2, BarChart3, GraduationCap, Network } from "lucide-react";

export default function HowItWorksColleges() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <LandingNavbar />

            <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-8 text-sm font-medium">
                        <Landmark className="w-4 h-4" />
                        <span>College Portal Features</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-6">
                        Inside the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
                            Institutional Dashboard
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mb-10">
                        A comprehensive admin panel to deploy actionable curriculum, monitor
                        cohort performance, and track student placements in real-time.
                    </p>
                    <div className="flex gap-4">
                        <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                            <Link href="mailto:partnerships@skillcred.com">Request Access</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-colors">
                        <Users2 className="w-10 h-10 text-orange-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Cohort & Roster Management</h3>
                        <p className="text-muted-foreground text-lg">
                            Seamlessly onboard hundreds of students. Manage batches, assign specific tech streams, and provide institutional login credentials centrally.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-colors">
                        <GraduationCap className="w-10 h-10 text-orange-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Progress Tracking</h3>
                        <p className="text-muted-foreground text-lg">
                            Monitor individual student performance. See who has submitted projects, who has passed their vivas, and who is falling behind on milestones.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-colors">
                        <Network className="w-10 h-10 text-orange-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Curriculum Integration Tools</h3>
                        <p className="text-muted-foreground text-lg">
                            Map the SkillCred project catalog to your academic semester timelines. Export verifiable progress reports for internal grading and accreditation use.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-colors">
                        <BarChart3 className="w-10 h-10 text-orange-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Placement Analytics</h3>
                        <p className="text-muted-foreground text-lg">
                            Track successful hires originating from the platform. Visualize which streams yield the best job outcomes, improving your campus marketing metrics.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
