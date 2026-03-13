import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { School, ExternalLink, Video, BookOpen, User } from "lucide-react";
import Link from "next/link";
import { fetchStudentClassrooms } from "@/app/actions/google-classroom";

export default async function StudentClassroomPage() {
    const classroomsData = await fetchStudentClassrooms();
    const classrooms = Array.isArray(classroomsData) ? classroomsData : [];
    const error = !Array.isArray(classroomsData) ? classroomsData.error : null;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading">My Classrooms</h1>
                    <p className="text-muted-foreground">Access your courses and join live sessions.</p>
                </div>
                <Link href="https://classroom.google.com" target="_blank">
                    <Button variant="outline" className="gap-2">
                        <ExternalLink className="w-4 h-4" /> Go to Google Classroom
                    </Button>
                </Link>
            </div>

            {error && (
                <div className="p-4 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <span>{error || "Authentication required."} Please connect your Google account to see your classrooms.</span>
                    <form action={async () => {
                        "use server";
                        const { googleLogin } = await import("@/actions/login");
                        await googleLogin("/dashboard/student/classroom");
                    }}>
                        <Button variant="destructive" size="sm" className="bg-red-500/20 hover:bg-red-500/30 text-red-500 border-0">
                            Connect Google Account
                        </Button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classrooms.map((classroom: any) => (
                    <Card key={classroom.id} className="border-white/10 bg-white/5 hover:border-primary/30 transition-colors group">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <School className="w-6 h-6 text-primary" />
                                </div>
                                <Badge variant={classroom.courseState === "ACTIVE" ? "default" : "secondary"}>
                                    {classroom.courseState}
                                </Badge>
                            </div>
                            <CardTitle className="text-xl mt-4 line-clamp-1">{classroom.name}</CardTitle>
                            <CardDescription className="line-clamp-1">{classroom.section || "No section"}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center justify-between p-2 rounded bg-background/50">
                                    <span className="flex items-center gap-2"><User className="w-4 h-4" /> Role</span>
                                    <span className="font-medium text-foreground">Student</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Link href={classroom.alternateLink} target="_blank" className="flex-1">
                                    <Button variant="outline" className="w-full gap-2 hover:bg-primary/10 hover:text-primary border-primary/20">
                                        <ExternalLink className="w-4 h-4" /> Open
                                    </Button>
                                </Link>
                                {classroom.meetLink ? (
                                    <Link href={classroom.meetLink} target="_blank" className="flex-1">
                                        <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                                            <Video className="w-4 h-4" /> Join Meet
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button variant="ghost" className="w-full gap-2 opacity-50 cursor-not-allowed" disabled title="No active session">
                                        <Video className="w-4 h-4" /> No Meeting
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {classrooms.length === 0 && !error && (
                    <div className="col-span-full py-12 text-center text-muted-foreground bg-white/5 rounded-lg border border-dashed border-white/10">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium">No Enrolled Classrooms</h3>
                        <p>You haven't joined any Google Classrooms yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
