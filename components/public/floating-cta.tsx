"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { LpHeroForm } from "@/components/public/lp-hero-form";
import { PhoneCall } from "lucide-react";

export function FloatingCta({ trackName, accentColor = "purple" }: { trackName: string, accentColor?: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center animate-in fade-in slide-in-from-bottom-10 duration-500">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button 
                        size="lg" 
                        className={`rounded-full h-14 px-6 shadow-2xl bg-${accentColor}-600 hover:bg-${accentColor}-700 text-white font-bold text-lg flex gap-2 items-center`}
                    >
                        <PhoneCall className="w-5 h-5" /> Request a Callback
                    </Button>
                </DialogTrigger>
                <DialogContent className="p-0 border-0 shadow-none bg-transparent sm:max-w-md w-[95vw] [&>button]:text-slate-500 [&>button]:top-4 [&>button]:right-4">
                    <DialogTitle className="sr-only">Request a Callback</DialogTitle>
                    <LpHeroForm trackName={trackName} accentColor={accentColor} formOnly={true} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
