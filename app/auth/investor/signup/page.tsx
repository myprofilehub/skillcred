"use client";

import { useTransition, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { registerInvestor } from "@/actions/auth-actions";
import { toast } from "sonner";
import { Loader2, Building2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InvestorSignupPage() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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
            const result = await registerInvestor(formData);
            if (result?.error) {
                setError(result.error);
                toast.error(result.error);
            } else {
                toast.success("Account created successfully!");
                router.push("/auth/investor/login");
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden py-10 px-4">
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

            <Card className="w-full max-w-2xl border-white/10 bg-black/50 backdrop-blur-xl border-amber-500/20 relative z-10">
                <CardHeader className="space-y-1 flex flex-col items-center">
                    <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-2">
                        <Building2 className="w-6 h-6 text-amber-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Join Investor Network</CardTitle>
                    <CardDescription className="text-center text-muted-foreground">
                        Connect with top student talent and valid startups
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-6">

                        {/* Personal Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Personal Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" name="name" placeholder="John Doe" required className="bg-white/5 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" name="username" placeholder="johndoe_vc" required className="bg-white/5 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Work Email</Label>
                                    <Input id="email" name="email" type="email" placeholder="john@fund.com" required className="bg-white/5 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mobile">Mobile</Label>
                                    <Input id="mobile" name="mobile" placeholder="+1 234..." className="bg-white/5 border-white/10" />
                                </div>
                            </div>
                        </div>

                        {/* Professional Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Professional Profile</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company / Fund Name</Label>
                                    <Input id="company" name="company" placeholder="Acme Ventures" required className="bg-white/5 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="position">Position</Label>
                                    <Input id="position" name="position" placeholder="Partner / Angel" required className="bg-white/5 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                                    <Input id="linkedinUrl" name="linkedinUrl" placeholder="https://linkedin.com/in/..." className="bg-white/5 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website / Portfolio</Label>
                                    <Input id="website" name="website" placeholder="https://acme.vc" className="bg-white/5 border-white/10" />
                                </div>
                            </div>
                        </div>

                        {/* Focus Areas */}
                        <div className="space-y-3">
                            <Label>Investment Focus Areas</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {["AI/ML", "EdTech", "FinTech", "SaaS", "IoT", "Blockchain", "HealthTech", "Consumer"].map((area) => (
                                    <div key={area} className="flex items-center space-x-2">
                                        <Checkbox id={`area-${area}`} name="focusAreas" value={area} />
                                        <label
                                            htmlFor={`area-${area}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {area}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Security */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Security</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" name="password" type="password" required className="bg-white/5 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input id="confirmPassword" name="confirmPassword" type="password" required className="bg-white/5 border-white/10" />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={isPending}>
                            {isPending ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : null}
                            Create Investor Account
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center text-sm text-muted-foreground">
                    Already a member?{" "}
                    <Link href="/auth/investor/login" className="ml-1 text-amber-500 hover:underline font-medium">
                        Sign in
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
