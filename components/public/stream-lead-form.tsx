"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { submitLead } from "@/app/actions/submit-lead";
import { CheckCircle2, Loader2, ArrowRight, PhoneCall, Clock } from "lucide-react";

interface StreamLeadFormProps {
    trackName: string;
    accentColor?: string;
    variant?: "default" | "borderless";
}

const colorMap: Record<string, string> = {
    purple: "bg-purple-600 hover:bg-purple-700",
    cyan: "bg-cyan-600 hover:bg-cyan-700",
    orange: "bg-orange-600 hover:bg-orange-700",
    green: "bg-green-600 hover:bg-green-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
    yellow: "bg-yellow-600 hover:bg-yellow-700",
    pink: "bg-pink-600 hover:bg-pink-700",
};

export function StreamLeadForm({ trackName, accentColor = "purple", variant = "default" }: StreamLeadFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const buttonClass = colorMap[accentColor] || colorMap.purple;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        const formData = new FormData(e.currentTarget);
        
        const time = formData.get("time") as string || "Any time";
        formData.set("track", `Callback Request - ${trackName} (Time: ${time})`);
        
        try {
            const res = await submitLead(formData);
            if (res?.error) {
                setErrorMessage(res.error);
                setStatus("error");
            } else {
                setStatus("success");
            }
        } catch (err) {
            setErrorMessage("Failed to submit callback request.");
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <Card className={`w-full max-w-md mx-auto ${variant === 'borderless' ? 'border-0 shadow-none bg-transparent' : 'border-emerald-500/20 bg-emerald-500/5'}`}>
                <CardContent className="pt-6 pb-6 text-left space-y-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-900">Callback Requested!</h3>
                        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                            Thank you! One of our engineering career advisors will call you within 24 hours to discuss the <strong>{trackName}</strong> curriculum, answer your questions, and guide you on enrollment.
                        </p>
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-2 border-slate-200 text-slate-700 hover:bg-slate-100"
                        onClick={() => setStatus("idle")}
                    >
                        Request Another Callback
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={`w-full max-w-md mx-auto ${variant === 'borderless' ? 'border-0 shadow-none bg-transparent' : 'border-border/50 bg-background/50 backdrop-blur-sm shadow-xl'}`}>
            {variant !== 'borderless' && (
                <CardHeader className="pb-4 text-left">
                    <CardTitle className="text-xl flex items-center gap-2">
                        <PhoneCall className="w-5 h-5 text-purple-600" />
                        <span>Request a Callback</span>
                    </CardTitle>
                    <CardDescription>
                        Speak directly with our career advisors about {trackName}.
                    </CardDescription>
                </CardHeader>
            )}
            <CardContent className={variant === 'borderless' ? 'px-0 pb-0 pt-0' : ''}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name <span className="text-red-500">*</span></Label>
                            <Input 
                                id="name"
                                name="name" 
                                placeholder="John Doe" 
                                required 
                                disabled={status === "loading"}
                                className="bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500 h-10"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="phone" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Phone Number <span className="text-red-500">*</span></Label>
                            <Input 
                                id="phone"
                                name="phone" 
                                type="tel" 
                                placeholder="+91 98765 43210" 
                                required 
                                disabled={status === "loading"}
                                className="bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500 h-10"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address <span className="text-red-500">*</span></Label>
                        <Input 
                            id="email"
                            name="email" 
                            type="email" 
                            placeholder="john@example.com" 
                            required 
                            disabled={status === "loading"}
                            className="bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500 h-10"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="time" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            <span>Preferred Callback Time</span>
                        </Label>
                        <select 
                            id="time" 
                            name="time"
                            disabled={status === "loading"} 
                            className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm text-slate-900 dark:text-white ring-offset-background placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                        >
                            <option value="Morning 9-12">Morning (9 AM - 12 PM)</option>
                            <option value="Afternoon 12-4">Afternoon (12 PM - 4 PM)</option>
                            <option value="Evening 4-8">Evening (4 PM - 8 PM)</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Additional Questions / Context (Optional)</Label>
                        <Textarea 
                            id="message" 
                            name="message" 
                            disabled={status === "loading"}
                            placeholder="Tell us your current background or any specific questions..." 
                            className="bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-500 resize-none min-h-[80px]"
                        />
                    </div>

                    {status === "error" && (
                        <p className="text-sm text-red-600 font-medium text-left">{errorMessage}</p>
                    )}

                    <Button 
                        type="submit" 
                        className={`w-full h-11 font-bold text-white shadow-md ${buttonClass}`}
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                Request a Callback
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
