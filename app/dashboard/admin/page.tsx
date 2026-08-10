import { getAdminDashboardStats } from "@/app/actions/admin-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Shield, KeyRound, Sparkles, ArrowRight, GraduationCap, Layout, BookOpen, FolderGit2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function AdminDashboardPage() {
    const stats = await getAdminDashboardStats();

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Command Center</h1>
                    <p className="text-slate-500">System overview and controls</p>
                </div>
                <div className="flex gap-2">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 border border-amber-500/20" asChild>
                        <Link href="/dashboard/admin/credentials">
                            <KeyRound className="mr-2 h-4 w-4" /> Issue Credentials
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Active Streams</CardTitle>
                        <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center">
                            <Layout className="h-4 w-4 text-amber-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 font-mono">{stats.activeStreams}</div>
                        <p className="text-xs text-slate-500 mt-1">Managed career tracks</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Active Students</CardTitle>
                        <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center">
                            <GraduationCap className="h-4 w-4 text-amber-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 font-mono">{stats.enrolledStudents}</div>
                        <p className="text-xs text-slate-500 mt-1">Currently enrolled</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Total Projects</CardTitle>
                        <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center">
                            <FolderGit2 className="h-4 w-4 text-amber-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 font-mono">{stats.totalProjects}</div>
                        <p className="text-xs text-slate-500 mt-1">In curriculum catalog</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">LMS Courses</CardTitle>
                        <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-amber-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 font-mono">{stats.totalCourses}</div>
                        <p className="text-xs text-slate-500 mt-1">Associated learning modules</p>
                    </CardContent>
                </Card>

                {/* AI Entry Point */}
                <Link href="/dashboard/admin/ai-workspace" className="block h-full">
                    <Card className="bg-white border-orange-200 shadow-sm group hover:border-orange-400 transition-all cursor-pointer overflow-hidden relative h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-orange-600">AI Content Engine</CardTitle>
                            <div className="w-8 h-8 rounded-md bg-orange-50 border border-orange-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Sparkles className="h-4 w-4 text-orange-500" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900 group-hover:text-orange-700 transition-colors">SkillCred AI</div>
                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                Launch workspace <ArrowRight className="w-3 h-3" />
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        Recent System Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {stats.recentActivity.length === 0 ? (
                            <p className="text-slate-500 text-sm">No recent activity found.</p>
                        ) : (
                            stats.recentActivity.map((user: any) => (
                                <div key={user.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none text-slate-900">{user.name}</p>
                                        <p className="text-xs text-slate-500 font-mono">{user.email}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`text-xs px-2 py-1 rounded-sm font-medium border ${user.role === 'MENTOR' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                                                user.role === 'ADMIN' ? 'bg-red-50 text-red-600 border-red-200' :
                                                    'bg-blue-50 text-blue-600 border-blue-200'
                                            }`}>
                                            {user.role}
                                        </span>
                                        <span className="text-xs text-slate-500 font-mono">
                                            {format(new Date(user.createdAt), "MMM d, HH:mm")}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                        <Button variant="outline" className="w-full mt-4 border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700" asChild>
                            <Link href="/dashboard/admin/credentials">Manage Credentials</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
