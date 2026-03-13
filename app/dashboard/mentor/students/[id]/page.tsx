
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { fetchGoogleClassroom } from "@/app/actions/google-classroom"; // Reusing existing fetch
import { getMeetingParticipants } from "@/app/actions/meet"; // New action
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ShieldCheck, CheckCircle2, Video, Mail } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { togglePATStatus } from "@/app/actions/pat";
import { prisma } from "@/lib/db";
import { UploadRecommendationDialog } from "@/components/dashboard/upload-recommendation-dialog";
import { AttendanceVerificationDialog } from "@/components/dashboard/attendance-verification-dialog";
import { SendEmailDialog } from "@/components/dashboard/send-email-dialog";

export default async function ClassRosterPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) redirect("/auth/signin");

    const { id: courseId } = await params;

    // 1. Fetch Course Details & Students
    const course = await fetchGoogleClassroom(courseId);
    if (!course || 'error' in course) {
        return <div>Course not found or error loading data.</div>;
    }

    // 2. Fetch Meeting Logs (Real-time from Meet API)
    const meetingLogsResult = await getMeetingParticipants(courseId);
    const meetingLogs = Array.isArray(meetingLogsResult) ? meetingLogsResult : [];

    // 3. Fetch Enrolled Students (Deep fetch for actions)
    const { getCourseStudents, getCourseWorkStudentSubmissions } = await import("@/lib/google");
    const studentsRes = await getCourseStudents(session.accessToken!, courseId);
    const students = Array.isArray(studentsRes) ? studentsRes : [];

    // 4. Enrich Students with DB Data (PAT Status)
    const emails = students
        .map((s: any) => s.profile.emailAddress)
        .filter((email: any): email is string => !!email);

    let dbUsers: any[] = [];
    if (emails.length > 0) {
        dbUsers = await prisma.user.findMany({
            where: { email: { in: emails } },
            include: { studentProfile: true }
        });
    }

    const emailToUserMap = new Map(dbUsers.map((u: any) => [u.email, u]));

    const enrichedStudents = students.map((courseStudent: any) => {
        const dbUser = emailToUserMap.get(courseStudent.profile.emailAddress);
        return {
            ...courseStudent,
            dbUserId: dbUser?.id,
            patEligible: dbUser?.studentProfile?.patEligible || false,
            // Mock project count for demo until we do deep fetch
            projectsCompleted: dbUser ? 3 : 0,
            projectsTotal: 5
        };
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/mentor/students">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{(course as any).name} Roster</h1>
                        <p className="text-muted-foreground text-sm">
                            {students.length} Students • {meetingLogs.length} Meeting Logs
                        </p>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="students" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="students">Student Performance</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance Logs</TabsTrigger>
                    {/* <TabsTrigger value="verifications">Project Verifications</TabsTrigger> */}
                </TabsList>

                {/* Tab: Student Performance (PAT & Rec Letters) */}
                <TabsContent value="students">
                    <Card>
                        <CardHeader>
                            <CardTitle>Class Performance</CardTitle>
                            <CardDescription>Manage PAT eligibility and generate documents.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Projects</TableHead>
                                        <TableHead>Attendance Support</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {enrichedStudents.map((student: any) => (
                                        <TableRow key={student.userId}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage src={student.profile.photoUrl} />
                                                        <AvatarFallback>{student.profile.name.fullName[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{student.profile.name.fullName}</div>
                                                        <div className="text-xs text-muted-foreground">{student.profile.emailAddress}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-sm font-medium">{student.projectsCompleted} / {student.projectsTotal} Projects</div>
                                                    <div className="w-24 h-5  bg-secondary rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-500" style={{ width: `${(student.projectsCompleted / student.projectsTotal) * 100}%` }} />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={student.patEligible ? "default" : "secondary"}>
                                                    {student.patEligible ? "Eligible" : "In Progress"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {student.dbUserId ? (
                                                        <form action={async () => {
                                                            "use server";
                                                            await togglePATStatus(student.dbUserId, !student.patEligible);
                                                        }}>
                                                            <Button size="sm" variant="outline" className={`gap-2 ${student.patEligible ? 'text-green-600 border-green-600' : 'text-blue-600 hover:text-blue-700'}`}>
                                                                <ShieldCheck className="w-4 h-4" />
                                                                {student.patEligible ? "PAT Unlocked" : "Unlock PAT"}
                                                            </Button>
                                                        </form>
                                                    ) : (
                                                        <Button size="sm" variant="ghost" disabled title="Student not registered in DB">
                                                            <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                                                        </Button>
                                                    )}
                                                    {student.dbUserId ? (
                                                        <UploadRecommendationDialog
                                                            studentId={student.dbUserId}
                                                            studentName={student.profile.name.fullName}
                                                        />
                                                    ) : (
                                                        <Button size="sm" variant="ghost" disabled title="Student not in DB">
                                                            <Download className="w-4 h-4 text-muted-foreground opacity-30" />
                                                        </Button>
                                                    )}

                                                    <SendEmailDialog
                                                        studentName={student.profile.name.fullName}
                                                        studentEmail={student.profile.emailAddress}
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {enrichedStudents.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                                No students found in this class.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab: Attendance Logs (Real-time Meet API) */}
                <TabsContent value="attendance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Real-Time Meeting Logs</CardTitle>
                            <CardDescription>
                                Fetched directly from Google Meet. Verify session attendance here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {meetingLogs.map((log: any) => (
                                    <div key={log.id} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                                    <Video className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">Session: {format(new Date(log.startTime), "MMM d, yyyy")}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {format(new Date(log.startTime), "h:mm a")} - {format(new Date(log.endTime), "h:mm a")}
                                                        {' • '}{Math.round(log.duration / 60000)} mins
                                                    </p>
                                                </div>
                                            </div>
                                            <AttendanceVerificationDialog
                                                courseId={courseId}
                                                log={log}
                                                enrolledStudents={enrichedStudents}
                                            />
                                        </div>

                                        {/* Participants List */}
                                        <div className="bg-muted/30 rounded-md p-3">
                                            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Participants ({log.participants.length})</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {log.participants.map((p: any) => (
                                                    <Badge key={p.name} variant="secondary" className="bg-background border-muted-foreground/20">
                                                        {/* Meet API anonymizes names sometimes depending on edition. */}
                                                        {/* It returns 'signedinUser' object usually. */}
                                                        {p.signedinUser?.displayName || "Anonymous User"}
                                                    </Badge>
                                                ))}
                                                {log.participants.length === 0 && (
                                                    <span className="text-sm text-muted-foreground italic">No participant details available.</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {meetingLogs.length === 0 && (
                                    <div className="text-center py-10 text-muted-foreground">
                                        <Video className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>No meeting records found for this account.</p>
                                        <p className="text-xs mt-1">Note: The Google Meet API only returns meetings recorded or organized by you.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
