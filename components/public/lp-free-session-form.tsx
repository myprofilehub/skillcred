"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitLead } from "@/app/actions/submit-lead";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function LpFreeSessionForm({ trackName, accentColor = "purple" }: { trackName: string, accentColor?: string }) {
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
        const context = `Free Session Registration: ${trackName} | Source: ${utms.source} | Medium: ${utms.medium} | Campaign: ${utms.campaign} | GCLID: ${utms.gclid}`;
        formData.append("track", context);

        try {
            const res = await submitLead(formData);
            if (res.success) {
                // Fire Specific Free Session Conversion Events
                if (typeof window !== 'undefined') {
                    if ((window as any).gtag) {
                        (window as any).gtag('event', 'free_session_registration', { 'send_to': 'AW-18351240110/nkIlCIC7vNwcEK7nxq5E' });
                    }
                    if ((window as any).fbq) {
                        (window as any).fbq('trackCustom', 'FreeSessionRegister');
                    }
                }
                router.push("/thank-you");
            } else {
                toast.error(res.error || "Failed to register.");
                setIsLoading(false);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="fs-name" className="text-slate-900 dark:text-white font-semibold">Full Name</Label>
                <Input id="fs-name" name="name" required placeholder="John Doe" className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-slate-400" />
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="fs-email" className="text-slate-900 dark:text-white font-semibold">Email Address</Label>
                <Input id="fs-email" name="email" type="email" required placeholder="john@example.com" className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-slate-400" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="fs-phone" className="text-slate-900 dark:text-white font-semibold">Phone Number</Label>
                <Input id="fs-phone" name="phone" type="tel" required placeholder="+91 9876543210" className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-slate-400" />
            </div>

            <Button 
                type="submit" 
                className={`w-full mt-4 bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white font-bold h-12 text-lg shadow-lg shadow-${accentColor}-500/20`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>Reserve my free seat <ArrowRight className="w-5 h-5 ml-2" /></>
                )}
            </Button>
        </form>
    );
}
