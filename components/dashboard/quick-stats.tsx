import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Clock, AlertCircle } from "lucide-react";

interface QuickStatsProps {
    totalStudents: number;
    activeCourses: number;
    assignmentsPending: number; // e.g. ungraded assignments
    upcomingSessions: number;
}

export function QuickStats({ totalStudents, activeCourses, assignmentsPending, upcomingSessions }: QuickStatsProps) {
    const stats = [
        {
            label: "Total Students",
            value: totalStudents.toString(),
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            label: "Active Classrooms",
            value: activeCourses.toString(),
            icon: BookOpen,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            label: "Pending Grading",
            value: assignmentsPending.toString(),
            icon: AlertCircle,
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        },
        {
            label: "Upcoming Sessions",
            value: upcomingSessions.toString(),
            icon: Clock,
            color: "text-green-500",
            bg: "bg-green-500/10"
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card key={stat.label} className="border-l-4" style={{ borderLeftColor: stat.label === "Total Students" ? "#3b82f6" : stat.label === "Active Classrooms" ? "#a855f7" : stat.label === "Pending Grading" ? "#f97316" : "#22c55e" }}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.label}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <Icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
