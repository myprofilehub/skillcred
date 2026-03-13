"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, BookOpen, Link as LinkIcon, Youtube, FileText, FolderPlus, CheckCircle2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { createAssignmentAction } from "@/app/actions/google-classroom";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface ClassworkTabProps {
    courseId: string;
    content: {
        courseWork: any[];
        topics: any[];
    };
}

export function ClassworkTab({ courseId, content }: ClassworkTabProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [createType, setCreateType] = useState<"ASSIGNMENT" | "MATERIAL">("ASSIGNMENT");
    const router = useRouter();
    const searchParams = useSearchParams();

    // Handle deep links from header
    useEffect(() => {
        const mode = searchParams.get("create_mode");
        if (mode) {
            setIsCreateOpen(true);
            if (mode === "project") {
                setFormData(prev => ({
                    ...prev,
                    topicId: "new",
                    newTopicName: "Projects",
                    title: "[PROJECT] "
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    topicId: "none",
                    title: ""
                }));
            }
            // Clean URL without refresh
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.delete("create_mode");
            router.replace(`?${newParams.toString()}`);
        }
    }, [searchParams, router]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        points: 100,
        topicId: "none",
        newTopicName: "",
        linkUrl: ""
    });

    const topics = content.topics || [];
    const courseWork = content.courseWork || [];

    // Group work by topic
    const workByTopic: Record<string, any[]> = {};
    const noTopicWork: any[] = [];

    courseWork.forEach(work => {
        if (work.topicId) {
            if (!workByTopic[work.topicId]) workByTopic[work.topicId] = [];
            workByTopic[work.topicId].push(work);
        } else {
            noTopicWork.push(work);
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const materials = [];
        if (formData.linkUrl) {
            materials.push({
                link: { url: formData.linkUrl }
            });
        }

        const payload = {
            title: formData.title,
            description: formData.description,
            points: Number(formData.points),
            topicId: formData.topicId === "none" || formData.topicId === "new" ? undefined : formData.topicId,
            newTopicName: formData.topicId === "new" ? formData.newTopicName : undefined,
            materials
        };

        const result = await createAssignmentAction(courseId, payload);

        setLoading(false);
        if (result.success) {
            toast.success("Assignment created!");
            setIsCreateOpen(false);
            setFormData({ title: "", description: "", points: 100, topicId: "none", newTopicName: "", linkUrl: "" });
            router.refresh();
        } else {
            toast.error(result.error || "Failed to create assignment");
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-2xl font-semibold text-primary">Classwork</h3>
                    <p className="text-muted-foreground">Manage assignments and materials</p>
                </div>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <div className="flex gap-2">
                        <DialogTrigger asChild>
                            <Button className="gap-2" onClick={() => setFormData(prev => ({ ...prev, topicId: "none", title: "" }))}>
                                <Plus className="w-4 h-4" /> Create Assignment
                            </Button>
                        </DialogTrigger>
                        <DialogTrigger asChild>
                            <Button variant="secondary" className="gap-2" onClick={() => setFormData(prev => ({ ...prev, topicId: "new", newTopicName: "Projects", title: "[PROJECT] " }))}>
                                <FileText className="w-4 h-4" /> Create Project
                            </Button>
                        </DialogTrigger>
                    </div>
                    <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Create Assignment</DialogTitle>
                            <DialogDescription>
                                Post a new assignment for your students.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Analysis Report"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="desc">Instructions (optional)</Label>
                                <Textarea
                                    id="desc"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Detailed instructions..."
                                    className="min-h-[100px]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="points">Points</Label>
                                    <Input
                                        id="points"
                                        type="number"
                                        value={formData.points}
                                        onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Topic</Label>
                                    <Select
                                        value={formData.topicId}
                                        onValueChange={(val) => setFormData({ ...formData, topicId: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Topic" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">No Topic</SelectItem>
                                            {topics.map((t: any) => (
                                                <SelectItem key={t.topicId} value={t.topicId}>
                                                    {t.name}
                                                </SelectItem>
                                            ))}
                                            <SelectItem value="new">+ Create Topic</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {formData.topicId === "new" && (
                                <div className="grid gap-2 p-3 bg-muted/50 rounded-md border border-dashed border-primary/20">
                                    <Label htmlFor="newTopic" className="text-primary">New Topic Name</Label>
                                    <Input
                                        id="newTopic"
                                        value={formData.newTopicName}
                                        onChange={(e) => setFormData({ ...formData, newTopicName: e.target.value })}
                                        placeholder="e.g. Unit 1: Basics"
                                        autoFocus
                                    />
                                </div>
                            )}

                            <Separator />

                            <div className="space-y-3">
                                <Label className="flex items-center gap-2"><LinkIcon className="w-4 h-4" /> Attach Link (Optional)</Label>
                                <Input
                                    placeholder="https://..."
                                    value={formData.linkUrl}
                                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                                />
                            </div>

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                                <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Assign"}</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {topics.length === 0 && courseWork.length === 0 && (
                <div className="text-center py-12 border rounded-lg border-dashed bg-muted/20">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium">No Classwork Yet</h3>
                    <p className="text-muted-foreground">Create assignments to get started.</p>
                </div>
            )}

            {/* Display Work by Topic */}
            {topics.map((topic: any) => (
                (workByTopic[topic.topicId]?.length || 0) > 0 && (
                    <div key={topic.topicId} className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2 border-primary/20 mt-8">
                            <h2 className="text-2xl font-bold text-primary">{topic.name}</h2>
                        </div>
                        <div className="space-y-2">
                            {workByTopic[topic.topicId].map((work) => (
                                <WorkItem key={work.id} work={work} />
                            ))}
                        </div>
                    </div>
                )
            ))}

            {/* No Topic Work */}
            {noTopicWork.length > 0 && (
                <div className="space-y-4">
                    {topics.length > 0 && <Separator className="my-8" />}
                    <div className="space-y-2">
                        {noTopicWork.map((work) => (
                            <WorkItem key={work.id} work={work} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function WorkItem({ work }: { work: any }) {
    return (
        <a href={work.alternateLink} target="_blank" className="block">
            <div className="flex items-start gap-4 p-4 rounded-lg border border-white/5 bg-white/5 hover:border-primary/40 hover:bg-white/10 transition-all group cursor-pointer">
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{work.title}</h4>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{work.state}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{work.description || "No instructions"}</p>

                    {work.materials?.length > 0 && (
                        <div className="flex gap-2 mt-3">
                            {work.materials.map((m: any, i: number) => {
                                if (m.link) return <span key={i} className="text-xs bg-background/50 px-2 py-1 rounded border flex items-center gap-1"><LinkIcon className="w-3 h-3" /> Link</span>
                                if (m.youtubeVideo) return <span key={i} className="text-xs bg-background/50 px-2 py-1 rounded border flex items-center gap-1"><Youtube className="w-3 h-3" /> Video</span>
                                if (m.driveFile) return <span key={i} className="text-xs bg-background/50 px-2 py-1 rounded border flex items-center gap-1"><FolderPlus className="w-3 h-3" /> File</span>
                                return null;
                            })}
                        </div>
                    )}
                </div>
            </div>
        </a>
    )
}
