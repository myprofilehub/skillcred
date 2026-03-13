"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, FileText, ChevronRight, Users, CheckCircle } from "lucide-react";
import Link from "next/link";

interface ActionItem {
    id: string;
    label: string;
    count: number;
    href: string;
    icon: any;
    color: string;
    bg: string;
}

interface ActionRequiredWidgetProps {
    actionItems?: {
        ungradedCount?: number;
        ungradedByClass?: { courseId: string; courseName: string; count: number }[];
        pendingAttendanceCount?: number;
        classroomsWithPendingAttendance?: { courseId: string; courseName: string; eventDate: string }[];
    };
}

export function ActionRequiredWidget({ actionItems }: ActionRequiredWidgetProps) {
    const actions: ActionItem[] = [];

    // 1. Ungraded Assignments
    const ungradedCount = actionItems?.ungradedCount || 0;
    if (ungradedCount > 0) {
        actions.push({
            id: "ungraded",
            label: "Ungraded Submissions",
            count: ungradedCount,
            href: "/dashboard/mentor/classroom",
            icon: FileText,
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        });
    }

    // 2. Pending Attendance Verification
    const pendingAttendanceCount = actionItems?.pendingAttendanceCount || 0;
    if (pendingAttendanceCount > 0) {
        actions.push({
            id: "attendance",
            label: "Verify Attendance",
            count: pendingAttendanceCount,
            href: "/dashboard/mentor/students",
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        });
    }

    const totalActions = actions.reduce((acc, a) => acc + a.count, 0);

    return (
        <Card className="h-full">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    Action Required
                </CardTitle>
                {totalActions > 0 && <Badge variant="destructive">{totalActions}</Badge>}
            </CardHeader>
            <CardContent className="space-y-1">
                {actions.map((action) => (
                    <Link key={action.id} href={action.href} className="block group">
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${action.bg}`}>
                                    <action.icon className={`w-4 h-4 ${action.color}`} />
                                </div>
                                <span className="font-medium text-sm">{action.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary">{action.count}</Badge>
                                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </Link>
                ))}

                {totalActions === 0 && (
                    <div className="py-6 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
                        <CheckCircle className="w-8 h-8 text-green-500/50" />
                        All caught up! 🎉
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
