'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, UploadCloud, CheckCircle2, ChevronRight, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStreams } from '@/app/actions/enrollment';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const LightInput = "w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl px-5 py-4 text-base font-medium placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all shadow-sm";
const LightSelect = "w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl px-5 py-4 text-base font-medium focus:bg-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all shadow-sm appearance-none cursor-pointer";

export function BatchDetailsForm({ onSubmit, loading, initialEmail, initialName }: { onSubmit: (data: FormData) => void, loading: boolean, initialEmail?: string, initialName?: string }) {
    const [streams, setStreams] = useState<any[]>([]);
    const [fetchingStreams, setFetchingStreams] = useState(true);
    const [selectedTrack, setSelectedTrack] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    // Captcha State
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');

    useEffect(() => {
        async function fetchStreams() {
            try {
                const data = await getStreams();
                const allowedKeywords = ['ai', 'machine-learning', 'full-stack', 'fullstack', 'data-engineering', 'data-science'];
                const filtered = data.filter(track => {
                    const slug = track.slug.toLowerCase();
                    return allowedKeywords.some(keyword => slug.includes(keyword));
                });
                setStreams(filtered.length > 0 ? filtered : data);
            } catch (e) {
                console.error(e);
            } finally {
                setFetchingStreams(false);
            }
        }
        fetchStreams();
        
        setNum1(Math.floor(Math.random() * 10) + 1);
        setNum2(Math.floor(Math.random() * 10) + 1);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (parseInt(userAnswer) !== num1 + num2) {
            toast.error('Incorrect math validation. Please try again.');
            setNum1(Math.floor(Math.random() * 10) + 1);
            setNum2(Math.floor(Math.random() * 10) + 1);
            setUserAnswer('');
            return;
        }

        if (!selectedTrack) {
            toast.error('Please select a stream to continue');
            return;
        }

        const formData = new FormData(e.currentTarget);
        formData.append('trackSlug', selectedTrack);
        onSubmit(formData);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            if (e.target.files[0].size > 5 * 1024 * 1024) {
                toast.error("File size exceeds 5MB limit.");
                e.target.value = '';
                setFileName(null);
                return;
            }
            setFileName(e.target.files[0].name);
        } else {
            setFileName(null);
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col gap-12">
            
            {/* 1. Basic Info */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-cyan-600" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">Personal Information</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
                    <input id="name" name="name" required defaultValue={initialName || ''} className={LightInput} placeholder="Full Name *" />
                    <input id="email" name="email" type="email" required defaultValue={initialEmail || ''} className={LightInput} placeholder="Email Address *" />
                    <input id="phone" name="phone" required className={LightInput} placeholder="Phone Number *" />
                    <input id="city" name="city" className={LightInput} placeholder="City (Optional)" />
                </div>
            </div>

            <hr className="border-slate-100" />

            {/* 2. Education & Experience */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">Background Details</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">
                    <input id="college" name="college" className={LightInput} placeholder="College / University" />
                    <input id="year" name="year" type="number" min="1950" max="2035" className={LightInput} placeholder="Graduation Year" />
                    
                    <div className="relative md:col-span-2">
                        <select id="experienceLevel" name="experienceLevel" className={LightSelect}>
                            <option value="">Select Programming Experience</option>
                            <option value="Beginner">Beginner (No prior experience)</option>
                            <option value="Intermediate">Intermediate (Know basics)</option>
                            <option value="Advanced">Advanced (Built projects)</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                    </div>
                </div>

                <div className="border border-slate-200 border-dashed rounded-2xl p-6 bg-slate-50/50 hover:bg-slate-50 hover:border-cyan-300 transition-colors group">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="font-semibold text-slate-900 mb-1">Resume Upload <span className="text-slate-400 font-normal">(Optional)</span></p>
                            <p className="text-sm text-slate-500">Provide an updated PDF (Max 5MB)</p>
                        </div>
                        {fileName ? (
                            <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2.5 rounded-full border border-emerald-200">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span className="text-sm text-emerald-700 font-bold truncate max-w-[200px]">{fileName}</span>
                            </div>
                        ) : (
                            <div className="relative">
                                <label htmlFor="resume" className="cursor-pointer bg-white border border-slate-200 text-slate-700 shadow-sm font-semibold px-6 py-3 rounded-full hover:bg-slate-50 hover:border-cyan-500 hover:text-cyan-600 transition-all flex items-center gap-2 text-sm z-10 w-full sm:w-auto text-center shrink-0">
                                    <UploadCloud className="w-4 h-4" /> Browse Files
                                </label>
                                <input id="resume" name="resume" type="file" accept=".pdf" className="sr-only" onChange={handleFileChange} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <hr className="border-slate-100" />

            {/* 3. Program Selection */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 flex-1">Select Program Focus <span className="text-red-500 text-base">*</span></h3>
                    <div className="hidden sm:inline-flex bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full border border-cyan-200">
                        100% Free
                    </div>
                </div>
                
                {fetchingStreams ? (
                    <div className="py-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-cyan-500" /></div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {streams.map((track) => {
                            const isSelected = selectedTrack === track.slug;
                            return (
                                <motion.div
                                    key={track.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedTrack(track.slug)}
                                    className={cn(
                                        "cursor-pointer px-6 py-5 rounded-2xl border-2 flex items-center justify-between transition-all group overflow-hidden relative bg-white",
                                        isSelected 
                                            ? "border-cyan-500 shadow-[0_8px_20px_rgba(6,182,212,0.15)] ring-4 ring-cyan-50" 
                                            : "border-slate-100 hover:border-slate-300 shadow-sm"
                                    )}
                                >
                                    {isSelected && <div className="absolute inset-0 bg-cyan-500/5" />}
                                    <span className={cn(
                                        "text-base md:text-lg font-bold tracking-tight z-10",
                                        isSelected ? "text-cyan-900" : "text-slate-600 group-hover:text-slate-900"
                                    )}>
                                        {track.title}
                                    </span>
                                    <div className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center transition-all z-10 shrink-0 shadow-inner",
                                        isSelected ? "bg-cyan-500 border border-cyan-600" : "bg-slate-100 border border-slate-300 group-hover:border-slate-400"
                                    )}>
                                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* 4. Verification & Submit */}
            <div className="pt-6 space-y-6">
                <div className="bg-slate-50/80 border border-slate-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-1">Validation</p>
                            <p className="text-xs font-semibold text-slate-500">Please solve: {num1} + {num2} = ?</p>
                        </div>
                    </div>
                    
                    <input 
                        type="number" 
                        required 
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Answer"
                        className="w-full sm:w-28 bg-white border border-slate-200 shadow-inner focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 text-slate-900 text-center font-bold text-lg rounded-xl py-3 focus:outline-none transition-all"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={loading || !selectedTrack}
                    className="w-full relative overflow-hidden group bg-slate-900 hover:bg-slate-800 text-white font-extrabold tracking-wide py-8 text-xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300"
                >
                    <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-out" />
                    
                    {loading ? (
                        <span className="flex items-center gap-3 z-10 relative">
                            <Loader2 className="w-6 h-6 animate-spin" /> Finalizing Enrollment...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center w-full z-10 relative">
                            Register Now
                            <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform opacity-70" />
                        </span>
                    )}
                </Button>
            </div>
        </form>
    );
}

// Minimal missing user icon fallback
function UserIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}
