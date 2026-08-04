import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MessageSquare, Award } from "lucide-react";

export function MentorAssessmentSummary() {
    return (
        <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center max-w-4xl mx-auto">
                <Badge variant="outline" className="mb-6 border-emerald-500/50 text-emerald-600 bg-emerald-500/10 px-4 py-1">
                    HOW YOU ARE ASSESSED
                </Badge>
                
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                    Mentor-Verified Portfolio
                </h2>
                
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                    We do not grade you on completing coursework or passing multiple-choice exams. 
                    Every project you build is reviewed by an industry mentor. You earn your certificate by successfully defending your code, architecture, and design decisions in a live technical review.
                </p>

                <div className="grid md:grid-cols-3 gap-6 text-left">
                    <div className="bg-white/5 p-6 rounded-xl border border-border/50">
                        <MessageSquare className="w-8 h-8 text-emerald-500 mb-4" />
                        <h4 className="font-bold mb-2">Live Code Defense</h4>
                        <p className="text-sm text-muted-foreground">
                            Defend your architectural choices just like a real engineering interview.
                        </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-border/50">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-4" />
                        <h4 className="font-bold mb-2">Code Quality Checks</h4>
                        <p className="text-sm text-muted-foreground">
                            Mentors review your PRs for readability, structure, and best practices.
                        </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-border/50">
                        <Award className="w-8 h-8 text-emerald-500 mb-4" />
                        <h4 className="font-bold mb-2">Verified Proof of Work</h4>
                        <p className="text-sm text-muted-foreground">
                            Graduate with a portfolio of projects that a senior engineer has explicitly signed off on.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
