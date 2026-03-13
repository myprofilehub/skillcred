"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Upload, Lock, ExternalLink, Globe, Save, Wand2 } from "lucide-react";
import { generatePortfolioFromResume, updatePortfolio, syncPortfolioWithGithub, generatePortfolioFromStoredResume, checkGithubStatus } from "@/app/actions/portfolio";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Github, Link } from "lucide-react";
import { signIn } from "next-auth/react";

interface PortfolioClientProps {
    portfolio: any;
    isUnlocked: boolean;
    studentName: string;
}

export default function PortfolioClient({ portfolio, isUnlocked, studentName }: PortfolioClientProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isGithubLinked, setIsGithubLinked] = useState(false);

    // Initial Check
    // Initial Check
    useEffect(() => {
        checkGithubStatus().then(res => setIsGithubLinked(res.isLinked));
    }, []);

    // Form State
    const [formData, setFormData] = useState({
        headline: portfolio?.headline || "",
        bio: portfolio?.bio || "",
        skills: portfolio?.skills?.join(", ") || "",
        publicSlug: portfolio?.publicSlug || "",
        isPublic: portfolio?.isPublic || false,
        linkedinUrl: portfolio?.linkedinUrl || "",
        githubUrl: portfolio?.githubUrl || "",
    });

    // Handle Resume Upload
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const data = new FormData();
        data.append("resume", file);

        try {
            const result = await generatePortfolioFromResume(data);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Portfolio generated from resume!");
                // Refresh or update state? RevalidatePath in action handles refresh usually.
                // But client state might need update if we stay on page.
                window.location.reload();
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsUploading(false);
        }
    };

    // Handle Save
    const handleSave = async () => {
        setIsSaving(true);
        try {
            const skillsArray = formData.skills.split(",").map((s: string) => s.trim()).filter(Boolean);
            const result = await updatePortfolio({
                ...formData,
                skills: skillsArray,
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Portfolio updated successfully!");
                setEditMode(false);
            }
        } catch (error) {
            toast.error("Failed to save changes");
        } finally {
            setIsSaving(false);
        }
    };

    const handleGithubSync = async () => {
        setIsSaving(true);
        try {
            toast.info("Syncing with GitHub...");
            const result = await syncPortfolioWithGithub();
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Synced with GitHub successfully!");
                window.location.reload();
            }
        } catch (error) {
            toast.error("Failed to sync with GitHub");
        } finally {
            setIsSaving(false);
        }
    };

    const handleResumeGen = async () => {
        setIsSaving(true);
        try {
            toast.info("Generating portfolio from stored resume...");
            const result = await generatePortfolioFromStoredResume();
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Portfolio generated from resume!");
                window.location.reload();
            }
        } catch (error) {
            toast.error("Failed to generate from resume");
        } finally {
            setIsSaving(false);
        }
    };

    if (!isUnlocked) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <Lock className="w-12 h-12 text-muted-foreground/50" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold font-heading">Portfolio Locked</h2>
                    <p className="text-muted-foreground max-w-md mt-2">
                        Complete your Pre-Assessment Test (PAT) to unlock your professional portfolio builder and showcase your work to the world.
                    </p>
                </div>
                <Button variant="outline" className="gap-2">
                    Take Assessment (Mock)
                </Button>
            </div>
        );
    }

    if (!portfolio || (!portfolio.headline && !portfolio.bio)) {
        return (
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold font-heading bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                        Build Your Professional Portfolio
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Upload your resume and let our AI create a stunning portfolio for you in seconds.
                    </p>
                </div>

                <Card className="border-dashed border-2 border-primary/20 bg-primary/5">
                    <CardContent className="flex flex-col items-center justify-center p-12 space-y-6">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                            <Wand2 className="w-10 h-10 text-primary" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold">AI Resume Parser</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                We'll extract your skills, experience, and projects automatically.
                            </p>
                        </div>
                        <div className="relative">
                            <Input
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                id="resume-upload"
                                onChange={handleUpload}
                                disabled={isUploading}
                            />
                            <Label htmlFor="resume-upload">
                                <Button className="gap-2" size="lg" disabled={isUploading} asChild>
                                    <span>
                                        {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                        {isUploading ? "Analysing..." : "Upload Resume (PDF)"}
                                    </span>
                                </Button>
                            </Label>
                        </div>
                        <p className="text-xs text-muted-foreground">Supported formats: PDF (Max 5MB)</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading">My Portfolio</h1>
                    <p className="text-muted-foreground">Manage your public profile and projects</p>
                </div>
                <div className="flex items-center gap-4">
                    {portfolio.isPublic && portfolio.publicSlug && (
                        <Button variant="outline" className="gap-2" asChild>
                            <a href={`/portfolio/${portfolio.publicSlug}`} target="_blank">
                                <Globe className="w-4 h-4" /> View Public
                            </a>
                        </Button>
                    )}

                    {isGithubLinked ? (
                        <Button variant="outline" size="sm" onClick={handleGithubSync} disabled={isSaving} className="gap-2">
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Github className="w-4 h-4" />}
                            Sync GitHub
                        </Button>
                    ) : (
                        <Button variant="outline" size="sm" onClick={() => signIn("github")} className="gap-2">
                            <Link className="w-4 h-4" />
                            Link GitHub
                        </Button>
                    )}

                    <Button variant="outline" size="sm" onClick={handleResumeGen} disabled={isSaving} className="gap-2">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                        Auto-Fill
                    </Button>
                    <Button onClick={() => editMode ? handleSave() : setEditMode(true)} disabled={isSaving}>
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : editMode ? <Save className="w-4 h-4 mr-2" /> : null}
                        {editMode ? "Save Changes" : "Edit Portfolio"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                            <CardTitle>About Me</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Professional Headline</Label>
                                {editMode ? (
                                    <Input
                                        value={formData.headline}
                                        onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                                        placeholder="e.g. Full Stack Developer"
                                    />
                                ) : (
                                    <p className="text-lg font-medium">{formData.headline || "Not set"}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label>Bio</Label>
                                {editMode ? (
                                    <Textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        rows={4}
                                    />
                                ) : (
                                    <p className="text-muted-foreground">{formData.bio || "No bio added yet."}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Projects */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Projects</h2>
                        {portfolio.projects?.map((project: any) => (
                            <Card key={project.id} className="bg-white/5 border-white/10">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold">{project.title}</h3>
                                            <div className="flex flex-wrap gap-2 mt-2 mb-3">
                                                {project.skills?.map((skill: string) => (
                                                    <Badge key={skill} variant="secondary" className="text-xs">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <p className="text-muted-foreground text-sm">{project.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Experience (Read only for now in UI, but editable in future) */}
                    {portfolio.experience && Array.isArray(portfolio.experience) && portfolio.experience.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold">Experience</h2>
                            {portfolio.experience.map((exp: any, i: number) => (
                                <Card key={i} className="bg-white/5 border-white/10">
                                    <CardContent className="p-6">
                                        <h3 className="font-bold">{exp.title}</h3>
                                        <p className="text-sm text-primary">{exp.company}</p>
                                        <p className="text-xs text-muted-foreground mt-1 mb-2">
                                            {exp.startDate} - {exp.endDate}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                            <CardTitle>Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {editMode ? (
                                <Textarea
                                    value={formData.skills}
                                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                    placeholder="Comma separated skills"
                                />
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {formData.skills.split(",").map((s: string) => s.trim()).filter(Boolean).map((skill: string) => (
                                        <Badge key={skill} variant="outline" className="bg-primary/5">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                            <CardTitle>Visibility</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Public Profile</Label>
                                <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${formData.isPublic ? "bg-primary" : "bg-white/20"}`} onClick={() => editMode && setFormData({ ...formData, isPublic: !formData.isPublic })}>
                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${formData.isPublic ? "translate-x-4" : ""}`} />
                                </div>
                            </div>
                            {formData.isPublic && (
                                <div className="space-y-2">
                                    <Label>Public Slug</Label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">skillcred.com/portfolio/</span>
                                        <Input
                                            value={formData.publicSlug}
                                            onChange={(e) => setFormData({ ...formData, publicSlug: e.target.value })}
                                            disabled={!editMode}
                                            className="h-8"
                                        />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                            <CardTitle>Social Links</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>LinkedIn</Label>
                                <Input
                                    value={formData.linkedinUrl}
                                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                                    disabled={!editMode}
                                    placeholder="https://linkedin.com/in/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>GitHub</Label>
                                <Input
                                    value={formData.githubUrl}
                                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                    disabled={!editMode}
                                    placeholder="https://github.com/..."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
