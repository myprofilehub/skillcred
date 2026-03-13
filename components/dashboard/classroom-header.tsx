"use client";

import { Button } from "@/components/ui/button";
import { Video, Plus, FileText, Upload, Users, Settings } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
// We might want to import CreateAssignment dialog content here or trigger it via a prop/context
// For now, these buttons might just link to the tabs or open modals.
// To keep it simple, let's make the "Create" buttons switch to the Classwork tab and open the dialog if possible,
// OR we can just render the actions here if we hoist the state.
// A simpler approach for now: These buttons are "Quick Links" to the Classwork tab with a query param?
// Or we can duplicate the Dialog Trigger logic.

interface ClassroomHeaderProps {
    course: {
        id: string;
        name: string;
        section?: string;
        enrollmentCode?: string;
        meetLink?: string;
        teacherFolder?: { alternateLink?: string };
    };
    onScheduleClass?: () => void;
}

export function ClassroomHeader({ course, onScheduleClass }: ClassroomHeaderProps) {
    const gradients = [
        "from-blue-600 to-indigo-600",
        "from-purple-600 to-pink-600",
        "from-emerald-600 to-teal-600",
        "from-orange-500 to-red-500"
    ];
    // Deterministic gradient based on ID length or char code
    const gradient = gradients[course.id.charCodeAt(0) % gradients.length];

    return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${gradient} p-6 md:p-8 text-white shadow-lg`}>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">

                {/* Course Info */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{course.name}</h1>
                        <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">
                            {course.section || "General"}
                        </Badge>
                    </div>
                    {course.enrollmentCode && (
                        <p className="text-white/80 font-mono text-sm">
                            Class Code: <span className="font-bold select-all">{course.enrollmentCode}</span>
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    {course.meetLink ? (
                        <Button
                            className="bg-white text-blue-600 hover:bg-blue-50 font-bold border-0 shadow-md transition-all hover:scale-105"
                            size="lg"
                            asChild
                        >
                            <a href={course.meetLink} target="_blank" rel="noopener noreferrer">
                                <Video className="w-5 h-5 mr-2" />
                                Join Live Class
                            </a>
                        </Button>
                    ) : (
                        <Button
                            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                            onClick={onScheduleClass}
                        >
                            <Video className="w-4 h-4 mr-2" />
                            Setup Meet Link
                        </Button>
                    )}

                    {/* Quick Actions Menu - Could be a dropdown or just direct buttons */}
                    {/* For now, linking to Classwork tab is safest without complex state lifting */}
                    {/* Quick Actions Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-0">
                                <Plus className="w-4 h-4 mr-2" /> Create Work
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white dark:bg-slate-950 min-w-48">
                            <DropdownMenuItem asChild className="cursor-pointer text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800">
                                <Link href={`/dashboard/mentor/classroom/${course.id}?tab=classwork&create_mode=assignment`} className="flex items-center w-full">
                                    <FileText className="w-4 h-4 mr-2" /> Assignment
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800">
                                <Link href={`/dashboard/mentor/classroom/${course.id}?tab=classwork&create_mode=project`} className="flex items-center w-full">
                                    <Upload className="w-4 h-4 mr-2" /> Project
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl min-h-[300px]"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-black/10 blur-2xl"></div>
        </div>
    );
}
