'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, UploadCloud, CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, Briefcase, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStreams } from '@/app/actions/enrollment';

export function DetailsForm({ onSubmit, loading, initialEmail, initialName }: { onSubmit: (data: FormData) => void, loading: boolean, initialEmail?: string, initialName?: string }) {
    const [streams, setStreams] = useState<any[]>([]);
    const [fetchingStreams, setFetchingStreams] = useState(true);
    
    // Wizard State
    const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
    
    // Form Data State
    const [formData, setFormData] = useState({
        name: initialName || '',
        email: initialEmail || '',
        phone: '',
        city: '',
        college: '',
        year: '',
        experienceLevel: '',
        heardAboutUs: '',
        couponCode: ''
    });

    const [selectedTrack, setSelectedTrack] = useState<string>('');
    const [programDuration, setProgramDuration] = useState<'standard' | 'pat-verified'>('pat-verified');
    const [fileName, setFileName] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        async function fetchStreams() {
            try {
                const data = await getStreams();
                setStreams(data);
            } catch (e) {
                console.error(e);
            } finally {
                setFetchingStreams(false);
            }
        }
        fetchStreams();
    }, []);

    // Pricing Logic
    const getPriceDetails = () => {
        if (!selectedTrack) return null;
        const slug = selectedTrack.toLowerCase();
        
        const TIER_A = ['full-stack', 'ai-ml', 'mobile-development'];
        const TIER_B = ['devops-cloud', 'data-engineering', 'data-science', 'cybersecurity', 'iot-embedded'];
        
        const isTierA = TIER_A.some(s => slug.includes(s));
        
        let pilotBase = 4999;
        let regularBase = 6999;
        let pilotAddon = 2000;
        let regularAddon = 3000;
        
        if (isTierA) {
            pilotBase = 9999;
            regularBase = 14999;
            pilotAddon = 3000;
            regularAddon = 4000;
        } else {
            // Tier B/C
            pilotBase = 6999;
            regularBase = 9999;
            pilotAddon = 2500;
            regularAddon = 3500;
        }
        
        const isUpgrade = programDuration === 'pat-verified';
        const pilotPrice = isUpgrade ? (pilotBase + pilotAddon) : pilotBase;
        const regularPrice = isUpgrade ? (regularBase + regularAddon) : regularBase;
        const deposit = 500;
        
        return {
            regularPrice,
            pilotPrice,
            deposit,
            balance: pilotPrice - deposit,
            isUpgrade
        };
    };

    const priceDetails = getPriceDetails();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            if (e.target.files[0].size > 5 * 1024 * 1024) {
                alert("File size exceeds 5MB limit.");
                e.target.value = '';
                setFileName(null);
                return;
            }
            setFileName(e.target.files[0].name);
        } else {
            setFileName(null);
        }
    };

    const nextStep = () => {
        if (wizardStep === 1) {
            // Testing mode: removed validation check
            setWizardStep(2);
        } else if (wizardStep === 2) {
            if (!selectedTrack) {
                alert("Please select a stream to continue.");
                return;
            }
            setWizardStep(3);
        }
    };

    const prevStep = () => {
        if (wizardStep > 1) setWizardStep((w) => (w - 1) as 1 | 2 | 3);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (wizardStep !== 3) return; // Only submit on step 3
        
        const data = new FormData(e.currentTarget);
        // Ensure manual state fields are appended (especially track)
        data.set('trackSlug', selectedTrack);
        data.set('programDuration', programDuration);
        
        onSubmit(data);
    };

    // UI Helpers
    const getProgramGroup = (slug: string) => {
        if (['full-stack', 'ai-ml', 'mobile-development'].some(s => slug.includes(s))) return "Product Engineering";
        if (['devops-cloud', 'data-engineering', 'data-science'].some(s => slug.includes(s))) return "Data & Platform Engineering";
        return "Embedded & Security Engineering";
    };

    const groupedStreams = streams.reduce((acc, stream) => {
        const group = getProgramGroup(stream.slug);
        if (!acc[group]) acc[group] = [];
        acc[group].push(stream);
        return acc;
    }, {} as Record<string, any[]>);

    const orderedGroups = ["Product Engineering", "Data & Platform Engineering", "Embedded & Security Engineering"];

    return (
        <div className="w-full">
            {/* Wizard Progress */}
            <div className="flex items-center justify-between mb-8 px-2 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full z-0" />
                <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full z-0 transition-all duration-500" 
                    style={{ width: `${(wizardStep - 1) * 50}%` }}
                />
                
                {[
                    { step: 1, label: "Profile" },
                    { step: 2, label: "Program" },
                    { step: 3, label: "Secure Seat" }
                ].map((s) => (
                    <div key={s.step} className="relative z-10 flex flex-col items-center gap-2">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 bg-white",
                            wizardStep === s.step ? "border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]" :
                            wizardStep > s.step ? "bg-amber-500 border-amber-500 text-white" :
                            "border-slate-200 text-slate-400"
                        )}>
                            {wizardStep > s.step ? <CheckCircle2 className="w-5 h-5" /> : s.step}
                        </div>
                        <span className={cn(
                            "text-xs font-semibold uppercase tracking-widest",
                            wizardStep >= s.step ? "text-slate-900" : "text-slate-400"
                        )}>{s.label}</span>
                    </div>
                ))}
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                
                {/* STEP 1: PROFILE */}
                {wizardStep === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-1.5">
                            <h3 className="text-2xl font-black text-slate-900">Tell us about yourself</h3>
                            <p className="text-slate-500 text-sm">We use this to customize your LMS experience and portfolio.</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-bold text-slate-700">Full Name <span className="text-red-500 ml-1">*</span></Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="bg-white border-slate-300 shadow-sm text-slate-900 rounded-xl focus:border-amber-500 focus:ring-amber-500/20 h-12" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-bold text-slate-700">Email <span className="text-red-500 ml-1">*</span></Label>
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="bg-white border-slate-300 shadow-sm text-slate-900 rounded-xl focus:border-amber-500 focus:ring-amber-500/20 h-12" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-bold text-slate-700">Phone Number <span className="text-red-500 ml-1">*</span></Label>
                                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="bg-white border-slate-300 shadow-sm text-slate-900 rounded-xl focus:border-amber-500 focus:ring-amber-500/20 h-12" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-sm font-bold text-slate-700">City <span className="text-red-500 ml-1">*</span></Label>
                                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} className="bg-white border-slate-300 shadow-sm text-slate-900 rounded-xl focus:border-amber-500 focus:ring-amber-500/20 h-12" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="college" className="text-sm font-bold text-slate-700">College / University <span className="text-red-500 ml-1">*</span></Label>
                                <Input id="college" name="college" value={formData.college} onChange={handleInputChange} className="bg-white border-slate-300 shadow-sm text-slate-900 rounded-xl focus:border-amber-500 focus:ring-amber-500/20 h-12" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="year" className="text-sm font-bold text-slate-700">Graduation Year <span className="text-slate-400 font-normal">(Optional)</span></Label>
                                <Input id="year" name="year" type="number" min="1950" max="2035" value={formData.year} onChange={handleInputChange} className="bg-white border-slate-300 shadow-sm text-slate-900 rounded-xl focus:border-amber-500 focus:ring-amber-500/20 h-12" />
                            </div>
                        </div>

                        <div className="border-t border-slate-200 pt-6 grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-bold text-slate-700">Resume Upload <span className="text-slate-400 font-normal">(Optional)</span></Label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-2xl hover:bg-slate-50 hover:border-amber-500/50 transition-all relative h-[140px] group bg-white">
                                    <div className="space-y-1 text-center h-full flex flex-col justify-center">
                                        {fileName ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500" />
                                                <p className="text-sm text-emerald-600 font-bold truncate max-w-[200px]">{fileName}</p>
                                            </div>
                                        ) : (
                                            <>
                                                <UploadCloud className="mx-auto h-8 w-8 text-slate-400 group-hover:text-amber-500 transition-colors" />
                                                <div className="flex text-sm text-slate-500 justify-center mt-2">
                                                    <label htmlFor="resume" className="relative cursor-pointer rounded-md font-bold text-amber-500 hover:text-amber-600 focus-within:outline-none">
                                                        <span>Upload a file</span>
                                                        <input id="resume" name="resume" type="file" accept=".pdf" className="sr-only" onChange={handleFileChange} />
                                                    </label>
                                                </div>
                                                <p className="text-xs text-slate-400 mt-1">PDF up to 5MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="experienceLevel" className="text-sm font-bold text-slate-700">Programming Experience <span className="text-slate-400 font-normal">(Optional)</span></Label>
                                    <select id="experienceLevel" name="experienceLevel" value={formData.experienceLevel} onChange={handleInputChange} className="flex h-12 w-full rounded-xl border border-slate-300 shadow-sm bg-white px-3 py-2 text-sm text-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                                        <option value="">Select Level</option>
                                        <option value="Beginner">Beginner (No prior experience)</option>
                                        <option value="Intermediate">Intermediate (Know basics)</option>
                                        <option value="Advanced">Advanced (Built projects)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="heardAboutUs" className="text-sm font-bold text-slate-700">How did you hear about us? <span className="text-slate-400 font-normal">(Optional)</span></Label>
                                    <select id="heardAboutUs" name="heardAboutUs" value={formData.heardAboutUs} onChange={handleInputChange} className="flex h-12 w-full rounded-xl border border-slate-300 shadow-sm bg-white px-3 py-2 text-sm text-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                                        <option value="">Select Source</option>
                                        <option value="College/University">College/University</option>
                                        <option value="LinkedIn">LinkedIn</option>
                                        <option value="Instagram/Twitter">Social Media</option>
                                        <option value="Friend">Friend / Colleague</option>
                                        <option value="Google">Search Engine</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="button" onClick={nextStep} className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-8 py-6 font-black group">
                                Next Step <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                )}

                {/* STEP 2: PROGRAM SELECTION */}
                {wizardStep === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-1.5 mb-6">
                            <h3 className="text-2xl font-black text-slate-900">Choose your path</h3>
                            <p className="text-slate-500 text-sm">Select a stream and your preferred credential tier.</p>
                        </div>

                        {/* Stream Selection */}
                        <div className="space-y-4">
                            <Label className="text-sm font-bold uppercase tracking-widest text-slate-500">1. Select Stream</Label>
                            {fetchingStreams ? (
                                <div className="flex justify-center p-12 bg-slate-50 rounded-3xl"><Loader2 className="animate-spin text-amber-500 w-8 h-8" /></div>
                            ) : (
                                <div className="space-y-6">
                                    {orderedGroups.map((groupName) => {
                                        const groupStreams = groupedStreams[groupName];
                                        if (!groupStreams || groupStreams.length === 0) return null;
                                        return (
                                            <div key={groupName} className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-px bg-slate-200 flex-1" />
                                                    <span className="text-xs font-bold text-slate-400 px-2">{groupName}</span>
                                                    <div className="h-px bg-slate-200 flex-1" />
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                    {groupStreams.map((track: any) => (
                                                        <button
                                                            key={track.id}
                                                            type="button"
                                                            onClick={() => setSelectedTrack(track.slug)}
                                                            className={cn(
                                                                "text-left p-4 rounded-2xl border transition-all relative overflow-hidden group bg-white",
                                                                selectedTrack === track.slug
                                                                    ? "bg-amber-50 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                                                                    : "border-slate-200 hover:border-amber-500/50 hover:bg-slate-50"
                                                            )}
                                                        >
                                                            {selectedTrack === track.slug && (
                                                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                                            )}
                                                            <p className={cn(
                                                                "font-bold text-sm leading-tight transition-colors",
                                                                selectedTrack === track.slug ? "text-amber-600" : "text-slate-700 group-hover:text-amber-600"
                                                            )}>{track.title}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Pricing Tier Selection */}
                        <div className="space-y-4 pt-6">
                            <Label className="text-sm font-bold uppercase tracking-widest text-slate-500">2. Select Credential Type</Label>
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Standard Card */}
                                <div 
                                    onClick={() => setProgramDuration('standard')}
                                    className={cn(
                                        "cursor-pointer rounded-3xl p-6 border-2 transition-all relative bg-white",
                                        programDuration === 'standard' 
                                            ? "border-emerald-500 bg-emerald-50" 
                                            : "border-slate-200 hover:border-emerald-500/30"
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-black text-xl mb-1 text-slate-900">Standard</h4>
                                            <p className="text-xs text-slate-500">Foundation Training</p>
                                        </div>
                                        <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center", programDuration === 'standard' ? "border-emerald-500 bg-emerald-500" : "border-slate-300")}>
                                            {programDuration === 'standard' && <CheckCircle2 className="w-4 h-4 text-white" />}
                                        </div>
                                    </div>
                                    <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
                                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Live Mentorship</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Project Building</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Lifetime LMS Access</li>
                                    </ul>
                                </div>

                                {/* PAT-Verified Card */}
                                <div 
                                    onClick={() => setProgramDuration('pat-verified')}
                                    className={cn(
                                        "cursor-pointer rounded-3xl p-6 border-2 transition-all relative overflow-hidden bg-white",
                                        programDuration === 'pat-verified' 
                                            ? "border-amber-500 bg-amber-50 shadow-[0_0_30px_rgba(245,158,11,0.1)]" 
                                            : "border-slate-200 hover:border-amber-500/30"
                                    )}
                                >
                                    <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                                        Recommended
                                    </div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-black text-xl mb-1 text-amber-600">PAT-Verified</h4>
                                            <p className="text-xs text-slate-500">Portfolio + Live Defense</p>
                                        </div>
                                        <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center", programDuration === 'pat-verified' ? "border-amber-500 bg-amber-500" : "border-slate-300")}>
                                            {programDuration === 'pat-verified' && <CheckCircle2 className="w-4 h-4 text-white" />}
                                        </div>
                                    </div>
                                    <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
                                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Everything in Standard</li>
                                        <li className="flex items-center gap-2 text-slate-900 font-medium"><ShieldCheck className="w-4 h-4 text-amber-500" /> Live Project Defense (PAT)</li>
                                        <li className="flex items-center gap-2 text-slate-900 font-medium"><Briefcase className="w-4 h-4 text-amber-500" /> HR Fast-Track Public Profile</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between pt-6 border-t border-slate-200">
                            <Button type="button" variant="ghost" onClick={prevStep} className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl px-6">
                                <ChevronLeft className="w-5 h-5 mr-1" /> Back
                            </Button>
                            <Button type="button" onClick={nextStep} className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-8 py-6 font-black group">
                                Next Step <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                )}

                {/* STEP 3: PAYMENT / SECURE SEAT */}
                {wizardStep === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-1.5 mb-6 text-center">
                            <h3 className="text-3xl font-black text-slate-900">Secure Your Seat</h3>
                            <p className="text-slate-500 text-sm">Review your selection and pay the refundable deposit to lock in your spot.</p>
                        </div>

                        {priceDetails && (
                            <div className="max-w-md mx-auto">
                                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 relative overflow-hidden mb-6">
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/20 blur-3xl rounded-full" />
                                    
                                    <div className="mb-6">
                                        <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">
                                            {programDuration === 'pat-verified' ? 'PAT-Verified Credential' : 'Standard Program'}
                                        </div>
                                        <h4 className="text-xl font-black text-slate-900 capitalize">
                                            {selectedTrack.replace(/-/g, ' ')}
                                        </h4>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between items-center text-sm text-slate-700">
                                            <span>Total Tuition</span>
                                            <span className="font-bold text-lg text-slate-900">₹{priceDetails.pilotPrice.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm text-slate-500">
                                            <span>Regular Price</span>
                                            <span className="line-through text-xs">₹{priceDetails.regularPrice.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>

                                    <div className="h-px bg-slate-200 w-full my-6" />

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-slate-900">
                                            <div className="flex items-center gap-2">
                                                <Lock className="w-5 h-5 text-emerald-500" />
                                                <span className="font-bold">Lock-in Deposit</span>
                                            </div>
                                            <span className="font-black text-2xl text-emerald-600">₹{priceDetails.deposit}</span>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                                            This deposit guarantees your seat in the upcoming cohort and is deducted from your total tuition. <strong className="text-slate-900">Fully refundable within 7 days</strong> if you change your mind.
                                        </p>
                                    </div>
                                    
                                    <div className="mt-4 flex justify-between items-center text-xs text-slate-600">
                                        <span>Balance due before cohort starts:</span>
                                        <span className="font-bold text-slate-900">₹{priceDetails.balance.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <Label htmlFor="couponCode" className="text-xs font-bold uppercase tracking-widest text-slate-500">Promo Code (Optional)</Label>
                                    <Input 
                                        id="couponCode" 
                                        name="couponCode"
                                        value={formData.couponCode}
                                        onChange={handleInputChange}
                                        className="bg-white border-slate-200 rounded-xl h-12 focus:border-amber-500 focus:ring-amber-500/20 text-slate-900"
                                        placeholder="Enter code"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <Button type="button" variant="ghost" onClick={prevStep} className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl h-14 sm:w-auto w-full">
                                        <ChevronLeft className="w-5 h-5 mr-1" /> Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black h-14 rounded-xl shadow-lg shadow-emerald-500/25 hover:scale-[1.02] transition-all"
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                                            </div>
                                        ) : (
                                            <>Pay ₹500 Deposit Securely <Lock className="w-4 h-4 ml-2 opacity-50" /></>
                                        )}
                                    </Button>
                                </div>
                                <div className="mt-4 text-center flex items-center justify-center gap-2 text-xs text-slate-400">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500/50" /> Secure 256-bit encrypted checkout
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
}
