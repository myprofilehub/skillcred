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
import { Plus, Pencil, Trash2, Loader2, Star, CheckCircle2, AlertCircle, User, Users, Trophy } from "lucide-react";
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

    const [formData, setFormData] = useState({
        name: "",
        tagline: "",
        description: "",
        difficulty: 3,
        coreFeatures: "", // split by newline
        startupAngle: "",
        isActive: true,
        trackSlug: ""
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

    function handleEditClick(project: Project) {
        setCurrentProject(project);
        setFormData({
            name: project.name,
            tagline: project.tagline,
            description: project.description || "",
            difficulty: project.difficulty,
            coreFeatures: project.coreFeatures.join("\n"),
            startupAngle: project.startupAngle || "",
            isActive: project.isActive,
            trackSlug: selectedStreamSlug
        });
        setIsEditOpen(true);
    }

    function resetForm() {
        setFormData({
            name: "",
            tagline: "",
            description: "",
            difficulty: 3,
            coreFeatures: "",
            startupAngle: "",
            isActive: true,
            trackSlug: selectedStreamSlug
        });
    }

    async function handleAddSubmit() {
        if (!formData.name || !formData.tagline) {
            toast.error("Name and Tagline are required");
            return;
        }

        const track = streams.find(s => s.slug === formData.trackSlug);
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
        
        const track = streams.find(s => s.slug === formData.trackSlug);

        const result = await updateCatalogProject(currentProject.id, {
            trackId: track?.id,
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

    const solo = projects.filter(p => p.difficulty === 3);
    const pair = projects.filter(p => p.difficulty === 4);
    const capstones = projects.filter(p => p.difficulty >= 5);

    const renderProjectSection = (title: string, icon: React.ReactNode, projList: Project[]) => (
        <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                {icon} {title}
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {projList.length === 0 ? (
                    <div className="text-slate-500 text-sm italic py-4 col-span-full">No projects found.</div>
                ) : (
                    projList.map(project => (
                        <Card key={project.id} className="bg-slate-900 border-slate-800 flex flex-col justify-between">
                            <CardContent className="p-5 flex-1 flex flex-col">
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <h4 className="text-lg font-semibold text-white">{project.name}</h4>
                                        <div className="flex gap-1 shrink-0">
                                            <Button variant="ghost" size="icon" onClick={() => handleEditClick(project)} className="w-8 h-8 rounded-full">
                                                <Pencil className="w-4 h-4 text-slate-400 hover:text-white" />
                                            </Button>
                                            {userRole === "ADMIN" && (
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)} className="w-8 h-8 rounded-full hover:bg-red-500/10">
                                                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-400" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-cyan-400 font-medium">{project.tagline}</p>
                                    {project.description && (
                                        <div className="text-sm text-slate-400 mt-3 bg-slate-950 p-3 rounded-md leading-relaxed whitespace-pre-wrap">
                                            {project.description}
                                        </div>
                                    )}
                                    <div className="flex flex-wrap gap-2 mt-4 pt-2">
                                        {project.coreFeatures.map((f, i) => (
                                            <Badge key={i} variant="outline" className="border-slate-700 text-slate-300 bg-slate-800/30">
                                                {f}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/50">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${project.isActive ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                                        <span className="text-sm text-slate-400">{project.isActive ? 'Active in Curriculum' : 'Draft / Hidden'}</span>
                                    </div>
                                    <Switch
                                        checked={project.isActive}
                                        onCheckedChange={() => handleToggleActive(project)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );

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
                            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white px-3 py-2 text-sm whitespace-nowrap"
                        >
                            {stream.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            {/* Project List */}
            {loading ? (
                <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                    <Loader2 className="w-8 h-8 animate-spin mb-4 text-cyan-500" />
                    <p>Loading curriculum design...</p>
                </div>
            ) : (
                <div className="mt-8 space-y-12">
                    {renderProjectSection("Solo Project", <User className="w-5 h-5 text-emerald-400" />, solo)}
                    {renderProjectSection("Pair Project", <Users className="w-5 h-5 text-purple-400" />, pair)}
                    {renderProjectSection("Capstone Options", <Trophy className="w-5 h-5 text-yellow-500" />, capstones)}
                </div>
            )}

            {/* Add/Edit Modal */}
            <Dialog open={isAddOpen || isEditOpen} onOpenChange={(open) => { if (!open) { setIsAddOpen(false); setIsEditOpen(false); } }}>
                <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{isAddOpen ? "Add New Project" : "Edit Project"}</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Stream / Track</Label>
                            <Select
                                value={formData.trackSlug}
                                onValueChange={(val) => setFormData({ ...formData, trackSlug: val })}
                            >
                                <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                                    <SelectValue placeholder="Select Stream..." />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-slate-800 text-white max-h-[250px]">
                                    {streams.map(s => (
                                        <SelectItem key={s.id} value={s.slug}>{s.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
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
                                <Label>Project Category</Label>
                                <Select
                                    value={String(formData.difficulty)}
                                    onValueChange={(val) => setFormData({ ...formData, difficulty: Number(val) })}
                                >
                                    <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                        <SelectItem value="3">👤 Solo Project</SelectItem>
                                        <SelectItem value="4">👥 Pair Project</SelectItem>
                                        <SelectItem value="5">🏆 Capstone Option</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>HR Signal / Tagline</Label>
                            <Input
                                value={formData.tagline}
                                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                placeholder="e.g., HR Signal: Junior Fullstack"
                                className="bg-slate-950 border-slate-800 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Detailed description..."
                                className="bg-slate-950 border-slate-800 text-white min-h-[120px]"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Core Features (One per line)</Label>
                                <Textarea
                                    value={formData.coreFeatures}
                                    onChange={(e) => setFormData({ ...formData, coreFeatures: e.target.value })}
                                    placeholder="React 18&#10;Node.js"
                                    className="bg-slate-950 border-slate-800 text-white min-h-[100px]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Startup Potential / Angle (Optional)</Label>
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
                        <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 hover:text-white bg-slate-900" onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}>Cancel</Button>
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
