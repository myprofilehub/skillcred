"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Sparkles, Shield, Trophy, Users, MonitorPlay, Zap, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function UpgradePage() {
    const features = [
        { name: "Access to Track Content", free: true, pro: true, icon: MonitorPlay },
        { name: "Recorded Video Sessions", free: true, pro: true, icon: MonitorPlay },
        { name: "Live Mentorship Sessions", free: false, pro: true, icon: Users },
        { name: "1:1 Mentor Support", free: false, pro: true, icon: Users },
        { name: "Project Verification", free: false, pro: true, icon: Shield },
        { name: "Official Certifications", free: false, pro: true, icon: Trophy },
        { name: "HR Visibility & Referrals", free: false, pro: true, icon: Sparkles },
        { name: "AI Resume Builder", free: false, pro: true, icon: Zap },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header / Nav */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/student">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold font-heading">Upgrade to Pro</h1>
                    <p className="text-muted-foreground">Level up your career with premium features</p>
                </div>
            </div>

            {/* Pricing Cards (Mobile/Tablet Friendly) */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">

                {/* Free Plan */}
                <Card className="border-white/10 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden">
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-2xl">Free Tier</CardTitle>
                        <CardDescription>For self-paced learners</CardDescription>
                        <div className="mt-4 mb-2">
                            <span className="text-4xl font-bold">₹0</span>
                        </div>
                        <Button variant="outline" className="w-full mt-4 cursor-default hover:bg-transparent" disabled>
                            Current Plan
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 text-sm">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                <span>Access to Recorded Sessions</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                <span>Basic Learning Tracks</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground/50">
                                <XCircle className="w-5 h-5 shrink-0" />
                                <span>No Live Mentorship</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground/50">
                                <XCircle className="w-5 h-5 shrink-0" />
                                <span>No Project Verification</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="border-primary/50 bg-gradient-to-br from-indigo-950/30 to-purple-950/30 relative overflow-hidden shadow-2xl shadow-purple-500/10 scale-105 border-2">
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        RECOMMENDED
                    </div>
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-2xl text-primary flex items-center justify-center gap-2">
                            Pro Plan <Sparkles className="w-5 h-5" />
                        </CardTitle>
                        <CardDescription>For serious career acceleration</CardDescription>
                        <div className="mt-4 mb-2 flex items-center justify-center gap-1">
                            <span className="text-4xl font-bold">₹899</span>
                            <span className="text-muted-foreground text-sm">/mo</span>
                        </div>
                        <Button className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 border-0 text-lg h-12">
                            Upgrade Now
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                        <div className="space-y-3">
                            {features.filter(f => f.pro && !f.free).map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-medium">
                                    <div className="bg-primary/20 p-1 rounded-full">
                                        <Check className="w-4 h-4 text-primary" />
                                    </div>
                                    <span>{feature.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Comparison Table */}
            <div className="mt-16 max-w-4xl mx-auto">
                <h3 className="text-xl font-bold mb-6 text-center">Detailed Comparison</h3>
                <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-4 pl-6 font-medium text-muted-foreground w-1/3">Feature</th>
                                <th className="p-4 text-center font-bold w-1/4">Free</th>
                                <th className="p-4 text-center font-bold w-1/4 bg-primary/5 text-primary">Pro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, i) => (
                                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                    <td className="p-4 pl-6 flex items-center gap-3">
                                        <feature.icon className="w-4 h-4 text-purple-400" />
                                        <span className="text-sm font-medium">{feature.name}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {feature.free ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                                        ) : (
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/10 mx-auto" />
                                        )}
                                    </td>
                                    <td className="p-4 text-center bg-primary/5 border-l border-white/5">
                                        {feature.pro ? (
                                            <div className="flex justify-center">
                                                <div className="bg-primary/20 p-1 rounded-full">
                                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/10 mx-auto" />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="text-center text-sm text-muted-foreground pt-8 pb-12">
                Questions? Contact our support team. Prices inclusive of taxes.
            </div>
        </div>
    );
}
