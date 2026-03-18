import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, BookOpen, Clock, Users, Award, Briefcase, GraduationCap } from "lucide-react";
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
                    <Badge variant="outline" className="mb-6 border-blue-500/30 text-blue-400 bg-blue-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        STANDARD LEARNING TRACK
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Standard <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">8-Week</span> Program
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        A comprehensive, fully-guided learning journey designed for beginners and those looking to build strong fundamentals alongside real-world projects.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="text-lg px-8 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white shadow-lg shadow-blue-500/20" asChild>
                            <Link href="/enroll">
                                Enroll Now <ArrowRight className="ml-2 w-5 h-5" />
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
                        <div className="bg-gradient-to-br from-blue-900/20 to-black rounded-3xl p-8 border border-blue-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
                                <Clock className="w-6 h-6 text-blue-400" /> Program Structure
                            </h3>
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <h4 className="font-bold text-blue-300">Weeks 1-3: Foundations</h4>
                                    <p className="text-sm text-muted-foreground">Mastering the core language and tools. Building 2 Solo Projects.</p>
                                </div>
                                <div className="h-px bg-white/10" />
                                <div>
                                    <h4 className="font-bold text-blue-300">Weeks 4-5: Advanced Concepts & APIs</h4>
                                    <p className="text-sm text-muted-foreground">Databases, deployment, and collaboration. Building 1 Pair Project.</p>
                                </div>
                                <div className="h-px bg-white/10" />
                                <div>
                                    <h4 className="font-bold text-blue-300">Weeks 6-8: Capstone & Portfolio</h4>
                                    <p className="text-sm text-muted-foreground">Building 3 major Capstone projects, resume prep, and Final PAT Demo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-3xl text-center border border-white/10 rounded-3xl bg-secondary/10 p-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Start Learning From Scratch</h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                        Join the 8-Week Standard Program and build a complete HR-ready portfolio step-by-step.
                    </p>
                    <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white" asChild>
                        <Link href="/enroll">Enroll Now</Link>
                    </Button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
