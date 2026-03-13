"use client";

import { CheckCircle2, Award, FileCheck, Search } from "lucide-react";

export function FeaturesSection() {
    const features = [
        {
            icon: CheckCircle2,
            title: "Verified Portfolios",
            description: "Automatically updated portfolios that showcase your verified skills and completed projects."
        },
        {
            icon: Award,
            title: "Mentor Verification",
            description: "Projects are reviewed and approved by industry experts, ensuring high-quality code and architecture."
        },
        {
            icon: FileCheck,
            title: "Assessment & Letters",
            description: "Unlock assessment tests after project completion to earn official recommendation letters."
        },
        {
            icon: Search,
            title: "HR Discovery",
            description: "Top recruiters filter candidates by specific streams, skills, and verified project experience."
        }
    ];

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
                            Why <span className="text-primary">SkillCred</span>?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8">
                            We bridge the gap between learning and hiring. Traditional courses give you certificates;
                            SkillCred gives you a verified proof of work.
                        </p>

                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                                            <feature.icon className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl rounded-full" />
                        <div className="relative rounded-2xl border border-white/10 bg-card/50 backdrop-blur-xl p-8 shadow-2xl">
                            {/* Mock UI for Features */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-700" />
                                        <div>
                                            <div className="h-4 w-32 bg-gray-700 rounded mb-2" />
                                            <div className="h-3 w-20 bg-gray-800 rounded" />
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium border border-green-500/20">
                                        Verified
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-24 bg-black/20 rounded-lg p-4 border border-white/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FileCheck className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium">E-Commerce Microservices</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Successfully implemented order processing service with Kafka integration.</p>
                                    </div>
                                    <div className="h-24 bg-black/20 rounded-lg p-4 border border-white/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FileCheck className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium">AI Image Classifier</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Built a ResNet-50 based model for medical imaging analysis with 92% accuracy.</p>
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-between items-center">
                                    <div className="text-xs text-muted-foreground">Assessment Score</div>
                                    <div className="text-xl font-bold text-primary">94/100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
