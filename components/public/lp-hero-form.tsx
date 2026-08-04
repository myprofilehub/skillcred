"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitLead } from "@/app/actions/submit-lead";
import { Loader2, ArrowRight } from "lucide-react";
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
                // Redirect to thank you page on success
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
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-md mx-auto relative overflow-hidden">
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${accentColor}-500/20 blur-[50px] -z-10`} />
            
            <h3 className="text-2xl font-bold font-heading mb-2 text-white">Apply Now</h3>
            <p className="text-slate-300 text-sm mb-6">Enter your details to get the curriculum and speak with an advisor.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2 text-left">
                    <Label htmlFor="name" className="text-white">Full Name <span className="text-red-400">*</span></Label>
                    <Input id="name" name="name" required placeholder="John Doe" className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-white/40" />
                </div>
                
                <div className="space-y-2 text-left">
                    <Label htmlFor="email" className="text-white">Email Address <span className="text-red-400">*</span></Label>
                    <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-white/40" />
                </div>

                <div className="space-y-2 text-left">
                    <Label htmlFor="phone" className="text-white">Phone Number <span className="text-red-400">*</span></Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="+91 9876543210" className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-white/40" />
                </div>

                <Button 
                    type="submit" 
                    className={`w-full mt-2 bg-${accentColor}-500 hover:bg-${accentColor}-600 text-white font-bold h-12 text-lg shadow-lg shadow-${accentColor}-500/20`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>Get Started <ArrowRight className="w-5 h-5 ml-2" /></>
                    )}
                </Button>
            </form>
            
            <p className="text-xs text-center text-slate-400 mt-4">
                By submitting this form, you agree to our Terms and Privacy Policy.
            </p>
        </div>
    );
}
