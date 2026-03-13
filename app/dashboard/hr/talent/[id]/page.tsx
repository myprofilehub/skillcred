import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { getStudentProfileForHR } from "@/app/actions/job-actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
    ArrowLeft,
    Mail,
    Github,
    Linkedin,
    Award,
    BookOpen,
    Briefcase,
    CheckCircle2,
    XCircle,
    Calendar,
    GraduationCap,
    Code,
    TrendingUp,
    FileText,
    Send,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function StudentProfilePage({ params }: PageProps) {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    if (session.user.role !== "HR") {
        redirect("/dashboard/student");
    }

    const result = await getStudentProfileForHR(id);

    if ("error" in result || !result.student) {
        notFound();
    }

    const { student, metrics } = result;
    const user = student.user;
    const portfolio = student.portfolio;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/hr/talent">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div className="flex-1 flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.image || undefined} />
                            <AvatarFallback className="bg-emerald-600 text-white text-2xl">
                                {user.name?.charAt(0) || "S"}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                            <p className="text-muted-foreground">
                                {portfolio?.headline || "Student"}
                            </p>
                            {student.enrollments[0]?.track && (
                                <Badge variant="outline" className="mt-2">
                                    {student.enrollments[0].track.title}
                                </Badge>
                            )}
                            <div className="flex items-center gap-3 mt-3">
                                <a href={`mailto:${user.email}`} className="text-muted-foreground hover:text-foreground">
                                    <Mail className="h-5 w-5" />
                                </a>
                                {portfolio?.githubUrl && (
                                    <a href={portfolio.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                        <Github className="h-5 w-5" />
                                    </a>
                                )}
                                {portfolio?.linkedinUrl && (
                                    <a href={portfolio.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Send className="h-4 w-4 mr-2" />
                        Request Interview
                    </Button>
                </div>
            </div>

            {/* Performance Matrix */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/20">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-500">{metrics.projectCompletionRate}%</div>
                            <p className="text-sm text-muted-foreground mt-1">Projects Completed</p>
                            <p className="text-xs text-muted-foreground">{metrics.completedProjects}/{metrics.totalProjects}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/20">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-500">{metrics.avgScore}%</div>
                            <p className="text-sm text-muted-foreground mt-1">Avg Assessment Score</p>
                            <p className="text-xs text-muted-foreground">{metrics.passedAssessments} passed</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-500">{metrics.assessmentPassRate}%</div>
                            <p className="text-sm text-muted-foreground mt-1">Test Pass Rate</p>
                            <p className="text-xs text-muted-foreground">{metrics.totalAssessments} total</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className={`bg-gradient-to-br ${metrics.patPassed ? "from-green-500/10 to-emerald-500/10 border-green-500/20" : "from-gray-500/10 to-slate-500/10 border-gray-500/20"}`}>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            {metrics.patPassed ? (
                                <CheckCircle2 className="h-8 w-8 mx-auto text-green-500" />
                            ) : (
                                <XCircle className="h-8 w-8 mx-auto text-muted-foreground" />
                            )}
                            <p className="text-sm text-muted-foreground mt-2">PAT Status</p>
                            <p className="text-xs font-medium">{metrics.patPassed ? "Passed" : "Pending"}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Bio */}
                    {portfolio?.bio && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    About
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-wrap">{portfolio.bio}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Projects */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Code className="h-5 w-5" />
                                Projects ({portfolio?.projects?.length || 0})
                            </CardTitle>
                            <CardDescription>Verified portfolio projects</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {portfolio?.projects && portfolio.projects.length > 0 ? (
                                <div className="space-y-4">
                                    {portfolio.projects.map((proj) => (
                                        <div key={proj.id} className="flex items-start justify-between p-4 rounded-lg border bg-muted/20">
                                            <div>
                                                <h4 className="font-semibold">{proj.title}</h4>
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {proj.description}
                                                </p>
                                                {proj.skills.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                        {proj.skills.slice(0, 4).map((skill) => (
                                                            <Badge key={skill} variant="secondary" className="text-xs">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {proj.grade && (
                                                <Badge className="bg-emerald-600">{proj.grade}/100</Badge>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">No projects yet</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Assessments */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Assessment Results
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {student.assessmentResults.length > 0 ? (
                                <div className="space-y-3">
                                    {student.assessmentResults.map((result) => (
                                        <div key={result.id} className="flex items-center justify-between p-3 rounded-lg border">
                                            <div className="flex items-center gap-3">
                                                {result.passed ? (
                                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <XCircle className="h-5 w-5 text-muted-foreground" />
                                                )}
                                                <div>
                                                    <p className="font-medium">{result.assessment?.title || "Assessment"}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {new Date(result.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold">{result.score}%</div>
                                                <Badge variant={result.passed ? "default" : "secondary"} className={result.passed ? "bg-green-600" : ""}>
                                                    {result.passed ? "Passed" : "Failed"}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">No assessments completed</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Skills */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {portfolio?.skills && portfolio.skills.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {portfolio.skills.map((skill) => (
                                        <Badge key={skill} variant="secondary">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-sm">No skills listed</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Education */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Education
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {student.college ? (
                                <div>
                                    <p className="font-medium">{student.college}</p>
                                    {student.stream && <p className="text-sm text-muted-foreground">{student.stream}</p>}
                                    {student.year && <p className="text-sm text-muted-foreground">Year: {student.year}</p>}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-sm">Not specified</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recommendations */}
                    {portfolio?.recommendations && portfolio.recommendations.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Award className="h-5 w-5" />
                                    Recommendations
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {portfolio.recommendations.map((rec) => (
                                    <div key={rec.id} className="p-3 rounded-lg bg-muted/30">
                                        <p className="text-sm italic">&quot;{rec.content}&quot;</p>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            — {rec.mentor?.user?.name || "Mentor"}
                                        </p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
