import { StreamBottomCTA } from "@/components/public/stream-pricing-components";
import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, BookOpen, Clock, Users, Award, Briefcase, GraduationCap, Code2, BrainCircuit, Layout } from "lucide-react";
import { StreamLeadCaptureHero } from "@/components/public/stream-lead-capture-hero";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function StandardProgramPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <LandingNavbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <Badge variant="outline" className="mb-6 border-purple-500/30 text-purple-400 bg-purple-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        7–8 Weeks · Product Engineering
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">Engineering</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
                        Our most comprehensive program. Built for aspiring engineers targeting product companies — where the hiring bar is set by timed DSA, cold machine-coding, and live problem-solving under pressure.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 text-left">
                        {[
                            { title: "Full Stack Development", href: "/streams/full-stack-development", desc: "Frontend, backend, databases, and deployment — end to end.", Icon: Code2 },
                            { title: "AI & ML Engineering", href: "/streams/ai-ml", desc: "Machine learning, neural networks, and production ML pipelines.", Icon: BrainCircuit },
                            { title: "Mobile Development", href: "/streams/mobile-development", desc: "iOS, Android, and cross-platform app development.", Icon: Layout },
                        ].map((stream) => (
                            <Link key={stream.title} href={stream.href} className="group">
                                <div className="h-full p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                                        <stream.Icon className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <h3 className="font-bold mb-2 group-hover:text-purple-400 transition-colors text-sm">{stream.title}</h3>
                                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{stream.desc}</p>
                                    <span className="text-xs font-medium text-purple-400 flex items-center gap-1.5">
                                        View Curriculum <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>


                    
                <div className="mt-12">


                    
                    <StreamLeadCaptureHero slug="standard" accentColor="purple" bootcampName="Product Engineering" trackName="Product Engineering Program" />


                    
                </div>
            </section>

            {/* KEY FEATURES */}
            <section className="py-20 bg-secondary/20 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Duration", desc: "8 Weeks (2 Months)", icon: Clock },
                            { title: "Learning Style", desc: "Guided & Step-by-Step", icon: BookOpen },
                            { title: "Mentorship", desc: "Weekly live sessions & 1-on-1s", icon: Users },
                            { title: "Outcome", desc: "6 Verified Projects + Certificate", icon: Award },
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
                                Who is this program for?
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    { text: "College students with no prior coding experience", icon: GraduationCap },
                                    { text: "Career switchers moving into tech", icon: Briefcase },
                                    { text: "Learners who prefer a structured, mentor-led pace", icon: BookOpen },
                                    { text: "Individuals wanting deep theoretical foundation before building", icon: Award }
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
                        <div className="bg-background rounded-3xl p-8 border border-purple-500/20 shadow-sm relative overflow-hidden relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full -top-10 -right-10" />
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
                                <Clock className="w-6 h-6 text-purple-500" /> Program Structure
                            </h3>
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <h4 className="font-bold text-purple-600 dark:text-purple-400">Weeks 1-3: Foundations</h4>
                                    <p className="text-sm text-muted-foreground">Mastering the core language and tools. Building 2 Solo Projects.</p>
                                </div>
                                <div className="h-px bg-border" />
                                <div>
                                    <h4 className="font-bold text-purple-600 dark:text-purple-400">Weeks 4-5: Advanced Concepts & APIs</h4>
                                    <p className="text-sm text-muted-foreground">Databases, deployment, and collaboration. Building 1 Pair Project.</p>
                                </div>
                                <div className="h-px bg-border" />
                                <div>
                                    <h4 className="font-bold text-purple-600 dark:text-purple-400">Weeks 6-8: Capstone & Portfolio</h4>
                                    <p className="text-sm text-muted-foreground">Building 3 major Capstone projects, resume prep, and Final PAT Demo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* CTA */}
            <StreamBottomCTA
                slug="standard"
                accentColor="purple"
                bootcampName="Product Engineering"
            />

            <Footer />
        </main>
    );
}
