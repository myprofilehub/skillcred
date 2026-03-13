"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    BookOpen,
    Calendar,
    Clock,
    Video,
    FileText,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Users,
    PlayCircle,
    ExternalLink,
    GraduationCap,
} from "lucide-react";
import Link from "next/link";

interface DashboardData {
    upNext: {
        id: string;
        title: string;
        start: string;
        meetLink?: string;
    } | null;
    classroomsCount: number;
    pendingAssignments: Array<{
        id: string;
        title: string;
        courseName: string;
        dueDate: string | null;
        state: string;
    }>;
    recentRecordings: Array<{
        id: string;
        title: string;
        url: string;
        createdAt: Date;
    }>;
    overallAttendance: number | null;
    attendanceStats: Array<{
        classroomName: string;
        percentage: number;
        total: number;
        present: number;
    }>;
}

interface StudentDashboardProps {
    user: { name?: string | null; email?: string | null; image?: string | null };
    dashboardData: DashboardData;
    studentProfile: {
        enrollments?: Array<{
            track: { title: string };
            batch?: {
                name: string;
                project: { name: string };
            } | null;
            progress: number;
        }>;
    } | null;
}

export default function StudentDashboard({ user, dashboardData, studentProfile }: StudentDashboardProps) {
    const { upNext, classroomsCount, pendingAssignments, recentRecordings, overallAttendance, attendanceStats } = dashboardData;

    const activeTrack = studentProfile?.enrollments?.[0]?.track?.title || "Not Enrolled";
    const activeProject = studentProfile?.enrollments?.[0]?.batch?.project?.name || null;
    const activeBatch = studentProfile?.enrollments?.[0]?.batch?.name || null;
    const trackProgress = studentProfile?.enrollments?.[0]?.progress || 0;

    // Calculate time until next class
    const getTimeUntil = (dateStr: string) => {
        const diff = new Date(dateStr).getTime() - Date.now();
        if (diff < 0) return "Starting now";
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        if (hours > 24) return `in ${Math.floor(hours / 24)} days`;
        if (hours > 0) return `in ${hours}h ${minutes}m`;
        return `in ${minutes} min`;
    };

    const isEnrolled = studentProfile?.enrollments && studentProfile.enrollments.length > 0;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Welcome back, {user?.name || "Student"} 👋</h1>
                    <p className="text-muted-foreground">Here's what's happening with your learning journey.</p>
                </div>
                {!isEnrolled && (
                    <Link href="/enroll">
                        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg shadow-purple-500/20 animate-pulse">
                            <BookOpen className="w-4 h-4 mr-2" /> Start Your Application
                        </Button>
                    </Link>
                )}
                {isEnrolled && upNext?.meetLink && (
                    <Link href={upNext.meetLink} target="_blank">
                        <Button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20 gap-2">
                            <Video className="w-4 h-4" /> Join Next Class
                        </Button>
                    </Link>
                )}
            </div>

            {/* Enrollment Call to Action (Only for Free/Non-Enrolled Users) */}
            {!isEnrolled && (
                <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-black overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <GraduationCap className="w-64 h-64 text-purple-500" />
                    </div>
                    <CardContent className="p-8 relative z-10">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl font-bold text-white mb-2">Unlock Your Full Potential</h2>
                            <p className="text-slate-300 mb-6 text-lg">
                                You are currently on the <span className="text-purple-400 font-semibold">Free Tier</span>.
                                Enroll in a specialized track to get assigned to a batch, start working on live projects, and earn verified credentials.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/enroll">
                                    <Button size="lg" className="bg-white text-purple-900 hover:bg-slate-100 font-bold h-12 px-8">
                                        Enroll Now <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link href="/#streams">
                                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 h-12">
                                        View Streams
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Up Next Banner */}
            {upNext && (
                <Card className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-indigo-500/20">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Up Next</p>
                                    <h3 className="text-lg font-semibold">{upNext.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{getTimeUntil(upNext.start)}</span>
                                    </div>
                                </div>
                            </div>
                            {upNext.meetLink && (
                                <Link href={upNext.meetLink} target="_blank">
                                    <Button variant="outline" className="gap-2 border-indigo-500/30 hover:bg-indigo-500/10">
                                        <ExternalLink className="w-4 h-4" /> Join Meeting
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Active Track */}
                <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                            Active Track
                            <BookOpen className="w-4 h-4 text-indigo-400" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold mb-1 truncate" title={activeProject || activeTrack}>
                            {activeProject || activeTrack}
                        </div>
                        {activeBatch && (
                            <Badge variant="secondary" className="mb-3 text-xs bg-indigo-500/20 text-indigo-300">
                                {activeBatch}
                            </Badge>
                        )}
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>{trackProgress}%</span>
                            </div>
                            <Progress value={trackProgress} className="h-2 bg-indigo-500/20" />
                        </div>
                    </CardContent>
                </Card>

                {/* Enrolled Classes */}
                <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                            My Classes
                            <GraduationCap className="w-4 h-4 text-blue-400" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-1">{classroomsCount}</div>
                        <p className="text-xs text-muted-foreground">Active Enrollments</p>
                        <Link href="/dashboard/student/classroom">
                            <Button variant="link" className="p-0 h-auto text-xs text-blue-400 mt-2">
                                View All <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Attendance */}
                <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                            Attendance
                            <Users className="w-4 h-4 text-green-400" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-1">
                            {overallAttendance !== null ? `${overallAttendance}%` : "N/A"}
                        </div>
                        <p className="text-xs text-muted-foreground">Overall Average</p>
                        <Link href="/dashboard/student/progress">
                            <Button variant="link" className="p-0 h-auto text-xs text-green-400 mt-2">
                                View Details <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Pending Assignments */}
                <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                            Pending Tasks
                            <AlertCircle className="w-4 h-4 text-orange-400" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold mb-1">{pendingAssignments.length}</div>
                        <p className="text-xs text-muted-foreground">Assignments Due</p>
                        <Link href="/dashboard/student/assignments">
                            <Button variant="link" className="p-0 h-auto text-xs text-orange-400 mt-2">
                                View All <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pending Assignments List */}
                <Card className="lg:col-span-2 border-white/10 bg-white/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-orange-500" /> Action Required
                        </CardTitle>
                        <CardDescription>Upcoming deadlines and pending submissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {pendingAssignments.length > 0 ? (
                            <div className="space-y-3">
                                {pendingAssignments.map((assignment) => (
                                    <div
                                        key={assignment.id}
                                        className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-white/5 hover:border-white/10 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                                            <div>
                                                <span className="font-medium text-sm">{assignment.title}</span>
                                                <p className="text-xs text-muted-foreground">{assignment.courseName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {assignment.dueDate && (
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(assignment.dueDate).toLocaleDateString()}
                                                </span>
                                            )}
                                            <Badge variant="outline" className="text-xs">
                                                {assignment.state === "NEW" ? "Not Started" : assignment.state}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p>All caught up! No pending assignments.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Recordings */}
                <Card className="border-white/10 bg-white/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Video className="w-5 h-5 text-red-500" /> Recent Recordings
                        </CardTitle>
                        <CardDescription>Catch up on missed classes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recentRecordings.length > 0 ? (
                            <div className="space-y-3">
                                {recentRecordings.map((recording) => (
                                    <Link key={recording.id} href={recording.url} target="_blank">
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-white/5 hover:border-red-500/30 hover:bg-red-500/5 transition-colors cursor-pointer">
                                            <div className="w-10 h-10 rounded bg-red-500/10 flex items-center justify-center">
                                                <PlayCircle className="w-5 h-5 text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">{recording.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(recording.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                <Link href="/dashboard/student/recordings">
                                    <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-white">
                                        View All Recordings <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <Video className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p className="text-sm">No recordings available yet.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Attendance by Class */}
            {attendanceStats.length > 0 && (
                <Card className="border-white/10 bg-white/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-green-500" /> Attendance by Class
                        </CardTitle>
                        <CardDescription>Your attendance record across all classes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {attendanceStats.map((stat, i) => (
                                <div key={i} className="p-4 rounded-lg bg-background/50 border border-white/5">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium text-sm truncate">{stat.classroomName}</span>
                                        <Badge
                                            variant={stat.percentage >= 75 ? "default" : "destructive"}
                                            className="text-xs"
                                        >
                                            {stat.percentage}%
                                        </Badge>
                                    </div>
                                    <Progress
                                        value={stat.percentage}
                                        className={`h-2 ${stat.percentage >= 75 ? "bg-green-500/20" : "bg-red-500/20"}`}
                                    />
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {stat.present} / {stat.total} sessions attended
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
