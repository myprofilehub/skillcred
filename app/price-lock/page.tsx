'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LandingNavbar } from "@/components/landing/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Shield, CheckCircle2, ArrowRight, Loader2, Sparkles, Clock, CreditCard } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RequestCallbackModal } from "@/components/public/request-callback-modal";

const programs = [
    {
        name: "Product Engineering",
        slug: "standard",
        duration: "7–8 Weeks",
        color: "purple",
        pilotPrice: "₹9,999",
        patPrice: "₹12,999",
        streams: ["Full Stack Dev", "AI/ML", "Mobile Dev"],
    },
    {
        name: "Data & Platform Engineering",
        slug: "fast-track",
        duration: "5–6 Weeks",
        color: "blue",
        pilotPrice: "₹6,999",
        patPrice: "₹9,499",
        streams: ["DevOps & Cloud", "Data Eng", "Data Science"],
    },
    {
        name: "Embedded & Security Engineering",
        slug: "capstone",
        duration: "4–5 Weeks",
        color: "green",
        pilotPrice: "₹4,999",
        patPrice: "₹6,999",
        streams: ["Cybersecurity", "IoT & Embedded"],
    },
];

const colorClasses: Record<string, { border: string; bg: string; text: string; glow: string; button: string }> = {
    purple: { border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-400", glow: "shadow-purple-500/20", button: "from-purple-600 to-violet-600" },
    blue: { border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-400", glow: "shadow-blue-500/20", button: "from-blue-600 to-cyan-600" },
    green: { border: "border-green-500/30", bg: "bg-green-500/10", text: "text-green-400", glow: "shadow-green-500/20", button: "from-green-600 to-emerald-600" },
};

export default function PriceLockPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleLockPrice = async (programName: string) => {
        // Check if user is logged in
        if (!session?.user) {
            // Redirect to login with callback to this page
            router.push(`/auth/login?callbackUrl=/price-lock`);
            return;
        }

        setSelectedProgram(programName);
        setIsPaymentLoading(true);

        try {
            const res = await initializeRazorpay();
            if (!res) {
                toast.error('Payment SDK failed to load. Are you online?');
                setIsPaymentLoading(false);
                return;
            }

            // Create order for ₹500
            const orderResponse = await fetch('/api/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 500 }),
            });

            const orderData = await orderResponse.json();
            if (!orderResponse.ok || !orderData.id) {
                toast.error('Could not initialize payment. Please try again.');
                setIsPaymentLoading(false);
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'SkillCred',
                description: `Price Lock Deposit — ${programName}`,
                order_id: orderData.id,
                handler: async function (response: any) {
                    // Payment successful — send lead notification
                    try {
                        const formData = new FormData();
                        formData.append('name', session.user?.name || session.user?.username || 'Price Lock User');
                        formData.append('email', session.user?.email || '');
                        formData.append('phone', 'Via Razorpay');
                        formData.append('track', `💰 PRICE LOCK DEPOSIT — ${programName}`);
                        
                        const { submitLead } = await import('@/app/actions/submit-lead');
                        await submitLead(formData);
                    } catch (e) {
                        console.error('Lead notification error:', e);
                    }
                    
                    toast.success('🎉 Your pilot price is locked! We\'ll be in touch soon.');
                    setIsPaymentLoading(false);
                    setSelectedProgram(null);
                },
                prefill: {
                    name: session.user?.name || session.user?.username || '',
                    email: session.user?.email || '',
                },
                theme: {
                    color: '#10b981'
                }
            };

            // @ts-ignore
            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function () {
                toast.error('Payment failed. Please try again.');
                setIsPaymentLoading(false);
                setSelectedProgram(null);
            });
            paymentObject.open();
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
            setIsPaymentLoading(false);
            setSelectedProgram(null);
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            <LandingNavbar />

            {/* HERO */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[128px] opacity-30 animate-pulse" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <Badge variant="outline" className="mb-6 border-emerald-500/30 text-emerald-400 bg-emerald-500/10 px-4 py-1 text-sm uppercase tracking-wider">
                        <Lock className="w-3.5 h-3.5 mr-1.5" /> Limited Time · Pilot Pricing
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Lock Pilot Pricing <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Forever</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
                        Pay a refundable ₹500 deposit today and lock the current pilot price — even when regular pricing kicks in after launch.
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mt-8">
                        <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-400" /> 100% Refundable</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-400" /> Adjusted in Final Fee</span>
                        <span className="flex items-center gap-1.5"><CreditCard className="w-4 h-4 text-emerald-400" /> Secure Razorpay</span>
                    </div>
                </div>
            </section>

            {/* PRICING COMPARISON */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-6">
                        {programs.map((program) => {
                            const colors = colorClasses[program.color];
                            const isLoading = isPaymentLoading && selectedProgram === program.name;
                            return (
                                <Card key={program.slug} className={`relative overflow-hidden bg-background ${colors.border} hover:shadow-lg ${colors.glow} transition-all duration-300`}>
                                    {/* Glow */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} blur-3xl rounded-full -top-10 -right-10`} />
                                    
                                    <CardContent className="p-6 relative z-10">
                                        {/* Program Name */}
                                        <h3 className="text-lg font-bold mb-1">{program.name}</h3>
                                        <p className="text-xs text-muted-foreground mb-4">{program.duration} · {program.streams.join(", ")}</p>

                                        
                                        
                                        {/* Price Comparison */}
                                        <div className="space-y-3 mb-6">
                                            <div className={`flex items-center justify-between p-3 rounded-lg ${colors.bg} ${colors.border}`}>
                                                <span className="text-sm text-muted-foreground">Standalone Cohort</span>
                                                <span className={`text-lg font-bold ${colors.text}`}>{program.pilotPrice}</span>
                                            </div>
                                            <div className={`flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20`}>
                                                <span className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> With PAT Credential</span>
                                                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{program.patPrice}</span>
                                            </div>
                                        </div>

                                        {/* Lock Button */}
                                        <Button
                                            onClick={() => handleLockPrice(program.name)}
                                            disabled={isPaymentLoading}
                                            className={`w-full h-12 text-sm font-bold bg-gradient-to-r ${colors.button} hover:opacity-90 text-white shadow-lg ${colors.glow} transition-all`}
                                        >
                                            {isLoading ? (
                                                <Loader2 className="animate-spin mr-2 w-4 h-4" />
                                            ) : (
                                                <Lock className="mr-2 w-4 h-4" />
                                            )}
                                            {isLoading ? 'Processing...' : 'Lock My Price — ₹500'}
                                        </Button>

                                        <p className="text-[11px] text-muted-foreground text-center mt-3">
                                            ₹500 deposit · Adjusted in your final enrollment fee
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-20 bg-secondary/20 border-y border-white/5">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-12">How Price Lock Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "1", title: "Pay ₹500 Deposit", desc: "Choose your program and pay a fully refundable ₹500 deposit via Razorpay." },
                            { step: "2", title: "Price Locked Forever", desc: "Your pilot price is locked. Even when prices increase after launch, your rate stays." },
                            { step: "3", title: "Enroll When Ready", desc: "When you're ready to start, your ₹500 is adjusted against the final fee. No pressure, no deadline." },
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg mb-4">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: "Is the ₹500 deposit refundable?", a: "Yes, 100% refundable if you decide not to enroll. No questions asked." },
                            { q: "What happens to the ₹500 when I enroll?", a: "It's adjusted against your final enrollment fee. So you effectively pay ₹500 less." },
                            { q: "How long is the price locked for?", a: "Forever. Once locked, your pilot rate stays regardless of future price changes." },
                            { q: "Do I need to enroll immediately after paying?", a: "No. You can enroll whenever you're ready. The locked price has no expiry." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-xl bg-secondary/30 border border-white/5">
                                <h3 className="font-bold mb-2 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                    {item.q}
                                </h3>
                                <p className="text-sm text-muted-foreground ml-6">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-3xl text-center border border-emerald-500/20 rounded-3xl bg-emerald-500/5 p-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Don't Miss Pilot Pricing</h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                        Lock your rate now with just ₹500. Fully refundable, zero risk, unlimited upside.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <Lock className="mr-2 w-5 h-5" /> Lock My Price
                        </Button>
                        <RequestCallbackModal>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 cursor-pointer">
                                Request a Callback <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </RequestCallbackModal>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
