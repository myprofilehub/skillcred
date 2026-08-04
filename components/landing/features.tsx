"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Rocket, FileCheck, Award, Briefcase, Building2, TrendingUp, ShieldCheck } from "lucide-react";

export function FeaturesSection() {
    return (
        <section id="features" className="py-24 px-6 bg-white relative border-b border-blue-100">
            <div className="max-w-7xl mx-auto space-y-24">

                {/* ============================================== */}
                {/* ENTERPRISE STANDARDS HIGHLIGHT */}
                {/* ============================================== */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 px-4 py-1">
                            Enterprise-Grade Curriculum
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900">
                            Stop Watching.{" "}
                            <span className="text-blue-600">
                                Start Building.
                            </span>
                        </h2>
                        <p className="text-slate-600 text-lg">
                            Every concept you learn is immediately applied to building real applications.
                            From E-commerce microservices to AI pipelines — you build what top companies actually hire for.
                        </p>
                        <div className="space-y-4 pt-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-blue-600 mt-0.5" />
                                <span className="text-slate-700 font-medium">Production-ready projects with live deployments</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-blue-600 mt-0.5" />
                                <span className="text-slate-700 font-medium">Code reviews from Senior Corporate Engineers</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-blue-600 mt-0.5" />
                                <span className="text-slate-700 font-medium">Verified portfolio that proves your practical skills</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Replaced Terminal with a clean "Enterprise Dashboard" style card */}
                    <Card className="p-8 border-slate-200 bg-slate-50 relative overflow-hidden shadow-xl">
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                <div className="space-y-1">
                                    <h4 className="font-bold text-slate-900">Skill Assessment Report</h4>
                                    <p className="text-xs text-slate-500">ID: PAT-9942-X</p>
                                </div>
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Verified</Badge>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-slate-600">System Design</span>
                                    <span className="text-sm font-bold text-slate-900">94/100</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full w-[94%]"></div>
                                </div>
                                
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-sm font-medium text-slate-600">Code Quality</span>
                                    <span className="text-sm font-bold text-slate-900">88/100</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full w-[88%]"></div>
                                </div>
                                
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-sm font-medium text-slate-600">Production Readiness</span>
                                    <span className="text-sm font-bold text-slate-900">92/100</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full w-[92%]"></div>
                                </div>
                            </div>
                            
                            <div className="pt-4 border-t border-slate-200 flex items-center gap-2 text-sm font-medium text-slate-700">
                                <ShieldCheck className="w-5 h-5 text-blue-600" />
                                Mentorship & Code Validated
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ============================================== */}
                {/* CORPORATE BENEFITS */}
                {/* ============================================== */}
                <div className="space-y-12 pt-12 border-t border-blue-100">
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 px-4 py-1">
                            For Corporate & HR
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900">
                            Hire with Absolute <span className="text-blue-600">Certainty</span>
                        </h2>
                        <p className="text-slate-600 text-lg">
                            We bridge the gap between academic theory and corporate reality. Our standardized PAT eliminates the noise of traditional resumes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="p-8 border-slate-200 bg-white hover:shadow-lg transition-shadow text-center">
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                                <Building2 className="w-7 h-7 text-blue-600" />
                            </div>
                            <h4 className="font-bold text-xl mb-3 text-slate-900">Direct Campus Pipeline</h4>
                            <p className="text-slate-600">Access pre-vetted talent from top partnered institutions before they hit the open market.</p>
                        </Card>
                        
                        <Card className="p-8 border-slate-200 bg-white hover:shadow-lg transition-shadow text-center">
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                                <FileCheck className="w-7 h-7 text-blue-600" />
                            </div>
                            <h4 className="font-bold text-xl mb-3 text-slate-900">Standardized Scoring</h4>
                            <p className="text-slate-600">Every candidate is ranked out of 100 on code quality, testing, and deployment workflows.</p>
                        </Card>
                        
                        <Card className="p-8 border-slate-200 bg-white hover:shadow-lg transition-shadow text-center">
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                                <TrendingUp className="w-7 h-7 text-blue-600" />
                            </div>
                            <h4 className="font-bold text-xl mb-3 text-slate-900">Reduced Time-to-Hire</h4>
                            <p className="text-slate-600">Skip the technical screening rounds. Our PAT results give you a confident day-one hire.</p>
                        </Card>
                    </div>
                </div>

            </div>
        </section>
    );
}
