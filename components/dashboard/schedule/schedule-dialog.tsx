"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Plus, Video, Loader2 } from "lucide-react";
import { scheduleClass } from "@/app/actions/schedule";
import { toast } from "sonner";

interface ScheduleDialogProps {
    classrooms: any[];
}

export function ScheduleDialog({ classrooms }: ScheduleDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function onSubmit(formData: FormData) {
        setLoading(true);
        try {
            const googleCourseId = formData.get("courseId") as string;
            const title = formData.get("title") as string;
            const date = formData.get("date") as string;
            const time = formData.get("time") as string;
            const duration = formData.get("duration") as string;
            const description = formData.get("description") as string;

            if (!googleCourseId) {
                toast.error("Please select a classroom batch.");
                setLoading(false);
                return;
            }

            // Combine Date and Time
            const dateTime = new Date(`${date}T${time}:00`);

            // Find the classroom internal ID if needed, but action takes googleCourseId
            const classroom = classrooms.find(c => c.id === googleCourseId);
            const internalId = classroom?.id; // This might be googleCourseId depending on data source

            const isRecurring = formData.get("recurring") === "on";
            const frequency = formData.get("frequency") as string;
            const recurrenceEnd = formData.get("recurrenceEnd") as string;

            const result = await scheduleClass({
                googleClassroomId: internalId || googleCourseId, // Fallback
                googleCourseId: googleCourseId,
                title,
                description,
                dateTime: dateTime.toISOString(),
                durationMinutes: parseInt(duration) || 60,
                recurrence: isRecurring ? {
                    frequency,
                    until: recurrenceEnd || undefined // If generic infinite recurrence is needed, handle undefined, but typically end date is good
                } : undefined
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Class scheduled successfully!");
                toast.success("Meet link bound to batch.");
                setOpen(false);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to schedule class.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" /> Schedule Class
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto border-white/10 bg-slate-950 text-white">
                <DialogHeader>
                    <DialogTitle>Schedule New Class</DialogTitle>
                    <DialogDescription>
                        Creates a Calendar Event and binds the Meet link to the batch.
                    </DialogDescription>
                </DialogHeader>
                <form action={onSubmit} className="space-y-4 mt-2">
                    <div className="space-y-2">
                        <Label>Select Batch</Label>
                        <Select name="courseId" required>
                            <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100 data-[placeholder]:text-slate-400 focus:ring-purple-500/50 focus:border-purple-500 h-11">
                                <SelectValue placeholder="Select Google Classroom" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                                {classrooms.map((c) => (
                                    <SelectItem key={c.id} value={c.id} className="focus:bg-purple-600 focus:text-white cursor-pointer">
                                        {c.name} {c.section ? `(${c.section})` : ""}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Class Title</Label>
                        <Input
                            name="title"
                            placeholder="e.g. React Hooks Deep Dive"
                            required
                            className="bg-white/5 border-white/10"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Date</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    name="date"
                                    type="date"
                                    required
                                    className="pl-9 bg-white/5 border-white/10"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Time</Label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    name="time"
                                    type="time"
                                    required
                                    className="pl-9 bg-white/5 border-white/10"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 border-t border-white/10 pt-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="recurring"
                                name="recurring"
                                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <Label htmlFor="recurring" className="font-normal cursor-pointer">Repeat this class (Recurring Event)</Label>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Frequency</Label>
                                <Select name="frequency" defaultValue="WEEKLY">
                                    <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100 h-11">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                                        <SelectItem value="DAILY" className="focus:bg-purple-600 focus:text-white cursor-pointer">Daily</SelectItem>
                                        <SelectItem value="WEEKLY" className="focus:bg-purple-600 focus:text-white cursor-pointer">Weekly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>End Date</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        name="recurrenceEnd"
                                        type="date"
                                        className="pl-9 bg-slate-900 border-slate-700 text-slate-100 h-11"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Duration (Minutes)</Label>
                        <Select name="duration" defaultValue="60">
                            <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100 h-11">
                                <SelectValue placeholder="Select Duration" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                                <SelectItem value="30" className="focus:bg-purple-600 focus:text-white cursor-pointer">30 Minutes</SelectItem>
                                <SelectItem value="45" className="focus:bg-purple-600 focus:text-white cursor-pointer">45 Minutes</SelectItem>
                                <SelectItem value="60" className="focus:bg-purple-600 focus:text-white cursor-pointer">1 Hour</SelectItem>
                                <SelectItem value="90" className="focus:bg-purple-600 focus:text-white cursor-pointer">1.5 Hours</SelectItem>
                                <SelectItem value="120" className="focus:bg-purple-600 focus:text-white cursor-pointer">2 Hours</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            name="description"
                            placeholder="Topics to match..."
                            className="bg-white/5 border-white/10"
                        />
                    </div>

                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md text-sm text-blue-400 flex items-start gap-2">
                        <Video className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>This will act as the <strong>Permanent Link</strong> for the selected batch.</span>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Schedule & Bind Link
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
}
