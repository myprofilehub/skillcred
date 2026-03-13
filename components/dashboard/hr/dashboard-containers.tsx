import { Suspense } from "react";
import { getHRDashboardStats, getRecentTalent, getInterviewRequests } from "@/app/actions/hr-dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Eye, Send, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

// Stats Container
export async function StatsContainer() {
    const data = await getHRDashboardStats();
    if ("error" in data) return null;

    const stats = data.stats;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Talent</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalTalent}</div>
                    <p className="text-xs text-muted-foreground">Available candidates</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Profiles Viewed</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.profilesViewed}</div>
                    <p className="text-xs text-muted-foreground">Total views</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                    <Send className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.pendingRequests}</div>
                    <p className="text-xs text-muted-foreground">Awaiting response</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Accepted</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-emerald-500">{stats.acceptedRequests}</div>
                    <p className="text-xs text-muted-foreground">Interview scheduled</p>
                </CardContent>
            </Card>
        </div>
    );
}

// Recent Talent Container
export async function RecentTalentContainer() {
    const data = await getRecentTalent(6);
    if ("error" in data) return <div>Failed to load talent</div>;

    const students = data.students || [];

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Recent Talent</CardTitle>
                    <CardDescription>Verified candidates ready for opportunities</CardDescription>
                </div>
                <Button variant="ghost" asChild>
                    <Link href="/dashboard/hr/talent">View All</Link>
                </Button>
            </CardHeader>
            <CardContent>
                {students.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {students.map((student: any) => (
                            <Card key={student.id} className="border-white/10 hover:border-emerald-500/30 transition-colors">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={student.user?.image || ""} />
                                            <AvatarFallback>
                                                {student.user?.name?.charAt(0) || "S"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium truncate">{student.user?.name || "Student"}</h4>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {student.portfolio?.headline || student.enrollments?.[0]?.track?.title || "SkillCred Student"}
                                            </p>
                                        </div>
                                    </div>
                                    {student.portfolio?.skills && student.portfolio.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {student.portfolio.skills.slice(0, 3).map((skill: string) => (
                                                <Badge key={skill} variant="secondary" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                            {student.portfolio.skills.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{student.portfolio.skills.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No verified talent available yet.</p>
                        <p className="text-sm">Check back soon for new candidates.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// Interview Requests Container
export async function InterviewRequestsContainer() {
    const data = await getInterviewRequests();
    if ("error" in data) return null;

    const requests = data.requests || [];
    const pendingRequests = requests.filter((r: any) => r.status === "PENDING").slice(0, 5);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Recent Interview Requests</CardTitle>
                    <CardDescription>Track your outreach to candidates</CardDescription>
                </div>
                <Button variant="ghost" asChild>
                    <Link href="/dashboard/hr/requests">View All</Link>
                </Button>
            </CardHeader>
            <CardContent>
                {pendingRequests.length > 0 ? (
                    <div className="space-y-3">
                        {pendingRequests.map((request: any) => (
                            <div key={request.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={request.student?.user?.image || ""} />
                                        <AvatarFallback>
                                            {request.student?.user?.name?.charAt(0) || "S"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{request.student?.user?.name || "Student"}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {request.student?.portfolio?.headline || "SkillCred Student"}
                                        </p>
                                    </div>
                                </div>
                                <Badge
                                    variant={request.status === "ACCEPTED" ? "default" : request.status === "REJECTED" ? "destructive" : "secondary"}
                                >
                                    {request.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6 text-muted-foreground">
                        <Send className="h-10 w-10 mx-auto mb-3 opacity-50" />
                        <p>No interview requests yet.</p>
                        <p className="text-sm">Browse the talent pool to find candidates.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// Skeletons
export function StatsSkeleton() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-[120px] w-full rounded-xl" />
            ))}
        </div>
    );
}

export function TalentSkeleton() {
    return <Skeleton className="h-[400px] w-full rounded-xl" />;
}

export function RequestsSkeleton() {
    return <Skeleton className="h-[300px] w-full rounded-xl" />;
}
