import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardCheck, Clock, ExternalLink, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { getMyAssignments } from "@/app/actions/student-dashboard";
import Link from "next/link";

export default async function StudentAssignmentsPage() {
    const session = await auth();
    if (!session?.user) redirect("/auth/signin");

    const assignments = await getMyAssignments();

    if ("error" in assignments) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Assignments</h1>
                <Card className="border-destructive/50 bg-destructive/10">
                    <CardContent className="p-6">
                        <p className="text-destructive">{assignments.error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Categorize assignments
    const pending = assignments.filter((a) => a.state === "NEW" || a.state === "CREATED");
    const inProgress = assignments.filter((a) => a.state === "RECLAIMED_BY_STUDENT");
    const submitted = assignments.filter((a) => a.state === "TURNED_IN");
    const graded = assignments.filter((a) => a.state === "RETURNED");

    const getStatusBadge = (state: string, grade?: number, maxPoints?: number) => {
        switch (state) {
            case "RETURNED":
                return (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {grade !== undefined && maxPoints ? `${grade}/${maxPoints}` : "Graded"}
                    </Badge>
                );
            case "TURNED_IN":
                return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Submitted</Badge>;
            case "RECLAIMED_BY_STUDENT":
                return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">In Progress</Badge>;
            default:
                return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Not Started</Badge>;
        }
    };

    const getDueDateInfo = (dueDate: string | null) => {
        if (!dueDate) return { text: "No due date", isOverdue: false };
        const due = new Date(dueDate);
        const now = new Date();
        const diff = due.getTime() - now.getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        if (days < 0) return { text: `Overdue by ${Math.abs(days)} days`, isOverdue: true };
        if (days === 0) return { text: "Due today", isOverdue: false };
        if (days === 1) return { text: "Due tomorrow", isOverdue: false };
        if (days <= 7) return { text: `Due in ${days} days`, isOverdue: false };
        return { text: due.toLocaleDateString(), isOverdue: false };
    };

    const AssignmentCard = ({ assignment }: { assignment: typeof assignments[0] }) => {
        const dueInfo = getDueDateInfo(assignment.dueDate);
        return (
            <Card className="border-white/10 bg-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{assignment.title}</h3>
                            <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                            {assignment.description && (
                                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                                    {assignment.description}
                                </p>
                            )}
                            <div className="flex items-center gap-3 mt-3">
                                <div className={`flex items-center gap-1 text-xs ${dueInfo.isOverdue ? "text-red-400" : "text-muted-foreground"}`}>
                                    <Clock className="w-3 h-3" />
                                    {dueInfo.text}
                                </div>
                                {assignment.maxPoints && (
                                    <span className="text-xs text-muted-foreground">
                                        {assignment.maxPoints} points
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            {getStatusBadge(assignment.state, assignment.grade, assignment.maxPoints)}
                            {assignment.alternateLink && (
                                <Link href={assignment.alternateLink} target="_blank">
                                    <Button size="sm" variant="outline" className="gap-1 text-xs">
                                        <ExternalLink className="w-3 h-3" /> Open
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading">Assignments</h1>
                <p className="text-muted-foreground">Track and submit your coursework</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-orange-500/10 border-orange-500/20">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-400">{pending.length}</div>
                        <div className="text-xs text-muted-foreground">Pending</div>
                    </CardContent>
                </Card>
                <Card className="bg-yellow-500/10 border-yellow-500/20">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-400">{inProgress.length}</div>
                        <div className="text-xs text-muted-foreground">In Progress</div>
                    </CardContent>
                </Card>
                <Card className="bg-blue-500/10 border-blue-500/20">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400">{submitted.length}</div>
                        <div className="text-xs text-muted-foreground">Submitted</div>
                    </CardContent>
                </Card>
                <Card className="bg-green-500/10 border-green-500/20">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">{graded.length}</div>
                        <div className="text-xs text-muted-foreground">Graded</div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all" className="gap-2">
                        <FileText className="w-4 h-4" /> All ({assignments.length})
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="gap-2">
                        <AlertCircle className="w-4 h-4" /> Pending ({pending.length})
                    </TabsTrigger>
                    <TabsTrigger value="graded" className="gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Graded ({graded.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-3">
                    {assignments.length === 0 ? (
                        <Card className="border-dashed bg-white/5">
                            <CardContent className="p-12 text-center">
                                <ClipboardCheck className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                                <p className="text-muted-foreground">No assignments found.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        assignments.map((a) => <AssignmentCard key={a.id} assignment={a} />)
                    )}
                </TabsContent>

                <TabsContent value="pending" className="space-y-3">
                    {pending.length === 0 ? (
                        <Card className="border-dashed bg-white/5">
                            <CardContent className="p-12 text-center">
                                <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500/30" />
                                <p className="text-muted-foreground">All caught up! No pending assignments.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        pending.map((a) => <AssignmentCard key={a.id} assignment={a} />)
                    )}
                </TabsContent>

                <TabsContent value="graded" className="space-y-3">
                    {graded.length === 0 ? (
                        <Card className="border-dashed bg-white/5">
                            <CardContent className="p-12 text-center">
                                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                                <p className="text-muted-foreground">No graded assignments yet.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        graded.map((a) => <AssignmentCard key={a.id} assignment={a} />)
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
