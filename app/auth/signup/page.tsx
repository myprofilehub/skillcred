"use client";

import { Suspense } from "react";

import { useTransition, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { register } from "@/actions/auth-actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/logo";

function SignupForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const handleSubmit = (formData: FormData) => {
        setError(null);

        // Basic Client Validation
        const pass = formData.get("password") as string;
        const confirm = formData.get("confirmPassword") as string;
        if (pass !== confirm) {
            setError("Passwords do not match");
            return;
        }

        startTransition(async () => {
            const result = await register(formData);
            if (result?.error) {
                setError(result.error);
                toast.error(result.error);
            } else {
                toast.success("Account created successfully!");
                // Auto-redirect to login or home
                // Usually redirect to login for free users or direct login? 
                // Let's redirect to login for now to be safe and simple.
                router.push(`/auth/login?registered=true&callbackUrl=${encodeURIComponent(callbackUrl)}`);
            }
        });
    };

    return (
        <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
            <CardHeader className="space-y-1 flex flex-col items-center">
                <div className="mb-4">
                    <Logo width={150} height={40} />
                </div>
                <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
                <CardDescription className="text-center text-muted-foreground">
                    Join thousands of students building their careers
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" placeholder="John Doe" required className="bg-white/5 border-white/10" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" placeholder="johndoe123" required className="bg-white/10 border-white/20 text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-white/10 border-white/20 text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile</Label>
                            <Input id="mobile" name="mobile" placeholder="+91 98765..." className="bg-white/5 border-white/10" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required className="bg-white/5 border-white/10" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" name="confirmPassword" type="password" required className="bg-white/5 border-white/10" />
                    </div>

                    {error && (
                        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : null}
                        Create Account
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href={`/auth/login${callbackUrl !== "/" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`} className="ml-1 text-primary hover:underline font-medium">
                    Sign in
                </Link>
            </CardFooter>
        </Card>
    );
}

export default function SignupPage() {
    return (
        <Suspense>
            <SignupForm />
        </Suspense>
    );
}
