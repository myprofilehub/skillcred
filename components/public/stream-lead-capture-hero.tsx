'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { StreamLeadForm } from "@/components/public/stream-lead-form";
import { STREAM_PRICING_DATA } from "@/components/public/stream-pricing-components";

interface StreamLeadCaptureHeroProps {
    slug: string;
    accentColor: string;
    bootcampName: string;
    trackName: string;
    syllabusUrl?: string;
}

const colorStyles: Record<string, {
    border: string;
    text: string;
    bg: string;
    btnBg: string;
    btnHover: string;
    glow: string;
}> = {
    purple: {
        border: "border-purple-200", text: "text-purple-700", bg: "bg-purple-50",
        btnBg: "bg-purple-600 hover:bg-purple-700", btnHover: "hover:shadow-purple-500/20", glow: "shadow-purple-500/10"
    },
    cyan: {
        border: "border-cyan-200", text: "text-cyan-700", bg: "bg-cyan-50",
        btnBg: "bg-cyan-600 hover:bg-cyan-700", btnHover: "hover:shadow-cyan-500/20", glow: "shadow-cyan-500/10"
    },
    orange: {
        border: "border-orange-200", text: "text-orange-700", bg: "bg-orange-50",
        btnBg: "bg-orange-600 hover:bg-orange-700", btnHover: "hover:shadow-orange-500/20", glow: "shadow-orange-500/10"
    },
    green: {
        border: "border-green-200", text: "text-green-700", bg: "bg-green-50",
        btnBg: "bg-green-600 hover:bg-green-700", btnHover: "hover:shadow-green-500/20", glow: "shadow-green-500/10"
    },
    blue: {
        border: "border-blue-200", text: "text-blue-700", bg: "bg-blue-50",
        btnBg: "bg-blue-600 hover:bg-blue-700", btnHover: "hover:shadow-blue-500/20", glow: "shadow-blue-500/10"
    },
    red: {
        border: "border-red-200", text: "text-red-700", bg: "bg-red-50",
        btnBg: "bg-red-600 hover:bg-red-700", btnHover: "hover:shadow-red-500/20", glow: "shadow-red-500/10"
    },
    yellow: {
        border: "border-yellow-200", text: "text-yellow-700", bg: "bg-yellow-50",
        btnBg: "bg-yellow-600 hover:bg-yellow-700", btnHover: "hover:shadow-yellow-500/20", glow: "shadow-yellow-500/10"
    },
    pink: {
        border: "border-pink-200", text: "text-pink-700", bg: "bg-pink-50",
        btnBg: "bg-pink-600 hover:bg-pink-700", btnHover: "hover:shadow-pink-500/20", glow: "shadow-pink-500/10"
    }
};

export function StreamLeadCaptureHero({ slug, accentColor, bootcampName, trackName, syllabusUrl }: StreamLeadCaptureHeroProps) {
    const data = STREAM_PRICING_DATA[slug];
    if (!data) return null;

    const styles = colorStyles[accentColor] || colorStyles.purple;

    return (
        <div className="w-full mt-12 bg-white border-y border-slate-200 relative overflow-hidden text-left flex flex-col lg:flex-row">
            {/* Ambient Background Glow for Left Panel */}
            <div className={`absolute -left-32 -top-32 w-96 h-96 rounded-full blur-3xl opacity-30 ${styles.bg} pointer-events-none`} />
            
            {/* Left Side: Pricing & Value Prop */}
            <div className="relative z-10 w-full lg:w-[55%] p-8 md:p-16 lg:p-20 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-center items-end">
                <div className="w-full max-w-xl">
                    <Badge variant="outline" className={`mb-4 w-fit uppercase tracking-wider ${styles.text} ${styles.bg} ${styles.border}`}>
                    {data.duration}
                </Badge>
                
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6 leading-snug">
                    {bootcampName}
                </h2>
                


                <div className="mb-8 w-full">
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className={`w-5 h-5 ${styles.text}`} />
                        <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Cohort + PAT Bundle</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">
                        ₹{data.pilotTotal.toLocaleString('en-IN')}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6">Program Pricing (Pilot Cohort)</p>
                    <ul className="space-y-3.5 text-sm text-slate-600 font-medium">
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>Includes Live Mentor Support</span></li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>Every project mentor-verified before certification</span></li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>100% Online Format</span></li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>Portfolio review and interview preparation.</span></li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" className={`text-base px-6 h-12 text-white font-bold transition-all shadow-md ${styles.btnBg} ${styles.btnHover} flex-1`} asChild>
                        <Link href="/enroll">
                            Pay ₹500 Deposit <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                    {syllabusUrl && (
                        <Button size="lg" variant="outline" className="text-base px-6 h-12 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold shadow-sm flex-1" asChild>
                            <a href={syllabusUrl} download>
                                Brochure <Download className="ml-2 w-4 h-4" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>
            </div>

            {/* Right Side: Request Callback Form */}
            <div className="w-full lg:w-[45%] bg-slate-50/70 p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start border-t lg:border-t-0 lg:border-l border-slate-100">
                <div className="w-full max-w-xl">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Request a Callback</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Speak directly with our career advisors. Select your preferred time and we'll call you within 24 hours to discuss the curriculum, mentor review process, and enrollment.
                        </p>
                    </div>
                    
                    <StreamLeadForm trackName={trackName} accentColor={accentColor} variant="borderless" />
                </div>
            </div>
        </div>
    );
}
