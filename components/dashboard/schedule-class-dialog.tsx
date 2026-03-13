"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClassEvent } from "@/app/actions/google-classroom";
import { Loader2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScheduleClassDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    courseId: string;
    courseName: string;
    calendarId?: string; // If course has specific calendar
}

export function ScheduleClassDialog({ open, onOpenChange, courseId, courseName, calendarId = "primary" }: ScheduleClassDialogProps) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const [summary, setSummary] = useState(`Live Class: ${courseName}`);
    const [description, setDescription] = useState("Topic: \nAgenda:");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const startDateTime = new Date(`${date}T${startTime}:00`).toISOString();
        const endDateTime = new Date(`${date}T${endTime}:00`).toISOString();

        try {
            const result = await createClassEvent(calendarId, {
                summary,
                description,
                startTime: startDateTime,
                endTime: endDateTime
            });

            if (result?.error) {
                toast({
                    title: "Error",
                    description: result.error,
                    variant: "destructive"
                });
            } else {
                toast({
                    title: "Success",
                    description: "Class scheduled and Meet link created!",
                });
                onOpenChange(false);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to schedule class",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Schedule Live Class</DialogTitle>
                    <DialogDescription>
                        Create a Google Calendar event with a Meet link for {courseName}.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="summary">Class Title</Label>
                        <Input
                            id="summary"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="start">Start Time</Label>
                            <Input
                                id="start"
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="end">End Time</Label>
                            <Input
                                id="end"
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Agenda / Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="gap-2">
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calendar className="h-4 w-4" />}
                            Schedule Class
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
