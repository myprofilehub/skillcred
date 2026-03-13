import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";
import { getMyAttendance, getMyAssignments } from "@/app/actions/student-dashboard";
import { prisma } from "@/lib/db";

export default async function StudentProgressPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");

    // Fetch data in parallel
    const [attendance, assignments, student] = await Promise.all([
        getMyAttendance(),
        getMyAssignments(),
        prisma.student.findUnique({
            where: { userId: session.user.id },
            include: {
                enrollments: {
                    include: { track: true },
                },
            },
        }),
    ]);

    // Calculate assignment stats
    const totalAssignments = !("error" in assignments) ? assignments.length : 0;
    const completedAssignments = !("error" in assignments)
        ? assignments.filter((a) => a.state === "RETURNED" || a.state === "TURNED_IN").length
        : 0;
    const assignmentProgress = totalAssignments > 0
        ? Math.round((completedAssignments / totalAssignments) * 100)
        : 0;

    // Average grade
    const gradedAssignments = !("error" in assignments)
        ? assignments.filter((a) => a.grade !== undefined && a.maxPoints)
        : [];
    const averageGrade = gradedAssignments.length > 0
        ? Math.round(
            gradedAssignments.reduce((sum, a) => sum + ((a.grade! / a.maxPoints!) * 100), 0) / gradedAssignments.length
        )
        : null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading">My Progress</h1>
                <p className="text-muted-foreground">Track your learning journey and performance</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Overall Attendance */}
                <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Attendance</span>
                            <Users className="w-4 h-4 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-green-400">
                            {!("error" in attendance) && attendance.stats.length > 0
                                ? `${Math.round(attendance.stats.reduce((s, a) => s + a.percentage, 0) / attendance.stats.length)}%`
                                : "N/A"}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Overall average</p>
                    </CardContent>
                </Card>

                {/* Assignment Progress */}
                <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Assignments</span>
                            <CheckCircle2 className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="text-3xl font-bold text-blue-400">{assignmentProgress}%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {completedAssignments}/{totalAssignments} completed
                        </p>
                    </CardContent>
                </Card>

                {/* Average Grade */}
                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Average Grade</span>
                            <TrendingUp className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="text-3xl font-bold text-purple-400">
                            {averageGrade !== null ? `${averageGrade}%` : "N/A"}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {gradedAssignments.length} graded assignments
                        </p>
                    </CardContent>
                </Card>

                {/* Active Track */}
                <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/20">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Active Track</span>
                            <Calendar className="w-4 h-4 text-orange-400" />
                        </div>
                        <div className="text-lg font-bold text-orange-400 truncate">
                            {student?.enrollments?.[0]?.track?.title || "Not Enrolled"}
                        </div>
                        <div className="mt-2">
                            <Progress value={student?.enrollments?.[0]?.progress || 0} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">
                                {student?.enrollments?.[0]?.progress || 0}% complete
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Attendance by Class */}
            <Card className="border-white/10 bg-white/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-green-500" /> Attendance by Class
                    </CardTitle>
                    <CardDescription>Your attendance record across all enrolled classes</CardDescription>
                </CardHeader>
                <CardContent>
                    {!("error" in attendance) && attendance.stats.length > 0 ? (
                        <div className="space-y-4">
                            {attendance.stats.map((stat, i) => (
                                <div key={i} className="p-4 rounded-lg bg-background/50 border border-white/5">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="font-medium">{stat.classroomName}</span>
                                        <Badge
                                            variant={stat.percentage >= 75 ? "default" : "destructive"}
                                        >
                                            {stat.percentage}%
                                        </Badge>
                                    </div>
                                    <Progress
                                        value={stat.percentage}
                                        className={`h-3 ${stat.percentage >= 75 ? "" : "bg-red-500/20"}`}
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                        <span className="flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                                            {stat.present} present
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <XCircle className="w-3 h-3 text-red-500" />
                                            {stat.total - stat.present} absent
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {stat.total} total sessions
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p>No attendance records available yet.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Recent Attendance Sessions */}
            {!("error" in attendance) && attendance.sessions.length > 0 && (
                <Card className="border-white/10 bg-white/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-blue-500" /> Recent Sessions
                        </CardTitle>
                        <CardDescription>Your last 10 recorded class sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {attendance.sessions.slice(0, 10).map((session) => (
                                <div
                                    key={session.id}
                                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-white/5"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-3 h-3 rounded-full ${session.status === "PRESENT"
                                                    ? "bg-green-500"
                                                    : session.status === "LATE"
                                                        ? "bg-yellow-500"
                                                        : "bg-red-500"
                                                }`}
                                        />
                                        <span className="text-sm">
                                            {new Date(session.date).toLocaleDateString("en-US", {
                                                weekday: "short",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {/* FIXED: Duration is already in minutes, no need to divide by 60 */}
                                        <span className="text-xs text-muted-foreground">
                                            {Math.round(session.duration)} min
                                        </span>
                                        <Badge
                                            variant={session.status === "PRESENT" ? "default" : "destructive"}
                                            className="text-xs"
                                        >
                                            {session.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
