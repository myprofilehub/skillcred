import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getHRJobs } from "@/app/actions/job-actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Briefcase, Users, MapPin, Clock, MoreVertical, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default async function JobsPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    if (session.user.role !== "HR") {
        redirect("/dashboard/student");
    }

    const result = await getHRJobs();
    const jobs = "error" in result ? [] : result.jobs;

    const jobTypeLabels: Record<string, string> = {
        FULL_TIME: "Full Time",
        PART_TIME: "Part Time",
        INTERNSHIP: "Internship",
        CONTRACT: "Contract",
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Job Postings</h1>
                    <p className="text-muted-foreground">
                        Manage your job listings and view applications
                    </p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                    <Link href="/dashboard/hr/jobs/new">
                        <Plus className="h-4 w-4 mr-2" />
                        Post New Job
                    </Link>
                </Button>
            </div>

            {/* Jobs List */}
            {jobs.length > 0 ? (
                <div className="space-y-4">
                    {jobs.map((job) => (
                        <Card key={job.id} className="hover:border-emerald-500/20 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold">{job.title}</h3>
                                            <Badge variant={job.isActive ? "default" : "secondary"} className={job.isActive ? "bg-emerald-600" : ""}>
                                                {job.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                            <Badge variant="outline">
                                                {jobTypeLabels[job.type] || job.type}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                Posted {new Date(job.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground line-clamp-2 mb-3">
                                            {job.description}
                                        </p>
                                        {job.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {job.skills.slice(0, 5).map((skill) => (
                                                    <Badge key={skill} variant="secondary" className="text-xs">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                                {job.skills.length > 5 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{job.skills.length - 5} more
                                                    </Badge>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-end gap-3 ml-6">
                                        <div className="text-center px-4 py-2 bg-muted/50 rounded-lg">
                                            <div className="text-2xl font-bold text-emerald-500">
                                                {job._count.applications}
                                            </div>
                                            <div className="text-xs text-muted-foreground">Applicants</div>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/dashboard/hr/jobs/${job.id}`}>
                                                <Users className="h-4 w-4 mr-2" />
                                                View Applicants
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="py-16 border-dashed">
                    <CardContent className="text-center">
                        <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-semibold mb-2">No Jobs Posted Yet</h3>
                        <p className="text-muted-foreground mb-4">
                            Create your first job posting to start receiving applications
                        </p>
                        <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                            <Link href="/dashboard/hr/jobs/new">
                                <Plus className="h-4 w-4 mr-2" />
                                Post Your First Job
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
