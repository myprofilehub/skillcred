'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DetailsForm } from '@/components/enrollment/details-form';
import { PaymentGateway } from '@/components/enrollment/payment-gateway';
import { processEnrollmentDetails, verifyPaymentAndEnroll } from '@/app/actions/enrollment-flow';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { useSession } from 'next-auth/react';

export default function EnrollmentPage() {
    const { data: session } = useSession();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<{ orderId: string, amount: number, currency: string, projectName?: string } | null>(null);

    const router = useRouter();

    const handleDetailsSubmit = async (formData: FormData) => {
        setLoading(true);
        const result = await processEnrollmentDetails(formData);
        setLoading(false);

        if (result.success) {
            setOrder({
                orderId: result.orderId!,
                amount: result.amount!,
                currency: result.currency!,
                projectName: result.projectName
            });
            setStep(2);
        } else {
            toast.error(result.error || "An error occurred");
        }
    };

    const handlePaymentSuccess = async () => {
        if (!order) return;
        setLoading(true);
        const result = await verifyPaymentAndEnroll(order.orderId);
        setLoading(false);

        if (result.success) {
            toast.success("Enrollment Complete! Redirecting to your dashboard...");
            router.push('/dashboard/student');
        } else {
            toast.error(result.error || "Verification Failed");
        }
    };

    return (
        <div className="dark min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            {/* Navbar / Logo Area */}
            <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
                <Logo width={120} />
            </nav>

            <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-12 min-h-[calc(100vh-100px)]">
                <div className="w-full max-w-5xl space-y-12">
                    {/* Header Section */}
                    <div className="text-center space-y-6 max-w-3xl mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent py-2 leading-tight">
                            Begin Your Journey
                        </h1>
                        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            Join the elite developer cohort. Build your portfolio, master real-world projects, and get instant credentials.
                        </p>
                    </div>

                    {/* Stepper Visual */}
                    <div className="flex justify-center w-full max-w-2xl mx-auto px-4">
                        <div className="relative flex justify-between w-full">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 -translate-y-1/2 rounded-full" />
                            <div
                                className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
                                style={{ width: `${(step - 1) * 100}%` }}
                            />

                            {[1, 2].map((s) => (
                                <div key={s} className="flex flex-col items-center gap-3 bg-slate-950 px-2 z-10">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= s
                                            ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                                            : "border-slate-700 bg-slate-900 text-slate-500"
                                            }`}
                                    >
                                        {step > s ? (
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <span className="font-bold">{s}</span>
                                        )}
                                    </div>
                                    <span className={`text-sm font-medium transition-colors ${step >= s ? "text-white" : "text-slate-500"}`}>
                                        {s === 1 ? "Enrollment Details" : "Secure Spot"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Steps Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="!bg-slate-900/80 border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
                                {step === 1 && (
                                    <>
                                        <CardHeader className="border-b border-white/5 px-8 py-6 bg-slate-800/60">
                                            <CardTitle className="text-xl text-white">Enrollment Details</CardTitle>
                                            <CardDescription className="text-slate-400">Tell us about yourself and choose your stream.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-8">
                                            <DetailsForm
                                                onSubmit={handleDetailsSubmit}
                                                loading={loading}
                                                initialEmail={session?.user?.email || undefined}
                                                initialName={session?.user?.name || undefined}
                                            />
                                        </CardContent>
                                    </>
                                )}

                                {step === 2 && order && (
                                    <>
                                        <CardHeader className="border-b border-white/5 px-8 py-6 bg-slate-800/60">
                                            <CardTitle className="text-xl text-white">Finalize Enrollment</CardTitle>
                                            <CardDescription className="text-slate-400">Secure your spot in the batch to unlock immediate access.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-8">
                                            <div className="mb-8 p-6 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-xl border border-cyan-500/20">
                                                <div className="flex justify-between items-center mb-4">
                                                    <div>
                                                        <h3 className="text-white font-semibold text-lg">{order.projectName}</h3>
                                                        <p className="text-cyan-300 text-sm">Batch & Mentor Assignment: Automatic</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-3xl font-bold text-white">₹{order.amount}</p>
                                                        <p className="text-slate-400 text-xs">One-time payment</p>
                                                    </div>
                                                </div>
                                                <div className="h-px w-full bg-white/10 my-4" />
                                                <ul className="text-sm text-slate-300 space-y-2">
                                                    <li className="flex items-center gap-2">✓ Lifetime LMS Access</li>
                                                    <li className="flex items-center gap-2">✓ Verified Project Certificate</li>
                                                    <li className="flex items-center gap-2">✓ Mentor Support</li>
                                                </ul>
                                            </div>
                                            <PaymentGateway order={order} onSuccess={handlePaymentSuccess} loading={loading} />
                                        </CardContent>
                                    </>
                                )}
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
