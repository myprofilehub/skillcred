"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    Settings,
    LogOut,
    Search,
    Send,
    Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/logo";

const sidebarItems = [
    { name: "Dashboard", href: "/dashboard/hr", icon: LayoutDashboard },
    { name: "Jobs", href: "/dashboard/hr/jobs", icon: Briefcase },
    { name: "Talent Pool", href: "/dashboard/hr/talent", icon: Search },
    { name: "Interview Requests", href: "/dashboard/hr/requests", icon: Send },
    { name: "Settings", href: "/dashboard/hr/settings", icon: Settings },
];

export function HRSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full bg-slate-950 border-r border-white/10 w-64 fixed left-0 top-0 bottom-0 z-40">
            {/* Logo Area */}
            <div className="flex flex-col h-auto px-6 py-4 border-b border-white/10">
                {/* SkillCred Brand - Links to Landing Page */}
                <div className="mb-2">
                    <Logo />
                </div>

                {/* HRHub Title */}
                <div className="flex items-center gap-2 pl-1">
                    <span className="text-sm font-medium text-muted-foreground">
                        HR<span className="text-emerald-400/80">Hub</span>
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
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Sign Out */}
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
