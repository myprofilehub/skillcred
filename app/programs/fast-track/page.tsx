import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Zap, Target, Laptop2, FastForward, Briefcase } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function FastTrackProgramPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LandingNavbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <Badge variant="outline" className="mb-6 border-emerald-500/30 text-emerald-400 bg-emerald-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        FAST TRACK LEARNING
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                            Fast Track
                        </span> 4-Week Program
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        An accelerated, intense building experience for individuals with prior coding knowledge who want to rapidly build a verified portfolio.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="text-lg px-8 h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white shadow-lg shadow-emerald-500/20" asChild>
                            <Link href="/enroll">
                                Join the Fast Track <ArrowRight className="ml-2 w-5 h-5" />
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
                            { title: "Duration", desc: "4 Weeks (1 Month)", icon: Zap },
                            { title: "Pace", desc: "Intense & Accelerated", icon: FastForward },
                            { title: "Prerequisites", desc: "Basic language syntax", icon: Laptop2 },
                            { title: "Outcome", desc: "6 Verified Projects + Certificate", icon: Target },
                        ].map((item, i) => (
                            <Card key={i} className="bg-background/50 border-white/5 hover:bg-white/5 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <div className="mx-auto w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 text-emerald-400">
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
                            <h2 className="text-3xl font-bold font-heading mb-6 border-l-4 border-emerald-500 pl-4">
                                Is Fast Track right for you?
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    { text: "College students entering placement season immediately", icon: Target },
                                    { text: "Learners who already know basic coding syntax", icon: Laptop2 },
                                    { text: "Professionals needing rapid skill verification", icon: Briefcase },
                                    { text: "Individuals who can commit 20+ hours a week", icon: Zap }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-white/5">
                                        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-900/20 to-black rounded-3xl p-8 border border-emerald-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full" />
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
                                <FastForward className="w-6 h-6 text-emerald-400" /> Accelerated Structure
                            </h3>
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <h4 className="font-bold text-emerald-300">Week 1: Foundations & APIs</h4>
                                    <p className="text-sm text-muted-foreground">Rapid review and immediate building of the 2 Solo Projects.</p>
                                </div>
                                <div className="h-px bg-white/10" />
                                <div>
                                    <h4 className="font-bold text-emerald-300">Week 2: Databases & Integration</h4>
                                    <p className="text-sm text-muted-foreground">Connecting the 1 Pair Project with cloud databases.</p>
                                </div>
                                <div className="h-px bg-white/10" />
                                <div>
                                    <h4 className="font-bold text-emerald-300">Weeks 3-4: Capstone Execution</h4>
                                    <p className="text-sm text-muted-foreground">Intensively deploying the 3 Capstone apps and taking the final PAT assessment.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-3xl text-center border border-white/10 rounded-3xl bg-secondary/10 p-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Build Faster. Get Verified.</h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                        Don't waste time on theories you already know. Start building real projects on day one.
                    </p>
                    <Button size="lg" className="h-14 px-8 text-lg bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                        <Link href="/enroll">Enroll in Fast Track</Link>
                    </Button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
