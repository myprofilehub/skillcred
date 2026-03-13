"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { fetchSubmissions, gradeSubmissionAction, returnSubmissionAction } from "@/app/actions/google-classroom";
import { toast } from "sonner";
import { Check, Loader2, Save, RotateCcw, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MarksTabProps {
    courseId: string;
    courseWork: any[];
    students: any[];
}

export function MarksTab({ courseId, courseWork, students }: MarksTabProps) {
    const [selectedWorkId, setSelectedWorkId] = useState<string>("");
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [grades, setGrades] = useState<Record<string, number>>({});
    const [saving, setSaving] = useState<Record<string, boolean>>({});

    const handleWorkChange = async (workId: string) => {
        setSelectedWorkId(workId);
        if (!workId) return;

        setLoading(true);
        const result = await fetchSubmissions(courseId, workId);
        setLoading(false);

        if (Array.isArray(result)) {
            setSubmissions(result);
        } else {
            toast.error("Failed to fetch submissions");
            setSubmissions([]);
        }
    };

    const handleGradeChange = (submissionId: string, value: string) => {
        setGrades({ ...grades, [submissionId]: Number(value) });
    };

    const saveGrade = async (submissionId: string) => {
        const grade = grades[submissionId];
        if (grade === undefined) return;

        setSaving({ ...saving, [submissionId]: true });
        const result = await gradeSubmissionAction(courseId, selectedWorkId, submissionId, grade);
        setSaving({ ...saving, [submissionId]: false });

        if (result.success) {
            toast.success("Grade saved (Draft)");
            // Update local state to reflect change if needed, but waiting for refresh is okay usually
            // Ideally update submission state to "RETURNED" only after return action
        } else {
            toast.error("Failed to save grade");
        }
    };

    const returnGrade = async (submissionId: string) => {
        setSaving({ ...saving, [submissionId]: true });
        const result = await returnSubmissionAction(courseId, selectedWorkId, submissionId);
        setSaving({ ...saving, [submissionId]: false });

        if (result.success) {
            toast.success("Submission returned to student!");
            // Refresh submissions
            handleWorkChange(selectedWorkId);
        } else {
            toast.error("Failed to return submission");
        }
    };

    const currentWork = courseWork.find(w => w.id === selectedWorkId);

    // Filter assignments only (skip materials)
    const assignments = courseWork.filter(w => w.workType === "ASSIGNMENT");

    // Helper to find student profile
    const getStudent = (userId: string) => students.find(s => s.userId === userId);

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <div className="w-[300px]">
                    <Select value={selectedWorkId} onValueChange={handleWorkChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Assignment" />
                        </SelectTrigger>
                        <SelectContent>
                            {assignments.length === 0 ? (
                                <SelectItem value="none" disabled>No assignments yet</SelectItem>
                            ) : (
                                assignments.map((work) => (
                                    <SelectItem key={work.id} value={work.id}>
                                        {work.title}
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                </div>
                {loading && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
            </div>

            {selectedWorkId && !loading && (
                <div className="border rounded-lg bg-background/50 overflow-hidden">
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 p-4 border-b bg-muted/30 font-medium text-sm">
                        <div>Student</div>
                        <div>Status</div>
                        <div>Grade ({currentWork?.maxPoints || 100})</div>
                        <div className="text-right">Actions</div>
                    </div>
                    {submissions.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            No submissions found for this assignment.
                        </div>
                    ) : (
                        submissions.map((sub) => {
                            const student = getStudent(sub.userId);
                            const studentName = student?.profile?.name?.fullName || "Unknown Student";
                            const studentPhoto = student?.profile?.photoUrl;
                            const isReturned = sub.state === "RETURNED";
                            const currentGrade = sub.assignedGrade || sub.draftGrade || "";

                            return (
                                <div key={sub.id} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 p-4 border-b last:border-0 items-center hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={studentPhoto} />
                                            <AvatarFallback>{studentName[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="truncate">{studentName}</span>
                                    </div>
                                    <div>
                                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                                            ${sub.state === "TURNED_IN" ? "bg-green-500/10 text-green-500" :
                                                sub.state === "RETURNED" ? "bg-blue-500/10 text-blue-500" :
                                                    "bg-yellow-500/10 text-yellow-500"}`}>
                                            {sub.state}
                                        </div>
                                        {sub.late && <span className="ml-2 text-xs text-red-400">(Late)</span>}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="number"
                                            className="h-8 w-20"
                                            placeholder={String(currentGrade)}
                                            value={grades[sub.id] ?? currentGrade ?? ""}
                                            onChange={(e) => handleGradeChange(sub.id, e.target.value)}
                                            disabled={saving[sub.id]}
                                        />
                                        {grades[sub.id] !== undefined && grades[sub.id] !== currentGrade && (
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-500" onClick={() => saveGrade(sub.id)} disabled={saving[sub.id]}>
                                                <Save className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <Button
                                            size="sm"
                                            variant={isReturned ? "outline" : "default"}
                                            disabled={saving[sub.id] || (sub.state === "RETURNED" && grades[sub.id] === undefined)}
                                            onClick={() => returnGrade(sub.id)}
                                        >
                                            {saving[sub.id] ? <Loader2 className="w-4 h-4 animate-spin" /> :
                                                isReturned ? "Update" : "Return"}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}
