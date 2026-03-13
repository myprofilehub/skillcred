"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    Users,
    Folder,
    Video,
    GraduationCap,
    MessageSquare,
    MoreVertical,
    Calendar,
    ExternalLink,
    Trash2
} from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SetMeetLinkDialog } from "@/components/dashboard/set-meet-link-dialog";

interface ClassroomCardProps {
    course: {
        id: string;
        name: string;
        section?: string;
        descriptionHeading?: string;
        alternateLink?: string; // Link to course in Google Classroom
        teacherFolder?: {
            alternateLink?: string; // Link to Drive folder
        };
        calendarId?: string;
        meetLink?: string; // Permanent Meet Link from DB
    };
    studentCount?: number;
    onSyncAttendance?: (courseId: string) => void;
    onScheduleClass?: (courseId: string) => void;
    onDeleteClass?: (courseId: string) => void;
    onAddMeetLink?: (courseId: string) => void;
    customHref?: string; // Optional custom navigation URL
}

import { useRouter } from "next/navigation";

// ... (props interface)

export function ClassroomCard({ course, studentCount = 0, onSyncAttendance, onScheduleClass, onDeleteClass, onAddMeetLink, customHref }: ClassroomCardProps) {
    const router = useRouter();

    // Determine the target URL: use customHref if provided, otherwise default to classroom dashboard
    const targetUrl = customHref || `/dashboard/mentor/classroom/${course.id}`;

    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent navigation if clicking on a button, link, or menu trigger
        if ((e.target as HTMLElement).closest("button, a, [role='menuitem']")) {
            return;
        }
        router.push(targetUrl);
    };

    return (
        <Card
            className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary group cursor-pointer relative"
            onClick={handleCardClick}
        >
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">
                            <Link href={targetUrl}>
                                {course.name}
                            </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-1">
                            {course.section || course.descriptionHeading || "No section"}
                        </CardDescription>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 min-w-[180px]">
                            <DropdownMenuItem
                                onClick={() => onScheduleClass?.(course.id)}
                                className="text-slate-100 focus:bg-purple-600 focus:text-white cursor-pointer"
                            >
                                <Calendar className="mr-2 h-4 w-4" /> Schedule Class
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onSyncAttendance?.(course.id)}
                                className="text-slate-100 focus:bg-purple-600 focus:text-white cursor-pointer"
                            >
                                <Users className="mr-2 h-4 w-4" /> Sync Attendance
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="text-slate-100 focus:bg-purple-600 focus:text-white cursor-pointer">
                                <a href={course.alternateLink} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Open in Classroom
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-700" />
                            <DropdownMenuItem
                                onClick={() => onDeleteClass?.(course.id)}
                                className="text-red-400 focus:text-white focus:bg-red-600 cursor-pointer"
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Class
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {studentCount} Students
                    </Badge>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" size="sm" className="flex flex-col h-auto py-2 gap-1 text-xs" asChild>
                        <Link href={`/dashboard/mentor/classroom/${course.id}?tab=stream`}>
                            <MessageSquare className="h-4 w-4 text-blue-500" />
                            <span>Stream</span>
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="flex flex-col h-auto py-2 gap-1 text-xs" asChild>
                        <Link href={`/dashboard/mentor/classroom/${course.id}?tab=classwork`}>
                            <BookOpen className="h-4 w-4 text-amber-500" />
                            <span>Work</span>
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="flex flex-col h-auto py-2 gap-1 text-xs" asChild>
                        <Link href={`/dashboard/mentor/classroom/${course.id}?tab=marks`}>
                            <GraduationCap className="h-4 w-4 text-green-500" />
                            <span>Marks</span>
                        </Link>
                    </Button>
                    {course.teacherFolder?.alternateLink ? (
                        <Button variant="outline" size="sm" className="flex flex-col h-auto py-2 gap-1 text-xs" asChild>
                            <a href={course.teacherFolder.alternateLink} target="_blank" rel="noopener noreferrer">
                                <Folder className="h-4 w-4 text-indigo-500" />
                                <span>Drive</span>
                            </a>
                        </Button>
                    ) : (
                        <Button variant="outline" size="sm" className="flex flex-col h-auto py-2 gap-1 text-xs" disabled>
                            <Folder className="h-4 w-4 text-indigo-500 opacity-50" />
                            <span>Drive</span>
                        </Button>
                    )}
                </div>
            </CardContent>
            <CardFooter className="pt-2 border-t bg-muted/20 flex gap-2">
                <Link href={course.alternateLink || "#"} target="_blank" className="flex-1">
                    <Button variant="outline" className="w-full gap-2 hover:bg-primary/10 hover:text-primary border-primary/20">
                        <ExternalLink className="w-4 h-4" /> Open
                    </Button>
                </Link>
                {course.meetLink ? (
                    <div className="flex-1 flex gap-1">
                        <Link href={course.meetLink} target="_blank" className="flex-1">
                            <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white">
                                <Video className="w-4 h-4" /> Join Meet
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-primary"
                            onClick={() => onAddMeetLink?.(course.id)}
                        >
                            <Calendar className="w-4 h-4" />
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="ghost"
                        className="flex-1 gap-2 text-muted-foreground border-dashed border border-white/20 hover:border-primary/50 hover:text-primary"
                        onClick={() => onAddMeetLink?.(course.id)}
                    >
                        <Video className="w-4 h-4" /> Add Meet Link
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
