"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Loader2, Link as LinkIcon } from "lucide-react";
import { saveRecommendation } from "@/app/actions/recommendation";
import { toast } from "sonner";

interface UploadRecommendationDialogProps {
    studentId: string; // The DB User ID
    studentName: string;
    children?: React.ReactNode;
}

export function UploadRecommendationDialog({ studentId, studentName, children }: UploadRecommendationDialogProps) {
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [url, setUrl] = useState("");
    const [note, setNote] = useState("");

    const handleSave = async () => {
        if (!url) {
            toast.error("Please provide a valid URL.");
            return;
        }

        setSaving(true);
        const result = await saveRecommendation(studentId, url, note);
        setSaving(false);

        if (result.success) {
            toast.success(`Recommendation uploaded for ${studentName}!`);
            setOpen(false);
            setUrl("");
            setNote("");
        } else {
            toast.error(`Failed: ${result.error}`);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button size="sm" variant="outline" className="gap-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                        <Upload className="w-4 h-4" /> Upload Rec
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Recommendation Letter</DialogTitle>
                    <DialogDescription>
                        Provide a link to the signed recommendation letter for <strong>{studentName}</strong>.
                        The student will be able to download it from their dashboard.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Letter URL (Google Drive / Cloud Link)</Label>
                        <div className="relative">
                            <LinkIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="https://drive.google.com/file/..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                            Ensure the link is accessible (e.g., "Anyone with the link").
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Note (Optional)</Label>
                        <Textarea
                            placeholder="e.g., 'Issued for completion of Full Stack course...'"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>Cancel</Button>
                    <Button onClick={handleSave} disabled={saving} className="bg-amber-600 hover:bg-amber-700 text-white">
                        {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {saving ? "Saving..." : "Save & Assign"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
