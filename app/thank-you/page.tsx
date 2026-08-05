"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
    useEffect(() => {
        // Fire Google Ads Conversion Event for Callback/Lead Form Submit
        if (typeof window !== 'undefined' && (window as any).gtag) {
            const conversionTarget = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL 
                ? `AW-18351240110/${process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL}` 
                : 'AW-18351240110/nkIlCIC7vNwcEK7nxq5E';
            (window as any).gtag('event', 'conversion', {
                'send_to': conversionTarget,
                'value': 1.0,
                'currency': 'INR'
            });
        }
    }, []);

    return (
        <main className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-8 text-center shadow-2xl">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <h1 className="text-3xl font-bold font-heading mb-4 text-slate-900 dark:text-white">
                    Application Received!
                </h1>
                
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                    Thank you for your interest in SkillCred. An admissions advisor will review your application and contact you within 24 hours to discuss your career goals.
                </p>

                <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-xl">
                    <Link href="/">
                        Return to Homepage <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </Button>
            </div>
        </main>
    );
}
