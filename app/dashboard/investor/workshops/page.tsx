"use client";

import { useState, useEffect } from "react";
import { getUpcomingWorkshops } from "@/app/actions/investor-actions";
import { createWorkshop } from "@/app/actions/investor-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { PlusCircle, Loader2, Calendar, Users, Video } from "lucide-react";
import { format } from "date-fns";

export default function InvestorWorkshopsPage() {
    const [workshops, setWorkshops] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        duration: "1 hour",
        meetingLink: "",
        maxCapacity: ""
    });

    useEffect(() => {
        loadWorkshops();
    }, []);

    const loadWorkshops = async () => {
        const data = await getUpcomingWorkshops();
        setWorkshops(data);
        setIsLoading(false);
    };

    const handleCreate = async () => {
        if (!formData.title || !formData.date || !formData.time) {
            toast.error("Please fill in required fields");
            return;
        }

        setIsCreating(true);
        try {
            const DateTime = new Date(`${formData.date}T${formData.time}`);

            const result = await createWorkshop({
                ...formData,
                date: DateTime
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Workshop schedule created!");
                setIsOpen(false);
                setFormData({ title: "", description: "", date: "", time: "", duration: "1 hour", meetingLink: "", maxCapacity: "" });
                loadWorkshops();
            }
        } catch (error) {
            toast.error("Failed to create workshop");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Workshops</h1>
                    <p className="text-neutral-400">Organize and manage your startup workshops</p>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-500/20">
                            <PlusCircle className="w-4 h-4" /> Schedule Workshop
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-neutral-900 border-amber-500/20 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-white">Schedule New Workshop</DialogTitle>
                            <DialogDescription className="text-neutral-400">Create a workshop event for students and founders</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Title</label>
                                <Input
                                    placeholder="e.g. Pitch Deck Masterclass"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-neutral-800 border-amber-500/20 text-white placeholder:text-neutral-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-neutral-300">Date</label>
                                    <Input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="bg-neutral-800 border-amber-500/20 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-neutral-300">Time</label>
                                    <Input
                                        type="time"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="bg-neutral-800 border-amber-500/20 text-white"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-neutral-300">Duration</label>
                                    <Input
                                        placeholder="e.g. 1 hour"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="bg-neutral-800 border-amber-500/20 text-white placeholder:text-neutral-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-neutral-300">Capacity (Optional)</label>
                                    <Input
                                        type="number"
                                        placeholder="Max attendees"
                                        value={formData.maxCapacity}
                                        onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                                        className="bg-neutral-800 border-amber-500/20 text-white placeholder:text-neutral-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Meeting Link</label>
                                <Input
                                    placeholder="Zoom / Google Meet URL"
                                    value={formData.meetingLink}
                                    onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                                    className="bg-neutral-800 border-amber-500/20 text-white placeholder:text-neutral-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-300">Description</label>
                                <Textarea
                                    placeholder="What will students learn?"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="bg-neutral-800 border-amber-500/20 text-white placeholder:text-neutral-500"
                                />
                            </div>
                            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white" onClick={handleCreate} disabled={isCreating}>
                                {isCreating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Schedule Workshop
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-amber-400" /></div>
            ) : (
                <div className="space-y-4">
                    {workshops.length === 0 ? (
                        <div className="text-center py-12 text-neutral-500 border rounded-lg border-dashed border-amber-500/20 bg-neutral-900/50">
                            No upcoming workshops. Schedule one now.
                        </div>
                    ) : (
                        workshops.map((workshop: any) => (
                            <Card key={workshop.id} className="bg-neutral-900/80 border-amber-500/10 backdrop-blur-sm hover:border-amber-500/30 transition-colors">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-amber-400 font-medium text-sm">
                                                <Calendar className="w-4 h-4" />
                                                {format(new Date(workshop.date), "EEEE, MMM d, yyyy 'at' h:mm a")}
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{workshop.title}</h3>
                                            <p className="text-neutral-400">{workshop.description}</p>
                                            <div className="flex items-center gap-4 text-sm text-neutral-500 mt-2">
                                                <span className="flex items-center gap-1">
                                                    <Video className="w-3 h-3" />
                                                    {workshop.meetingLink ? "Online Event" : "Location TBD"}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    {workshop.registrations?.length || 0} enrolled
                                                    {workshop.maxCapacity ? ` / ${workshop.maxCapacity}` : ""}
                                                </span>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="border-amber-500/20 text-neutral-300 hover:text-amber-300 hover:bg-amber-500/10">
                                            Edit Details
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
