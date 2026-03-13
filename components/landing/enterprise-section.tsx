"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, GraduationCap, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export function EnterpriseSection() {
    return (
        <section id="enterprise" className="py-24 px-6 bg-black relative">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 px-4 py-1">
                        Enterprise Solutions
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading">
                        Bridging the Gap Between <br />
                        <span className="text-white">Academia</span> & <span className="text-white">Industry</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        SkillCred provides the infrastructure for colleges to accredit skills and for companies to hire verified talent.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* FOR COLLEGES */}
                    <Card className="p-8 border-indigo-500/20 bg-gradient-to-br from-indigo-900/10 to-black hover:border-indigo-500/40 transition-all group">
                        <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-6">
                            <GraduationCap className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">For Colleges & Institutions</h3>
                        <p className="text-muted-foreground mb-8 min-h-[48px]">
                            Become an accredited skill center. Align your curriculum with industry standards and track student outcomes.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 text-indigo-500 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-sm">NASSCOM / Accreditation Vision</h4>
                                    <p className="text-xs text-muted-foreground">Align with national skill frameworks</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 text-indigo-500 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-sm">Institutional Dashboard</h4>
                                    <p className="text-xs text-muted-foreground">Real-time analytics on student performance</p>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
                            <Link href="/#campus">
                                Partner with Us
                            </Link>
                        </Button>
                    </Card>

                    {/* FOR HR */}
                    <Card className="p-8 border-amber-500/20 bg-gradient-to-br from-amber-900/10 to-black hover:border-amber-500/40 transition-all group">
                        <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-6">
                            <Building2 className="w-6 h-6 text-amber-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">For HR & Recruiters</h3>
                        <p className="text-muted-foreground mb-8 min-h-[48px]">
                            Stop filtering through thousands of resumes. Hire candidates who have proven they can build.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <UserCheck className="w-5 h-5 text-amber-500 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-sm">Skill-Based Hiring</h4>
                                    <p className="text-xs text-muted-foreground">Filter by verified projects, not just keywords</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <UserCheck className="w-5 h-5 text-amber-500 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-sm">PAT Certified Candidates</h4>
                                    <p className="text-xs text-muted-foreground">Pre-assessed talent ready to deploy</p>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full bg-amber-600 hover:bg-amber-700 text-black font-medium" asChild>
                            <Link href="/dashboard/hr">
                                Start Hiring
                            </Link>
                        </Button>
                    </Card>
                </div>

                {/* Trust Section */}
                <div className="border-t border-white/10 pt-10 text-center">
                    <p className="text-sm text-muted-foreground mb-6">Trusted by forward-thinking organizations</p>
                    <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder logos - using text for now */}
                        <div className="text-xl font-bold text-white">TECHCORP</div>
                        <div className="text-xl font-bold text-white">INNOVATE.AI</div>
                        <div className="text-xl font-bold text-white">FUTURE SCHOOL</div>
                        <div className="text-xl font-bold text-white">STARTUPINC</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
