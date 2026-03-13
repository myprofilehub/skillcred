"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { login, googleLogin } from "@/actions/login";
import { useState, Suspense } from "react";

function SignInContent() {
    const searchParams = useSearchParams();
    const paramsCallbackUrl = searchParams.get("callbackUrl");
    const callbackUrl = paramsCallbackUrl || "/dashboard/student";

    const [error, setError] = useState<string | null>(null);

    async function handleCredentialsLogin(formData: FormData) {
        setError(null);
        // append callbackUrl to formData to be safe if needed, 
        // but our action takes it from the body key we add
        formData.append("callbackUrl", callbackUrl);

        const result = await login(formData);
        if (result?.error) {
            setError(result.error);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full z-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-accent rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
            </div>

            <Link href="/" className="mb-8 flex items-center gap-2 relative z-10">
                <Sparkles className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold font-heading tracking-tight">
                    Skill<span className="text-primary">Cred</span>
                </span>
            </Link>

            <Card className="w-full max-w-md border-white/10 glass-card relative z-10">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl">Welcome back</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Google Sign In */}
                    <form
                        action={async () => {
                            await googleLogin(callbackUrl);
                        }}
                    >
                        <Button variant="outline" className="w-full py-6 text-base" type="submit">
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                            Sign in with Google
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-muted" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or sign in with email</span>
                        </div>
                    </div>

                    {/* Credentials Sign In */}
                    <form action={handleCredentialsLogin} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md font-medium text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="email">Email</label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="email"
                                name="email"
                                placeholder="m@example.com"
                                type="email"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="password">Password</label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>
                        <Button className="w-full" type="submit">Sign In</Button>
                    </form>

                    <div className="text-center text-sm">
                        Don&apos;t have an account? <Link href="/auth/signup" className="text-primary hover:underline">Sign up</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SignInContent />
        </Suspense>
    )
}
