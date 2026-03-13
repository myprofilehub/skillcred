import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { getJobWithApplications, updateApplicationStatus } from "@/app/actions/job-actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    ArrowLeft,
    MapPin,
    Clock,
    Briefcase,
    Users,
    CheckCircle,
    XCircle,
    Calendar,
    Eye,
    Send,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: PageProps) {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    if (session.user.role !== "HR") {
        redirect("/dashboard/student");
    }

    const result = await getJobWithApplications(id);

    if ("error" in result || !result.job) {
        notFound();
    }

    const job = result.job;

    const jobTypeLabels: Record<string, string> = {
        FULL_TIME: "Full Time",
        PART_TIME: "Part Time",
        INTERNSHIP: "Internship",
        CONTRACT: "Contract",
    };

    const statusColors: Record<string, string> = {
        APPLIED: "bg-blue-500/20 text-blue-400",
        REVIEWED: "bg-yellow-500/20 text-yellow-400",
        SHORTLISTED: "bg-emerald-500/20 text-emerald-400",
        REJECTED: "bg-red-500/20 text-red-400",
        INTERVIEW_SCHEDULED: "bg-purple-500/20 text-purple-400",
    };

    const statusLabels: Record<string, string> = {
        APPLIED: "Applied",
        REVIEWED: "Reviewed",
        SHORTLISTED: "Shortlisted",
        REJECTED: "Rejected",
        INTERVIEW_SCHEDULED: "Interview Scheduled",
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/hr/jobs">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
                        <Badge variant={job.isActive ? "default" : "secondary"} className={job.isActive ? "bg-emerald-600" : ""}>
                            {job.isActive ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {jobTypeLabels[job.type] || job.type}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Posted {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Job Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
                    {job.salary && (
                        <div>
                            <span className="text-sm text-muted-foreground">Salary: </span>
                            <span className="font-medium">{job.salary}</span>
                        </div>
                    )}
                    {job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill: string) => (
                                <Badge key={skill} variant="secondary">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Applicants */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Applicants ({job.applications.length})
                    </CardTitle>
                    <CardDescription>
                        Review and manage job applications
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {job.applications.length > 0 ? (
                        <div className="space-y-4">
                            {job.applications.map((application) => {
                                const student = application.student;
                                const user = student.user;

                                return (
                                    <div
                                        key={application.id}
                                        className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-start gap-4">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={user.image || undefined} />
                                                <AvatarFallback className="bg-emerald-600 text-white">
                                                    {user.name?.charAt(0) || "S"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-semibold">{user.name}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {student.portfolio?.headline || "Student"}
                                                </p>
                                                {student.enrollments[0]?.track && (
                                                    <Badge variant="outline" className="mt-1 text-xs">
                                                        {student.enrollments[0].track.title}
                                                    </Badge>
                                                )}
                                                {student.portfolio?.skills && student.portfolio.skills.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                        {student.portfolio.skills.slice(0, 4).map((skill: string) => (
                                                            <Badge key={skill} variant="secondary" className="text-xs">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    Applied {new Date(application.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-3">
                                            <Badge className={statusColors[application.status]}>
                                                {statusLabels[application.status]}
                                            </Badge>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/dashboard/hr/talent/${student.id}`}>
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        Profile
                                                    </Link>
                                                </Button>
                                                {application.status === "APPLIED" && (
                                                    <>
                                                        <form action={async () => {
                                                            "use server";
                                                            await updateApplicationStatus(application.id, "SHORTLISTED");
                                                        }}>
                                                            <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                                Shortlist
                                                            </Button>
                                                        </form>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                            <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
                            <p className="text-muted-foreground">
                                Students will appear here when they apply to this job
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
