"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchMeetParticipants } from "@/app/actions/google-classroom";
import { Loader2, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AttendanceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    courseId: string;
    courseName: string;
}

export function AttendanceDialog({ open, onOpenChange, courseId, courseName }: AttendanceDialogProps) {
    const [loading, setLoading] = useState(false);
    const [participants, setParticipants] = useState<any[]>([]);
    const [scanned, setScanned] = useState(false);
    const { toast } = useToast();

    const handleSync = async () => {
        setLoading(true);
        setScanned(false);
        try {
            // 1. Fetch recent meet records (mock logic: we'd filter by course time usually)
            // For this demo, we just fetch 'recent' records. 
            // In a real app, we'd pass a conference ID stored in our DB for this class session.

            // Mocking the flow since we don't have a specific conference ID for "now"
            // We'll call fetchMeetParticipants with a dummy or most recent actual ID if available

            // For demonstration, let's assume we found a record
            toast({
                title: "Scanning Meet Records...",
                description: "Looking for recent sessions for this class.",
            });

            // Simulate API delay and response
            setTimeout(() => {
                setParticipants([
                    { name: "John Doe", email: "john@student.com", duration: "45 min", status: "Present" },
                    { name: "Jane Smith", email: "jane@student.com", duration: "42 min", status: "Present" },
                    { name: "Bob Wilson", email: "bob@student.com", duration: "10 min", status: "Late/Left Early" },
                ]);
                setScanned(true);
                setLoading(false);
            }, 1500);

            // Real implementation would look like:
            // const records = await fetchMeetRecords();
            // const targetRecord = records.find(...) // match time
            // const parts = await fetchMeetParticipants(targetRecord.name);
            // setParticipants(parts);

        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch attendance logs",
                variant: "destructive"
            });
            setLoading(false);
        }
    };

    const handleSave = () => {
        toast({
            title: "Attendance Saved",
            description: `Marked ${participants.filter(p => p.status === "Present").length} students as present.`,
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Automated Attendance Sync</DialogTitle>
                    <DialogDescription>
                        Syncing with Google Meet records for {courseName}.
                    </DialogDescription>
                </DialogHeader>

                {!scanned ? (
                    <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
                        <RefreshCw className={`h-12 w-12 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
                        <p className="text-sm text-muted-foreground">
                            Click 'Sync Audit' to scan Google Meet logs for participants.
                        </p>
                    </div>
                ) : (
                    <ScrollArea className="h-[300px] border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {participants.map((p, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">{p.name}</TableCell>
                                        <TableCell>{p.email}</TableCell>
                                        <TableCell>{p.duration}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${p.status === "Present" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                                }`}>
                                                {p.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    {!scanned ? (
                        <Button onClick={handleSync} disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sync Audit
                        </Button>
                    ) : (
                        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Confirm & Save
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
