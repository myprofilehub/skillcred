"use client";

import { Button } from "@/components/ui/button";
import { Download, Lock, Github, Code, Database, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const KITS = [
    {
        title: "E-Commerce Microservices",
        tech: "Next.js, Node.js, RabbitMQ",
        icon: Code,
        color: "text-blue-400",
        bg: "bg-blue-500/10"
    },
    {
        title: "RAG AI Chatbot",
        tech: "Python, LangChain, Pinecone",
        icon: Terminal,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10"
    },
    {
        title: "Real-time Analytics Dashboard",
        tech: "React, D3.js, Firebase",
        icon: Database,
        color: "text-amber-400",
        bg: "bg-amber-500/10"
    }
];

export function StarterKits() {
    const { data: session } = useSession();

    const handleDownload = (title: string) => {
        toast.success(`Downloading ${title}...`);
        // Actual download logic would go here
    };

    return (
        <section id="starter-kits" className="py-24 px-6 border-t border-white/5 relative bg-black/50">
            <div className="max-w-6xl mx-auto mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
                    Don&apos;t start from scratch.
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Get a head start with our pro-grade architectural templates. Included free with every account.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                {KITS.map((kit, i) => (
                    <div key={i} className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all hover:-translate-y-1">
                        <div className={`w-12 h-12 rounded-lg ${kit.bg} flex items-center justify-center mb-6`}>
                            <kit.icon className={`w-6 h-6 ${kit.color}`} />
                        </div>

                        <h3 className="text-xl font-bold mb-2">{kit.title}</h3>
                        <p className="text-sm text-muted-foreground mb-6">{kit.tech}</p>

                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full border border-black bg-white/20 flex items-center justify-center">
                                    <Github className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Included in starter pack
                            </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                            {session ? (
                                <Button className="gap-2 bg-white text-black hover:bg-white/90" onClick={() => handleDownload(kit.title)}>
                                    <Download className="w-4 h-4" /> Download Kit
                                </Button>
                            ) : (
                                <Button variant="secondary" className="gap-2" asChild>
                                    <Link href="/auth/signup?ref=kit_download">
                                        <Lock className="w-4 h-4" /> Sign up to Download
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {!session && (
                <div className="mt-12 text-center">
                    <Button variant="outline" className="border-white/10" asChild>
                        <Link href="/auth/signup">
                            View all 50+ Templates <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            )}
        </section>
    );
}
