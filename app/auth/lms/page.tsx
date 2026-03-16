"use client";

import { useTransition, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { lmsLogin } from "@/actions/auth-actions";
import { toast } from "sonner";
import { Loader2, ShieldCheck, Users, GraduationCap } from "lucide-react";
import { Logo } from "@/components/logo";

function LMSLoginContent() {
    const searchParams = useSearchParams();
    const role = searchParams.get("role") || "student";
    const callbackUrl = searchParams.get("callbackUrl") || "";

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (formData: FormData) => {
        setError(null);
        startTransition(async () => {
            const result = await lmsLogin(formData);
            if (result?.error) {
                setError(result.error);
                toast.error(result.error);
            } else {
                toast.success("Login successful");
            }
        });
    };

    // Dynamic UI based on role
    const getRoleUI = () => {
        switch (role) {
            case "mentor":
                return {
                    title: "Mentor Portal",
                    icon: Users,
                    color: "text-emerald-400",
                    description: "Access your dashboard to manage sessions and content."
                };
            case "hr":
                return {
                    title: "HR Portal",
                    icon: ShieldCheck,
                    color: "text-amber-400",
                    description: "Enterprise access for recruitment and analytics."
                };
            case "admin":
                return {
                    title: "Admin Portal",
                    icon: ShieldCheck,
                    color: "text-red-400",
                    description: "System administration and management."
                };
            case "student":
            default:
                return {
                    title: "Student LMS",
                    icon: GraduationCap,
                    color: "text-indigo-400",
                    description: "Enterprise login for enrolled students."
                };
        }
    };

    const ui = getRoleUI();
    const Icon = ui.icon;

    return (
        <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
            <CardHeader className="space-y-1 text-center flex flex-col items-center">
                <div className="mb-4">
                    <Logo width={150} height={40} />
                </div>
                <CardTitle className="text-2xl font-bold">{ui.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                    {ui.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-4">
                    <input type="hidden" name="role" value={role} />
                    <input type="hidden" name="callbackUrl" value={callbackUrl} />

                    <div className="space-y-2">
                        <Label htmlFor="email">Organizational Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@skillcred.com"
                            required
                            className="bg-white/5 border-white/10"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
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
                        Login to LMS
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 text-center text-sm">
                <Link href="/auth/login" className="w-full text-muted-foreground hover:text-white transition-colors">
                    Back to Standard Login
                </Link>
            </CardFooter>
        </Card>
    );
}

export default function LMSLoginPage() {
    return (
        <Suspense fallback={
            <Card className="border-white/10 bg-black/50 backdrop-blur-xl w-full max-w-md h-[400px] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-white/50" />
            </Card>
        }>
            <LMSLoginContent />
        </Suspense>
    );
}
