import { StreamBottomCTA } from "@/components/public/stream-pricing-components";
import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, LayoutDashboard, Rocket, FileCheck, Layers, Trophy, Target, BriefcaseBusiness as Briefcase, Zap, Laptop2, Shield, Cpu } from "lucide-react";
import { StreamLeadCaptureHero } from "@/components/public/stream-lead-capture-hero";
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
                    <Badge variant="outline" className="mb-6 border-green-500/30 text-green-400 bg-green-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        4–5 Weeks · Embedded & Security Engineering
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Embedded & Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Engineering</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
                        The most targeted program we offer. Interviews in these domains test real-world scenario judgment — not algorithm memorisation. You'll be drilled on SOC triage shifts and hardware-debug cycles until they feel routine.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-12 text-left">
                        {[
                            { title: "Cybersecurity", href: "/streams/cybersecurity", desc: "Penetration testing, threat modeling, SOC analysis, and network defense.", Icon: Shield },
                            { title: "IoT & Embedded Systems", href: "/streams/iot-embedded", desc: "Embedded C, microcontrollers, hardware debugging, and IoT protocols.", Icon: Cpu },
                        ].map((stream) => (
                            <Link key={stream.title} href={stream.href} className="group">
                                <div className="h-full p-6 rounded-2xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/40 transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                                        <stream.Icon className="w-5 h-5 text-green-400" />
                                    </div>
                                    <h3 className="font-bold mb-2 group-hover:text-green-400 transition-colors text-sm">{stream.title}</h3>
                                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{stream.desc}</p>
                                    <span className="text-xs font-medium text-green-400 flex items-center gap-1.5">
                                        View Curriculum <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>


                    
                <div className="mt-12">


                    
                    <StreamLeadCaptureHero slug="capstone" accentColor="green" bootcampName="Embedded & Security Engineering" trackName="Embedded & Security Engineering Program" />


                    
                </div>
            </section>

            {/* KEY FEATURES */}
            <section className="py-20 bg-secondary/20 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Duration", desc: "4–5 Weeks", icon: Zap },
                            { title: "Included Streams", desc: "Cybersecurity, IoT & Embedded", icon: Target },
                            { title: "Projects", desc: "3 Major Security & Hardware Systems", icon: Laptop2 },
                            { title: "Career Focus", desc: "SOC Triage & Hardware Debug", icon: Briefcase }
                        ].map((item, i) => (
                            <Card key={i} className="bg-background/50 border-white/5 hover:bg-white/5 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-400">
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
                            <h2 className="text-3xl font-bold font-heading mb-6 border-l-4 border-green-500 pl-4">
                                Is Embedded & Security right for you?
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    { text: "Engineers interested in low-level hardware design and IoT", icon: Target },
                                    { text: "Professionals targeting Cybersecurity analysis and SOC roles", icon: Laptop2 },
                                    { text: "Learners who want to master real-world hardware debug cycles", icon: Briefcase },
                                    { text: "Individuals looking for a highly specialized, technical niche", icon: Zap }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-white/5">
                                        <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-background rounded-3xl p-8 border border-green-500/20 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full -top-10 -right-10" />
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
                                <Clock className="w-6 h-6 text-green-500" /> Program Structure
                            </h3>
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <h4 className="font-bold text-green-600 dark:text-green-400">Weeks 1-2: Security Fundamentals</h4>
                                    <p className="text-sm text-muted-foreground">Network analysis, penetration testing basics, and threat modeling.</p>
                                </div>
                                <div className="h-px bg-border" />
                                <div>
                                    <h4 className="font-bold text-green-600 dark:text-green-400">Weeks 3-4: IoT & Hardware Systems</h4>
                                    <p className="text-sm text-muted-foreground">Embedded C, microcontrollers, and debugging hardware loops.</p>
                                </div>
                                <div className="h-px bg-border" />
                                <div>
                                    <h4 className="font-bold text-green-600 dark:text-green-400">Week 5: SOC Defense Capstone</h4>
                                    <p className="text-sm text-muted-foreground">Live SOC triage drills and final hardware defense PAT demo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* CTA */}
            <StreamBottomCTA
                slug="capstone"
                accentColor="green"
                bootcampName="Embedded & Security Engineering"
            />

            <Footer />
        </main>
    );
}
