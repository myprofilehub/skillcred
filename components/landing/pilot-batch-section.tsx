'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export function PilotBatchSection() {
    const features = [
        {
            icon: Clock,
            title: "4-Week Intensive",
            description: "A fast-paced, high-impact curriculum designed to level up your skills in record time."
        },
        {
            icon: Zap,
            title: "Live Projects",
            description: "Work on real-world industry projects with direct support from experienced mentors."
        },
        {
            icon: Users,
            title: "Elite Cohort",
            description: "Join an exclusive group of motivated builders and expand your professional network."
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-slate-900/40">
            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Zap className="w-3.5 h-3.5" />
                            Accelerated Batch
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                            Accelerate your career in <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Just 4 Weeks.</span>
                        </h2>
                        
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            We are opening a limited-time accelerated cohort for builders who want to skip the noise and get straight to the code. Work on production-grade projects, get verified by experts, and jumpstart your career—completely for free.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {[
                                "No Upfront Cost (100% Free Access)",
                                "Direct Mentor Code Reviews",
                                "Verified Digital Certificate & Portfolio",
                                "Priority Hiring Access"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-200 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Button size="lg" className="h-14 px-10 text-lg bg-white text-black hover:bg-slate-100 font-bold rounded-full group" asChild>
                            <Link href="/batch/enroll">
                                Join Accelerated Batch <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid gap-6"
                    >
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all group">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
