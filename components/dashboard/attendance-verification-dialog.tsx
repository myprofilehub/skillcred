"use client";

import { useState, useMemo } from "react";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Loader2, Video, XCircle } from "lucide-react";
import { saveAttendanceSession } from "@/app/actions/attendance";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AttendanceStatus } from "@prisma/client";

interface AttendanceVerificationDialogProps {
    courseId: string;
    log: any;
    enrolledStudents: any[]; // The enriched student list from the page
}

export function AttendanceVerificationDialog({ courseId, log, enrolledStudents }: AttendanceVerificationDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const { toast } = useToast();

    // Map log participants to statuses initially
    const initialAttendance = useMemo(() => {
        const participantEmails = new Set(
            log.participants
                .map((p: any) => p.signedinUser?.email)
                .filter(Boolean)
        );

        return enrolledStudents
            .filter(s => s.dbUserId) // Only DB users can have attendance
            .map(student => ({
                studentId: student.dbUserId,
                name: student.profile.name.fullName,
                email: student.profile.emailAddress,
                avatar: student.profile.photoUrl,
                // Check if email matches log - Auto Mark
                status: participantEmails.has(student.profile.emailAddress) ? "PRESENT" : "ABSENT"
            }));
    }, [log, enrolledStudents]);

    const [attendanceData, setAttendanceData] = useState(initialAttendance);

    const toggleStatus = (index: number, checked: boolean) => {
        setAttendanceData(prev => prev.map((item, i) =>
            i === index ? { ...item, status: checked ? "PRESENT" : "ABSENT" } : item
        ));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // Prepare payload for server action with proper enum typing
            const payload = attendanceData.map(item => ({
                studentId: item.studentId,
                status: item.status as AttendanceStatus
            }));

            const result = await saveAttendanceSession(courseId, log, payload);

            if (result.error) {
                toast({
                    variant: "destructive",
                    title: "Verification Failed",
                    description: result.error
                });
            } else {
                setVerified(true);
                setOpen(false);
                toast({
                    title: "Attendance Saved",
                    description: `Session verified with ${result.count} records.`
                });
            }
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong."
            });
        } finally {
            setLoading(false);
        }
    };

    if (verified) {
        return (
            <Button size="sm" variant="outline" className="gap-2 text-green-600 border-green-200 bg-green-50" disabled>
                <CheckCircle2 className="w-4 h-4" /> Verified
            </Button>
        );
    }

    const presentCount = attendanceData.filter(a => a.status === "PRESENT").length;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Verify Session
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Verify Attendance</DialogTitle>
                    <DialogDescription>
                        Review and confirm student attendance.
                        <br />
                        <span className="font-medium text-foreground">
                            {presentCount} Present
                        </span> / {attendanceData.length} Total Registered
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-auto border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px] text-center">Present</TableHead>
                                <TableHead>Student Details</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendanceData.map((student, index) => (
                                <TableRow key={student.studentId} className={student.status === "PRESENT" ? "bg-muted/30" : ""}>
                                    <TableCell className="text-center">
                                        <Checkbox
                                            checked={student.status === "PRESENT"}
                                            onCheckedChange={(checked) => toggleStatus(index, checked as boolean)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={student.avatar} />
                                                <AvatarFallback>{student.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-sm">{student.name}</div>
                                                <div className="text-xs text-muted-foreground">{student.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={student.status === "PRESENT" ? "default" : "secondary"}>
                                            {student.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {attendanceData.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                        No registered students found in this class to verify.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} disabled={loading} className="gap-2">
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Save Attendance
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
