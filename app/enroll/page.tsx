'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { DetailsForm } from '@/components/enrollment/details-form';
import { PaymentGateway } from '@/components/enrollment/payment-gateway';
import { processEnrollmentDetails, verifyPaymentAndEnroll } from '@/app/actions/enrollment-flow';
import { toast } from 'sonner';
import { Logo } from '@/components/logo';
import { useSession } from 'next-auth/react';
import { CheckCircle2 } from 'lucide-react';
import { LandingNavbar } from '@/components/landing/navbar';

export default function EnrollmentPage() {
    const { data: session } = useSession();
    const [pageState, setPageState] = useState<'form' | 'payment' | 'success'>('form');
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
            setPageState('payment');
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
            toast.success("Enrollment Successful!");
            setPageState('success');
        } else {
            toast.error(result.error || "Verification Failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative overflow-hidden">
            <LandingNavbar />

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />
            
            {/* Glow blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center p-4 md:p-8 pt-32 md:pt-40 pb-24 min-h-[calc(100vh-100px)]">
                
                {/* Title Card */}
                <div className="text-center mb-10 space-y-4 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-8">
                        Join <span className="text-amber-500">SkillCred</span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        Take the first step towards building a portfolio that HRs actually want to see. Enroll now to secure your seat in the upcoming cohort.
                    </p>
                </div>

                <div className="w-full max-w-4xl">
                    <AnimatePresence mode="wait">
                        {pageState === 'form' && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <div className="bg-white border border-slate-200 rounded-[2rem] shadow-xl p-6 md:p-10">
                                    <DetailsForm
                                        onSubmit={handleDetailsSubmit}
                                        loading={loading}
                                        initialEmail={session?.user?.email || undefined}
                                        initialName={session?.user?.name || undefined}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {pageState === 'payment' && order && (
                            <motion.div
                                key="payment"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full max-w-lg mx-auto"
                            >
                                <div className="bg-white border border-amber-500/30 rounded-[2rem] shadow-xl overflow-hidden shadow-amber-500/10">
                                    <div className="border-b border-slate-200 px-8 py-6 bg-amber-50">
                                        <h3 className="text-2xl font-black text-slate-900 text-center">Confirm & Pay</h3>
                                    </div>
                                    <div className="p-8">
                                        <div className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-transparent rounded-2xl border border-amber-200">
                                            <div className="flex justify-between items-center mb-4">
                                                <div>
                                                    <h3 className="text-slate-900 font-bold text-lg">{order.projectName}</h3>
                                                    <p className="text-amber-600 text-sm">Lock-in Deposit</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-3xl font-black text-slate-900">₹{order.amount}</p>
                                                </div>
                                            </div>
                                            <div className="h-px w-full bg-slate-200 my-4" />
                                            <ul className="text-sm text-slate-600 space-y-2">
                                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Fully refundable within 7 days</li>
                                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Guarantees seat in next cohort</li>
                                            </ul>
                                        </div>
                                        <PaymentGateway order={order} onSuccess={handlePaymentSuccess} loading={loading} />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {pageState === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full max-w-lg mx-auto"
                            >
                                <div className="bg-white border border-emerald-200 rounded-[2rem] shadow-xl p-10 text-center shadow-emerald-500/10">
                                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200">
                                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 mb-4">You're In! 🎉</h2>
                                    <p className="text-lg text-slate-600 mb-8">
                                        Your deposit is confirmed. We are provisioning your dedicated LMS workspace.
                                    </p>
                                    <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 mb-8">
                                        <p className="text-amber-700 font-bold">
                                            Login credentials will be sent to your registered email ID within 24 hours.
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => router.push('/')}
                                        className="w-full bg-slate-900 text-white font-black px-8 py-4 rounded-xl hover:bg-slate-800 transition-all"
                                    >
                                        Return to Home
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
