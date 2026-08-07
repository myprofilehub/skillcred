"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLead } from "@/app/actions/submit-lead";
import { PhoneCall, Clock, CheckCircle2, Loader2, ArrowRight, BookOpen } from "lucide-react";

interface RequestCallbackModalProps {
    children?: React.ReactNode;
    triggerText?: string;
    buttonClassName?: string;
    buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link";
    buttonSize?: "default" | "sm" | "lg" | "icon";
    defaultProgram?: string;
}

export function RequestCallbackModal({
    children,
    triggerText = "Request a Callback",
    buttonClassName = "bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white font-bold shadow-md",
    buttonVariant = "default",
    buttonSize = "default",
    defaultProgram = "Not Sure Yet"
}: RequestCallbackModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const program = formData.get("program") as string || defaultProgram;
        const time = formData.get("time") as string || "Any time";

        formData.set("track", `Callback Request - ${program} (Time: ${time})`);

        try {
            const res = await submitLead(formData);
            if (res?.error) {
                setErrorMessage(res.error);
                setStatus("error");
            } else {
                setStatus("success");
                if (typeof window !== 'undefined') {
                    if ((window as any).gtag) {
                        (window as any).gtag('event', 'conversion', { 'send_to': 'AW-18351240110/nkIlCIC7vNwcEK7nxq5E' });
                    }
                    if ((window as any).fbq) {
                        (window as any).fbq('track', 'Lead');
                    }
                }
            }
        } catch (err) {
            setErrorMessage("Failed to submit request. Please try again.");
            setStatus("error");
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            // Reset state after slight delay on close
            setTimeout(() => {
                setStatus("idle");
                setErrorMessage("");
            }, 300);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant={buttonVariant} size={buttonSize} className={buttonClassName}>
                        <PhoneCall className="w-4 h-4 mr-2 shrink-0" />
                        <span>{triggerText}</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-lg p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-950 max-h-[90vh] overflow-y-auto">
                {status === "success" ? (
                    <div className="py-8 px-4 text-center space-y-5 flex flex-col items-center">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center shadow-inner">
                            <CheckCircle2 className="w-9 h-9" />
                        </div>
                        <div className="space-y-2 max-w-sm">
                            <h3 className="font-bold font-heading text-2xl text-foreground">We'll call you within 24 hours!</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Thank you for reaching out. One of our engineering career advisors will contact you shortly to discuss your learning goals and answer all your questions.
                            </p>
                        </div>
                        <Button 
                            className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-bold h-11 rounded-xl"
                            onClick={() => handleOpenChange(false)}
                        >
                            Done
                        </Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader className="space-y-2 pb-2">
                            <DialogTitle className="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2.5">
                                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                    <PhoneCall className="w-5 h-5" />
                                </div>
                                <span>Request a Callback</span>
                            </DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                                Choose your preferred time and speak directly with our engineering counselors about curriculum, mentor verification, and enrollment.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="modal-name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id="modal-name"
                                        name="name" 
                                        placeholder="John Doe" 
                                        required 
                                        disabled={status === "loading"}
                                        className="h-10 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-emerald-500"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="modal-phone" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Phone Number <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id="modal-phone"
                                        name="phone" 
                                        type="tel" 
                                        placeholder="+91 98765 43210" 
                                        required 
                                        disabled={status === "loading"}
                                        className="h-10 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-emerald-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="modal-email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address <span className="text-red-500">*</span></Label>
                                <Input 
                                    id="modal-email"
                                    name="email" 
                                    type="email" 
                                    placeholder="john@example.com" 
                                    required 
                                    disabled={status === "loading"}
                                    className="h-10 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-emerald-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="modal-program" className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                                        <span>Program of Interest</span>
                                    </Label>
                                    <select 
                                        id="modal-program" 
                                        name="program"
                                        defaultValue={defaultProgram}
                                        disabled={status === "loading"} 
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="Full Stack Development">Full Stack Development</option>
                                        <option value="AI & ML Engineering">AI & ML Engineering</option>
                                        <option value="Cybersecurity">Cybersecurity</option>
                                        <option value="Data Engineering">Data Engineering</option>
                                        <option value="Data Science & Analytics">Data Science & Analytics</option>
                                        <option value="DevOps & Cloud Engineering">DevOps & Cloud Engineering</option>
                                        <option value="IoT & Embedded Engineering">IoT & Embedded Engineering</option>
                                        <option value="Mobile App Development">Mobile App Development</option>
                                        <option value="Not Sure Yet">Not Sure Yet</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="modal-time" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                                    <span>Preferred Callback Time</span>
                                </Label>
                                <select 
                                    id="modal-time" 
                                    name="time"
                                    disabled={status === "loading"} 
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-white/5 px-3 py-2 text-sm text-slate-900 dark:text-white ring-offset-background placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                    >
                                        <option value="Morning 9-12">Morning (9 AM - 12 PM)</option>
                                        <option value="Afternoon 12-4">Afternoon (12 PM - 4 PM)</option>
                                        <option value="Evening 4-8">Evening (4 PM - 8 PM)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="modal-message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Additional Questions / Context (Optional)</Label>
                                <Textarea 
                                    id="modal-message" 
                                    name="message" 
                                    placeholder="Tell us your current background or any specific questions..." 
                                    className="min-h-[80px] bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-emerald-500 resize-none"
                                />
                            </div>

                            {status === "error" && (
                                <p className="text-sm text-red-500 font-medium text-left">{errorMessage}</p>
                            )}

                            <Button 
                                type="submit" 
                                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md rounded-xl transition-all duration-200 mt-2"
                                disabled={status === "loading"}
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Submitting Request...
                                    </>
                                ) : (
                                    <>
                                        Request a Callback
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
