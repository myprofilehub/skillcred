"use client";

import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Sparkles, Shield, Trophy, Users, MonitorPlay, Zap } from "lucide-react";

interface ProFeaturesModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProFeaturesModal({ open, onOpenChange }: ProFeaturesModalProps) {
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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <div className="bg-[#0f1117] rounded-lg overflow-hidden border border-white/10">
                <DialogHeader className="p-8 text-center bg-gradient-to-b from-indigo-950/50 to-transparent border-b border-white/5">
                    <DialogTitle className="text-3xl font-bold font-heading mb-2">
                        Level Up Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Pro</span>
                    </DialogTitle>
                    <DialogDescription className="text-lg text-muted-foreground">
                        Compare our plans and choose the one that fits your ambition.
                    </DialogDescription>
                </DialogHeader>

                <div className="p-4 md:p-8">
                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="p-4 font-medium text-muted-foreground w-1/3">Feature</th>
                                    <th className="p-4 text-center w-1/3">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="font-bold text-lg">Free Tier</span>
                                            <span className="text-2xl font-bold">₹0</span>
                                            <Button variant="outline" disabled className="w-full max-w-[120px] h-8 text-xs">
                                                Current Plan
                                            </Button>
                                        </div>
                                    </th>
                                    <th className="p-4 text-center w-1/3 bg-primary/5 border-l border-white/5 relative">
                                        <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-500 to-purple-500 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg text-white">
                                            RECOMMENDED
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="font-bold text-lg text-primary">Pro Plan</span>
                                            <span className="text-2xl font-bold">₹899<span className="text-xs font-normal text-muted-foreground">/mo</span></span>
                                            <Button className="w-full max-w-[120px] h-8 text-xs bg-primary hover:bg-primary/90">
                                                Upgrade
                                            </Button>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature, i) => (
                                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                        <td className="p-4 flex items-center gap-3">
                                            <feature.icon className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">{feature.name}</span>
                                        </td>
                                        <td className="p-4 text-center">
                                            {feature.free ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                                            )}
                                        </td>
                                        <td className="p-4 text-center bg-primary/5">
                                            {feature.pro ? (
                                                <div className="flex justify-center">
                                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                                </div>
                                            ) : (
                                                <XCircle className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="p-6 bg-black/20 border-t border-white/10 text-center text-xs text-muted-foreground">
                    Prices are inclusive of all taxes. 7-day money-back guarantee.
                </div>
            </div>
        </Dialog>
    );
}
