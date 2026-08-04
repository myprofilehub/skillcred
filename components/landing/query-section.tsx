"use client";

import { HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StreamLeadForm } from "@/components/public/stream-lead-form";

export function QuerySection() {
    return (
        <section id="query-section" className="py-24 px-6 bg-amber-50 relative border-t border-amber-100">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-200/40 rounded-full blur-[100px]" />
                <div className="absolute top-10 right-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Info Side */}
                <div className="space-y-6">
                    <Badge variant="outline" className="border-amber-200 text-amber-700 bg-white px-4 py-1">
                        Got Questions?
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                        We're Here to <span className="text-amber-500">Help</span>
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Whether you want to know more about the ₹500 lock-in deposit, our engineering tracks, or enterprise hiring partnerships — drop us a message.
                    </p>
                    <div className="flex items-center gap-4 bg-white border border-slate-100 shadow-sm p-6 rounded-2xl mt-8">
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                            <HelpCircle className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900">Fast Response Times</h4>
                            <p className="text-sm text-slate-500">Our support team usually replies within 24 hours.</p>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative">
                    <StreamLeadForm trackName="General Query" accentColor="orange" variant="borderless" />
                </div>
            </div>
        </section>
    );
}
