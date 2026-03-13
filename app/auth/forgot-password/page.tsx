'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { sendPasswordResetOtp, verifyOtpAndResetPassword } from "@/app/actions/password-reset"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

const emailSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
})

const resetSchema = z.object({
    otp: z.string().length(6, "OTP must be 6 digits"),
    password: z.string().min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<1 | 2>(1)
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [otpInput, setOtpInput] = useState("")
    const { toast } = useToast()
    const router = useRouter()

    const emailForm = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    })

    const resetForm = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
        defaultValues: { otp: "", password: "", confirmPassword: "" },
        mode: "onChange", // Validate immediately
    })

    async function onEmailSubmit(data: z.infer<typeof emailSchema>) {
        console.log("onEmailSubmit called with:", data);
        setLoading(true)
        try {
            console.log("Calling sendPasswordResetOtp...");
            const result = await sendPasswordResetOtp(data.email)
            console.log("sendPasswordResetOtp result:", result);
            setLoading(false)

            if (result.success) {
                console.log("Success! Setting step to 2");
                setEmail(data.email)
                setStep(2)
                toast({
                    title: "OTP Sent",
                    description: `We've sent a code to ${data.email}. Please check your inbox.`,
                })
            } else {
                console.error("Failure:", result.error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.error,
                })
            }
        } catch (error) {
            console.error("Unexpected error in onEmailSubmit:", error);
            setLoading(false);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong. Please try again.",
            })
        }
    }

    async function onResetSubmit(data: z.infer<typeof resetSchema>) {
        setLoading(true)
        const result = await verifyOtpAndResetPassword(email, data.otp, data.password)
        setLoading(false)

        if (result.success) {
            toast({
                title: "Success",
                description: "Your password has been reset successfully. Redirecting to login...",
            })
            setTimeout(() => {
                router.push("/auth/login")
            }, 2000)
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error,
            })
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4 bg-muted/50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>
                        {step === 1
                            ? "Enter your email address and we'll send you an OTP to reset your password."
                            : `Enter the OTP sent to ${email} and your new password.`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 1 ? (
                        <Form {...emailForm}>
                            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                                <FormField
                                    control={emailForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="name@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Send OTP
                                </Button>
                            </form>
                        </Form>
                    ) : (
                        <Form {...resetForm}>
                            <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                                {/* OTP Input Field */}

                                <FormField
                                    control={resetForm.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>OTP Code</FormLabel>
                                            <FormControl>
                                                <div className="space-y-2">
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                        placeholder="Enter 6-digit OTP"
                                                        maxLength={6}
                                                        value={otpInput}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setOtpInput(val);
                                                            // Explicitly set value and trigger validation
                                                            resetForm.setValue("otp", val, { shouldValidate: true });
                                                        }}
                                                        onBlur={field.onBlur}
                                                        name={field.name}
                                                        ref={field.ref}
                                                        disabled={loading}
                                                        autoFocus
                                                    />
                                                    <p className="text-xs text-muted-foreground text-right">
                                                        Input: {otpInput.length} | Form: {String(field.value || "").length}
                                                    </p>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={resetForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={resetForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Reset Password
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="w-full"
                                    onClick={() => setStep(1)}
                                    disabled={loading}
                                >
                                    Change Email
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href="/auth/login" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
