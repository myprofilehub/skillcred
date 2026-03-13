"use client";

import { useState } from "react";
import { assignMentorToEnrollment } from "@/app/actions/admin-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Users, UserCheck, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

type EnrollmentData = {
    id: string;
    createdAt: Date;
    student: {
        id: string;
        user: { id: string; name: string | null; email: string | null; lmsEmail: string | null };
    };
    track: { id: string; title: string; slug: string };
    mentor: { id: string; user: { id: string; name: string | null; email: string | null } } | null;
    batch: { id: string; name: string } | null;
};

type MentorData = {
    id: string;
    user: { id: string; name: string | null; email: string | null };
};

export function EnrollmentsList({
    initialEnrollments,
    mentors,
}: {
    initialEnrollments: EnrollmentData[];
    mentors: MentorData[];
}) {
    const [enrollments, setEnrollments] = useState(initialEnrollments);
    const [assigningId, setAssigningId] = useState<string | null>(null);
    const [selectedMentors, setSelectedMentors] = useState<Record<string, string>>({});

    const unassigned = enrollments.filter((e) => !e.mentor);
    const assigned = enrollments.filter((e) => !!e.mentor);

    // Group by track
    const unassignedByTrack: Record<string, EnrollmentData[]> = {};
    unassigned.forEach((e) => {
        const key = e.track.title;
        if (!unassignedByTrack[key]) unassignedByTrack[key] = [];
        unassignedByTrack[key].push(e);
    });

    const handleAssign = async (enrollmentId: string) => {
        const mentorId = selectedMentors[enrollmentId];
        if (!mentorId) {
            toast.error("Please select a mentor first");
            return;
        }

        setAssigningId(enrollmentId);
        const result = await assignMentorToEnrollment(enrollmentId, mentorId);
        setAssigningId(null);

        if (result.success) {
            toast.success(result.message);
            // Update local state
            setEnrollments((prev) =>
                prev.map((e) =>
                    e.id === enrollmentId
                        ? { ...e, mentor: mentors.find((m) => m.id === mentorId) || null }
                        : e
                )
            );
        } else {
            toast.error(result.error || "Failed to assign mentor");
        }
    };

    return (
        <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-slate-900/60 border-cyan-500/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">Total Enrollments</CardTitle>
                        <Users className="h-4 w-4 text-cyan-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white font-mono">{enrollments.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/60 border-amber-500/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">Awaiting Assignment</CardTitle>
                        <AlertCircle className="h-4 w-4 text-amber-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-amber-400 font-mono">{unassigned.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/60 border-green-500/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">Assigned</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-400 font-mono">{assigned.length}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Unassigned Students (grouped by stream) */}
            {Object.keys(unassignedByTrack).length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-amber-400 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Students Awaiting Mentor Assignment
                    </h2>

                    {Object.entries(unassignedByTrack).map(([trackTitle, trackEnrollments]) => (
                        <Card key={trackTitle} className="bg-slate-900/60 border-amber-500/20 backdrop-blur-sm">
                            <CardHeader className="pb-3 border-b border-white/5">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-white flex items-center gap-2">
                                        {trackTitle}
                                    </CardTitle>
                                    <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                                        {trackEnrollments.length} student{trackEnrollments.length > 1 ? "s" : ""}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="space-y-3">
                                    {trackEnrollments.map((enrollment) => (
                                        <div
                                            key={enrollment.id}
                                            className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/5"
                                        >
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-white">
                                                    {enrollment.student.user.name || "Unnamed"}
                                                </p>
                                                <p className="text-xs text-slate-400 font-mono">
                                                    {enrollment.student.user.email}
                                                </p>
                                                {enrollment.student.user.lmsEmail && (
                                                    <p className="text-xs text-cyan-400 font-mono">
                                                        LMS: {enrollment.student.user.lmsEmail}
                                                    </p>
                                                )}
                                                <p className="text-xs text-slate-500">
                                                    Enrolled: {new Date(enrollment.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Select
                                                    value={selectedMentors[enrollment.id] || ""}
                                                    onValueChange={(value) =>
                                                        setSelectedMentors((prev) => ({
                                                            ...prev,
                                                            [enrollment.id]: value,
                                                        }))
                                                    }
                                                >
                                                    <SelectTrigger className="w-[200px] bg-slate-800 border-white/10 text-white">
                                                        <SelectValue placeholder="Select Mentor" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-slate-900 border-white/10">
                                                        {mentors.map((m) => (
                                                            <SelectItem key={m.id} value={m.id} className="text-white focus:bg-cyan-500/20 focus:text-cyan-300">
                                                                {m.user.name || m.user.email}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleAssign(enrollment.id)}
                                                    disabled={assigningId === enrollment.id || !selectedMentors[enrollment.id]}
                                                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                                                >
                                                    {assigningId === enrollment.id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        "Assign"
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Already Assigned */}
            {assigned.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                        <UserCheck className="w-5 h-5" />
                        Assigned Students
                    </h2>
                    <Card className="bg-slate-900/60 border-green-500/20 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <div className="space-y-3">
                                {assigned.map((enrollment) => (
                                    <div
                                        key={enrollment.id}
                                        className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/5"
                                    >
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-white">
                                                {enrollment.student.user.name || "Unnamed"}
                                            </p>
                                            <p className="text-xs text-slate-400 font-mono">
                                                {enrollment.student.user.email}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge className="bg-slate-800 text-slate-300 border-white/10">
                                                {enrollment.track.title}
                                            </Badge>
                                            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                                                Mentor: {enrollment.mentor?.user.name}
                                            </Badge>
                                            {enrollment.batch && (
                                                <Badge variant="outline" className="text-cyan-400 border-cyan-500/30">
                                                    {enrollment.batch.name}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {enrollments.length === 0 && (
                <Card className="bg-slate-900/60 border-white/10">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-slate-400">
                        <Users className="w-12 h-12 mb-4 text-slate-600" />
                        <p className="text-lg font-medium">No paid enrollments yet</p>
                        <p className="text-sm text-slate-500">Students will appear here after completing payment</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
