import { StreamBottomCTA } from "@/components/public/stream-pricing-components";
import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Zap, Target, Laptop2, FastForward, Briefcase, Cloud, Database, Search } from "lucide-react";
import { StreamLeadCaptureHero } from "@/components/public/stream-lead-capture-hero";
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
                    <Badge variant="outline" className="mb-6 border-blue-500/30 text-blue-400 bg-blue-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        5–6 Weeks · Data & Platform Engineering
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Data & Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Engineering</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
                        An accelerated, intense building experience focusing on SQL, infrastructure & system-design.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 text-left">
                        {[
                            { title: "DevOps & Cloud", href: "/streams/devops-cloud", desc: "CI/CD pipelines, Kubernetes, AWS/GCP, and infrastructure automation.", Icon: Cloud },
                            { title: "Data Engineering", href: "/streams/data-engineering", desc: "ETL pipelines, data warehousing, Spark, and real-time streaming.", Icon: Database },
                            { title: "Data Science & Analytics", href: "/streams/data-science", desc: "Statistical modeling, visualization, and machine learning insights.", Icon: Search },
                        ].map((stream) => (
                            <Link key={stream.title} href={stream.href} className="group">
                                <div className="h-full p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                                        <stream.Icon className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <h3 className="font-bold mb-2 group-hover:text-blue-400 transition-colors text-sm">{stream.title}</h3>
                                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{stream.desc}</p>
                                    <span className="text-xs font-medium text-blue-400 flex items-center gap-1.5">
                                        View Curriculum <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>


                    
                <div className="mt-12">


                    
                    <StreamLeadCaptureHero slug="fast-track" accentColor="blue" bootcampName="Data & Platform Engineering" trackName="Data & Platform Engineering Program" />


                    
                </div>
            </section>

            {/* KEY FEATURES */}
            <section className="py-20 bg-secondary/20 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Duration", desc: "5–6 Weeks", icon: Zap },
                            { title: "Included Streams", desc: "DevOps, Data Eng, Data Science", icon: Target },
                            { title: "Projects", desc: "5 Major Data Pipelines & Cloud deployments", icon: Laptop2 },
                            { title: "Career Focus", desc: "System Design & Infrastructure", icon: Briefcase }
                        ].map((item, i) => (
                            <Card key={i} className="bg-background/50 border-white/5 hover:bg-white/5 transition-colors">
                                <CardContent className="p-6 text-center">
                                    <div className="mx-auto w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-400">
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
                            <h2 className="text-3xl font-bold font-heading mb-6 border-l-4 border-blue-500 pl-4">
                                Is Data & Platform right for you?
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    { text: "Engineers wanting to transition into Data Engineering or Cloud Architecture", icon: Target },
                                    { text: "Learners focused on backend scale, ETL pipelines, and Big Data", icon: Laptop2 },
                                    { text: "Professionals needing a verifiable cloud infrastructure portfolio", icon: Briefcase },
                                    { text: "Individuals looking to ace System Design interviews", icon: Zap }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-white/5">
                                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-background rounded-3xl p-8 border border-blue-500/20 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -top-10 -right-10" />
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
                                <FastForward className="w-6 h-6 text-blue-500" /> Program Structure
                            </h3>
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <h4 className="font-bold text-blue-600 dark:text-blue-400">Weeks 1-2: Data Pipelines & Cloud</h4>
                                    <p className="text-sm text-muted-foreground">Setting up AWS/GCP architecture and robust ETL processing.</p>
                                </div>
                                <div className="h-px bg-border" />
                                <div>
                                    <h4 className="font-bold text-blue-600 dark:text-blue-400">Weeks 3-4: Advanced Analytics</h4>
                                    <p className="text-sm text-muted-foreground">Machine learning integration and data science fundamentals.</p>
                                </div>
                                <div className="h-px bg-border" />
                                <div>
                                    <h4 className="font-bold text-blue-600 dark:text-blue-400">Weeks 5-6: System Design Capstone</h4>
                                    <p className="text-sm text-muted-foreground">Scaling infrastructure and final PAT Demo defense.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* CTA */}
            <StreamBottomCTA
                slug="fast-track"
                accentColor="blue"
                bootcampName="Data & Platform Engineering"
            />

            <Footer />
        </main>
    );
}
