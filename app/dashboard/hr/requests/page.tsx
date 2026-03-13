import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle2, XCircle, Send, MessageSquare } from "lucide-react";

export default async function InterviewRequestsPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    if (session.user.role !== "HR") {
        redirect("/dashboard/student");
    }

    // Get HR profile
    const hrProfile = await prisma.hRProtocol.findUnique({
        where: { userId: session.user.id },
    });

    if (!hrProfile) {
        return (
            <div className="text-center py-16">
                <p className="text-muted-foreground">HR profile not found. Please contact support.</p>
            </div>
        );
    }

    // Fetch all interview requests
    const requests = await prisma.interviewRequest.findMany({
        where: { hrId: hrProfile.id },
        include: {
            student: {
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                    portfolio: {
                        select: {
                            headline: true,
                            skills: true,
                            publicSlug: true,
                        },
                    },
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    const pendingRequests = requests.filter(r => r.status === "PENDING");
    const acceptedRequests = requests.filter(r => r.status === "ACCEPTED");
    const rejectedRequests = requests.filter(r => r.status === "REJECTED");

    const RequestCard = ({ request }: { request: typeof requests[0] }) => (
        <Card className="hover:border-emerald-500/20 transition-colors">
            <CardContent className="p-5">
                <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={request.student?.user?.image || ""} />
                        <AvatarFallback className="bg-emerald-500/20 text-emerald-500">
                            {request.student?.user?.name?.charAt(0) || "S"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{request.student?.user?.name || "Student"}</h4>
                            <Badge
                                variant={
                                    request.status === "ACCEPTED" ? "default" :
                                        request.status === "REJECTED" ? "destructive" :
                                            "secondary"
                                }
                                className={request.status === "ACCEPTED" ? "bg-emerald-600" : ""}
                            >
                                {request.status === "PENDING" && <Clock className="h-3 w-3 mr-1" />}
                                {request.status === "ACCEPTED" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                {request.status === "REJECTED" && <XCircle className="h-3 w-3 mr-1" />}
                                {request.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {request.student?.portfolio?.headline || "SkillCred Student"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Sent {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                        {request.message && (
                            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                                <p className="text-sm flex items-start gap-2">
                                    <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                    {request.message}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                {request.status === "ACCEPTED" && request.student?.user?.email && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                            Contact: {request.student.user.email}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Interview Requests</h1>
                <p className="text-muted-foreground">
                    Track and manage your outreach to candidates
                </p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-500">{pendingRequests.length}</div>
                        <p className="text-sm text-muted-foreground">Pending</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-emerald-500">{acceptedRequests.length}</div>
                        <p className="text-sm text-muted-foreground">Accepted</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-red-500">{rejectedRequests.length}</div>
                        <p className="text-sm text-muted-foreground">Declined</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All ({requests.length})</TabsTrigger>
                    <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
                    <TabsTrigger value="accepted">Accepted ({acceptedRequests.length})</TabsTrigger>
                    <TabsTrigger value="rejected">Declined ({rejectedRequests.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    {requests.length > 0 ? (
                        requests.map(request => <RequestCard key={request.id} request={request} />)
                    ) : (
                        <EmptyState />
                    )}
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                    {pendingRequests.length > 0 ? (
                        pendingRequests.map(request => <RequestCard key={request.id} request={request} />)
                    ) : (
                        <EmptyState message="No pending requests" />
                    )}
                </TabsContent>

                <TabsContent value="accepted" className="space-y-4">
                    {acceptedRequests.length > 0 ? (
                        acceptedRequests.map(request => <RequestCard key={request.id} request={request} />)
                    ) : (
                        <EmptyState message="No accepted requests yet" />
                    )}
                </TabsContent>

                <TabsContent value="rejected" className="space-y-4">
                    {rejectedRequests.length > 0 ? (
                        rejectedRequests.map(request => <RequestCard key={request.id} request={request} />)
                    ) : (
                        <EmptyState message="No declined requests" />
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

function EmptyState({ message = "No interview requests yet" }: { message?: string }) {
    return (
        <Card className="py-12 border-dashed">
            <CardContent className="text-center">
                <Send className="h-10 w-10 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">{message}</p>
                <Button variant="outline" className="mt-4" asChild>
                    <a href="/dashboard/hr/talent">Browse Talent Pool</a>
                </Button>
            </CardContent>
        </Card>
    );
}
