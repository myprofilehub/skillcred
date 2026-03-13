"use client";

import { useState, useEffect } from "react";
import { getInvestorProfile } from "@/app/actions/investor-actions";
import { updatePitchStatus } from "@/app/actions/pitch-actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Calendar, Video, CheckCircle2, XCircle, ExternalLink, Mail, Sparkles } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

export default function InvestorPitchesPage() {
    const [pitches, setPitches] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPitch, setSelectedPitch] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Scheduling State
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");
    const [meetingLink, setMeetingLink] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadPitches();
    }, []);

    const loadPitches = async () => {
        const result = await getInvestorProfile();
        if (result.investor) {
            setPitches(result.investor.pitchRequests || []);
        }
        setIsLoading(false);
    };

    const handleSchedule = async () => {
        if (!selectedPitch || !scheduleDate || !scheduleTime || !meetingLink) {
            toast.error("Please fill in all scheduling details");
            return;
        }

        setIsSubmitting(true);
        try {
            const dateTime = new Date(`${scheduleDate}T${scheduleTime}`);
            const result = await updatePitchStatus(selectedPitch, "SCHEDULED", {
                notes,
                scheduledAt: dateTime.toISOString(),
                meetingLink
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Pitch scheduled successfully!");
                setIsDialogOpen(false);
                loadPitches();
                resetForm();
            }
        } catch (error) {
            toast.error("Failed to schedule pitch");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDecline = async (pitchId: string) => {
        if (!confirm("Are you sure you want to decline this pitch?")) return;

        const result = await updatePitchStatus(pitchId, "DECLINED");
        if (result.success) {
            toast.success("Pitch declined");
            loadPitches();
        } else {
            toast.error("Failed to decline");
        }
    };

    const resetForm = () => {
        setScheduleDate("");
        setScheduleTime("");
        setMeetingLink("");
        setNotes("");
        setSelectedPitch(null);
    };

    const pendingPitches = pitches.filter(p => p.status === "PENDING" || p.status === "REVIEWED");
    const scheduledPitches = pitches.filter(p => p.status === "SCHEDULED" || p.status === "ACCEPTED");
    const pastPitches = pitches.filter(p => p.status === "DECLINED" || p.status === "COMPLETED");

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                    <Sparkles className="w-7 h-7 text-amber-400" />
                    Pitch Requests
                </h1>
                <p className="text-neutral-400">Manage and schedule incoming startup pitches</p>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-amber-400" /></div>
            ) : (
                <Tabs defaultValue="pending">
                    <TabsList className="bg-neutral-900 border border-amber-500/10">
                        <TabsTrigger value="pending" className="data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-400">
                            Pending ({pendingPitches.length})
                        </TabsTrigger>
                        <TabsTrigger value="scheduled" className="data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-400">
                            Scheduled ({scheduledPitches.length})
                        </TabsTrigger>
                        <TabsTrigger value="history" className="data-[state=active]:bg-amber-500/15 data-[state=active]:text-amber-400">
                            History
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pending" className="space-y-4 mt-4">
                        {pendingPitches.length === 0 ? (
                            <div className="text-center py-12 text-neutral-500 border rounded-lg border-dashed border-amber-500/20 bg-neutral-900/50">
                                No pending pitch requests.
                            </div>
                        ) : (
                            pendingPitches.map((pitch) => (
                                <PitchCard
                                    key={pitch.id}
                                    pitch={pitch}
                                    onSchedule={() => {
                                        setSelectedPitch(pitch.id);
                                        setIsDialogOpen(true);
                                    }}
                                    onDecline={() => handleDecline(pitch.id)}
                                />
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="scheduled" className="space-y-4 mt-4">
                        {scheduledPitches.length === 0 ? (
                            <div className="text-center py-12 text-neutral-500 border rounded-lg border-dashed border-amber-500/20 bg-neutral-900/50">
                                No scheduled pitches.
                            </div>
                        ) : (
                            scheduledPitches.map((pitch) => (
                                <PitchCard key={pitch.id} pitch={pitch} isScheduled />
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="history" className="space-y-4 mt-4">
                        {pastPitches.length === 0 ? (
                            <div className="text-center py-12 text-neutral-500 border rounded-lg border-dashed border-amber-500/20 bg-neutral-900/50">
                                No past pitches.
                            </div>
                        ) : (
                            pastPitches.map((pitch) => (
                                <PitchCard key={pitch.id} pitch={pitch} isHistory />
                            ))
                        )}
                    </TabsContent>
                </Tabs>
            )}

            {/* Schedule Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
            }}>
                <DialogContent className="bg-neutral-900 border-amber-500/20 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-white">Schedule Pitch Presentation</DialogTitle>
                        <DialogDescription className="text-neutral-400">
                            Set a time for the founder to present their deck.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Date</label>
                                <Input
                                    type="date"
                                    value={scheduleDate}
                                    onChange={(e) => setScheduleDate(e.target.value)}
                                    className="bg-neutral-800 border-amber-500/20 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Time</label>
                                <Input
                                    type="time"
                                    value={scheduleTime}
                                    onChange={(e) => setScheduleTime(e.target.value)}
                                    className="bg-neutral-800 border-amber-500/20 text-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">Meeting Link (GMeet/Zoom)</label>
                            <Input
                                placeholder="https://meet.google.com/..."
                                value={meetingLink}
                                onChange={(e) => setMeetingLink(e.target.value)}
                                className="bg-neutral-800 border-amber-500/20 text-white placeholder:text-neutral-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">Message to Founder (Optional)</label>
                            <Textarea
                                placeholder="Looking forward to it..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="bg-neutral-800 border-amber-500/20 text-white placeholder:text-neutral-500"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-amber-500/20 text-neutral-300 hover:bg-neutral-800">Cancel</Button>
                        <Button onClick={handleSchedule} disabled={isSubmitting} className="bg-amber-600 hover:bg-amber-700 text-white">
                            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                            Confirm Schedule
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function PitchCard({ pitch, onSchedule, onDecline, isScheduled, isHistory }: any) {
    return (
        <Card className="bg-neutral-900/80 border-amber-500/10 backdrop-blur-sm">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4 flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white">{pitch.showcase.title}</h3>
                                <p className="text-sm text-neutral-400">{pitch.showcase.tagline}</p>
                            </div>
                            <Badge variant="secondary" className={
                                pitch.status === "SCHEDULED" || pitch.status === "ACCEPTED" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" :
                                    pitch.status === "DECLINED" ? "bg-red-500/15 text-red-400 border-red-500/20" :
                                        "bg-amber-500/15 text-amber-400 border-amber-500/20"
                            }>
                                {pitch.status}
                            </Badge>
                        </div>

                        <div className="p-4 bg-neutral-800/50 rounded-lg text-sm border border-neutral-800">
                            <p className="font-medium mb-1 text-neutral-300">Founder Message:</p>
                            <p className="text-neutral-400">{pitch.message}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm">
                            {pitch.showcase.techStack?.slice(0, 3).map((tech: string) => (
                                <Badge key={tech} variant="outline" className="border-amber-500/20 text-amber-300">{tech}</Badge>
                            ))}
                        </div>

                        {isScheduled && (
                            <div className="flex items-center gap-4 text-sm font-medium text-amber-400 bg-amber-500/10 p-3 rounded-md border border-amber-500/20">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {pitch.scheduledAt && format(new Date(pitch.scheduledAt), "MMM d, h:mm a")}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Video className="w-4 h-4" />
                                    <a href={pitch.meetingLink} target="_blank" className="hover:underline">Join Meeting</a>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 min-w-[200px]">
                        <Button variant="outline" asChild className="w-full justify-start border-amber-500/20 text-neutral-300 hover:text-amber-300 hover:bg-amber-500/10">
                            <Link href={`/dashboard/student/portfolio/${pitch.studentId}`} target="_blank">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Founder Profile
                            </Link>
                        </Button>

                        {!isScheduled && !isHistory && (
                            <>
                                <Button className="w-full justify-start mt-4 bg-amber-600 hover:bg-amber-700 text-white" onClick={onSchedule}>
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Schedule Interview
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={onDecline}>
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Decline Request
                                </Button>
                            </>
                        )}

                        {isHistory && (
                            <div className="mt-4 text-sm text-neutral-500">
                                {pitch.status === "DECLINED" ? "Request declined." : "Pitch completed."}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
