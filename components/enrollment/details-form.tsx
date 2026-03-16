'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, UploadCloud, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStreams } from '@/app/actions/enrollment';

export function DetailsForm({ onSubmit, loading, initialEmail, initialName }: { onSubmit: (data: FormData) => void, loading: boolean, initialEmail?: string, initialName?: string }) {
    const [streams, setStreams] = useState<any[]>([]);
    const [fetchingStreams, setFetchingStreams] = useState(true);
    const [selectedTrack, setSelectedTrack] = useState<string>('');
    const [programDuration, setProgramDuration] = useState<string>('');
    const [couponCode, setCouponCode] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null);

    // Dynamic Price Calculation
    const getPriceDetails = () => {
        if (!selectedTrack || !programDuration) return null;
        
        const trackObj = streams.find(t => t.slug === selectedTrack);
        if (!trackObj) return null;
        
        const slug = trackObj.slug.toLowerCase();
        const TIER_1_SLUGS = ['ai', 'machine-learning', 'cyber', 'data-engineering'];
        const TIER_2_SLUGS = ['full-stack', 'devops', 'cloud', 'data-science', 'analytics'];
        
        const isTier1 = TIER_1_SLUGS.some(s => slug.includes(s));
        const isTier2 = TIER_2_SLUGS.some(s => slug.includes(s));
        
        let basePrice = 9999;
        if (programDuration === '2-week') basePrice = 3499;
        else if (programDuration === '4-week') {
            if (isTier1) basePrice = 7999;
            else if (isTier2) basePrice = 6499;
            else basePrice = 4999;
        } else {
            if (isTier1) basePrice = 14999;
            else if (isTier2) basePrice = 11999;
            else basePrice = 9999;
        }

        let finalPrice = basePrice;
        let appliedBooster = null;

        if (couponCode.replace(/\s/g, '').toUpperCase() === 'COLLEGEPARTNER' && programDuration === '8-week') {
            finalPrice = 7999;
            appliedBooster = 'College Partner Flat Rate';
        } else if (programDuration !== '2-week') {
            // Assume Early Bird applies for frontend UI preview (backend verifies actual count)
            finalPrice = Math.floor(basePrice * 0.8);
            appliedBooster = 'Early Bird 20% Off!';
        }

        return { basePrice, finalPrice, appliedBooster, discount: basePrice - finalPrice };
    };

    // Some state for the file upload UI
    const [fileName, setFileName] = useState<string | null>(null);

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedTrack) {
            alert('Please select a stream to continue');
            return;
        }

        const formData = new FormData(e.currentTarget);
        formData.append('trackSlug', selectedTrack);
        onSubmit(formData);
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

    const priceDetails = getPriceDetails();

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            {/* ... Rest of the form ... */}
            {/* Personal Info */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-400 border-b border-white/10 pb-2">1. Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" name="name" required defaultValue={initialName || ''} className="bg-slate-800 border-slate-700 text-white" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" name="email" type="email" required defaultValue={initialEmail || ''} className="bg-slate-800 border-slate-700 text-white" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" name="phone" required className="bg-slate-800 border-slate-700" placeholder="+91 9876543210" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">City (Optional)</Label>
                        <Input id="city" name="city" className="bg-slate-800 border-slate-700" placeholder="e.g. Bangalore" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="college">College / University (Optional)</Label>
                        <Input id="college" name="college" className="bg-slate-800 border-slate-700" placeholder="e.g. MIT" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="year">Graduation Year (Optional)</Label>
                        <Input id="year" name="year" type="number" min="1950" max="2035" className="bg-slate-800 border-slate-700 text-white" placeholder="e.g. 2025" />
                    </div>
                </div>
            </div>

            {/* Resume & Preferences */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-400 border-b border-white/10 pb-2">2. Profile & Preferences</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Resume Upload (Optional)</Label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-700 border-dashed rounded-md hover:bg-slate-800/50 transition-colors relative h-[140px]">
                            <div className="space-y-1 text-center h-full flex flex-col justify-center">
                                {fileName ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <CheckCircle2 className="mx-auto h-8 w-8 text-green-400" />
                                        <p className="text-sm text-green-400 font-medium truncate max-w-[200px]">{fileName}</p>
                                    </div>
                                ) : (
                                    <>
                                        <UploadCloud className="mx-auto h-8 w-8 text-slate-400" />
                                        <div className="flex text-sm text-slate-400 justify-center">
                                            <label htmlFor="resume" className="relative cursor-pointer bg-transparent rounded-md font-medium text-cyan-400 hover:text-cyan-300 focus-within:outline-none">
                                                <span>Upload a file</span>
                                                <input id="resume" name="resume" type="file" accept=".pdf" className="sr-only" onChange={handleFileChange} />
                                            </label>
                                        </div>
                                        <p className="text-xs text-slate-500">PDF up to 5MB</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="experienceLevel">Programming Experience (Optional)</Label>
                            <select id="experienceLevel" name="experienceLevel" className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white">
                                <option value="">Select Level</option>
                                <option value="Beginner">Beginner (No prior experience)</option>
                                <option value="Intermediate">Intermediate (Know basics)</option>
                                <option value="Advanced">Advanced (Built projects)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="heardAboutUs">How did you hear about us? (Optional)</Label>
                            <select id="heardAboutUs" name="heardAboutUs" className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white">
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
            </div>

            {/* Choose Program */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-400 border-b border-white/10 pb-2">3. Choose Your Program</h3>
                
                <div className="space-y-3 mb-6">
                    <Label htmlFor="programDuration">Program Duration *</Label>
                    <select 
                        id="programDuration" 
                        name="programDuration" 
                        value={programDuration}
                        onChange={(e) => setProgramDuration(e.target.value)}
                        required 
                        className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
                    >
                        <option value="">Select Duration</option>
                        <option value="2-week">2-Week Capstone Project Only (Fast-Track)</option>
                        <option value="4-week">4-Week Accelerated Program</option>
                        <option value="8-week">8-Week Standard Program (Recommended)</option>
                    </select>
                </div>

                <div className="space-y-3 mb-6">
                    <Label htmlFor="couponCode">Partner / Promo Code (Optional)</Label>
                    <Input 
                        id="couponCode" 
                        name="couponCode"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                    />
                </div>

                <div className="space-y-3">
                    <Label>Select Stream *</Label>
                    {fetchingStreams ? (
                    <div className="flex justify-center p-8"><Loader2 className="animate-spin text-cyan-400" /></div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {streams.map((track) => (
                            <div
                                key={track.id}
                                onClick={() => setSelectedTrack(track.slug)}
                                className={cn(
                                    "cursor-pointer p-4 rounded-xl border transition-all text-center group flex items-center justify-center min-h-[80px]",
                                    selectedTrack === track.slug
                                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                                        : "bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600"
                                )}
                            >
                                <div className="font-medium text-sm md:text-base leading-tight">{track.title}</div>
                            </div>
                        ))}
                    </div>
                )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-white/5">
                <Button
                    type="submit"
                    disabled={loading || !selectedTrack}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                        </div>
                    ) : (
                        "Proceed to Payment"
                    )}
                </Button>
            </div>
        </form>
    );
}
