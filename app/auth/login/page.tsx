"use client";

import { Suspense } from "react";

import { useTransition, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/actions/auth-actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/logo";

function LoginForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const handleSubmit = (formData: FormData) => {
        setError(null);
        startTransition(async () => {
            const result = await login(formData);
            if (result?.error) {
                setError(result.error);
                toast.error(result.error);
            } else if (result?.success) {
                toast.success("Welcome back!");
                // Force full reload to clear Router Cache and ensure session is picked up
                window.location.href = result.redirectTo || "/";
            }
        });
    };

    return (
        <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
            <CardHeader className="space-y-1 flex flex-col items-center">
                <div className="mb-4">
                    <Logo width={150} height={40} />
                </div>
                <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
                <CardDescription className="text-center text-muted-foreground">
                    Enter your email to access your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-4">
                    <input type="hidden" name="callbackUrl" value={callbackUrl} />
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            className="bg-white/5 border-white/10"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="bg-white/5 border-white/10"
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : null}
                        Sign In
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 text-center text-sm">
                <div className="text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href={`/auth/signup${callbackUrl !== "/" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`} className="text-primary hover:underline font-medium">
                        Sign up for free
                    </Link>
                </div>

                <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-black px-2 text-muted-foreground">Or</span>
                    </div>
                </div>

                <Link href="/auth/lms" className="w-full text-muted-foreground hover:text-white transition-colors">
                    Access via LMS (Enterprise)
                </Link>
            </CardFooter>
        </Card>
    );
}

export default function LoginPage() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    );
}
