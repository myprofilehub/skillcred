"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, ChevronRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RosterClassroomCardProps {
    course: {
        id: string;
        name: string;
        section?: string;
        descriptionHeading?: string;
    };
    studentCount: number;
    href: string;
}

export function RosterClassroomCard({ course, studentCount, href }: RosterClassroomCardProps) {
    const router = useRouter();

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest("button, a")) {
            return;
        }
        router.push(href);
    };

    return (
        <Card
            className="group hover:shadow-xl transition-all duration-300 border-none bg-gradient-to-br from-white to-gray-50/50 dark:from-zinc-900 dark:to-zinc-900/50 shadow-sm relative overflow-hidden cursor-pointer ring-1 ring-border/50 hover:ring-primary/20"
            onClick={handleCardClick}
        >
            {/* Visual Accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors duration-300" />

            <CardHeader className="pl-6 pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <Badge variant="outline" className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground bg-background">
                            Classroom
                        </Badge>
                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">
                            {course.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-1 text-xs mt-1">
                            {course.section || course.descriptionHeading || "General"}
                        </CardDescription>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                        <GraduationCap className="h-4 w-4" />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pl-6 py-4">
                <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold tracking-tighter text-foreground">
                        {studentCount}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium mb-1.5 flex items-center gap-1">
                        <Users className="w-4 h-4" /> Students
                    </span>
                </div>

                {/* Mock Metric for Visual Interest - could be real later */}
                <div className="mt-4 flex gap-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <UserCheck className="w-3 h-3 text-green-500" />
                        <span>90% Attendance</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pl-6 pt-2 pb-5">
                <Button className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all" asChild>
                    <Link href={href}>
                        <span>Manage Roster</span>
                        <ChevronRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
