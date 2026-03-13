"use client";

import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles } from "lucide-react";

interface UpgradeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogHeader>
                <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <DialogTitle className="text-2xl text-center">Upgrade to Pro</DialogTitle>
                <DialogDescription className="text-center">
                    Unlock the full potential of your career with SkillCred Pro.
                </DialogDescription>
            </DialogHeader>
            <div className="py-6 space-y-4">
                {[
                    "Unlimited Project Verifications",
                    "1:1 Mentorship Sessions",
                    "Official Certifications",
                    "HR Visibility & Job Referrals",
                    "Auto-built Portfolio"
                ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                    </div>
                ))}
            </div>
            <DialogFooter className="flex-col sm:flex-col gap-2">
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 border-0 h-10 text-base">
                    Upgrade Now - $9.99/mo
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => onOpenChange(false)}>
                    Maybe Later
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
