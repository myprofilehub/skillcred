"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitLead } from "@/app/actions/submit-lead";
import { Loader2, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function LpHeroForm({ trackName, accentColor = "orange" }: { trackName: string, accentColor?: string }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    // UTM Parameters
    const [utms, setUtms] = useState({
        source: "",
        medium: "",
        campaign: "",
        gclid: ""
    });

    useEffect(() => {
        setUtms({
            source: searchParams.get("utm_source") || "",
            medium: searchParams.get("utm_medium") || "",
            campaign: searchParams.get("utm_campaign") || "",
            gclid: searchParams.get("gclid") || ""
        });
    }, [searchParams]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        
        // Append context and tracking info
        const context = `Landing Page: ${trackName} | Source: ${utms.source} | Medium: ${utms.medium} | Campaign: ${utms.campaign} | GCLID: ${utms.gclid}`;
        formData.append("track", context);

        try {
            const res = await submitLead(formData);
            if (res.success) {
                router.push("/thank-you");
            } else {
                toast.error(res.error || "Failed to submit request.");
                setIsLoading(false);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-md mx-auto relative overflow-hidden text-left z-20">
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${accentColor}-500/10 blur-[40px] -z-10`} />
            
            {/* Pricing / Value Prop Block */}
            <div className="mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className={`w-5 h-5 text-${accentColor}-500`} />
                    <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pilot Cohort Pricing</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                    Lock Seat for ₹500
                </h3>
                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Full Program Fee: ₹18,000 (Discounted)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Includes Live Mentor Support</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Guaranteed Project Verification</li>
                </ul>
            </div>
            
            <h3 className="text-xl font-bold font-heading mb-2 text-slate-900 dark:text-white">Apply Now</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Enter your details to get the curriculum and speak with an advisor about enrollment.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-900 dark:text-white font-semibold">Full Name <span className="text-red-500">*</span></Label>
                    <Input id="name" name="name" required placeholder="John Doe" className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-slate-400" />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-900 dark:text-white font-semibold">Email Address <span className="text-red-500">*</span></Label>
                    <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-slate-400" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-900 dark:text-white font-semibold">Phone Number <span className="text-red-500">*</span></Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="+91 9876543210" className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-slate-400" />
                </div>

                <Button 
                    type="submit" 
                    className={`w-full mt-4 bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white font-bold h-12 text-lg shadow-lg shadow-${accentColor}-500/20`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>Get the Curriculum <ArrowRight className="w-5 h-5 ml-2" /></>
                    )}
                </Button>
            </form>
            
            <p className="text-[10px] text-center text-slate-400 mt-4">
                By submitting this form, you agree to our Terms and Privacy Policy.
            </p>
        </div>
    );
}
