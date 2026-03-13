"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, DollarSign, Users, Clock } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export function MentorshipSection() {
    return (
        <section id="mentorship" className="py-24 px-6 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 px-4 py-1">
                        Monetized Mentorship
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading">
                        Turn Your Expertise Into <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Income</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Join the elite network of mentors. Conduct 1:1 sessions, review code, and verify student projects.
                        Earn 70% of every session fee directly.
                    </p>

                    <div className="space-y-4">
                        {[
                            "Set your own hourly rates for 1:1 sessions",
                            "Get paid for code reviews and project verification",
                            "Access exclusive vetted student talent pool",
                            "Build your personal brand as an industry expert"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                            <Link href="/auth/signup?role=mentor">
                                Become a Mentor <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5" asChild>
                            <Link href="/#mentorship-model">
                                View Earning Model
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Dashboard Preview Card */}
                <div className="relative">
                    <Card className="bg-neutral-900 border-white/10 p-6 rounded-xl shadow-2xl relative z-10">
                        {/* Fake Dashboard Header */}
                        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Mentor Dashboard</h4>
                                    <p className="text-xs text-muted-foreground">Overview</p>
                                </div>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20">Online</Badge>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                                <div className="text-muted-foreground text-xs mb-1 flex items-center gap-1">
                                    <DollarSign className="w-3 h-3" /> Total Earnings
                                </div>
                                <div className="text-2xl font-bold text-white">$2,840.00</div>
                                <div className="text-xs text-emerald-400 mt-1">+12% this month</div>
                            </div>
                            <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                                <div className="text-muted-foreground text-xs mb-1 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Hours Mentored
                                </div>
                                <div className="text-2xl font-bold text-white">42.5 hrs</div>
                                <div className="text-xs text-emerald-400 mt-1">Level 3 Mentor</div>
                            </div>
                        </div>

                        {/* Upcoming Sessions List */}
                        <div className="space-y-3">
                            <h5 className="text-sm font-medium text-muted-foreground mb-2">Upcoming Sessions</h5>
                            {[
                                { name: "Alex Chen", topic: "React Hooks Review", time: "10:00 AM", amount: "+$40" },
                                { name: "Sarah Miller", topic: "System Design Mock", time: "2:00 PM", amount: "+$60" },
                                { name: "Jordan Lee", topic: "Career Guidance", time: "4:30 PM", amount: "+$35" },
                            ].map((session, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
                                            {session.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">{session.topic}</div>
                                            <div className="text-xs text-muted-foreground">{session.name} • {session.time}</div>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-emerald-400">{session.amount}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl" />
                </div>
            </div>
        </section>
    );
}
