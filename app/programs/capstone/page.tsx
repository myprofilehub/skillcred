import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, LayoutDashboard, Rocket, FileCheck, Layers, Trophy, Target, BriefcaseBusiness as Briefcase } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function CapstoneProgramPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LandingNavbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <Badge variant="outline" className="mb-6 border-rose-500/30 text-rose-400 bg-rose-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        PORTFOLIO FINISHING SCHOOL
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500">
                            Capstone
                        </span> 2-Week Track
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        Skip the basics. Build and deploy 3 production-ready, highly-complex capstone projects designed specifically to pass HR technical screens.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="text-lg px-8 h-14 bg-gradient-to-r from-rose-600 to-orange-600 hover:opacity-90 text-white shadow-lg shadow-rose-500/20" asChild>
                            <Link href="/enroll">
                                Start Building Capstones <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* KEY FEATURES */}
            <section className="py-20 bg-secondary/20 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Duration", desc: "14 Days", icon: Rocket },
                            { title: "Focus", desc: "100% Capstone Execution", icon: Target },
                            { title: "Prerequisites", desc: "Solid framework knowledge", icon: FileCheck },
                            { title: "Outcome", desc: "3 Capstones + PAT Certification", icon: Trophy },
                        ].map((item, i) => (
                            <Card key={i} className="bg-background/50 border-white/5 hover:bg-white/5 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <div className="mx-auto w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center mb-4 text-rose-400">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHO IS THIS FOR / SYLLABUS OVERVIEW */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold font-heading mb-6 border-l-4 border-rose-500 pl-4">
                                Is the Capstone Track right for you?
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    { text: "Advanced learners who already know to code but lack real-world projects", icon: Layers },
                                    { text: "Students needing a 'Showcase' portfolio immediately for interviews", icon: LayoutDashboard },
                                    { text: "Professionals aiming to demonstrate higher-order system design", icon: Briefcase },
                                    { text: "Anyone seeking the PAT Certificate without taking an 8-week course", icon: Trophy }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-white/5">
                                        <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-rose-900/20 to-black rounded-3xl p-8 border border-rose-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 blur-3xl rounded-full" />
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
                                <Rocket className="w-6 h-6 text-rose-400" /> Executive Structure
                            </h3>
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <h4 className="font-bold text-rose-300">Week 1: Architecture & APIs</h4>
                                    <p className="text-sm text-muted-foreground">Planning the database schema and system architecture for 3 capstones simultaneously.</p>
                                </div>
                                <div className="h-px bg-white/10" />
                                <div>
                                    <h4 className="font-bold text-rose-300">Week 2: Deployment & PAT Demo</h4>
                                    <p className="text-sm text-muted-foreground">Cloud deployment, UI polish, and preparing for the final mentor defense and code capability live test.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-3xl text-center border border-white/10 rounded-3xl bg-secondary/10 p-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Complete Your Portfolio in 14 Days</h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                        Skip ahead if you have the skills. Prove you can build enterprise-grade software and get certified.
                    </p>
                    <Button size="lg" className="h-14 px-8 text-lg bg-rose-600 hover:bg-rose-700 text-white" asChild>
                        <Link href="/enroll">Enroll in Capstone Track</Link>
                    </Button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
