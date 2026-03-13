import { Suspense } from "react";
import { getDashboardStats, getActionItems } from "@/app/actions/mentor-dashboard";
import { UpNextWidget } from "@/components/dashboard/up-next-widget";
import { ActionRequiredWidget } from "@/components/dashboard/action-required-widget";
import { ClassroomCard } from "@/components/dashboard/classroom-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export async function UpNextContainer() {
    // This fetches schedule events, which is relatively fast
    const data = await getDashboardStats();
    // Handle error case gracefully
    if ('error' in data) return <UpNextWidget event={null} />;

    return <UpNextWidget event={data.upNext} />;
}

export async function StatsContainer() {
    const data = await getDashboardStats();
    if ('error' in data) return null; // Or some error state

    const stats = data.stats || { totalStudents: 0, activeCourses: 0 };

    return (
        <div className="grid grid-rows-2 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalStudents}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.activeCourses}</div>
                </CardContent>
            </Card>
        </div>
    );
}

export async function ActionItemsContainer() {
    // This is the HEAVY call (N+1 queries)
    const actionItems = await getActionItems();
    // If error, pass undefined so widget handles it (or show error state)
    const validItems = !('error' in actionItems) ? actionItems : undefined;

    return <ActionRequiredWidget actionItems={validItems} />;
}

export async function ActiveClassroomsContainer() {
    const data = await getDashboardStats();
    if ('error' in data) return <div>Failed to load classrooms</div>;

    const classrooms = data.recentClassrooms || [];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(classrooms) && classrooms.length > 0 ? (
                classrooms.map((course: any) => (
                    <ClassroomCard
                        key={course.id}
                        course={course}
                        studentCount={course.students?.length || 0}
                    />
                ))
            ) : (
                <Card className="col-span-full py-10 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center text-center">
                        <p className="text-muted-foreground mb-4">No active Google Classrooms found.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

// Skeletons
export function UpNextSkeleton() {
    return <Skeleton className="h-[200px] w-full rounded-xl" />;
}

export function ActionItemsSkeleton() {
    return <Skeleton className="h-[200px] w-full rounded-xl" />;
}

export function StatsSkeleton() {
    return (
        <div className="grid grid-rows-2 gap-4">
            <Skeleton className="h-[100px] w-full rounded-xl" />
            <Skeleton className="h-[100px] w-full rounded-xl" />
        </div>
    );
}

export function ClassroomsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-[180px] w-full rounded-xl" />
            <Skeleton className="h-[180px] w-full rounded-xl" />
            <Skeleton className="h-[180px] w-full rounded-xl" />
        </div>
    );
}
