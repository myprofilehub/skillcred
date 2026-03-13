import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { QuickActionsGrid } from "@/components/dashboard/quick-actions-grid";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import {
    UpNextContainer, UpNextSkeleton,
    StatsContainer, StatsSkeleton,
    ActionItemsContainer, ActionItemsSkeleton,
    ActiveClassroomsContainer, ClassroomsSkeleton
} from "@/components/dashboard/mentor/dashboard-containers";

export default async function MentorDashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    if (session.user.role !== "MENTOR") {
        // redirect("/dashboard/student");
    }

    const { user } = session;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
                    <p className="text-muted-foreground">Welcome back, {user.name}. Here is what's happening today.</p>
                </div>
                <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border">
                    {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Widgets Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Up Next (Priority) */}
                <div className="md:col-span-1">
                    <Suspense fallback={<UpNextSkeleton />}>
                        <UpNextContainer />
                    </Suspense>
                </div>

                {/* 2. Action Required (HEAVY) */}
                <div className="md:col-span-1">
                    <Suspense fallback={<ActionItemsSkeleton />}>
                        <ActionItemsContainer />
                    </Suspense>
                </div>

                {/* 3. At a Glance Stats */}
                <div className="md:col-span-1">
                    <Suspense fallback={<StatsSkeleton />}>
                        <StatsContainer />
                    </Suspense>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight">Quick Actions</h2>
                <QuickActionsGrid />
            </div>

            {/* Main Content Area */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-tight">Active Classrooms</h2>
                    <Button variant="ghost" className="text-primary" asChild>
                        <span />
                    </Button>
                </div>

                <Suspense fallback={<ClassroomsSkeleton />}>
                    <ActiveClassroomsContainer />
                </Suspense>
            </div>
        </div>
    );
}
