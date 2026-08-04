import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, Database, Shield, Lock } from "lucide-react";
import Link from "next/link";

const programs = [
    {
        title: "Product Engineering",
        badge: "Most Popular",
        duration: "7-8 Weeks",
        icon: BrainCircuit,
        description: "Full Stack, AI/ML, and Mobile Dev focused on product-company DSA and machine-coding funnels.",
        tech: ["React", "Node", "Python", "System Design"],
        link: "/programs/product-engineering"
    },
    {
        title: "Data & Platform Engineering",
        badge: "High Demand",
        duration: "5-6 Weeks",
        icon: Database,
        description: "DevOps, Data Engineering, and Data Science focused on SQL, infrastructure, and system-design.",
        tech: ["SQL", "AWS", "Spark", "Docker"],
        link: "/programs/data-and-platform-engineering"
    },
    {
        title: "Embedded & Security Engineering",
        badge: "Specialized",
        duration: "4-5 Weeks",
        icon: Shield,
        description: "Cybersecurity and IoT & Embedded systems focused on scenario drills and hardware-debug cycles.",
        tech: ["C++", "Linux", "Network Security", "RTOS"],
        link: "/programs/embedded-and-security-engineering"
    }
];

export function ProgramCatalog() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Our Core Engineering Tracks</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Intensive, project-based learning tracks designed to make you hire-ready for top corporate partners. Secure your seat today.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {programs.map((program, idx) => (
                        <Card key={idx} className="border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white flex flex-col h-full rounded-[2rem] overflow-hidden group">
                            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6 pt-8 px-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 group-hover:text-amber-500 group-hover:border-amber-200 transition-colors">
                                        <program.icon className="w-7 h-7" />
                                    </div>
                                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none font-bold px-3 py-1">
                                        {program.badge}
                                    </Badge>
                                </div>
                                <CardTitle className="text-2xl text-slate-900 mb-2 font-black leading-tight">{program.title}</CardTitle>
                                <p className="text-sm font-bold text-slate-500">{program.duration}</p>
                            </CardHeader>
                            <CardContent className="flex-grow pt-6 px-8">
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {program.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {program.tech.map((t, i) => (
                                        <Badge key={i} variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 font-medium">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="pt-4 pb-8 px-8 flex flex-col gap-3">
                                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black h-12 rounded-xl shadow-lg" asChild>
                                    <Link href="/enroll">
                                        <Lock className="w-4 h-4 mr-2" /> Lock-in for ₹500
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full text-slate-600 font-bold h-12 rounded-xl border-slate-200 hover:bg-slate-50" asChild>
                                    <Link href={program.link}>
                                        View Curriculum
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
