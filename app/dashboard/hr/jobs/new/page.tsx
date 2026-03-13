"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, X, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { createJob } from "@/app/actions/job-actions";

export default function NewJobPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState<"FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "CONTRACT">("FULL_TIME");
    const [salary, setSalary] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState("");

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput("");
        }
    };

    const removeSkill = (skill: string) => {
        setSkills(skills.filter((s) => s !== skill));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const result = await createJob({
            title,
            description,
            location,
            type,
            skills,
            salary: salary || undefined,
        });

        setLoading(false);

        if ("error" in result) {
            setError(result.error || null);
        } else {
            router.push("/dashboard/hr/jobs");
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/hr/jobs">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Post a New Job</h1>
                    <p className="text-muted-foreground">
                        Create a job listing visible to all verified students
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Job Details</CardTitle>
                        <CardDescription>
                            Fill in the details for your job posting
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {error && (
                            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title *</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Full Stack Developer"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="type">Job Type *</Label>
                                <Select value={type} onValueChange={(v) => setType(v as any)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="FULL_TIME">Full Time</SelectItem>
                                        <SelectItem value="PART_TIME">Part Time</SelectItem>
                                        <SelectItem value="INTERNSHIP">Internship</SelectItem>
                                        <SelectItem value="CONTRACT">Contract</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location *</Label>
                                <Input
                                    id="location"
                                    placeholder="e.g. Remote, Bengaluru"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="salary">Salary Range (Optional)</Label>
                            <Input
                                id="salary"
                                placeholder="e.g. ₹6-10 LPA"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Job Description *</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the role, responsibilities, and requirements..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={6}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Required Skills</Label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add a skill..."
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addSkill();
                                        }
                                    }}
                                />
                                <Button type="button" variant="outline" onClick={addSkill}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            {skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {skills.map((skill) => (
                                        <Badge
                                            key={skill}
                                            variant="secondary"
                                            className="pl-2 pr-1 py-1 flex items-center gap-1"
                                        >
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => removeSkill(skill)}
                                                className="ml-1 hover:bg-white/20 rounded p-0.5"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                asChild
                            >
                                <Link href="/dashboard/hr/jobs">Cancel</Link>
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                                disabled={loading}
                            >
                                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                Post Job
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
