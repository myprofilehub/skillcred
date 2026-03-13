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
import { Video, Link as LinkIcon, Edit } from "lucide-react";
import { saveClassroomMeetLink } from "@/app/actions/google-classroom";

interface SetMeetLinkDialogProps {
    googleCourseId: string;
    currentLink?: string;
    courseName: string;
    children?: React.ReactNode;
}

export function SetMeetLinkDialog({ googleCourseId, currentLink, courseName, children }: SetMeetLinkDialogProps) {
    const [open, setOpen] = useState(false);
    const [link, setLink] = useState(currentLink || "");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        const result = await saveClassroomMeetLink(googleCourseId, link);
        setLoading(false);
        if (!result.error) {
            setOpen(false);
        } else {
            alert("Failed to save link");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Set Google Meet Link</DialogTitle>
                    <DialogDescription>
                        Manually add the permanent Meet link for {courseName}. This will be displayed to students.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="meet-link" className="text-right">
                            Link
                        </Label>
                        <Input
                            id="meet-link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="https://meet.google.com/..."
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
