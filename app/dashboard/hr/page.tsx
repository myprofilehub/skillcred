import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
    StatsContainer, StatsSkeleton,
    RecentTalentContainer, TalentSkeleton,
    InterviewRequestsContainer, RequestsSkeleton,
} from "@/components/dashboard/hr/dashboard-containers";

export default async function HRDashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    if (session.user.role !== "HR") {
        redirect("/dashboard/student");
    }

    const { user } = session;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Talent Discovery</h1>
                    <p className="text-muted-foreground">
                        Welcome back, {user.name}. Find your next great hire.
                    </p>
                </div>
                <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border">
                    {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stats Row */}
            <Suspense fallback={<StatsSkeleton />}>
                <StatsContainer />
            </Suspense>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Talent - Takes 2 columns */}
                <div className="lg:col-span-2">
                    <Suspense fallback={<TalentSkeleton />}>
                        <RecentTalentContainer />
                    </Suspense>
                </div>

                {/* Interview Requests - Takes 1 column */}
                <div className="lg:col-span-1">
                    <Suspense fallback={<RequestsSkeleton />}>
                        <InterviewRequestsContainer />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
