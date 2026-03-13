"use client";

import { useState, useEffect } from "react";
import { getInvestorProfile, updateInvestorProfile } from "@/app/actions/investor-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Pencil, Save, X, Building2, Briefcase, Linkedin, Globe, Target, Wallet, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function InvestorProfilePage() {
    const [investor, setInvestor] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        company: "",
        position: "",
        bio: "",
        focusAreas: "",
        investmentRange: "",
        portfolioUrl: "",
        linkedinUrl: ""
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const result = await getInvestorProfile();
        if (result.investor) {
            setInvestor(result.investor);
            setFormData({
                company: result.investor.company || "",
                position: result.investor.position || "",
                bio: result.investor.bio || "",
                focusAreas: result.investor.focusAreas?.join(", ") || "",
                investmentRange: result.investor.investmentRange || "",
                portfolioUrl: result.investor.portfolioUrl || "",
                linkedinUrl: result.investor.linkedinUrl || ""
            });
        }
        setIsLoading(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        const result = await updateInvestorProfile(formData);
        if (result.success) {
            toast.success("Profile updated successfully");
            setIsEditing(false);
            loadProfile();
        } else {
            toast.error(result.error || "Failed to update profile");
        }
        setIsSaving(false);
    };

    if (isLoading) {
        return <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-amber-400" /></div>;
    }

    if (!investor) {
        return <div className="p-12 text-center text-neutral-400">Failed to load profile.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-7 h-7 text-amber-400" />
                        My Profile
                    </h1>
                    <p className="text-neutral-400">Manage your investor profile and public visibility</p>
                </div>
                <Button
                    variant={isEditing ? "outline" : "default"}
                    onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                    className={isEditing
                        ? "border-amber-500/20 text-neutral-300 hover:text-amber-300 hover:bg-amber-500/10"
                        : "bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-500/20"
                    }
                >
                    {isEditing ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Pencil className="mr-2 h-4 w-4" /> Edit Profile</>}
                </Button>
            </div>

            <Card className="bg-neutral-900/80 border-amber-500/10 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white">Basic Information</CardTitle>
                    <CardDescription className="text-neutral-500">Your public profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="company" className="text-neutral-300">Company / Firm</Label>
                            {isEditing ? (
                                <Input id="company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="bg-neutral-800 border-amber-500/20 text-white" />
                            ) : (
                                <div className="flex items-center gap-2 p-3 bg-neutral-800/50 rounded-md border border-neutral-800">
                                    <Building2 className="h-4 w-4 text-amber-400" />
                                    <span className="font-medium text-white">{investor.company}</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="position" className="text-neutral-300">Position / Role</Label>
                            {isEditing ? (
                                <Input id="position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="bg-neutral-800 border-amber-500/20 text-white" />
                            ) : (
                                <div className="flex items-center gap-2 p-3 bg-neutral-800/50 rounded-md border border-neutral-800">
                                    <Briefcase className="h-4 w-4 text-amber-400" />
                                    <span className="font-medium text-white">{investor.position}</span>
                                </div>
                            )}
                        </div>

                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <Label htmlFor="bio" className="text-neutral-300">Bio</Label>
                            {isEditing ? (
                                <Textarea id="bio" className="min-h-[100px] bg-neutral-800 border-amber-500/20 text-white" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
                            ) : (
                                <div className="p-3 bg-neutral-800/50 rounded-md border border-neutral-800">
                                    {investor.bio ? <span className="text-neutral-300">{investor.bio}</span> : <span className="text-neutral-600 italic">No bio added.</span>}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-neutral-900/80 border-amber-500/10 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white">Investment Criteria</CardTitle>
                    <CardDescription className="text-neutral-500">What you are looking for</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <Label htmlFor="focusAreas" className="text-neutral-300">Focus Areas (comma separated)</Label>
                            {isEditing ? (
                                <Input id="focusAreas" placeholder="e.g. AI, SaaS, Fintech" value={formData.focusAreas} onChange={(e) => setFormData({ ...formData, focusAreas: e.target.value })} className="bg-neutral-800 border-amber-500/20 text-white placeholder:text-neutral-500" />
                            ) : (
                                <div className="flex flex-wrap gap-2 p-2 min-h-[42px]">
                                    {investor.focusAreas && investor.focusAreas.length > 0 ? (
                                        investor.focusAreas.map((area: string) => (
                                            <Badge key={area} className="bg-amber-500/15 text-amber-400 border-amber-500/20">
                                                <Target className="mr-1 h-3 w-3" /> {area}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-neutral-600 italic">No focus areas specified.</span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="investmentRange" className="text-neutral-300">Investment Range</Label>
                            {isEditing ? (
                                <Input id="investmentRange" placeholder="e.g. $10k - $50k" value={formData.investmentRange} onChange={(e) => setFormData({ ...formData, investmentRange: e.target.value })} className="bg-neutral-800 border-amber-500/20 text-white placeholder:text-neutral-500" />
                            ) : (
                                <div className="flex items-center gap-2 p-3 bg-neutral-800/50 rounded-md border border-neutral-800">
                                    <Wallet className="h-4 w-4 text-amber-400" />
                                    <span className="text-neutral-300">{investor.investmentRange || "Not specified"}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-neutral-900/80 border-amber-500/10 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white">Social & Links</CardTitle>
                    <CardDescription className="text-neutral-500">Where founders can find you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="linkedinUrl" className="text-neutral-300">LinkedIn URL</Label>
                            {isEditing ? (
                                <Input id="linkedinUrl" value={formData.linkedinUrl} onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })} className="bg-neutral-800 border-amber-500/20 text-white" />
                            ) : (
                                <div className="flex items-center gap-2 p-3 bg-neutral-800/50 rounded-md border border-neutral-800 overflow-hidden text-ellipsis">
                                    <Linkedin className="h-4 w-4 text-amber-400" />
                                    {investor.linkedinUrl ? (
                                        <Link href={investor.linkedinUrl} target="_blank" className="hover:underline text-amber-400">
                                            {investor.linkedinUrl}
                                        </Link>
                                    ) : (
                                        <span className="text-neutral-600 italic">Not added</span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="portfolioUrl" className="text-neutral-300">Portfolio / Website</Label>
                            {isEditing ? (
                                <Input id="portfolioUrl" value={formData.portfolioUrl} onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })} className="bg-neutral-800 border-amber-500/20 text-white" />
                            ) : (
                                <div className="flex items-center gap-2 p-3 bg-neutral-800/50 rounded-md border border-neutral-800 overflow-hidden text-ellipsis">
                                    <Globe className="h-4 w-4 text-amber-400" />
                                    {investor.portfolioUrl ? (
                                        <Link href={investor.portfolioUrl} target="_blank" className="hover:underline text-amber-400">
                                            {investor.portfolioUrl}
                                        </Link>
                                    ) : (
                                        <span className="text-neutral-600 italic">Not added</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex justify-end pt-4">
                            <Button onClick={handleSave} disabled={isSaving} className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-500/20">
                                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
