'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download, ShieldCheck, Sparkles } from 'lucide-react';

export const STREAM_PRICING_DATA: Record<string, {
    tier: 'A' | 'B' | 'C';
    duration: string;
    pilotBase: number;
    pilotAddon: number;
    pilotTotal: number;
}> = {
    "standard": {
        tier: 'A',
        duration: "7–8 Weeks",
        pilotBase: 7999,
        pilotAddon: 2000,
        pilotTotal: 9999,
    },
    "fast-track": {
        tier: 'B',
        duration: "5–6 Weeks",
        pilotBase: 5499,
        pilotAddon: 1500,
        pilotTotal: 6999,
    },
    "capstone": {
        tier: 'C',
        duration: "4–5 Weeks",
        pilotBase: 3499,
        pilotAddon: 1500,
        pilotTotal: 4999,
    },
    "ai-ml": {
        tier: 'A',
        duration: "7–8 Weeks",
        pilotBase: 7999,
        pilotAddon: 2000,
        pilotTotal: 9999,
    },
    "full-stack-development": {
        tier: 'A',
        duration: "7–8 Weeks",
        pilotBase: 7999,
        pilotAddon: 2000,
        pilotTotal: 9999,
    },
    "mobile-development": {
        tier: 'A',
        duration: "7–8 Weeks",
        pilotBase: 7999,
        pilotAddon: 2000,
        pilotTotal: 9999,
    },
    "devops-cloud": {
        tier: 'B',
        duration: "5–6 Weeks",
        pilotBase: 5499,
        pilotAddon: 1500,
        pilotTotal: 6999,
    },
    "data-engineering": {
        tier: 'B',
        duration: "5–6 Weeks",
        pilotBase: 5499,
        pilotAddon: 1500,
        pilotTotal: 6999,
    },
    "data-science": {
        tier: 'B',
        duration: "5–6 Weeks",
        pilotBase: 5499,
        pilotAddon: 1500,
        pilotTotal: 6999,
    },
    "cybersecurity": {
        tier: 'C',
        duration: "4–5 Weeks",
        pilotBase: 3499,
        pilotAddon: 1500,
        pilotTotal: 4999,
    },
    "iot-embedded": {
        tier: 'C',
        duration: "4–5 Weeks (may extend to 5–6 for hardware logistics)",
        pilotBase: 3499,
        pilotAddon: 1500,
        pilotTotal: 4999,
    }
};

const COHORT_START_DATE = "15 September 2026";
const PILOT_PRICING_END_DATE = "10 September 2026";

interface ComponentProps {
    slug: string;
    accentColor: string;
    bootcampName: string;
    syllabusUrl?: string;
}

const colorStyles: Record<string, {
    border: string;
    text: string;
    bg: string;
    btnBg: string;
    btnHover: string;
    glow: string;
    badgeBorder: string;
}> = {
    purple: {
        border: "border-purple-200",
        text: "text-purple-700",
        bg: "bg-purple-50",
        btnBg: "bg-purple-600 hover:bg-purple-700",
        btnHover: "hover:shadow-purple-500/20",
        glow: "shadow-purple-500/10",
        badgeBorder: "border-purple-200"
    },
    cyan: {
        border: "border-cyan-200",
        text: "text-cyan-700",
        bg: "bg-cyan-50",
        btnBg: "bg-cyan-600 hover:bg-cyan-700",
        btnHover: "hover:shadow-cyan-500/20",
        glow: "shadow-cyan-500/10",
        badgeBorder: "border-cyan-200"
    },
    orange: {
        border: "border-orange-200",
        text: "text-orange-700",
        bg: "bg-orange-50",
        btnBg: "bg-orange-600 hover:bg-orange-700",
        btnHover: "hover:shadow-orange-500/20",
        glow: "shadow-orange-500/10",
        badgeBorder: "border-orange-200"
    },
    green: {
        border: "border-green-200",
        text: "text-green-700",
        bg: "bg-green-50",
        btnBg: "bg-green-600 hover:bg-green-700",
        btnHover: "hover:shadow-green-500/20",
        glow: "shadow-green-500/10",
        badgeBorder: "border-green-200"
    },
    blue: {
        border: "border-blue-200",
        text: "text-blue-700",
        bg: "bg-blue-50",
        btnBg: "bg-blue-600 hover:bg-blue-700",
        btnHover: "hover:shadow-blue-500/20",
        glow: "shadow-blue-500/10",
        badgeBorder: "border-blue-200"
    },
    red: {
        border: "border-red-200",
        text: "text-red-700",
        bg: "bg-red-50",
        btnBg: "bg-red-600 hover:bg-red-700",
        btnHover: "hover:shadow-red-500/20",
        glow: "shadow-red-500/10",
        badgeBorder: "border-red-200"
    },
    yellow: {
        border: "border-yellow-200",
        text: "text-yellow-700",
        bg: "bg-yellow-50",
        btnBg: "bg-yellow-600 hover:bg-yellow-700",
        btnHover: "hover:shadow-yellow-500/20",
        glow: "shadow-yellow-500/10",
        badgeBorder: "border-yellow-200"
    },
    pink: {
        border: "border-pink-200",
        text: "text-pink-700",
        bg: "bg-pink-50",
        btnBg: "bg-pink-600 hover:bg-pink-700",
        btnHover: "hover:shadow-pink-500/20",
        glow: "shadow-pink-500/10",
        badgeBorder: "border-pink-200"
    }
};

