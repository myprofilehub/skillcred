"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building2, Activity, Shield, Database, LineChart } from "lucide-react";

export default function HowItWorksInvestors() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <LandingNavbar />

            <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-8 text-sm font-medium">
                        <Building2 className="w-4 h-4" />
                        <span>Investor Portal Features</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-6">
                        Inside the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">
                            Investor Dashboard
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mb-10">
                        A secured, direct access point to real-time platform metrics, financial
                        growth, and business intelligence.
                    </p>
                    <div className="flex gap-4">
                        <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700 text-white">
                            <Link href="/auth/investor/login">Investor Login</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-colors">
                        <Activity className="w-10 h-10 text-violet-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Live Platform Metrics</h3>
                        <p className="text-muted-foreground text-lg">
                            Observe real-time volume of active students across all 8 streams, registered mentors conducting vivas, and hiring actions by HR partners.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-colors">
                        <LineChart className="w-10 h-10 text-violet-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Financial Dashboard</h3>
                        <p className="text-muted-foreground text-lg">
                            View anonymized Monthly Recurring Revenue (MRR) across subscription tiers, B2B enterprise sales pipelines, and active mentor payout ledgers.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-colors">
                        <Database className="w-10 h-10 text-violet-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Engagement & Retention Data</h3>
                        <p className="text-muted-foreground text-lg">
                            Analyze cohort survival curves, project completion rates, and average time-to-hire statistics validating the core marketplace value proposition.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-colors">
                        <Shield className="w-10 h-10 text-violet-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Secure Data Room</h3>
                        <p className="text-muted-foreground text-lg">
                            Access gated due-diligence materials including up-to-date pitch decks, cap tables, legal documentation, and detailed quarterly board reports.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
