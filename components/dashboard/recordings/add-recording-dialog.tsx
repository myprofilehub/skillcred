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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { createManualRecording } from "@/app/actions/recordings";
import { useRouter } from "next/navigation";

export function AddRecordingDialog({ tracks }: { tracks: { id: string, name: string }[] }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        url: "",
        description: "",
        trackId: "",
        isPublic: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData({ ...formData, isPublic: checked });
    };

    const handleSelectChange = (value: string) => {
        // Assuming hardcoded track IDs map to real DB IDs or slugs. 
        // For now using slugs as IDs. 
        // In real implementation, we should fetch tracks. 
        // But the User request implies simple filterable grid.
        // Let's assume we pass the slug as ID for this prototype.
        setFormData({ ...formData, trackId: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // We need a real Track ID usually, but for now we might fail if trackId doesn't exist in DB.
        // The server action expects a string.
        // Let's assume the user has populated tracks. 
        // We will send the slug, but the server action tries to connect to Track relation.
        // If we send a slug that isn't a CUID, Prisma might complain if it expects FK.
        // Wait, app/actions/recordings.ts: createManualRecording takes trackId.
        // We need to fetch real tracks to populate the select. 
        // For simplicity in this dialog, I'll restrict to known tracks or require the parent to pass tracks.
        // To keep it simple, I'll pass the selected value. 

        const result = await createManualRecording(formData);

        if (result.success) {
            setOpen(false);
            setFormData({ title: "", url: "", description: "", trackId: "", isPublic: false });
            router.refresh();
        } else {
            alert("Failed to create recording");
        }
        setLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 gap-2">
                    <Upload className="w-4 h-4" /> Upload New Video
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload Pre-recorded Lesson</DialogTitle>
                    <DialogDescription>
                        Add a new video lesson to the Course Library.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Video Title</Label>
                        <Input id="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="url">Video URL (YouTube/Drive)</Label>
                        <Input id="url" value={formData.url} onChange={handleChange} placeholder="https://..." required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="trackId">Stream / Track</Label>
                        <Select onValueChange={handleSelectChange} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Stream" />
                            </SelectTrigger>
                            <SelectContent>
                                {tracks.map(t => (
                                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="isPublic">Publicly Visible?</Label>
                        <Switch id="isPublic" checked={formData.isPublic} onCheckedChange={handleSwitchChange} />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Upload Video"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

