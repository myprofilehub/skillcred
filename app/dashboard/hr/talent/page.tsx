import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ExternalLink, Send, Award, CheckCircle, Star, FileCheck } from "lucide-react";
import Link from "next/link";

export default async function TalentPoolPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    if (session.user.role !== "HR") {
        redirect("/dashboard/student");
    }

    // Fetch all visible students with verification data
    const students = await prisma.student.findMany({
        where: { hrVisibile: true },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    image: true,
                },
            },
            portfolio: {
                include: {
                    projects: {
                        where: { verifiedBy: { not: null } }, // Only verified projects
                    },
                    recommendations: true,
                },
            },
            enrollments: {
                include: {
                    track: {
                        select: {
                            title: true,
                            slug: true,
                        },
                    },
                },
                take: 1,
            },
            assignments: {
                where: { status: "VERIFIED" },
            },
        },
        orderBy: { updatedAt: "desc" },
    });

    // Sort students to prioritize those with recommendations and verified projects
    const sortedStudents = [...students].sort((a, b) => {
        // Priority score: recommendations (3pts each) + verified projects (2pts each) + PAT passed (5pts)
        const scoreA = (a.portfolio?.recommendations?.length || 0) * 3
            + (a.portfolio?.projects?.length || 0) * 2
            + (a.portfolio?.patPassedAt ? 5 : 0);
        const scoreB = (b.portfolio?.recommendations?.length || 0) * 3
            + (b.portfolio?.projects?.length || 0) * 2
            + (b.portfolio?.patPassedAt ? 5 : 0);
        return scoreB - scoreA;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Talent Pool</h1>
                    <p className="text-muted-foreground">
                        Browse verified candidates - prioritized by mentor validations
                    </p>
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 p-3 bg-muted/30 rounded-lg text-sm">
                <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span>Mentor Recommended</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span>PAT Verified</span>
                </div>
                <div className="flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-blue-500" />
                    <span>Verified Projects</span>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, skills, or track..."
                        className="pl-10"
                    />
                </div>
                <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                </Button>
            </div>

            {/* Talent Grid */}
            {sortedStudents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedStudents.map((student) => {
                        const hasRecommendations = (student.portfolio?.recommendations?.length || 0) > 0;
                        const verifiedProjectCount = student.portfolio?.projects?.length || 0;
                        const patPassed = !!student.portfolio?.patPassedAt;
                        const isPriority = hasRecommendations || verifiedProjectCount >= 2;

                        return (
                            <Card
                                key={student.id}
                                className={`group transition-all duration-300 ${isPriority
                                        ? "border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent ring-1 ring-amber-500/20"
                                        : "hover:border-emerald-500/30"
                                    }`}
                            >
                                <CardContent className="p-6">
                                    {/* Priority Badge */}
                                    {isPriority && (
                                        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-amber-500/20">
                                            <Award className="h-4 w-4 text-amber-500" />
                                            <span className="text-xs font-medium text-amber-500">Priority Candidate</span>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-14 w-14 ring-2 ring-background">
                                            <AvatarImage src={student.user?.image || ""} />
                                            <AvatarFallback className={`${isPriority ? "bg-amber-500/20 text-amber-500" : "bg-emerald-500/20 text-emerald-500"}`}>
                                                {student.user?.name?.charAt(0) || "S"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold truncate group-hover:text-emerald-400 transition-colors">
                                                {student.user?.name || "Student"}
                                            </h3>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {student.portfolio?.headline || student.enrollments?.[0]?.track?.title || "SkillCred Student"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Verification Badges */}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {hasRecommendations && (
                                            <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 gap-1">
                                                <Star className="h-3 w-3" />
                                                {student.portfolio?.recommendations?.length} Recommendation{(student.portfolio?.recommendations?.length || 0) > 1 ? "s" : ""}
                                            </Badge>
                                        )}
                                        {patPassed && (
                                            <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30 gap-1">
                                                <CheckCircle className="h-3 w-3" />
                                                PAT Verified
                                            </Badge>
                                        )}
                                        {verifiedProjectCount > 0 && (
                                            <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 gap-1">
                                                <FileCheck className="h-3 w-3" />
                                                {verifiedProjectCount} Verified Project{verifiedProjectCount > 1 ? "s" : ""}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Track */}
                                    {student.enrollments?.[0]?.track && (
                                        <Badge variant="outline" className="mt-3 text-xs">
                                            {student.enrollments[0].track.title}
                                        </Badge>
                                    )}

                                    {student.portfolio?.skills && student.portfolio.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-4">
                                            {student.portfolio.skills.slice(0, 4).map((skill: string) => (
                                                <Badge
                                                    key={skill}
                                                    variant="secondary"
                                                    className="text-xs bg-emerald-500/10 text-emerald-400 border-0"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                            {student.portfolio.skills.length > 4 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{student.portfolio.skills.length - 4} more
                                                </Badge>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex gap-2 mt-5 pt-4 border-t border-white/10">
                                        <Button variant="outline" size="sm" className="flex-1" asChild>
                                            <Link href={`/dashboard/hr/talent/${student.id}`}>
                                                View Profile
                                            </Link>
                                        </Button>
                                        <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                                            <Send className="h-4 w-4 mr-2" />
                                            Interview
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <Card className="py-16 border-dashed">
                    <CardContent className="text-center">
                        <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-semibold mb-2">No Talent Available Yet</h3>
                        <p className="text-muted-foreground">
                            Verified students will appear here once they complete their portfolio.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
