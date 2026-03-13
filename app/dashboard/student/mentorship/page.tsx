"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    MessageSquare,
    Calendar,
    Video,
    Clock,
    CheckCircle2,
    Award,
    Send,
    UserCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function MentorshipPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Mentor Interaction</h1>
                    <p className="text-muted-foreground">Connect with your mentor, book sessions, and get feedback.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* LEFT: Mentor Profile */}
                <Card className="lg:col-span-1 border-white/10 h-fit">
                    <CardHeader className="text-center pb-2">
                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px] mb-4">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                <UserCircle className="w-16 h-16 text-muted-foreground" />
                            </div>
                        </div>
                        <CardTitle className="text-xl">Sarah Miller</CardTitle>
                        <CardDescription>Senior Full Stack Developer</CardDescription>
                        <Badge variant="outline" className="mt-2 w-fit mx-auto border-green-500/30 text-green-400">Available Now</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Specialization</span>
                                <span>React, Node.js, AWS</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Language</span>
                                <span>English, Spanish</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Experience</span>
                                <span>8+ Years</span>
                            </div>
                        </div>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Schedule Session</Button>
                    </CardContent>
                </Card>

                {/* CENTRE: Tabs (Chat, Sessions, Feedback) */}
                <div className="lg:col-span-2 space-y-6">
                    <Tabs defaultValue="chat" className="space-y-6">
                        <TabsList className="bg-secondary/20 p-1 border border-white/5 w-full justify-start">
                            <TabsTrigger value="chat">Chat</TabsTrigger>
                            <TabsTrigger value="sessions">Sessions</TabsTrigger>
                            <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
                        </TabsList>

                        {/* CHAT TAB */}
                        <TabsContent value="chat">
                            <Card className="h-[500px] flex flex-col border-white/10">
                                <CardHeader className="border-b border-white/5 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="font-semibold text-sm">Live Chat</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {/* Messages Mock */}
                                    <div className="flex justify-start">
                                        <div className="bg-secondary/50 rounded-lg p-3 max-w-[80%] text-sm">
                                            Hi Alex, how is the E-Commerce project coming along?
                                            <div className="text-xs text-muted-foreground mt-1">10:30 AM</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-primary/20 text-primary-foreground rounded-lg p-3 max-w-[80%] text-sm border border-primary/20">
                                            Hi Sarah! Almost done. Just debugging the payment gateway integration.
                                            <div className="text-xs text-primary-foreground/70 mt-1">10:32 AM</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-secondary/50 rounded-lg p-3 max-w-[80%] text-sm">
                                            Great! Let me know if you get stuck via the Stripe webhook. We can look at it in our next session.
                                            <div className="text-xs text-muted-foreground mt-1">10:33 AM</div>
                                        </div>
                                    </div>
                                </CardContent>
                                <div className="p-4 border-t border-white/5">
                                    <div className="flex gap-2">
                                        <input
                                            className="flex-1 bg-background border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                                            placeholder="Type a message..."
                                        />
                                        <Button size="icon"><Send className="w-4 h-4" /></Button>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* SESSIONS TAB */}
                        <TabsContent value="sessions" className="space-y-4">
                            <Card className="border-white/10">
                                <CardHeader>
                                    <CardTitle>Upcoming Sessions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/5 border border-green-500/20 mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-green-500/10 rounded-full text-green-400">
                                                <Video className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold">Project 3 Verification Review</h4>
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Tomorrow, Feb 3</span>
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 4:00 PM (45 mins)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="border-green-500/30 hover:bg-green-500/10 text-green-400">Join Link</Button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/10 border border-white/5 opacity-75">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-secondary/20 rounded-full text-muted-foreground">
                                                <CheckCircle2 className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-muted-foreground">Weekly Progress Check-in</h4>
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">Jan 28, 2026</span>
                                                    <span className="flex items-center gap-1">Completed</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" disabled>View Notes</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* RECOMMENDATION TAB */}
                        <TabsContent value="recommendation">
                            <Card className="border-white/10">
                                <CardHeader>
                                    <CardTitle>Recommendation Letter Status</CardTitle>
                                    <CardDescription>Unlock your official recommendation letter by completing requirements.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Eligibility Progress</span>
                                            <span>60%</span>
                                        </div>
                                        <Progress value={60} className="h-2" />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            { label: "5/5 Projects Verified", done: false, status: "2/5 Done" },
                                            { label: "Attendance > 80%", done: true, status: "92%" },
                                            { label: "Assessment Passed", done: false, status: "Pending" },
                                            { label: "Mentor Approval", done: true, status: "Approved" }
                                        ].map((req, i) => (
                                            <div key={i} className={`p-4 rounded-lg border ${req.done ? 'bg-green-500/10 border-green-500/20' : 'bg-secondary/10 border-white/5'}`}>
                                                <div className="flex items-center justify-between mb-2">
                                                    {req.done ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Clock className="w-5 h-5 text-muted-foreground" />}
                                                    <span className={`text-xs ${req.done ? 'text-green-400' : 'text-muted-foreground'}`}>{req.status}</span>
                                                </div>
                                                <p className="font-medium text-sm">{req.label}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex gap-4 items-start">
                                        <Award className="w-6 h-6 text-yellow-500 shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-yellow-500 text-sm mb-1">Preview Message</h4>
                                            <p className="text-xs text-muted-foreground italic">
                                                "Alex has demonstrated exceptional skills in full-stack development... [Letter locked until requirements met]"
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
