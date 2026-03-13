"use client";

import { useState, useEffect } from "react";
import { getProjectCatalog, addProjectToCatalog, updateCatalogProject, deleteCatalogProject } from "@/app/actions/curriculum-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Loader2, Star, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Stream {
    id: string;
    title: string;
    slug: string;
    _count?: {
        catalogProjects: number;
    };
}

interface Project {
    id: string;
    name: string;
    tagline: string;
    description: string | null;
    difficulty: number;
    coreFeatures: string[];
    startupAngle: string | null;
    isActive: boolean;
    addedBy: string | null;
}

export function CurriculumManager({ streams, userRole }: { streams: Stream[], userRole: "ADMIN" | "MENTOR" }) {
    const [selectedStreamSlug, setSelectedStreamSlug] = useState<string>(streams[0]?.slug || "");
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);

    // Modal State
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        tagline: "",
        description: "",
        difficulty: 2,
        coreFeatures: "", // split by newline
        startupAngle: "",
        isActive: true
    });

    useEffect(() => {
        if (selectedStreamSlug) {
            fetchProjects();
        }
    }, [selectedStreamSlug]);

    async function fetchProjects() {
        setLoading(true);
        const result = await getProjectCatalog(selectedStreamSlug);
        if (result.projects) {
            setProjects(result.projects as Project[]);
        }
        setLoading(false);
    }

    // Handlers
    function handleEditClick(project: Project) {
        setCurrentProject(project);
        setFormData({
            name: project.name,
            tagline: project.tagline,
            description: project.description || "",
            difficulty: project.difficulty,
            coreFeatures: project.coreFeatures.join("\n"),
            startupAngle: project.startupAngle || "",
            isActive: project.isActive
        });
        setIsEditOpen(true);
    }

    function resetForm() {
        setFormData({
            name: "",
            tagline: "",
            description: "",
            difficulty: 2,
            coreFeatures: "",
            startupAngle: "",
            isActive: true
        });
    }

    async function handleAddSubmit() {
        if (!formData.name || !formData.tagline) {
            toast.error("Name and Tagline are required");
            return;
        }

        const track = streams.find(s => s.slug === selectedStreamSlug);
        if (!track) return;

        const result = await addProjectToCatalog({
            trackId: track.id,
            name: formData.name,
            tagline: formData.tagline,
            description: formData.description,
            difficulty: Number(formData.difficulty),
            coreFeatures: formData.coreFeatures.split("\n").filter(f => f.trim() !== ""),
            startupAngle: formData.startupAngle,
        });

        if (result.success) {
            toast.success("Project added successfully");
            setIsAddOpen(false);
            resetForm();
            fetchProjects();
        } else {
            toast.error(result.error || "Failed to add project");
        }
    }

    async function handleEditSubmit() {
        if (!currentProject) return;

        const result = await updateCatalogProject(currentProject.id, {
            name: formData.name,
            tagline: formData.tagline,
            description: formData.description,
            difficulty: Number(formData.difficulty),
            coreFeatures: formData.coreFeatures.split("\n").filter(f => f.trim() !== ""),
            startupAngle: formData.startupAngle,
            isActive: formData.isActive
        });

        if (result.success) {
            toast.success("Project updated successfully");
            setIsEditOpen(false);
            setCurrentProject(null);
            fetchProjects();
        } else {
            toast.error(result.error || "Failed to update project");
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;

        const result = await deleteCatalogProject(id);
        if (result.success) {
            toast.success("Project deleted");
            fetchProjects();
        } else {
            toast.error(result.error || "Failed to delete project");
        }
    }

    async function handleToggleActive(project: Project) {
        const result = await updateCatalogProject(project.id, { isActive: !project.isActive });
        if (result.success) {
            fetchProjects(); // Optimistic update would be better but simple reload is safe
            toast.success(`Project ${!project.isActive ? 'activated' : 'deactivated'}`);
        }
    }

    return (
        <div className="space-y-6">
            {/* Stream Selector */}
            <Tabs defaultValue={selectedStreamSlug} onValueChange={setSelectedStreamSlug} className="w-full">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Project Catalog</h2>
                    <Button onClick={() => { resetForm(); setIsAddOpen(true); }} className="bg-cyan-600 hover:bg-cyan-700">
                        <Plus className="w-4 h-4 mr-2" /> Add Project
                    </Button>
                </div>

                <TabsList className="w-full bg-slate-900 border border-slate-800 p-1 flex overflow-x-auto justify-start h-auto">
                    {streams.map(stream => (
                        <TabsTrigger
                            key={stream.id}
                            value={stream.slug}
                            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white px-3 py-2 text-sm"
                        >
                            {stream.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            {/* Project List */}
            <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-950">
                            <TableRow className="hover:bg-transparent border-slate-800">
                                <TableHead className="text-slate-400">Project Name</TableHead>
                                <TableHead className="text-slate-400">Difficulty</TableHead>
                                <TableHead className="text-slate-400">Features</TableHead>
                                <TableHead className="text-slate-400">Status</TableHead>
                                <TableHead className="text-right text-slate-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                                        <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                                        Loading projects...
                                    </TableCell>
                                </TableRow>
                            ) : projects.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                                        No projects found for this stream. Add one to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                projects.map(project => (
                                    <TableRow key={project.id} className="border-slate-800 hover:bg-slate-800/50">
                                        <TableCell>
                                            <div className="font-medium text-white">{project.name}</div>
                                            <div className="text-xs text-slate-400 truncate max-w-[200px]">{project.tagline}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex">
                                                {[...Array(project.difficulty)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                ))}
                                                {[...Array(3 - project.difficulty)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-slate-700" />
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-xs border-slate-700 text-slate-300">
                                                {project.coreFeatures.length} features
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={project.isActive}
                                                onCheckedChange={() => handleToggleActive(project)}
                                            />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleEditClick(project)}>
                                                    <Pencil className="w-4 h-4 text-slate-400 hover:text-white" />
                                                </Button>
                                                {userRole === "ADMIN" && (
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                                                        <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Add/Edit Modal */}
            <Dialog open={isAddOpen || isEditOpen} onOpenChange={(open) => { if (!open) { setIsAddOpen(false); setIsEditOpen(false); } }}>
                <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{isAddOpen ? "Add New Project" : "Edit Project"}</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Project Name</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g., ShopSync"
                                    className="bg-slate-950 border-slate-800 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Difficulty (1-3)</Label>
                                <Select
                                    value={String(formData.difficulty)}
                                    onValueChange={(val) => setFormData({ ...formData, difficulty: Number(val) })}
                                >
                                    <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                                        <SelectValue placeholder="Select difficulty" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                        <SelectItem value="1">⭐ Beginner</SelectItem>
                                        <SelectItem value="2">⭐⭐ Intermediate</SelectItem>
                                        <SelectItem value="3">⭐⭐⭐ Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Tagline (One-Liner)</Label>
                            <Input
                                value={formData.tagline}
                                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                placeholder="e.g., Multi-vendor e-commerce marketplace"
                                className="bg-slate-950 border-slate-800 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Detailed description..."
                                className="bg-slate-950 border-slate-800 text-white min-h-[80px]"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Core Features (One per line)</Label>
                                <Textarea
                                    value={formData.coreFeatures}
                                    onChange={(e) => setFormData({ ...formData, coreFeatures: e.target.value })}
                                    placeholder="- Feature 1\n- Feature 2"
                                    className="bg-slate-950 border-slate-800 text-white min-h-[100px]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Startup Potential / Angle</Label>
                                <Textarea
                                    value={formData.startupAngle}
                                    onChange={(e) => setFormData({ ...formData, startupAngle: e.target.value })}
                                    placeholder="e.g., Niche marketplaces for creators"
                                    className="bg-slate-950 border-slate-800 text-white min-h-[100px]"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}>Cancel</Button>
                        <Button
                            className="bg-cyan-600 hover:bg-cyan-700 text-white"
                            onClick={isAddOpen ? handleAddSubmit : handleEditSubmit}
                        >
                            {isAddOpen ? "Create Project" : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
