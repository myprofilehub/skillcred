"use client";

import { ClassroomCard } from "@/components/dashboard/classroom-card";
import { deleteGoogleClassroom } from "@/app/actions/google-classroom";
import { scheduleClass } from "@/app/actions/schedule";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { School, Plus, Calendar, Clock, Video, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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

interface ClassroomListProps {
    classrooms: any[];
}

export function ClassroomList({ classrooms }: ClassroomListProps) {
    const router = useRouter();
    const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleDeleteClass = async (courseId: string) => {
        if (!confirm("Are you sure you want to delete this classroom? This action cannot be undone.")) {
            return;
        }

        toast.loading("Deleting classroom...");

        const result = await deleteGoogleClassroom(courseId);

        if (result.error) {
            toast.dismiss();
            toast.error(result.error);
        } else {
            toast.dismiss();
            toast.success("Classroom deleted successfully!");
            router.refresh();
        }
    };

    const handleAddMeetLink = (courseId: string) => {
        setSelectedCourseId(courseId);
        setScheduleDialogOpen(true);
    };

    const handleScheduleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            const courseId = formData.get("courseId") as string || selectedCourseId;
            const title = formData.get("title") as string;
            const date = formData.get("date") as string;
            const time = formData.get("time") as string;
            const duration = formData.get("duration") as string;
            const description = formData.get("description") as string;
            const isRecurring = formData.get("recurring") === "on";
            const frequency = formData.get("frequency") as string;
            const recurrenceEnd = formData.get("recurrenceEnd") as string;

            if (!courseId) {
                toast.error("Please select a classroom.");
                setLoading(false);
                return;
            }

            const dateTime = new Date(`${date}T${time}:00`);

            const result = await scheduleClass({
                googleClassroomId: courseId,
                googleCourseId: courseId,
                title,
                description,
                dateTime: dateTime.toISOString(),
                durationMinutes: parseInt(duration) || 60,
                recurrence: isRecurring ? {
                    frequency,
                    until: recurrenceEnd || undefined
                } : undefined
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Class scheduled successfully!");
                toast.success("Meet link added to classroom!");
                setScheduleDialogOpen(false);
                router.refresh();
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to schedule class.");
        } finally {
            setLoading(false);
        }
    };

    const selectedClassroom = classrooms.find(c => c.id === selectedCourseId);

    if (classrooms.length === 0) {
        return (
            <div className="col-span-full py-12 text-center text-muted-foreground bg-white/5 rounded-lg border border-dashed border-white/10">
                <School className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium">No Classrooms Found</h3>
                <p>Create a classroom in Google Classroom to see it here.</p>
            </div>
        );
    }

    return (
        <>
            {classrooms.map((classroom: any) => (
                <ClassroomCard
                    key={classroom.id}
                    course={classroom}
                    studentCount={classroom.students?.length || 0}
                    onDeleteClass={handleDeleteClass}
                    onAddMeetLink={handleAddMeetLink}
                />
            ))}

            <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
                <DialogContent className="sm:max-w-[520px] border-white/10 bg-slate-950 text-white p-5">
                    <DialogHeader className="pb-2">
                        <DialogTitle className="text-lg">Schedule Class & Generate Meet Link</DialogTitle>
                        <DialogDescription className="text-sm">
                            {selectedClassroom ? (
                                <>For: <strong>{selectedClassroom.name}</strong></>
                            ) : (
                                "Create a calendar event with a Meet link."
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <form action={handleScheduleSubmit} className="space-y-3">
                        <input type="hidden" name="courseId" value={selectedCourseId || ""} />

                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                                <Label className="text-xs mb-1 block">Class Title</Label>
                                <Input
                                    name="title"
                                    placeholder="e.g. React Hooks Deep Dive"
                                    required
                                    defaultValue={selectedClassroom?.name || ""}
                                    className="bg-white/5 border-white/10 h-9 text-sm"
                                />
                            </div>
                            <div>
                                <Label className="text-xs mb-1 block">Date</Label>
                                <Input name="date" type="date" required className="bg-white/5 border-white/10 h-9 text-sm" />
                            </div>
                            <div>
                                <Label className="text-xs mb-1 block">Time</Label>
                                <Input name="time" type="time" required className="bg-white/5 border-white/10 h-9 text-sm" />
                            </div>
                            <div>
                                <Label className="text-xs mb-1 block">Duration</Label>
                                <Select name="duration" defaultValue="60">
                                    <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100 h-9 text-sm">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                                        <SelectItem value="30">30 Min</SelectItem>
                                        <SelectItem value="45">45 Min</SelectItem>
                                        <SelectItem value="60">1 Hour</SelectItem>
                                        <SelectItem value="90">1.5 Hours</SelectItem>
                                        <SelectItem value="120">2 Hours</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="text-xs mb-1 block">Description</Label>
                                <Input name="description" placeholder="Topics..." className="bg-white/5 border-white/10 h-9 text-sm" />
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-3 space-y-2">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="recurring" name="recurring" className="h-4 w-4 rounded" />
                                <Label htmlFor="recurring" className="text-sm font-normal cursor-pointer">Recurring Event</Label>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label className="text-xs mb-1 block">Frequency</Label>
                                    <Select name="frequency" defaultValue="WEEKLY">
                                        <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100 h-9 text-sm">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                                            <SelectItem value="DAILY">Daily</SelectItem>
                                            <SelectItem value="WEEKLY">Weekly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-xs mb-1 block">End Date</Label>
                                    <Input name="recurrenceEnd" type="date" className="bg-slate-900 border-slate-700 h-9 text-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="p-2 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-400 flex items-center gap-2">
                            <Video className="w-3.5 h-3.5 shrink-0" />
                            <span>A <strong>Google Meet link</strong> will be generated and saved.</span>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 h-9">
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Schedule & Generate Meet Link
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
