"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
    Brain,
    Code2,
    Database,
    Smartphone,
    ShieldCheck,
    BarChartBig,
    Cpu,
    ArrowRight,
    Cloud
} from "lucide-react";
import Link from "next/link";

const streams = [
    {
        id: "full-stack-development",
        title: "Full Stack Development",
        description: "Build robust web apps using modern frameworks and databases.",
        icon: Code2,
        color: "text-purple-400",
        skills: ["React", "Node.js", "Databases"]
    },
    {
        id: "ai-ml",
        title: "AI & ML",
        description: "Master Machine Learning models, NLP, and Computer Vision.",
        icon: Brain,
        color: "text-blue-400",
        skills: ["Python", "TensorFlow", "PyTorch"]
    },
    {
        id: "cybersecurity",
        title: "Cybersecurity",
        description: "Ethical hacking, penetration testing, and security auditing.",
        icon: ShieldCheck,
        color: "text-green-400",
        skills: ["Network Security", "Ethical Hacking", "Cryptography"]
    },
    {
        id: "data-engineering",
        title: "Data Engineering",
        description: "Design and build scalable data pipelines and architectures.",
        icon: Database,
        color: "text-yellow-400",
        skills: ["Spark", "Hadoop", "ETL"]
    },
    {
        id: "devops-cloud",
        title: "DevOps & Cloud",
        description: "Build, deploy, and scale applications efficiently on the cloud.",
        icon: Cloud,
        color: "text-cyan-400",
        skills: ["AWS", "Docker", "CI/CD"]
    },
    {
        id: "mobile-development",
        title: "Mobile Development",
        description: "Create native and cross-platform apps for iOS and Android.",
        icon: Smartphone,
        color: "text-orange-400",
        skills: ["Flutter", "React Native", "Swift"]
    },
    {
        id: "iot-embedded",
        title: "IoT and Embedded",
        description: "Develop software for connected devices and embedded systems.",
        icon: Cpu,
        color: "text-red-400",
        skills: ["C/C++", "Microcontrollers", "RTOS"]
    },
    {
        id: "data-science",
        title: "Data Science & Analytics",
        description: "Extract actionable insights from complex data sets.",
        icon: BarChartBig,
        color: "text-indigo-400",
        skills: ["Python", "Pandas", "SQL"]
    }
];

export function StreamsSection() {
    return (
        <section id="streams" className="py-20 bg-secondary/30 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Badge variant="accent" className="mb-4">Our Learning Tracks</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
                        Choose Your <span className="text-primary">Stream</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Select a specialized track to start your journey. Each stream includes live mentor-assigned projects
                        that build your verified portfolio.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {streams.map((stream, index) => (
                        <motion.div
                            key={stream.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/streams/${stream.id}`}>
                                <Card className="h-full hover:border-primary/50 transition-colors group cursor-pointer overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <CardHeader>
                                        <div className={`p-3 rounded-lg w-fit bg-white/5 mb-4 group-hover:scale-110 transition-transform ${stream.color}`}>
                                            <stream.icon className="h-8 w-8" />
                                        </div>
                                        <CardTitle className="mb-2">{stream.title}</CardTitle>
                                        <CardDescription>
                                            {stream.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {stream.skills.map(skill => (
                                                <Badge key={skill} variant="secondary" className="text-xs bg-black/20 text-muted-foreground">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 transition-transform">
                                            View Track <ArrowRight className="ml-2 h-4 w-4" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
