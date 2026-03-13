"use client";

import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    BookOpen,
    Briefcase,
    Settings,
    LogOut,
    Menu,
    X,
    Users,
    ClipboardCheck,
    FileText,
    School,
    Calendar,
    Video,
    TrendingUp,
    Handshake,
    Rocket,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/logo";

const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
    { name: "My Classes", href: "/dashboard/student/classroom", icon: School },
    { name: "Schedule", href: "/dashboard/student/schedule", icon: Calendar },
    { name: "Assignments", href: "/dashboard/student/assignments", icon: ClipboardCheck },
    { name: "Recordings", href: "/dashboard/student/recordings", icon: Video },
    { name: "Portfolio", href: "/dashboard/student/portfolio", icon: FileText },
    { name: "Career Hub", href: "/dashboard/student/hr", icon: Briefcase },
    { name: "Investor Connect", href: "/dashboard/student/investors", icon: Handshake },
    { name: "Settings", href: "/dashboard/student/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <Button
                variant="ghost"
                size="icon"
                className="lg:hidden fixed top-4 left-4 z-50 bg-background/50 backdrop-blur-md border border-white/10"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X /> : <Menu />}
            </Button>

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-40 h-screen w-64 bg-background/60 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 transform lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="h-16 flex items-center px-6 border-b border-white/10">
                        <Logo />
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                        {sidebarLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group text-sm font-medium",
                                        isActive
                                            ? "bg-primary/20 text-primary border border-primary/20"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-white")} />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-white/10">
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                        >
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
