"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, GraduationCap, Users, User, LogOut, LayoutDashboard } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "@/components/logo";
import dynamic from "next/dynamic";
import { RequestCallbackModal } from "@/components/public/request-callback-modal";

const LandingMenu = dynamic(() => import("./navbar-menu").then(m => m.LandingMenu), {
    ssr: false,
    loading: () => <div className="hidden md:flex h-10 w-[400px] animate-pulse bg-muted rounded-md" />
});

export function LandingNavbar() {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;
    const isLMSUser = user?.role && user.role !== "STUDENT"; // Simple check for now, can be refined

    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="fixed top-0 w-full border-b border-border bg-white backdrop-blur-xl z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div onClick={() => router.push('/')} className="cursor-pointer">
                    <Logo />
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <LandingMenu />
                </div>

                <div className="flex items-center gap-4">
                    <RequestCallbackModal>
                        <Button suppressHydrationWarning className="hidden sm:flex bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white border-none shadow-[0_0_15px_rgba(16,185,129,0.3)] font-bold h-9 transition-all duration-300 gap-1.5 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            Request a Callback
                        </Button>
                    </RequestCallbackModal>

                    {mounted ? (
                        user ? (
                            <>
                                <Button asChild className="hidden sm:flex bg-slate-900 border-none hover:bg-slate-800 shadow-[0_0_15px_rgba(15,23,42,0.4)] text-white font-bold tracking-wide">
                                    <Link href="/enroll">
                                        Enroll Now
                                    </Link>
                                </Button>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="hover:bg-muted text-foreground gap-2">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/50">
                                                <User className="w-4 h-4 text-indigo-400" />
                                            </div>
                                            <span className="hidden sm:inline">{user.username || user.name || "User"}</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 bg-white border-border backdrop-blur-xl text-slate-900">
                                        <div className="p-2 text-xs text-muted-foreground break-all">
                                            {user.email}
                                        </div>
                                        <DropdownMenuSeparator className="bg-border" />

                                        {isLMSUser ? (
                                            <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer gap-2 focus:bg-muted focus:text-foreground">
                                                <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
                                            </DropdownMenuItem>
                                        ) : (
                                            <>
                                                <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer gap-2 focus:bg-muted focus:text-foreground">
                                                    <User className="w-4 h-4" /> My Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem disabled className="gap-2 text-muted-foreground/50">
                                                    <GraduationCap className="w-4 h-4" /> My Certificates (Coming Soon)
                                                </DropdownMenuItem>
                                            </>
                                        )}

                                        <DropdownMenuSeparator className="bg-border" />
                                        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} className="cursor-pointer gap-2 text-red-400 focus:bg-red-500/10 focus:text-red-400">
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                {/* Enroll Now CTA */}
                                <Button asChild className="hidden sm:flex bg-slate-900 border-none hover:bg-slate-800 shadow-[0_0_15px_rgba(15,23,42,0.4)] text-white font-bold tracking-wide h-9">
                                    <Link href="/enroll">
                                        Enroll Now
                                    </Link>
                                </Button>

                                {/* LMS Login Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-500/50 hover:border-blue-500 shadow-lg shadow-blue-500/20 gap-2 h-9 transition-all duration-300">
                                            <ShieldCheck className="w-4 h-4 text-white" />
                                            <span className="hidden sm:inline">LMS Portal</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 bg-white border-border backdrop-blur-xl">
                                        <DropdownMenuItem onClick={() => router.push("/auth/lms?role=student")} className="cursor-pointer gap-2 focus:bg-muted focus:text-foreground my-1">
                                            <GraduationCap className="w-4 h-4 text-indigo-400" />
                                            Student Portal
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push("/auth/lms?role=mentor")} className="cursor-pointer gap-2 focus:bg-muted focus:text-foreground my-1">
                                            <Users className="w-4 h-4 text-emerald-400" />
                                            Mentor Portal
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push("/auth/lms?role=hr")} className="cursor-pointer gap-2 focus:bg-muted focus:text-foreground my-1">
                                            <ShieldCheck className="w-4 h-4 text-amber-400" />
                                            HR Portal
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-border" />
                                        <DropdownMenuItem onClick={() => router.push("/auth/lms?role=admin")} className="cursor-pointer gap-2 focus:bg-muted focus:text-foreground my-1">
                                            <ShieldCheck className="w-4 h-4 text-red-400" />
                                            Admin Portal
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push("/auth/investor/login")} className="cursor-pointer gap-2 focus:bg-muted focus:text-foreground my-1">
                                            <LayoutDashboard className="w-4 h-4 text-orange-400" />
                                            Investor Portal
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Free User Login */}
                                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white font-bold tracking-wide h-9 transition-colors shadow-md shadow-orange-500/20 border-none">
                                    <Link href="/auth/login">Login</Link>
                                </Button>
                            </>
                        )
                    ) : (
                        <div className="h-9 w-[280px] animate-pulse rounded bg-muted" />
                    )}
                </div>
            </div>
        </nav>
    );
}
