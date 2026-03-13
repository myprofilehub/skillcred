"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Send, Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function ContactPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        toast({
            title: "Message Sent!",
            description: "We'll get back to you as soon as possible.",
        });

        // Reset form
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <LandingNavbar />

            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center space-y-6 max-w-3xl mx-auto mb-20">
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 px-4 py-1.5 mb-2">
                            Get In Touch
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tight">
                            Let's Build the <br />
                            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                                Future Together
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Have questions about our programs, enterprise partnerships, or looking to mentor? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-24">
                        {/* Contact Information */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                                <p className="text-slate-400">
                                    Fill out the form and our team will get back to you within 24 hours. Choose the specific department for faster routing.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Email</h4>
                                        <p className="text-slate-400 text-sm">support@skillcred.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Phone</h4>
                                        <p className="text-slate-400 text-sm">+91 (800) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Office</h4>
                                        <p className="text-slate-400 text-sm">Tech Park, Bangalore, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 relative overflow-hidden">
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-sm font-medium text-slate-300">First Name</label>
                                        <Input id="firstName" required className="bg-black/50 border-white/10 focus-visible:ring-emerald-500" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-sm font-medium text-slate-300">Last Name</label>
                                        <Input id="lastName" required className="bg-black/50 border-white/10 focus-visible:ring-emerald-500" placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</label>
                                    <Input id="email" type="email" required className="bg-black/50 border-white/10 focus-visible:ring-emerald-500" placeholder="john@example.com" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-slate-300">Subject</label>
                                    <select id="subject" className="flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50">
                                        <option value="general">General Inquiry</option>
                                        <option value="enterprise">Enterprise Partnerships (Colleges/HR)</option>
                                        <option value="mentorship">Become a Mentor</option>
                                        <option value="support">Technical Support</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                                    <Textarea id="message" required className="min-h-[120px] bg-black/50 border-white/10 focus-visible:ring-emerald-500" placeholder="How can we help you?" />
                                </div>

                                <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6">
                                    {loading ? "Sending..." : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" /> Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black border-t border-white/10 py-12 px-6">
                <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Logo width={100} height={30} />
                        <span>© 2026 SkillCred Inc.</span>
                    </div>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-emerald-400 transition-colors"><Twitter className="w-4 h-4" /></Link>
                        <Link href="#" className="hover:text-emerald-400 transition-colors"><Github className="w-4 h-4" /></Link>
                        <Link href="#" className="hover:text-emerald-400 transition-colors"><Linkedin className="w-4 h-4" /></Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
