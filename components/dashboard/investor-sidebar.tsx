"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard,
    Briefcase,
    Calendar,
    MessageSquare,
    UserCircle,
    LogOut,
    Sparkles
} from "lucide-react";
import { Logo } from "@/components/logo";

const sidebarItems = [
    {
        title: "Overview",
        href: "/dashboard/investor",
        icon: LayoutDashboard,
    },
    {
        title: "My Posts",
        href: "/dashboard/investor/posts",
        icon: Briefcase,
    },
    {
        title: "Workshops",
        href: "/dashboard/investor/workshops",
        icon: Calendar,
    },
    {
        title: "Pitch Requests",
        href: "/dashboard/investor/pitches",
        icon: MessageSquare,
    },
    {
        title: "Profile",
        href: "/dashboard/investor/profile",
        icon: UserCircle,
    },
];

export function InvestorSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-white text-slate-900 border-r border-slate-200 shadow-sm z-10">
            {/* Logo */}
            <div className="flex h-16 items-center px-6 border-b border-slate-100">
                <Link href="/dashboard/investor" className="flex items-center">
                    <Logo width={140} height={35} />
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-amber-50 text-amber-700 border border-amber-200 shadow-sm"
                                    : "text-slate-500 hover:text-amber-600 hover:bg-slate-50 border border-transparent"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-amber-600" : "")} />
                            {item.title}
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50 mt-auto">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
