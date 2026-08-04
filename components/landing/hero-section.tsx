"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Award, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StreamLeadForm } from "@/components/public/stream-lead-form";

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-white">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Column: Copy & CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-left"
                    >
                        <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full border-amber-200 text-amber-700 bg-amber-50 font-medium">
                            <Award className="w-4 h-4 mr-2 inline" />
                            Premium Mentorship & Certification
                        </Badge>
                        <h1 className="text-5xl md:text-6xl font-bold font-heading tracking-tight mb-6 text-slate-900 leading-[1.1]">
                            Learn by Building. <br />
                            <span className="text-amber-500">Master the Craft of Engineering.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                            Stop building basic tutorials. Engineer production-grade microservices, deploy live applications, and get headhunted by top tech companies.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Button size="lg" className="h-14 px-8 text-lg bg-amber-500 hover:bg-amber-600 text-white font-black tracking-wide w-full sm:w-auto shadow-lg shadow-amber-500/20" asChild>
                                <Link href="/enroll">
                                    Lock in Your Seat <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-200 text-slate-900 hover:bg-slate-50 w-full sm:w-auto font-bold" asChild>
                                <Link href="/hr-insights">
                                    See Hiring Trends
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Column: Request Callback Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        {/* Decorative background element */}
                        <div className="absolute -inset-4 bg-amber-50 rounded-[2rem] transform -rotate-3 z-0" />
                        
                        <div className="relative z-10 flex flex-col gap-4">
                            <Card className="border-amber-100 shadow-xl shadow-slate-200/50 bg-white p-6 sm:p-8 rounded-3xl">
                                <CardHeader className="p-0 mb-6">
                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-bold w-fit mb-4">
                                        <CheckCircle2 className="w-3 h-3 mr-1 inline" /> Free Career Consultation
                                    </Badge>
                                    <CardTitle className="text-3xl text-slate-900 font-black tracking-tight">Speak to an Advisor</CardTitle>
                                    <p className="text-sm text-slate-500 mt-2 font-medium">Not sure if this is the right fit? Drop your details and we'll call you back within 24 hours to discuss your goals.</p>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <StreamLeadForm trackName="General Landing Page" accentColor="orange" variant="borderless" />
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
