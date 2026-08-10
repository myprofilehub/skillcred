"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Image from "next/image";
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
    Image as ImageIcon,
    ClipboardCheck,
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
        title: "Creative Gallery",
        href: "/dashboard/admin/creative-gallery",
        icon: ImageIcon,
    },
    {
        title: "Mentor Apps",
        href: "/dashboard/admin/mentor-applications",
        icon: Users,
    },
    {
        title: "Counselor Review",
        href: "/admin/counselor-review",
        icon: ClipboardCheck,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-white text-slate-900 border-r border-slate-200 shadow-sm">
            {/* Logo */}
            <div className="flex h-16 items-center px-6 border-b border-slate-100">
                <Link href="/dashboard/admin" className="flex items-center gap-2 font-bold text-xl text-slate-900">
                    <div className="flex items-center justify-center">
                        <img src="/logo.png" alt="SkillCred Logo" width={32} height={32} className="object-contain" />
                    </div>
                    <span className="tracking-tight">
                        Skill<span className="text-indigo-500">Cred</span>
                    </span>
                </Link>
            </div>

            <div className="px-4 py-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Admin Panel</span>
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
                                    ? "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm"
                                    : "text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 border border-transparent"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "")} />
                            {item.title}
                        </Link>
                    );
                })}
            </div>

            {/* Bottom */}
            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
