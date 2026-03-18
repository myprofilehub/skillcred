import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStudentCurriculumProgress, checkAndUpdatePATEligibility } from "@/app/actions/curriculum-actions";
import { getMyAttendance } from "@/app/actions/student-dashboard";
import { getMyEnrollments } from "@/app/actions/enrollment";
import {
    Lock,
    Unlock,
    CheckCircle2,
    AlertCircle,
    FileText,
    Video
} from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AssessmentPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");

    // Get active enrollment to find the track
    const enrollments = await getMyEnrollments();
    const activeEnrollment = enrollments[0]; // Assuming first enrollment is active for now

    let eligibility: any = {
        eligible: false,
        projectsVerified: 0,
        projectsTotal: 0,
        attendanceMet: false,
        reason: "No active enrollment"
    };

    let attendancePercentage = 0;

    if (activeEnrollment) {
        // Run the eligibility check and update DB flag
        eligibility = await checkAndUpdatePATEligibility(
            activeEnrollment.studentId,
            activeEnrollment.trackId
        );

        // Get actual attendance stats for display
        const attendanceData = await getMyAttendance();
        if (!("error" in attendanceData) && attendanceData.stats.length > 0) {
            attendancePercentage = Math.round(
                attendanceData.stats.reduce((s, a) => s + a.percentage, 0) / attendanceData.stats.length
            );
        }
    }

    const allProjectsVerified = eligibility.projectsVerified >= eligibility.projectsTotal;
    const unlocked = eligibility.eligible;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-white">Project-Based Assessment Test (PAT)</h1>
                    <p className="text-slate-400">The final step to earning your verification and recommendation.</p>
                </div>
                {unlocked ? (
                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 text-sm gap-2">
                        <Unlock className="w-4 h-4" /> Assessment Unlocked
                    </Badge>
                ) : (
                    <Badge variant="outline" className="border-red-500/30 text-red-500 bg-red-500/5 px-4 py-2 text-sm gap-2">
                        <Lock className="w-4 h-4" /> Locked
                    </Badge>
                )}
            </div>

            {/* UNLOCK CRITERIA */}
            <div className="grid md:grid-cols-2 gap-8">
                <Card className={`bg-slate-900 ${unlocked ? 'border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'border-slate-800'}`}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            {unlocked ? <Unlock className="w-5 h-5 text-green-500" /> : <Lock className="w-5 h-5 text-red-500" />}
                            Unlock Requirements
                        </CardTitle>
                        <CardDescription className="text-slate-400">You must meet all criteria to start the assessment.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            {
                                label: `All ${eligibility.projectsTotal} Projects Verified`,
                                current: `${eligibility.projectsVerified || 0}/${eligibility.projectsTotal}`,
                                done: allProjectsVerified
                            },
                            {
                                label: "Attendance ≥ 75%",
                                current: `${attendancePercentage}%`,
                                done: eligibility.attendanceMet
                            },
                            {
                                label: "Security/Plagiarism Check",
                                current: unlocked ? "Passed" : "Pending",
                                done: unlocked
                            }
                        ].map((req, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <div className={`p-1.5 rounded-full ${req.done ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                        {req.done ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                    </div>
                                    <span className="text-sm font-medium text-slate-200">{req.label}</span>
                                </div>
                                <span className={`text-sm font-semibold ${req.done ? 'text-green-500' : 'text-slate-500'}`}>
                                    {req.current}
                                </span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/10 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Assessment Structure</CardTitle>
                        <CardDescription className="text-slate-400">What to expect in the 100-mark evaluation.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { title: "Project Defense", marks: "40", icon: FileText },
                                { title: "Vulnerability Fixes", marks: "20", icon: CheckCircle2 },
                                { title: "Live Usage Demo", marks: "30", icon: Video },
                                { title: "Viva Voce", marks: "10", icon: AlertCircle }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center justify-center p-6 rounded-lg bg-slate-900/50 border border-slate-800/50 text-center hover:border-indigo-500/30 transition-colors">
                                    <item.icon className="w-8 h-8 mb-3 text-indigo-400" />
                                    <div className="font-bold text-2xl text-white mb-1">{item.marks}</div>
                                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{item.title}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ACTION AREA */}
            <Card className="border-slate-800 bg-slate-900">
                <CardHeader>
                    <CardTitle className="text-white">Ready to Start?</CardTitle>
                    <CardDescription className="text-slate-400">
                        {unlocked
                            ? "You are eligible. Schedule your live assessment slot now."
                            : "Complete the remaining requirements to unlock this section."}
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    {unlocked ? (
                        <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
                            Book Assessment Slot
                        </Button>
                    ) : (
                        <Button size="lg" disabled className="w-full bg-slate-800 text-slate-500 border-slate-700">
                            Locked - Complete Requirements
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
