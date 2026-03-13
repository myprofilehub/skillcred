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
    const formRef = useRef<HTMLFormElement>(null);

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

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-400 border-b border-white/10 pb-2">1. Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input disabled value={initialName || ''} className="bg-slate-800/50 border-slate-700 text-slate-400" />
                    </div>
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input disabled value={initialEmail || ''} className="bg-slate-800/50 border-slate-700 text-slate-400" />
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
                        <select id="year" name="year" className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white">
                            <option value="">Select Year</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028 or later</option>
                            <option value="Graduated">Already Graduated</option>
                        </select>
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

            {/* Choose Stream */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-400 border-b border-white/10 pb-2">3. Choose Your Stream</h3>
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
