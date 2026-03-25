"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard,
    KeyRound,
    Users,
    Shield,
    LogOut,
    BookOpen,
    GraduationCap,
    Video,
    FileText,
} from "lucide-react";

const sidebarItems = [
    {
        title: "Overview",
        href: "/dashboard/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Credentials",
        href: "/dashboard/admin/credentials",
        icon: KeyRound,
    },
    {
        title: "Enrollments",
        href: "/dashboard/admin/enrollments",
        icon: GraduationCap,
    },
    {
        title: "Curriculum",
        href: "/dashboard/admin/curriculum",
        icon: BookOpen,
    },
    {
        title: "Recordings",
        href: "/dashboard/admin/recordings",
        icon: Video,
    },
    {
        title: "Blog",
        href: "/dashboard/admin/blog",
        icon: FileText,
    },
    {
        title: "Mentor Apps",
        href: "/dashboard/admin/mentor-applications",
        icon: Users,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-slate-950 text-white border-r border-cyan-500/10">
            {/* Logo */}
            <div className="flex h-16 items-center px-6 border-b border-cyan-500/10">
                <Link href="/dashboard/admin" className="flex items-center gap-2 font-bold text-xl">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <span className="tracking-tight">
                        Skill<span className="text-cyan-400">Cred</span>
                    </span>
                </Link>
            </div>

            <div className="px-4 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-cyan-500/60">Admin Panel</span>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-3 space-y-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"
                                    : "text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/5 border border-transparent"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-cyan-400" : "")} />
                            {item.title}
                        </Link>
                    );
                })}
            </div>

            {/* Bottom */}
            <div className="p-4 border-t border-cyan-500/10">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
