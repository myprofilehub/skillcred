"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Sparkles } from "lucide-react";
import Link from "next/link";
import { investorLogin } from "@/actions/auth-actions";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";

function InvestorSignInContent() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleLogin(formData: FormData) {
        setError(null);
        const result = await investorLogin(formData);
        if (result?.error) {
            setError(result.error);
        } else {
            // Redirect handled by server action or fallback
            // router.push("/dashboard/investor"); 
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full z-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-amber-500 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
            </div>

            <Link href="/" className="mb-8 flex items-center gap-2 relative z-10">
                <Sparkles className="h-8 w-8 text-amber-500" />
                <span className="text-2xl font-bold font-heading tracking-tight">
                    Skill<span className="text-amber-500">Cred</span> Investors
                </span>
            </Link>

            <Card className="w-full max-w-md border-white/10 glass-card relative z-10 border-amber-500/20">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-2">
                        <Building2 className="w-6 h-6 text-amber-500" />
                    </div>
                    <CardTitle className="text-2xl">Investor Login</CardTitle>
                    <CardDescription>
                        Access your investment dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form action={handleLogin} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md font-medium text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="email">Email</label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-amber-500"
                                id="email"
                                name="email"
                                placeholder="name@fund.com"
                                type="email"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="password">Password</label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-amber-500"
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>
                        <Button className="w-full bg-amber-600 hover:bg-amber-700" type="submit">Sign In</Button>
                    </form>

                    <div className="text-center text-sm">
                        Interested in joining? <Link href="/auth/investor/signup" className="text-amber-500 hover:underline">Apply as Investor</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function InvestorSignInPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <InvestorSignInContent />
        </Suspense>
    )
}
