'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BatchDetailsForm } from '@/components/enrollment/batch-details-form';
import { processBatchEnrollment } from '@/app/actions/batch-enrollment';
import { toast } from 'sonner';
import { Logo } from '@/components/logo';
import { CheckCircle2, MailOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function BatchEnrollmentPage() {
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleDetailsSubmit = async (formData: FormData) => {
        setLoading(true);
        const result = await processBatchEnrollment(formData);
        setLoading(false);

        if (result.success) {
            toast.success("Batch Enrollment Complete!");
            setIsSuccess(true);
        } else {
            toast.error(result.error || "An error occurred during enrollment.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans relative overflow-hidden flex flex-col items-center selection:bg-cyan-100 selection:text-cyan-900">
            
            {/* Soft, airy light gradients */}
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-200/40 rounded-full blur-[120px] pointer-events-none" />
            
            {/* Floating Nav */}
            <nav className="relative z-20 w-full max-w-5xl mx-auto px-6 py-8 flex justify-between items-center">
                <div className="px-5 py-3 rounded-2xl">
                    <Logo width={120} variant="dark" />
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-20 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div 
                            key="form-container"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                        >
                            <div className="text-center mb-10 space-y-4">
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                                    Application <span className="text-cyan-600">Portal</span>
                                </h1>
                                <p className="text-lg text-slate-600 max-w-xl mx-auto font-medium">
                                    Complete your profile to secure your free access to the 4-week accelerated cohort.
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] ring-1 ring-slate-100/80 overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
                                
                                <div className="p-8 md:p-12">
                                    <BatchDetailsForm 
                                        onSubmit={handleDetailsSubmit}
                                        loading={loading}
                                    />
                                </div>
                            </div>
                            
                            <p className="text-center mt-8 text-sm text-slate-500 font-medium">
                                No credit card required. Guaranteed secure enrollment.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                            className="w-full max-w-2xl mt-10 bg-white rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] ring-1 ring-slate-100 p-12 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-green-50 to-transparent pointer-events-none" />

                            <div className="relative z-10 flex flex-col items-center">
                                <motion.div 
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
                                    className="w-24 h-24 bg-white rounded-full shadow-lg ring-1 ring-slate-100 flex items-center justify-center mb-8 relative"
                                >
                                    <MailOpen className="w-10 h-10 text-emerald-500" />
                                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full w-8 h-8 flex items-center justify-center border-4 border-white">
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                    </div>
                                </motion.div>
                                
                                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                                    You're In!
                                </h2>
                                
                                <p className="text-lg text-slate-600 max-w-sm mx-auto leading-relaxed mb-8">
                                    We've automatically provisioned your SkillCred Learning Management System account. Please check your inbox for credentials.
                                </p>

                                <div className="w-full bg-slate-50 rounded-2xl border border-slate-100 p-6 mb-10 text-left">
                                    <h3 className="font-semibold text-slate-900 mb-3 text-sm tracking-wide uppercase">Next Steps</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                                            <span className="text-slate-700 text-sm font-medium">Locate our automated welcome email.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                                            <span className="text-slate-700 text-sm font-medium">Copy your secure temporary password.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                                            <span className="text-slate-700 text-sm font-medium">Log into the Student Dashboard.</span>
                                        </li>
                                    </ul>
                                </div>

                                <Link 
                                    href="/" 
                                    className="group inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-8 py-4 rounded-full hover:bg-slate-800 transition-all shadow-md hover:shadow-lg active:scale-95"
                                >
                                    Back to Home 
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
