"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    PlayCircle,
    Lock,
    Unlock,
    CheckCircle2,
    Calendar,
    Users,
    ArrowRight,
    Sparkles,
    Shield,
    Terminal,
    Globe,
    Cpu
} from "lucide-react";
import { useState } from "react";
import { useUserState } from "@/components/providers/user-state-provider";
// import { UpgradeModal } from "@/components/modals/upgrade-modal";
import Link from "next/link";

export default function TracksOverviewPage() {
    // MOCK SUBSCRIPTION - Toggle 'FREE' or 'PRO' to test views
    const { subscription } = useUserState();

    // State for modal
    // const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    const tracks = [
        {
            id: "fullstack",
            title: "Full Stack Development",
            description: "Master React, Node.js, and Cloud to build scalable web apps.",
            tools: ["React", "Next.js", "Node.js", "PostgreSQL"],
            role: "Full Stack Engineer",
            icon: Globe,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
            progress: 65,
            currentProject: "E-Commerce Platform",
            mentor: "Sarah Miller",
            status: "In Progress"
        },
        {
            id: "ai-ml",
            title: "AI & Machine Learning",
            description: "Build intelligent systems using Python, TensorFlow, and NLP.",
            tools: ["Python", "TensorFlow", "PyTorch", "NLP"],
            role: "AI Engineer",
            icon: Cpu,
            color: "text-purple-400",
            bgColor: "bg-purple-500/10",
            borderColor: "border-purple-500/20",
            progress: 10,
            currentProject: "Sentiment Analysis Tool",
            mentor: "Dr. Ken Chen",
            status: "Preview"
        },
        {
            id: "cybersecurity",
            title: "Cybersecurity",
            description: "Protect digital assets with ethical hacking and network security.",
            tools: ["Kali Linux", "Wireshark", "Metasploit"],
            role: "Security Analyst",
            icon: Shield,
            color: "text-red-400",
            bgColor: "bg-red-500/10",
            borderColor: "border-red-500/20",
            progress: 0,
            status: subscription === 'FREE' ? "Preview" : "Not Enrolled",
            mentor: null
        }
    ];

    // --- FREE USER VIEW ---
    if (subscription === "FREE") {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* <UpgradeModal open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen} /> */}

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-heading">Tracks Overview</h1>
                        <p className="text-muted-foreground mt-1">
                            Explore emerging technology tracks and unlock mentor-guided projects with Pro access.
                        </p>
                    </div>
                </div>

                {/* Track Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tracks.map((track) => {
                        const Icon = track.icon;
                        return (
                            <Card key={track.id} className={`border-white/10 overflow-hidden group hover:border-primary/50 transition-all duration-300`}>
                                <CardHeader className={`${track.bgColor} border-b ${track.borderColor}`}>
                                    <div className="flex justify-between items-start">
                                        <div className={`p-2 rounded-lg bg-background/50 border border-white/5 ${track.color}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                                            {track.status}
                                        </Badge>
                                    </div>
                                    <CardTitle className="mt-4">{track.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">{track.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
                                    <div className="space-y-2">
                                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key Tools</div>
                                        <div className="flex flex-wrap gap-2">
                                            {track.tools.map((tool, i) => (
                                                <Badge key={i} variant="secondary" className="text-xs bg-secondary/30">
                                                    {tool}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Career Outcome</div>
                                        <div className="font-medium flex items-center gap-2">
                                            <Terminal className="w-4 h-4 text-primary" /> {track.role}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/10 p-2 rounded border border-white/5">
                                        <Lock className="w-4 h-4 text-muted-foreground" />
                                        <span>Projects Locked</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="grid grid-cols-2 gap-3 pt-2">
                                    <Button variant="outline" className="w-full">
                                        <PlayCircle className="w-4 h-4 mr-2" /> Intro
                                    </Button>
                                    <Link href="/dashboard/student/upgrade" className="w-full">
                                        <Button
                                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 border-0 hover:opacity-90 transition-opacity"
                                        >
                                            Upgrade
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>

                {/* What You'll Get Section */}
                <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-900/10 to-purple-900/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-yellow-500" /> Unlock Full Career Access
                        </CardTitle>
                        <CardDescription className="text-base">
                            Get the complete experience and launch your career with SkillCred Pro.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                            {[
                                "Mentor-guided projects",
                                "Verified Portfolio",
                                "Project Assessment",
                                "Official Recommendation Letter",
                                "HR Profile Visibility",
                                "Unlimited Live Sessions"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                        <Lock className="w-4 h-4 text-indigo-400" />
                                    </div>
                                    <span className="font-medium text-muted-foreground">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <Link href="/dashboard/student/upgrade">
                            <Button
                                size="lg"
                                className="w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 border-0 shadow-lg shadow-indigo-500/20 text-lg h-12 px-8"
                            >
                                Unlock Full Tracks with Pro <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // --- PAID USER VIEW ---
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-heading">My Tracks</h1>
                    <p className="text-muted-foreground mt-1">
                        Your enrolled and available tracks.
                    </p>
                </div>
            </div>

            {/* Track Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tracks.map((track) => {
                    const Icon = track.icon;
                    const isEnrolled = track.status !== "Not Enrolled";

                    return (
                        <Card key={track.id} className="border-white/10 hover:border-primary/50 transition-all duration-300">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2 rounded-lg bg-background/50 border border-white/5 ${track.color} ${track.bgColor}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    {isEnrolled ? (
                                        <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/5">
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline">Not Enrolled</Badge>
                                    )}
                                </div>
                                <CardTitle>{track.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {isEnrolled ? (
                                    <>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Progress</span>
                                                <span className="font-bold">{track.progress}%</span>
                                            </div>
                                            <Progress value={track.progress} className={`h-2 ${track.bgColor}`} />
                                        </div>
                                        <div className="bg-secondary/10 p-3 rounded-lg border border-white/5 space-y-2">
                                            <div className="text-xs text-muted-foreground">Current Project</div>
                                            <div className="font-medium text-sm truncate">{track.currentProject}</div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Users className="w-4 h-4" />
                                            <span>Mentor: <span className="text-foreground font-medium">{track.mentor}</span></span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="h-32 flex flex-col justify-center items-center text-center text-muted-foreground space-y-2">
                                        <p className="text-sm">Ready to start this track?</p>
                                        <div className="text-xs opacity-70">Unlock new skills and projects.</div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                {isEnrolled ? (
                                    <Button className="w-full text-foreground" variant="secondary">
                                        Go to Track <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                ) : (
                                    <Button className="w-full">
                                        Enroll Now
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            {/* Optional Skills Visual can be added here later */}
        </div>
    );
}
