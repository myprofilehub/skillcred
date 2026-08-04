"use client";

import Link from "next/link";
import { ArrowRight, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StreamLeadForm } from "./stream-lead-form";
import { STREAM_PRICING_DATA } from "@/components/public/stream-pricing-components";

interface StreamHeroActionCardProps {
    slug: string;
    accentColor: "orange" | "purple" | "green" | "blue";
    trackName: string;
    syllabusUrl?: string;
}

const colorStyles = {
    orange: {
        text: "text-orange-400",
        btnBg: "bg-orange-600",
        btnHover: "hover:bg-orange-700",
        borderLeft: "border-l-4 border-l-orange-500",
    },
    purple: {
        text: "text-purple-400",
        btnBg: "bg-purple-600",
        btnHover: "hover:bg-purple-700",
        borderLeft: "border-l-4 border-l-purple-500",
    },
    green: {
        text: "text-emerald-400",
        btnBg: "bg-emerald-600",
        btnHover: "hover:bg-emerald-700",
        borderLeft: "border-l-4 border-l-emerald-500",
    },
    blue: {
        text: "text-blue-400",
        btnBg: "bg-blue-600",
        btnHover: "hover:bg-blue-700",
        borderLeft: "border-l-4 border-l-blue-500",
    },
};

export function StreamHeroActionCard({ slug, accentColor, trackName, syllabusUrl }: StreamHeroActionCardProps) {
    const data = STREAM_PRICING_DATA[slug];
    if (!data) return null;

    let title = "Become a Professional";
    switch (slug) {
        case "full-stack-development": title = "Become a Fullstack Developer"; break;
        case "cybersecurity": title = "Become a Cybersecurity Expert"; break;
        case "data-science": title = "Become a Data Scientist"; break;
        case "mobile-development": title = "Become a Mobile Developer"; break;
        case "iot-embedded": title = "Become an IoT Engineer"; break;
        case "devops-cloud": title = "Become a DevOps Engineer"; break;
        case "ai-ml": title = "Become an AI/ML Engineer"; break;
        case "data-engineering": title = "Become a Data Engineer"; break;
    }

    const styles = colorStyles[accentColor] || colorStyles.orange;

    return (
        <div className="w-full grid md:grid-cols-[1.5fr_1fr] gap-6 mt-12 text-left">
            {/* Left Block: Pricing Card */}
            <div className={`bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 ${styles.borderLeft} rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl dark:shadow-2xl relative overflow-hidden`}>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        {title}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Standalone Pricing */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 flex flex-col">
                            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-2">Standalone Cohort</p>
                            <div className="flex items-baseline gap-2 flex-wrap mb-4">
                                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                    ₹{data.pilotBase.toLocaleString('en-IN')}
                                </span>
                                <span className="text-sm line-through text-slate-400 decoration-slate-300 dark:decoration-slate-600 decoration-2">
                                    ₹{data.regularBase.toLocaleString('en-IN')}
                                </span>
                            </div>
                            <div className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-700/50">
                                <ul className="space-y-2 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-1.5"><CheckCircle2 className={`w-3.5 h-3.5 ${styles.text} shrink-0 mt-0.5`} /> Live Mentor Support</li>
                                    <li className="flex items-start gap-1.5"><CheckCircle2 className={`w-3.5 h-3.5 ${styles.text} shrink-0 mt-0.5`} /> 4 Verified Projects</li>
                                    <li className="flex items-start gap-1.5"><CheckCircle2 className={`w-3.5 h-3.5 ${styles.text} shrink-0 mt-0.5`} /> Recruiter Portfolio</li>
                                </ul>
                            </div>
                        </div>

                        {/* Bundle Pricing */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider z-10">Recommended</div>
                            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-2">Cohort + PAT</p>
                            <div className="flex items-baseline gap-2 flex-wrap mb-4 relative z-10">
                                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                    ₹{data.pilotTotal.toLocaleString('en-IN')}
                                </span>
                                <span className="text-sm line-through text-slate-400 decoration-slate-300 dark:decoration-slate-600 decoration-2">
                                    ₹{data.regularTotal.toLocaleString('en-IN')}
                                </span>
                            </div>
                            <div className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-700/50 relative z-10">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">PAT Advantages:</p>
                                <ul className="space-y-2 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Mentor Verified Project Defense</li>
                                    <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Custom designed Portfolio</li>
                                    <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Mentor Signed Recommendation Letter</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p className={`text-sm font-medium mb-6 ${styles.text} flex items-center gap-1.5`}>
                        ⚡ Pilot pricing: Only 20 seats available
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10 mt-2">
                    <Button size="lg" className={`w-full h-12 text-white font-bold transition-all shadow-md ${styles.btnBg} ${styles.btnHover}`} asChild>
                        <Link href="/enroll">
                            Pay ₹500 Deposit <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                    {syllabusUrl && (
                        <Button size="lg" variant="outline" className="w-full h-12 border-slate-200 bg-white hover:bg-slate-50 text-slate-900 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white font-semibold transition-all" asChild>
                            <a href={syllabusUrl} download>
                                Download Brochure <Download className="ml-2 w-4 h-4" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>

            {/* Right Block: Lead Capture Form */}
            <div className="bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 flex flex-col shadow-xl dark:shadow-2xl">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Speak to an Advisor</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    Not sure if this is the right fit? Drop your details and we'll call you back within 24 hours to discuss your goals.
                </p>
                <StreamLeadForm trackName={trackName} accentColor={accentColor} variant="borderless" />
            </div>
        </div>
    );
}
