"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, FileText, XCircle } from "lucide-react";
import Link from "next/link";

export function HRInsightsTeaser() {
    return (
        <section className="py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-100">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] invert" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-bold mb-6 border border-amber-200">
                            <Search className="w-4 h-4" />
                            Industry Research Report
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                            Stop guessing what <span className="text-amber-500">HRs actually want.</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            We analyzed hiring patterns across 100+ top tech companies. Find out why standard "todo app" portfolios get rejected, and what technical recruiters are actively searching for in 2026.
                        </p>
                        
                        <Link href="/hr-insights" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-slate-900/20">
                            Read the Full Report <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {/* Stat Card 1 */}
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-sm">
                            <XCircle className="w-8 h-8 text-red-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">The "Generic Portfolio" Trap</h3>
                            <p className="text-sm text-slate-500">Why standard bootcamp projects immediately flag your resume for rejection.</p>
                        </div>
                        
                        {/* Stat Card 2 */}
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-sm sm:translate-y-8">
                            <FileText className="w-8 h-8 text-emerald-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Production Evidence</h3>
                            <p className="text-sm text-slate-500">How demonstrating CI/CD and system design thinking bypasses initial HR screens.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
