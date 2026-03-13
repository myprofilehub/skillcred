"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Lock,
    Unlock,
    Trophy,
    CheckCircle2,
    AlertCircle,
    FileText,
    Code,
    Video
} from "lucide-react";

export default function AssessmentPage() {
    // MOCKED STATUS
    const unlocked = false;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Project-Based Assessment Test (PAT)</h1>
                    <p className="text-muted-foreground">The final step to earning your verification and recommendation.</p>
                </div>
                {unlocked ? (
                    <Badge className="bg-green-500 text-black px-4 py-2">Assessment Unlocked</Badge>
                ) : (
                    <Badge variant="outline" className="border-red-500/30 text-red-500 bg-red-500/5 px-4 py-2">Locked</Badge>
                )}
            </div>

            {/* UNLOCK CRITERIA */}
            <div className="grid md:grid-cols-2 gap-8">
                <Card className={unlocked ? 'border-green-500/20' : 'border-white/10'}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {unlocked ? <Unlock className="w-5 h-5 text-green-500" /> : <Lock className="w-5 h-5 text-red-500" />}
                            Unlock Requirements
                        </CardTitle>
                        <CardDescription>You must meet all criteria to start the assessment.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { label: "All 5 Projects Verified", current: "2/5", done: false },
                            { label: "Attendance > 80%", current: "92%", done: true },
                            { label: "Mentor Approval Received", current: "Approved", done: true },
                            { label: "Security/Plagiarism Check", current: "Pending", done: false }
                        ].map((req, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded bg-secondary/20">
                                <div className="flex items-center gap-3">
                                    <div className={`p-1 rounded-full ${req.done ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                        {req.done ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                    </div>
                                    <span className="text-sm font-medium">{req.label}</span>
                                </div>
                                <span className={`text-xs ${req.done ? 'text-green-500' : 'text-muted-foreground'}`}>{req.current}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-white/10">
                    <CardHeader>
                        <CardTitle>Assessment Structure</CardTitle>
                        <CardDescription>What to expect in the 100-mark evaluation.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { title: "Project Defense", marks: "40", icon: FileText },
                                { title: "Vulnerability Fixes", marks: "20", icon: CheckCircle2 },
                                { title: "Live Usage Demo", marks: "30", icon: Video },
                                { title: "Viva Voce", marks: "10", icon: AlertCircle }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/50 border border-white/5 text-center">
                                    <item.icon className="w-6 h-6 mb-2 text-indigo-400" />
                                    <div className="font-bold text-lg">{item.marks}</div>
                                    <div className="text-xs text-muted-foreground">{item.title}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ACTION AREA */}
            <Card className="border-white/10 bg-secondary/5">
                <CardHeader>
                    <CardTitle>Ready to Start?</CardTitle>
                    <CardDescription>
                        {unlocked
                            ? "You are eligible. Schedule your live assessment slot now."
                            : "Complete the remaining requirements to unlock this section."}
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    {unlocked ? (
                        <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">Book Assessment Slot</Button>
                    ) : (
                        <Button size="lg" disabled className="w-full">Locked - Complete Requirements</Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
