import { getInvestorProfile } from "@/app/actions/investor-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MessageSquare, Calendar, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function InvestorDashboard() {
    const { investor, error } = await getInvestorProfile();

    if (error || !investor) {
        return (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-slate-900">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="text-slate-500">You need an investor profile to view this page.</p>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white" asChild><Link href="/onboarding/investor">Create Profile</Link></Button>
            </div>
        );
    }

    const activePosts = investor.posts.filter((p: any) => p.isActive).length;
    const pendingPitches = investor.pitchRequests.filter((p: any) => p.status === "PENDING").length;
    const upcomingWorkshops = investor.workshops.filter((w: any) => new Date(w.date) > new Date()).length;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
                    <p className="text-slate-500">Welcome back, <span className="text-amber-600 font-medium">{investor.company}</span></p>
                </div>
                <div className="flex gap-2">
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-500/20" asChild>
                        <Link href="/dashboard/investor/posts">
                            <PlusCircle className="mr-2 h-4 w-4" /> New Post
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-white shadow-sm border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Pending Pitches</CardTitle>
                        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-amber-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">{pendingPitches}</div>
                        <Link href="/dashboard/investor/pitches" className="text-xs text-amber-600 hover:underline flex items-center gap-1 mt-1">
                            View all <ArrowRight className="w-3 h-3" />
                        </Link>
                    </CardContent>
                </Card>
                <Card className="bg-white shadow-sm border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Active Posts</CardTitle>
                        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-amber-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">{activePosts}</div>
                        <Link href="/dashboard/investor/posts" className="text-xs text-amber-600 hover:underline flex items-center gap-1 mt-1">
                            Manage <ArrowRight className="w-3 h-3" />
                        </Link>
                    </CardContent>
                </Card>
                <Card className="bg-white shadow-sm border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Upcoming Workshops</CardTitle>
                        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-amber-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">{upcomingWorkshops}</div>
                        <Link href="/dashboard/investor/workshops" className="text-xs text-amber-600 hover:underline flex items-center gap-1 mt-1">
                            Schedule <ArrowRight className="w-3 h-3" />
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Pitches & Workshops */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-white shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-slate-900 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-500" />
                            Recent Pitch Requests
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {investor.pitchRequests.length === 0 ? (
                                <p className="text-slate-500 text-sm">No pitches received yet.</p>
                            ) : (
                                investor.pitchRequests.slice(0, 5).map((pitch: any) => (
                                    <div key={pitch.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none text-slate-900">{pitch.showcase.title}</p>
                                            <p className="text-xs text-slate-500">
                                                By {pitch.student.user.name} • {format(new Date(pitch.createdAt), "MMM d, yyyy")}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${pitch.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                                                pitch.status === "ACCEPTED" || pitch.status === "SCHEDULED" ? "bg-emerald-100 text-emerald-700" :
                                                    "bg-slate-100 text-slate-500"
                                                }`}>
                                                {pitch.status}
                                            </span>
                                            <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50" asChild>
                                                <Link href="/dashboard/investor/pitches">View</Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Workshops */}
                <Card className="col-span-3 bg-white shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-slate-900 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-amber-500" />
                            Upcoming Workshops
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {investor.workshops.length === 0 ? (
                                <p className="text-slate-500 text-sm">No workshops scheduled.</p>
                            ) : (
                                investor.workshops.slice(0, 3).map((workshop: any) => (
                                    <div key={workshop.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none text-slate-900">{workshop.title}</p>
                                            <p className="text-xs text-slate-500">
                                                {format(new Date(workshop.date), "MMM d, h:mm a")}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                            <Button variant="outline" className="w-full mt-4 border-slate-200 text-slate-700 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300" asChild>
                                <Link href="/dashboard/investor/workshops">Manage Workshops</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
