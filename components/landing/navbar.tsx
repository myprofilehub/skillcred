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

const LandingMenu = dynamic(() => import("./navbar-menu").then(m => m.LandingMenu), {
    ssr: false,
    loading: () => <div className="hidden md:flex h-10 w-[400px] animate-pulse bg-white/5 rounded-md" />
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
        <nav className="fixed top-10 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div onClick={() => router.push('/')} className="cursor-pointer">
                    <Logo />
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <LandingMenu />
                </div>

                <div className="flex items-center gap-4">
                    <Button asChild className="hidden sm:flex bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white border-none shadow-[0_0_15px_rgba(34,197,94,0.3)] font-bold h-9 transition-all duration-300">
                        <Link href="/apply-mentor">Apply as Mentor</Link>
                    </Button>

                    {mounted ? (
                        user ? (
                            <>
                        <Button asChild className="hidden sm:flex bg-gradient-to-r from-purple-600 to-pink-600 border-none hover:opacity-90 shadow-[0_0_15px_rgba(168,85,247,0.4)] text-white font-bold tracking-wide">
                                    <Link href="/batch/enroll">
                                        Get Early Access — Free
                                    </Link>
                                </Button>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="hover:bg-white/10 text-white gap-2">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/50">
                                                <User className="w-4 h-4 text-indigo-400" />
                                            </div>
                                            <span className="hidden sm:inline">{user.username || user.name || "User"}</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 bg-black/95 border-white/10 backdrop-blur-xl text-white">
                                        <div className="p-2 text-xs text-muted-foreground break-all">
                                            {user.email}
                                        </div>
                                        <DropdownMenuSeparator className="bg-white/10" />

                                        {isLMSUser ? (
                                            <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer gap-2 focus:bg-white/10 focus:text-white">
                                                <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
                                            </DropdownMenuItem>
                                        ) : (
                                            <>
                                                <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer gap-2 focus:bg-white/10 focus:text-white">
                                                    <User className="w-4 h-4" /> My Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem disabled className="gap-2 text-muted-foreground/50">
                                                    <GraduationCap className="w-4 h-4" /> My Certificates (Coming Soon)
                                                </DropdownMenuItem>
                                            </>
                                        )}

                                        <DropdownMenuSeparator className="bg-white/10" />
                                        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} className="cursor-pointer gap-2 text-red-400 focus:bg-red-500/10 focus:text-red-400">
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                {/* Enroll Now CTA */}
                                <Button asChild className="hidden sm:flex bg-gradient-to-r from-purple-600 to-pink-600 border-none hover:opacity-90 shadow-[0_0_15px_rgba(168,85,247,0.4)] text-white font-bold tracking-wide h-9">
                                    <Link href="/batch/enroll">
                                        Get Early Access — Free
                                    </Link>
                                </Button>

                                {/* LMS Login Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500/50 hover:border-indigo-500 shadow-lg shadow-indigo-500/20 gap-2 h-9 transition-all duration-300">
                                            <ShieldCheck className="w-4 h-4 text-white" />
                                            <span className="hidden sm:inline">LMS Portal</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 bg-black/95 border-white/10 backdrop-blur-xl">
                                        <DropdownMenuItem onClick={() => router.push("/auth/lms?role=student")} className="cursor-pointer gap-2 focus:bg-white/10 focus:text-white my-1">
                                            <GraduationCap className="w-4 h-4 text-indigo-400" />
                                            Student Portal
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push("/auth/lms?role=mentor")} className="cursor-pointer gap-2 focus:bg-white/10 focus:text-white my-1">
                                            <Users className="w-4 h-4 text-emerald-400" />
                                            Mentor Portal
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push("/auth/lms?role=hr")} className="cursor-pointer gap-2 focus:bg-white/10 focus:text-white my-1">
                                            <ShieldCheck className="w-4 h-4 text-amber-400" />
                                            HR Portal
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-white/10" />
                                        <DropdownMenuItem onClick={() => router.push("/auth/lms?role=admin")} className="cursor-pointer gap-2 focus:bg-white/10 focus:text-white my-1">
                                            <ShieldCheck className="w-4 h-4 text-red-400" />
                                            Admin Portal
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push("/auth/investor/login")} className="cursor-pointer gap-2 focus:bg-white/10 focus:text-white my-1">
                                            <LayoutDashboard className="w-4 h-4 text-orange-400" />
                                            Investor Portal
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Free User Login */}
                                <Button asChild className="bg-white text-black hover:bg-white/90 font-medium h-9">
                                    <Link href="/auth/login">Login</Link>
                                </Button>
                            </>
                        )
                    ) : (
                        <div className="h-9 w-[280px] animate-pulse rounded bg-white/5" />
                    )}
                </div>
            </div>
        </nav>
    );
}
