"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AdminSignInContent() {
    const searchParams = useSearchParams();
    const paramsCallbackUrl = searchParams.get("callbackUrl");
    const callbackUrl = paramsCallbackUrl || "/dashboard/admin";

    const [error, setError] = useState<string | null>(null);

    async function handleCredentialsLogin(formData: FormData) {
        setError(null);
        formData.append("callbackUrl", callbackUrl);

        // Pass true as the second argument to indicate this is an admin login
        const result = await login(formData, true);
        if (result?.error) {
            setError(result.error);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50 relative overflow-hidden">
            {/* Background blobs for admin style */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full z-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-cyan-600 rounded-full mix-blend-screen filter blur-[100px]" />
                <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px]" />
            </div>

            <Link href="/" className="mb-8 flex items-center gap-2 relative z-10 text-white">
                <Shield className="h-8 w-8 text-cyan-500" />
                <span className="text-2xl font-bold font-heading tracking-tight">
                    Skill<span className="text-cyan-500">Cred</span> Admin
                </span>
            </Link>

            <Card className="w-full max-w-md border-cyan-900/50 bg-slate-900/80 backdrop-blur-md relative z-10 text-white">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl">Admin Portal</CardTitle>
                    <CardDescription className="text-slate-400">
                        Secure login for system administrators
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form action={handleCredentialsLogin} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-md font-medium text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300" htmlFor="email">Admin Email</label>
                            <input
                                className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                                id="email"
                                name="email"
                                placeholder="admin@skillcred.in"
                                type="email"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300" htmlFor="password">Password</label>
                            <input
                                className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>
                        <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border-0" type="submit">
                            Sign In to Portal
                        </Button>
                    </form>
                    <div className="text-center mt-6 pt-4 border-t border-slate-800">
                        <Link href="/auth/signin" className="text-sm text-cyan-500 hover:text-cyan-400 hover:underline">
                            Return to General Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function AdminSignInPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">Loading...</div>}>
            <AdminSignInContent />
        </Suspense>
    )
}
