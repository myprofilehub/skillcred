"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, CalendarClock, MessageSquare, Wallet, History } from "lucide-react";

export default function HowItWorksMentors() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <LandingNavbar />

            <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-8 text-sm font-medium">
                        <Users className="w-4 h-4" />
                        <span>Mentor Portal Features</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-6">
                        Inside the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                            Mentor Dashboard
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mb-10">
                        A streamlined interface for managing evaluation schedules, reviewing code,
                        and tracking your compensation.
                    </p>
                    <div className="flex gap-4">
                        <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Link href="/auth/signup?role=mentor">Open Mentor Account</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
                        <CalendarClock className="w-10 h-10 text-emerald-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Availability Management</h3>
                        <p className="text-muted-foreground text-lg">
                            Set your weekly recurring availability or open specific one-off slots. The system handles timezone conversions and automatic bookings.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
                        <History className="w-10 h-10 text-emerald-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Code Review Environment</h3>
                        <p className="text-muted-foreground text-lg">
                            Access the student's project codebase directly within the portal. View automated linting results and architecture diagrams before the session begins.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
                        <MessageSquare className="w-10 h-10 text-emerald-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Standardized Evaluation Rubrics</h3>
                        <p className="text-muted-foreground text-lg">
                            Submit structured feedback during or after the viva. Evaluate candidates on code quality, technical understanding, and communication using built-in forms.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
                        <Wallet className="w-10 h-10 text-emerald-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Earnings & Payouts</h3>
                        <p className="text-muted-foreground text-lg">
                            Track your completed sessions, pending reviews, and total earnings. Manage payout schedules and download invoices directly from the finance tab.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
