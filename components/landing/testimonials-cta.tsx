"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Quote } from "lucide-react";

export function TestimonialsCTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Testimonials */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading">Student Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            name: "Alex R.",
                            role: "AI Engineer @ TechCorp",
                            text: "SkillCred's verified projects were the main reason I got hired. The mentor feedback was invaluable."
                        },
                        {
                            name: "Sarah M.",
                            role: "Full Stack Dev @ StartupX",
                            text: "The portfolio I built here was way better than my resume. HRs actually looked at my code."
                        },
                        {
                            name: "James L.",
                            role: "Cybersecurity Analyst",
                            text: "I moved from IT support to Cybersecurity thanks to the hands-on labs and mentor guidance."
                        }
                    ].map((t, i) => (
                        <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                            <CardContent className="pt-6">
                                <Quote className="h-8 w-8 text-primary/40 mb-4" />
                                <p className="text-muted-foreground mb-6 italic">"{t.text}"</p>
                                <div>
                                    <h4 className="font-bold">{t.name}</h4>
                                    <p className="text-sm text-primary">{t.role}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl p-12 border border-primary/20">
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                    Ready to Launch Your Career?
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                    Join thousands of students building real-world projects and getting hired by top companies.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto" asChild>
                        <Link href="/register">Start Learning Now</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto" asChild>
                        <Link href="/corp">Hire Talent</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
