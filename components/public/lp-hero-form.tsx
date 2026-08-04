"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitLead } from "@/app/actions/submit-lead";
import { Loader2, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function LpHeroForm({ trackName, accentColor = "orange" }: { trackName: string, accentColor?: string }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isDemoOpen, setIsDemoOpen] = useState(false);
    const [isWebinarLoading, setIsWebinarLoading] = useState(false);
    
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

    
    async function handleWebinarSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsWebinarLoading(true);

        const formData = new FormData(e.currentTarget);
        const context = `Webinar Registration: ${trackName} | Source: ${utms.source} | Medium: ${utms.medium} | Campaign: ${utms.campaign} | GCLID: ${utms.gclid}`;
        formData.append("track", context);

        try {
            const res = await submitLead(formData);
            if (res.success) {
                toast.success("Registered successfully! Check your email for the Zoom link.");
                setIsDemoOpen(false);
            } else {
                toast.error(res.error || "Failed to register.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsWebinarLoading(false);
        }
    }

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

    
    function getTrackTitle(name: string) {
        if (name.includes("Full Stack")) return "Become a Fullstack Engineer";
        if (name.includes("AI & ML")) return "Become an AI & ML Engineer";
        if (name.includes("Mobile")) return "Become a Mobile Engineer";
        if (name.includes("Data Science")) return "Become a Data Scientist";
        if (name.includes("Data Engineering")) return "Become a Data Engineer";
        if (name.includes("DevOps")) return "Become a Cloud/DevOps Engineer";
        if (name.includes("Cybersecurity")) return "Become a Security Engineer";
        if (name.includes("IoT")) return "Become an Embedded Engineer";
        return "Master Engineering";
    }

    const isProductEngineering = trackName.includes("Full Stack") || trackName.includes("AI & ML") || trackName.includes("Mobile");
    const isDataPlatform = trackName.includes("Data Science") || trackName.includes("Data Engineering") || trackName.includes("DevOps");
    const pricing = isProductEngineering ? "12,999" : (isDataPlatform ? "9,499" : "6,999");

    return (
        <div className="grid md:grid-cols-2 gap-8 items-stretch w-full max-w-4xl mx-auto relative z-20">
                        {/* Pricing Card */}
            <div className="bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden text-left flex flex-col justify-center">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${accentColor}-500/10 blur-[40px] -z-10`} />
                <div className="mb-2">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                        {getTrackTitle(trackName)}
                    </h2>
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className={`w-5 h-5 text-${accentColor}-500`} />
                        <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Cohort + PAT Bundle</span>
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                        ₹{pricing}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Program Pricing (Pilot Cohort)</p>
                    <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span>Includes Live Mentor Support</span></li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span>Every project mentor-verified before certification</span></li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span>100% Online Format</span></li>
                        <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span>Portfolio review and interview preparation. We do not guarantee placement.</span></li>
                    </ul>

                    <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 font-bold h-12 text-lg">
                                Request a Demo
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
                            <DialogHeader>
                                <DialogTitle>Register for Live Webinar</DialogTitle>
                                <DialogDescription>
                                    Join our next Open House to see a live walkthrough of the platform and curriculum.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleWebinarSubmit} className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="demo-name">Full Name</Label>
                                    <Input id="demo-name" name="name" required placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="demo-email">Email Address</Label>
                                    <Input id="demo-email" name="email" type="email" required placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="demo-phone">Phone Number</Label>
                                    <Input id="demo-phone" name="phone" type="tel" required placeholder="+91 9876543210" />
                                </div>
                                <Button type="submit" disabled={isWebinarLoading} className={`w-full bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white font-bold h-12`}>
                                    {isWebinarLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register Now"}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden text-left">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${accentColor}-500/10 blur-[40px] -z-10`} />
                
                <h3 className="text-xl font-bold font-heading mb-2 text-slate-900 dark:text-white">Apply Now</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Enter your details to speak with an advisor about enrollment.</p>

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

                    <div className="flex items-start space-x-2 pt-2">
                        <input type="checkbox" id="consent" name="consent" required className="mt-1 w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                        <Label htmlFor="consent" className="text-xs text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                            I agree to be contacted by phone and WhatsApp regarding this enquiry.
                        </Label>
                        <input type="hidden" name="consent_timestamp" value={new Date().toISOString()} />
                    </div>

                    <Button 
                        type="submit" 
                        className={`w-full mt-4 bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white font-bold h-12 text-lg shadow-lg shadow-${accentColor}-500/20`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>Request a Callback <ArrowRight className="w-5 h-5 ml-2" /></>
                        )}
                    </Button>
                </form>
                
                <p className="text-[10px] text-center text-slate-400 mt-4">
                    By submitting this form, you agree to our Terms and Privacy Policy.
                </p>
            </div>
        </div>
    );
}
