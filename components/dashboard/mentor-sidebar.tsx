"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Video,
    Film,
    Users,
    FlaskConical,
    FileCheck,
    Settings,
    LogOut,
    GraduationCap,
    School,
    BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/logo";

const sidebarItems = [
    { name: "Dashboard", href: "/dashboard/mentor", icon: LayoutDashboard },
    { name: "Class Schedule", href: "/dashboard/mentor/schedule", icon: Video },
    { name: "Recorded Content", href: "/dashboard/mentor/recordings", icon: Film },
    { name: "Students", href: "/dashboard/mentor/students", icon: Users },
    { name: "Classroom", href: "/dashboard/mentor/classroom", icon: School },
    { name: "Project Catalog", href: "/dashboard/mentor/curriculum", icon: BookOpen },
    { name: "Settings", href: "/dashboard/mentor/settings", icon: Settings },
];

export function MentorSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full bg-slate-950 border-r border-white/10 w-64 fixed left-0 top-0 bottom-0 z-40">
            {/* Logo Area */}
            <div className="flex flex-col h-auto px-6 py-4 border-b border-white/10">
                {/* SkillCred Brand - Links to Landing Page */}
                <div className="mb-2">
                    <Logo />
                </div>

                {/* MentorHub Title */}
                <div className="flex items-center gap-2 pl-1">
                    <span className="text-sm font-medium text-muted-foreground">
                        Mentor<span className="text-purple-400/80">Hub</span>
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / User User */}
            <div className="p-4 border-t border-white/10">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
                    onClick={() => signOut({ callbackUrl: '/' })}
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
