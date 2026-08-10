"use client";

import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Upload, Settings, Users } from "lucide-react";
import Link from "next/link";

export function QuickActionsGrid() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <Link href="/dashboard/mentor/schedule" className="contents">
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-amber-50 hover:border-amber-300 bg-white border-slate-200 text-slate-700 shadow-sm">
                    <Calendar className="w-6 h-6 text-blue-500" />
                    <span>Schedule Class</span>
                </Button>
            </Link>

            <Link href="/dashboard/mentor/classroom" className="contents">
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-amber-50 hover:border-amber-300 bg-white border-slate-200 text-slate-700 shadow-sm">
                    <MessageSquare className="w-6 h-6 text-emerald-500" />
                    <span>Announcement</span>
                </Button>
            </Link>

            <Link href="/dashboard/mentor/students" className="contents">
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-amber-50 hover:border-amber-300 bg-white border-slate-200 text-slate-700 shadow-sm">
                    <Users className="w-6 h-6 text-orange-500" />
                    <span>Student Roster</span>
                </Button>
            </Link>

            <Link href="/dashboard/mentor/recordings" className="contents">
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-amber-50 hover:border-amber-300 bg-white border-slate-200 text-slate-700 shadow-sm">
                    <Upload className="w-6 h-6 text-purple-500" />
                    <span>Upload Content</span>
                </Button>
            </Link>

            <Link href="/dashboard/mentor/settings" className="contents">
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:bg-amber-50 hover:border-amber-300 bg-white border-slate-200 text-slate-700 shadow-sm">
                    <Settings className="w-6 h-6 text-slate-500" />
                    <span>Settings</span>
                </Button>
            </Link>
        </div>
    );
}
