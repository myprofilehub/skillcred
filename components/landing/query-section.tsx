"use client";

import { useActionState } from "react";
import { submitQuery } from "@/app/actions/query-action";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
    error: null as string | null,
    success: false as boolean,
};

export function QuerySection() {
    const [state, formAction] = useActionState(submitQuery, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (state.success) {
            toast({
                title: "Message Sent!",
                description: "Your query has been successfully sent to our team. We'll be in touch soon.",
            });
            formRef.current?.reset();
        } else if (state.error) {
            toast({
                title: "Error",
                description: state.error,
                variant: "destructive",
            });
        }
    }, [state, toast]);

    return (
        <section id="query-section" className="py-24 px-6 bg-black relative border-t border-white/10">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute top-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Info Side */}
                <div className="space-y-6">
                    <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 px-4 py-1">
                        Got Questions?
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading">
                        We're Here to{" "}
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Help
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Whether you want to know more about our engineering streams, pricing, mentorship programs, or enterprise partnerships — drop us a message.
                    </p>
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl mt-8">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                            <HelpCircle className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white">Fast Response Times</h4>
                            <p className="text-sm text-slate-400">Our support team usually replies within 24 hours.</p>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl backdrop-blur-sm">
                    <form ref={formRef} action={formAction} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
                                <Input id="name" name="name" required className="bg-black/50 border-white/10 focus-visible:ring-indigo-500" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                                <Input id="email" name="email" type="email" required className="bg-black/50 border-white/10 focus-visible:ring-indigo-500" placeholder="john@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="inquiryType" className="text-sm font-medium text-slate-300">How can we help?</label>
                            <select id="inquiryType" name="inquiryType" required className="flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                                <option value="Course Inquiry">Course Inquiry</option>
                                <option value="Mentorship Details">Mentorship Details</option>
                                <option value="Enterprise / Hiring">Enterprise / Hiring</option>
                                <option value="General Questions">General Questions</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                            <Textarea id="message" name="message" required className="min-h-[120px] bg-black/50 border-white/10 focus-visible:ring-indigo-500" placeholder="Tell us what you need..." />
                        </div>

                        <SubmitButton />
                    </form>
                </div>
            </div>
        </section>
    );
}

import { useFormStatus } from "react-dom";
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 h-auto">
            {pending ? "Sending..." : (
                <>
                    <Send className="w-4 h-4 mr-2" /> Send Message
                </>
            )}
        </Button>
    )
}