export function StreamHeroPricing({ slug, accentColor, bootcampName, syllabusUrl }: ComponentProps) {
    const data = STREAM_PRICING_DATA[slug];
    if (!data) return null;

    const styles = colorStyles[accentColor] || colorStyles.purple;

    return (
        <div className="w-full max-w-3xl mx-auto mt-8 p-8 rounded-2xl bg-white border border-slate-200 shadow-xl relative overflow-hidden text-center">
            {/* Ambient Background Glow */}
            <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full blur-3xl opacity-40 ${styles.bg}`} />
            
            <div className="relative z-10 space-y-4">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                    {bootcampName} — <span className={styles.text}>{data.duration}</span>
                </h3>
                
                <p className="text-sm font-medium text-slate-600 flex justify-center items-center gap-2 flex-wrap">
                    <span>Live Cohort</span>
                    <span className="text-slate-300">•</span>
                    <span>Verified Projects</span>
                    <span className="text-slate-300">•</span>
                    <span>Recruiter-Visible Portfolio</span>
                </p>

                <div className="py-2 flex items-center justify-center gap-4">
                    
                    <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-1">
                        ₹{data.pilotBase.toLocaleString('en-IN')}
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider ml-3 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                            Pilot Cohort Pricing
                        </span>
                    </span>
                </div>

                <div className={`py-2 px-5 rounded-full ${styles.bg} border ${styles.border} text-xs font-semibold tracking-wider ${styles.text} w-fit mx-auto shadow-sm`}>
                    ⚡ Cohort starts {COHORT_START_DATE}
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className={`text-base px-8 h-12 text-white font-bold transition-all shadow-md ${styles.btnBg} ${styles.btnHover}`} asChild>
                        <Link href="/enroll">
                            Apply Now — Pay ₹500 Deposit to Hold Seat <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                    {syllabusUrl && (
                        <Button size="lg" variant="outline" className="text-base px-8 h-12 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold shadow-sm" asChild>
                            <a href={syllabusUrl} download>
                                Download Brochure <Download className="ml-2 w-5 h-5" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export function StreamUpsellPricing({ slug, accentColor, bootcampName }: ComponentProps) {
    const data = STREAM_PRICING_DATA[slug];
    if (!data) return null;

    return (
        <div className="w-full max-w-4xl mx-auto my-16 p-1 rounded-2xl bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 shadow-md">
            <div className="bg-white border border-yellow-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 text-left max-w-2xl">
                    <Badge variant="outline" className="border-amber-300 text-amber-800 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
                        <Sparkles className="w-3.5 h-3.5" /> PAT-Verified Upgrade Available
                    </Badge>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                        Add PAT-Verified Credential — <span className="text-amber-600">+₹{data.pilotAddon.toLocaleString('en-IN')}</span>
                    </h3>
                    
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                        Includes a live oral defense of your projects, a mentor recommendation letter, and a verified portfolio recruiters can audit. This is what turns <span className="italic text-slate-500">"I did a course"</span> into <span className="font-bold text-slate-900">"I have a credential recruiters trust."</span>
                    </p>
                </div>

                <div className="shrink-0 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 w-full md:w-auto text-center min-w-[240px] shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Bundled Total Price</p>
                    <p className="text-3xl font-extrabold text-slate-900 tracking-tight mb-5">₹{data.pilotTotal.toLocaleString('en-IN')}</p>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-2.5 rounded-lg shadow-md transition-all" asChild>
                        <Link href="/enroll">
                            Add PAT-Verified to my Cohort
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function StreamBottomCTA({ slug, accentColor, bootcampName, syllabusUrl }: ComponentProps) {
    const data = STREAM_PRICING_DATA[slug];
    if (!data) return null;

    const styles = colorStyles[accentColor] || colorStyles.purple;

    return (
        <section className="py-16 md:py-24 container mx-auto px-4">
            <div className="bg-slate-950 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden w-full text-center shadow-2xl border border-slate-800/80">
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 pointer-events-none" />
                
                <div className="mx-auto max-w-4xl relative z-10 space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-heading">
                    Lock in Your Pilot Pricing
                </h3>
                
                <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Secure your spot today with a fully refundable deposit. Fully credited toward your final enrollment balance.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <Button size="lg" className={`text-base px-8 h-12 text-white font-bold transition-all shadow-md bg-gradient-to-r ${styles.btnBg} hover:opacity-90`} asChild>
                        <Link href="/price-lock">
                            Apply Now — Pay ₹500 Deposit to Hold Seat <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                    {syllabusUrl && (
                        <Button size="lg" variant="outline" className="text-base px-8 h-12 border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-semibold" asChild>
                            <a href={syllabusUrl} download>
                                Download Brochure
                            </a>
                        </Button>
                    )}
                </div>

                <div className="pt-4 text-xs font-medium text-slate-400 italic">
                    Pilot cohort pricing available.
                </div>
            </div>
            </div>
        </section>
    );
}