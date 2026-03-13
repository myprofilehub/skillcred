
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Lock, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { resetPassword } from "@/app/actions/auth-actions"; // Need to create this action

export default function ResetPasswordPage() {
    const { update } = useSession();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const newPassword = watch("newPassword");

    const onSubmit = async (data: any) => {
        setLoading(true);

        try {
            const result = await resetPassword(data.newPassword);

            if (result.success) {
                toast({
                    title: "Password Updated",
                    description: "Your password has been changed successfully. Redirecting...",
                });

                // Update the session JWT before redirecting
                await update({ user: { forcePasswordChange: false } });

                // Force a hard refresh/redirect to load the dashboard
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 1000);
            } else {
                toast({
                    title: "Error",
                    description: result.error || "Failed to update password",
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <Card className="w-full max-w-md bg-slate-900 border-white/10 relative z-10">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                        <Lock className="w-6 h-6 text-purple-500" />
                        Set New Password
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        For security reasons, you must set a new password for your LMS account to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">New Password</label>
                            <Input
                                {...register("newPassword", {
                                    required: "Password is required",
                                    minLength: { value: 8, message: "Minimum 8 characters" }
                                })}
                                type="password"
                                className="bg-black/50 border-white/10 text-white"
                                placeholder="Enter updated password"
                            />
                            {errors.newPassword && (
                                <p className="text-xs text-red-400">{errors.newPassword.message as string}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Confirm Password</label>
                            <Input
                                {...register("confirmPassword", {
                                    required: "Please confirm password",
                                    validate: (val) => val === newPassword || "Passwords do not match"
                                })}
                                type="password"
                                className="bg-black/50 border-white/10 text-white"
                                placeholder="Re-enter password"
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-400">{errors.confirmPassword.message as string}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : "Set Password & Continue Dashboard"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
