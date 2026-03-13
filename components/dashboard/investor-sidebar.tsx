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
        <div className="flex h-full w-64 flex-col bg-neutral-950 text-white border-r border-amber-500/10">
            {/* Logo */}
            <div className="flex h-16 items-center px-6 border-b border-amber-500/10">
                <Link href="/dashboard/investor" className="flex items-center gap-2 font-bold text-xl">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="tracking-tight">
                        Investor<span className="text-amber-400">Hub</span>
                    </span>
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
                                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                                    : "text-neutral-400 hover:text-amber-300 hover:bg-amber-500/5 border border-transparent"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-amber-400" : "")} />
                            {item.title}
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-amber-500/10 space-y-2">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
