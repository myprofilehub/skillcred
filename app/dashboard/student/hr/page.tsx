import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getActiveJobs, getStudentApplications } from "@/app/actions/job-actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Eye,
    Briefcase,
    Search,
    TrendingUp,
    Building,
    MapPin,
    Calendar,
    CheckCircle2,
    XCircle,
    UserCircle,
    FileText,
    Clock,
    Send,
    Lock,
} from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import { ApplyButton } from "./apply-button";

// ============================================================================
// DATA FETCHING
// ============================================================================

async function getStudentData() {
    const session = await auth();
    if (!session?.user?.id) return null;

    const student = await prisma.student.findUnique({
        where: { userId: session.user.id },
        include: {
            portfolio: true,
            hrViews: {
                include: {
                    hr: {
                        include: {
                            user: { select: { name: true } },
                        },
                    },
                },
                orderBy: { viewedAt: "desc" },
                take: 5,
            },
            interviewRequests: {
                where: { status: "PENDING" },
                include: {
                    hr: {
                        include: {
                            user: { select: { name: true } },
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            },
        },
    });

    return student;
}

// ============================================================================
// COMPONENTS
// ============================================================================

function StatCard({ title, value, subtitle, icon: Icon, gradient }: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: any;
    gradient: string;
}) {
    return (
        <Card className={`bg-gradient-to-br ${gradient}`}>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between">
                    {title}
                    <Icon className="w-4 h-4" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            </CardContent>
        </Card>
    );
}

async function JobListings({ portfolioUnlocked }: { portfolioUnlocked: boolean }) {
    const result = await getActiveJobs();
    const jobs = "error" in result ? [] : result.jobs;

    const applicationsResult = await getStudentApplications();
    const applications = "error" in applicationsResult ? [] : applicationsResult.applications;
    const appliedJobIds = new Set(applications.map((a) => a.jobId));

    const jobTypeLabels: Record<string, string> = {
        FULL_TIME: "Full Time",
        PART_TIME: "Part Time",
        INTERNSHIP: "Internship",
        CONTRACT: "Contract",
    };

    if (jobs.length === 0) {
        return (
            <div className="text-center py-12">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Jobs Available</h3>
                <p className="text-muted-foreground">Check back later for new opportunities</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {jobs.map((job) => {
                const hasApplied = appliedJobIds.has(job.id);

                return (
                    <Card key={job.id} className="hover:border-primary/20 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold">{job.title}</h3>
                                        <Badge variant="outline">
                                            {jobTypeLabels[job.type] || job.type}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                        <span className="flex items-center gap-1">
                                            <Building className="h-4 w-4" />
                                            {job.hr.company}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {job.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {new Date(job.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                                        {job.description}
                                    </p>
                                    {job.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {job.skills.slice(0, 5).map((skill) => (
                                                <Badge key={skill} variant="secondary" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="ml-6 flex flex-col items-end gap-2">
                                    {job.salary && (
                                        <p className="text-sm font-medium text-emerald-500">{job.salary}</p>
                                    )}
                                    {hasApplied ? (
                                        <Badge className="bg-emerald-600">Applied</Badge>
                                    ) : portfolioUnlocked ? (
                                        <ApplyButton jobId={job.id} />
                                    ) : (
                                        <Button variant="outline" disabled className="gap-2">
                                            <Lock className="h-4 w-4" />
                                            Complete PAT
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

async function MyApplications() {
    const result = await getStudentApplications();
    const applications = "error" in result ? [] : result.applications;

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

    if (applications.length === 0) {
        return (
            <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground">Apply to jobs to track your applications here</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {applications.map((app) => (
                <Card key={app.id}>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold">{app.job.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {app.job.hr.company}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Applied {new Date(app.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <Badge className={statusColors[app.status]}>
                                {statusLabels[app.status]}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default async function CareerHubPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    const student = await getStudentData();

    if (!student) {
        redirect("/dashboard/student");
    }

    const portfolioUnlocked = student.portfolio?.isUnlocked || false;
    const patPassed = !!student.portfolio?.patPassedAt;
    const profileViews = student.hrViews.length;
    const pendingRequests = student.interviewRequests.length;

    // Show locked state if PAT not completed
    if (!patPassed) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                    <Lock className="h-12 w-12 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-bold mb-3">Career Hub Locked</h1>
                <p className="text-muted-foreground max-w-md mb-6">
                    Complete your Project Assessment Test (PAT) to unlock access to job opportunities,
                    recruiter visibility, and interview requests.
                </p>
                <div className="bg-secondary/20 border border-white/10 rounded-lg p-6 max-w-md w-full mb-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        What you&apos;ll unlock:
                    </h3>
                    <ul className="space-y-3 text-sm text-left">
                        <li className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-primary" />
                            Browse and apply to job opportunities
                        </li>
                        <li className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-primary" />
                            Get discovered by HR recruiters
                        </li>
                        <li className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            Receive interview requests
                        </li>
                        <li className="flex items-center gap-2">
                            <Send className="h-4 w-4 text-primary" />
                            Track your job applications
                        </li>
                    </ul>
                </div>
                <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/dashboard/student/assessments">
                        Take PAT Assessment
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Career Hub</h1>
                    <p className="text-muted-foreground">
                        Browse jobs and track your applications
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm font-medium">PAT Completed</span>
                    <Badge className="bg-emerald-600">Active</Badge>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Profile Views"
                    value={profileViews}
                    subtitle="By recruiters"
                    icon={Eye}
                    gradient="from-blue-500/10 to-indigo-500/10 border-blue-500/20"
                />
                <StatCard
                    title="Interview Requests"
                    value={pendingRequests}
                    subtitle="Pending response"
                    icon={Briefcase}
                    gradient="from-purple-500/10 to-pink-500/10 border-purple-500/20"
                />
                <StatCard
                    title="Applications"
                    value={student.portfolio ? "Active" : "No"}
                    subtitle={portfolioUnlocked ? "Ready to apply" : "Complete PAT first"}
                    icon={Send}
                    gradient="from-emerald-500/10 to-green-500/10 border-emerald-500/20"
                />
            </div >

            {/* Tabs */}
            < Tabs defaultValue="jobs" className="space-y-6" >
                <TabsList>
                    <TabsTrigger value="jobs">Available Jobs</TabsTrigger>
                    <TabsTrigger value="applications">My Applications</TabsTrigger>
                    <TabsTrigger value="interviews">Interview Requests</TabsTrigger>
                </TabsList>

                <TabsContent value="jobs">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5" />
                                Job Opportunities
                            </CardTitle>
                            <CardDescription>
                                {!portfolioUnlocked && (
                                    <span className="text-yellow-500">
                                        Complete your PAT assessment to unlock job applications
                                    </span>
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Loading jobs...</div>}>
                                <JobListings portfolioUnlocked={portfolioUnlocked} />
                            </Suspense>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="applications">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                My Applications
                            </CardTitle>
                            <CardDescription>Track the status of your job applications</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Loading applications...</div>}>
                                <MyApplications />
                            </Suspense>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="interviews">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-emerald-400">
                                <Calendar className="h-5 w-5" />
                                Interview Requests
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {student.interviewRequests.length > 0 ? (
                                <div className="space-y-4">
                                    {student.interviewRequests.map((req) => (
                                        <div
                                            key={req.id}
                                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                                        >
                                            <div className="mb-4 sm:mb-0">
                                                <h4 className="font-bold text-lg">{req.hr.company}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    From: {req.hr.user.name}
                                                </p>
                                                {req.message && (
                                                    <p className="text-sm mt-2">{req.message}</p>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" className="border-red-500/30 hover:bg-red-500/10 text-red-400">
                                                    Decline
                                                </Button>
                                                <Button className="bg-emerald-600 hover:bg-emerald-700">
                                                    Accept
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                                    <h3 className="text-lg font-semibold mb-2">No Interview Requests</h3>
                                    <p className="text-muted-foreground">
                                        Interview requests from recruiters will appear here
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs >
        </div >
    );
}
