import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getInvestorsWithFilters } from "@/app/actions/investor-actions";
import { getActiveInvestorPosts, getUpcomingWorkshops } from "@/app/actions/student-dashboard";
import { registerForWorkshop } from "@/app/actions/investor-actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Lock,
    Handshake,
    Users,
    Lightbulb,
    TrendingUp,
    Send,
    CheckCircle2,
    Calendar,
    Rocket,
    Building2,
    ExternalLink,
    Plus,
    PlusCircle,
    Briefcase
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { WorkshopRegistrationButton } from "@/components/dashboard/workshop-registration-button";

export default async function InvestorConnectPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    if (session.user.role !== "STUDENT") {
        redirect("/dashboard");
    }

    // Get student data
    const student = await prisma.student.findUnique({
        where: { userId: session.user.id },
        include: {
            portfolio: true,
            attendedWorkshops: true
        },
    });

    if (!student) {
        redirect("/onboarding");
    }

    const patPassed = !!(student as any).portfolio?.patPassedAt;

    if (!patPassed) {
        // ... (Keep existing locked state UI)
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                    <Lock className="h-12 w-12 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-bold mb-3">Investor Connect Locked</h1>
                <p className="text-muted-foreground max-w-md mb-6">
                    Complete your Project Assessment Test (PAT) to unlock access to investors,
                    showcase your projects, and pitch your startup ideas.
                </p>
                <div className="bg-secondary/20 border border-white/10 rounded-lg p-6 max-w-md w-full mb-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-amber-500" />
                        What you&apos;ll unlock:
                    </h3>
                    <ul className="space-y-3 text-sm text-left">
                        <li className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-amber-500" />
                            Browse verified investors and VCs
                        </li>
                        <li className="flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-amber-500" />
                            Showcase your projects to investors
                        </li>
                        <li className="flex items-center gap-2">
                            <Handshake className="h-4 w-4 text-amber-500" />
                            Request pitch meetings
                        </li>
                        <li className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-amber-500" />
                            Attend Startup Workshops
                        </li>
                    </ul>
                </div>
                <Button asChild className="bg-amber-600 hover:bg-amber-700">
                    <Link href="/dashboard/student/assessments">
                        Take PAT Assessment
                    </Link>
                </Button>
            </div>
        );
    }

    // Fetch Data
    const investors = await getInvestorsWithFilters();
    const activePosts = await getActiveInvestorPosts();
    const upcomingWorkshops = await getUpcomingWorkshops();

    // Fetch showcases
    const showcases = await prisma.projectShowcase.findMany({
        where: { studentId: student.id },
        include: {
            pitchRequests: {
                include: {
                    investor: {
                        include: {
                            user: { select: { name: true, image: true } },
                        },
                    },
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    const pendingRequests = showcases.reduce((acc, s) => acc + s.pitchRequests.length, 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Investor Connect</h1>
                    <p className="text-muted-foreground">
                        Connect with investors, find funding, and attend workshops.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                    <Rocket className="h-5 w-5 text-amber-500" />
                    <span className="text-sm font-medium">Founder Mode Active</span>
                    <Badge className="bg-amber-600">Path 2</Badge>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <Briefcase className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{activePosts.length}</p>
                            <p className="text-xs text-muted-foreground">Active calls</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Lightbulb className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{showcases.length}</p>
                            <p className="text-xs text-muted-foreground">My Showcases</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Send className="h-6 w-6 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{pendingRequests}</p>
                            <p className="text-xs text-muted-foreground">Pitches Sent</p>
                        </div>
                    </CardContent>
                </Card>
                {/* ... (Keep or update other stats) */}
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="investors" className="space-y-6">
                <TabsList className="bg-muted/50">
                    <TabsTrigger value="investors" className="gap-2">
                        <Users className="h-4 w-4" />
                        Investors
                    </TabsTrigger>
                    <TabsTrigger value="posts" className="gap-2">
                        <Briefcase className="h-4 w-4" />
                        Calls for Startups
                    </TabsTrigger>
                    <TabsTrigger value="workshops" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Workshops
                    </TabsTrigger>
                    <TabsTrigger value="showcases" className="gap-2">
                        <Lightbulb className="h-4 w-4" />
                        My Showcases
                    </TabsTrigger>
                </TabsList>

                {/* Investors Tab */}
                <TabsContent value="investors" className="space-y-6">
                    {investors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {investors.map((investor) => (
                                <Card key={investor.id} className="hover:border-amber-500/30 transition-colors">
                                    <CardContent className="p-6">
                                        {/* ... (Keep existing investor card layout) */}
                                        <div className="flex items-start gap-4 mb-4">
                                            <Avatar className="h-14 w-14">
                                                <AvatarImage src={(investor as any).user?.image || ""} />
                                                <AvatarFallback className="bg-amber-500/20 text-amber-500">
                                                    {(investor as any).user?.name?.charAt(0) || "I"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{(investor as any).user?.name}</h3>
                                                <p className="text-sm text-muted-foreground">{investor.position}</p>
                                                <div className="flex items-center gap-1 text-xs text-amber-500 mt-1">
                                                    <Building2 className="h-3 w-3" />
                                                    {investor.company}
                                                </div>
                                            </div>
                                        </div>
                                        {/* ... */}
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {investor.focusAreas.slice(0, 3).map((area: string) => (
                                                <Badge key={area} variant="secondary" className="text-xs">
                                                    {area}
                                                </Badge>
                                            ))}
                                        </div>
                                        {/* ... */}
                                    </CardContent>
                                    {/* Add Pitch Button Logic Here */}
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground border rounded-lg border-dashed">
                            No active investors found.
                        </div>
                    )}
                </TabsContent>

                {/* Calls for Startups (Posts) Tab */}
                <TabsContent value="posts" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {activePosts.map((post: any) => (
                            <Card key={post.id} className="relative overflow-hidden border-l-4 border-l-amber-500">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <Badge variant="outline" className="mb-2">
                                                {post.type}
                                            </Badge>
                                            <CardTitle>{post.title}</CardTitle>
                                            <CardDescription>
                                                Posted by {post.investor.company}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {post.description}
                                    </p>
                                    {post.deadline && (
                                        <p className="text-xs text-red-500 font-medium mb-4">
                                            Deadline: {format(new Date(post.deadline), "MMM d, yyyy")}
                                        </p>
                                    )}
                                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                                        Apply Now
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                        {activePosts.length === 0 && (
                            <div className="col-span-2 text-center py-12 text-muted-foreground border rounded-lg border-dashed">
                                No active calls for startups.
                            </div>
                        )}
                    </div>
                </TabsContent>

                {/* Workshops Tab */}
                <TabsContent value="workshops" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {upcomingWorkshops.map((workshop: any) => {
                            const isRegistered = (student as any).attendedWorkshops.some(
                                (r: any) => r.workshopId === workshop.id
                            );

                            return (
                                <Card key={workshop.id}>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-amber-600 font-medium">
                                                    <Calendar className="w-4 h-4" />
                                                    {format(new Date(workshop.date), "EEEE, MMM d, yyyy 'at' h:mm a")}
                                                </div>
                                                <h3 className="text-xl font-bold">{workshop.title}</h3>
                                                <p className="text-muted-foreground">{workshop.description}</p>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                                    <Building2 className="w-3 h-3" />
                                                    Hosted by {workshop.investor.company}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            {isRegistered ? (
                                                <Button disabled variant="secondary" className="w-full">
                                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                                    Registered
                                                </Button>
                                            ) : (
                                                <WorkshopRegistrationButton workshopId={workshop.id} />
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                        {upcomingWorkshops.length === 0 && (
                            <div className="col-span-2 text-center py-12 text-muted-foreground border rounded-lg border-dashed">
                                No upcoming workshops.
                            </div>
                        )}
                    </div>
                </TabsContent>

                {/* Showcases Tab (Existing) */}
                <TabsContent value="showcases" className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">My Projects</h2>
                        <Button asChild className="bg-amber-600 hover:bg-amber-700">
                            <Link href="/dashboard/student/investors/showcase/new">
                                <PlusCircle className="mr-2 h-4 w-4" /> New Showcase
                            </Link>
                        </Button>
                    </div>

                    {showcases.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground border rounded-lg border-dashed">
                            No showcases created yet. start by creating one!
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {showcases.map((showcase) => (
                                <Card key={showcase.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle>{showcase.title}</CardTitle>
                                                <CardDescription>{showcase.tagline}</CardDescription>
                                            </div>
                                            <Badge variant={showcase.isApproved ? "default" : "secondary"}>
                                                {showcase.isApproved ? "Verified" : "Pending Review"}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="text-sm text-muted-foreground">
                                                {showcase.description.substring(0, 150)}...
                                            </div>

                                            {/* Pitch Requests Status */}
                                            {showcase.pitchRequests.length > 0 && (
                                                <div className="mt-4 border-t pt-4">
                                                    <h4 className="font-semibold text-sm mb-3">Pitch Status</h4>
                                                    <div className="space-y-3">
                                                        {showcase.pitchRequests.map((pitch) => (
                                                            <div key={pitch.id} className="flex flex-col gap-2 bg-muted/30 p-3 rounded-lg border text-sm">
                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex items-center gap-2">
                                                                        <Avatar className="h-6 w-6">
                                                                            <AvatarImage src={pitch.investor.user?.image || ""} />
                                                                            <AvatarFallback className="text-[10px]">
                                                                                {pitch.investor.user?.name?.charAt(0)}
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                        <span className="font-medium">{pitch.investor.company}</span>
                                                                    </div>
                                                                    <Badge variant={
                                                                        pitch.status === "SCHEDULED" ? "default" :
                                                                            pitch.status === "DECLINED" ? "destructive" : "secondary"
                                                                    }>
                                                                        {pitch.status}
                                                                    </Badge>
                                                                </div>

                                                                {pitch.status === "SCHEDULED" && pitch.scheduledAt && (
                                                                    <div className="mt-2 text-amber-600 bg-amber-500/10 p-2 rounded flex flex-col gap-1">
                                                                        <div className="flex items-center gap-2 font-medium">
                                                                            <Calendar className="h-3 w-3" />
                                                                            {format(new Date(pitch.scheduledAt), "MMM d, h:mm a")}
                                                                        </div>
                                                                        {pitch.meetingLink && (
                                                                            <a href={pitch.meetingLink} target="_blank" className="flex items-center gap-2 hover:underline">
                                                                                <ExternalLink className="h-3 w-3" />
                                                                                Join Meeting
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                )}
                                                                {pitch.investorNotes && (
                                                                    <div className="text-xs text-muted-foreground italic">
                                                                        "{pitch.investorNotes}"
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
