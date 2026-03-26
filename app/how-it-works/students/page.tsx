"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GraduationCap, Code2, LayoutDashboard, Video, FileCheck2 } from "lucide-react";

export default function HowItWorksStudents() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <LandingNavbar />

            <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-8 text-sm font-medium">
                        <GraduationCap className="w-4 h-4" />
                        <span>Student Portal Features</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-6">
                        Inside the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                            Student Dashboard
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mb-10">
                        A comprehensive Learning Management System designed for building,
                        verifying, and showcasing your skills to employers.
                    </p>
                    <div className="flex gap-4">
                        <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-indigo-500/25">
                            <Link href="/auth/signup?role=student">Create Student Account</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors">
                        <LayoutDashboard className="w-10 h-10 text-indigo-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">LMS & Progress Tracking</h3>
                        <p className="text-muted-foreground text-lg">
                            Navigate through curated curricula seamlessly. The dashboard provides a comprehensive view of your active modules, project deadlines, and completion percentages.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors">
                        <Code2 className="w-10 h-10 text-indigo-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Project Submissions</h3>
                        <p className="text-muted-foreground text-lg">
                            Upload your GitHub repositories and deploy links directly into the portal. Our automated checks ensure base requirements are met before mentor reviews.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors">
                        <Video className="w-10 h-10 text-indigo-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Viva Scheduling System</h3>
                        <p className="text-muted-foreground text-lg">
                            Book live evaluation sessions using the in-app calendar. The system matches your availability with certified industry mentors for a 1-on-1 code defense.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors">
                        <FileCheck2 className="w-10 h-10 text-indigo-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Verified Portfolio Generation</h3>
                        <p className="text-muted-foreground text-lg">
                            Every successfully defended project is cryptographically signed and added to your public SkillCred portfolio, which is directly accessible by our HR partners.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
