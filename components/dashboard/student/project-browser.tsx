"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Star, CheckCircle2, Rocket, BrainCircuit, Clock, Send, ShieldCheck, Trophy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

interface Project {
    id: string;
    name: string;
    tagline: string;
    description: string | null;
    difficulty: number;
    coreFeatures: string[];
    startupAngle: string | null;
    conceptsCovered: any;
    assignmentStatus?: string;
    assignmentId?: string | null;
    latestSubmission?: any;
    latestReview?: any;
}

interface ProgressData {
    total: number;
    completed: number;
    percentage: number;
    patEligible: boolean;
}

interface CatalogData {
    track: {
        id: string;
        title: string;
        slug: string;
    };
    projects: Project[];
    progress?: ProgressData;
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    NOT_STARTED: { label: "Not Started", color: "bg-slate-700 text-slate-300 border-slate-600", icon: Clock },
    IN_PROGRESS: { label: "In Progress", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Clock },
    SUBMITTED: { label: "Submitted", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Send },
    VERIFIED: { label: "Verified", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle2 },
};

export function StudentProjectBrowser({ catalogs }: { catalogs: CatalogData[] }) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    if (catalogs.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-dashed border-slate-800">
                <h2 className="text-xl font-bold text-white mb-2">No Projects Found</h2>
                <p className="text-slate-400 mb-6">You are not enrolled in any streams yet.</p>
                <Button variant="outline" asChild>
                    <a href="/streams">Browse Streams</a>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Tabs defaultValue={catalogs[0]?.track.slug} className="w-full">
                {catalogs.length > 1 && (
                    <TabsList className="bg-slate-900 border border-slate-800 mb-6">
                        {catalogs.map(cat => (
                            <TabsTrigger
                                key={cat.track.id}
                                value={cat.track.slug}
                                className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
                            >
                                {cat.track.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                )}

                {catalogs.map(cat => {
                    const progress = cat.progress;
                    return (
                        <TabsContent key={cat.track.id} value={cat.track.slug} className="mt-0 space-y-6">
                            {/* Progress Overview Bar */}
                            {progress && progress.total > 0 && (
                                <Card className="bg-slate-900/50 border-slate-800">
                                    <CardContent className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-semibold text-white">
                                                    Track Progress
                                                </h3>
                                                <Badge variant="outline" className="border-slate-700 text-slate-300">
                                                    {progress.completed}/{progress.total} Verified
                                                </Badge>
                                            </div>
                                            {progress.patEligible ? (
                                                <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 gap-1">
                                                    <ShieldCheck className="w-3.5 h-3.5" />
                                                    PAT Ready
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="border-slate-700 text-slate-400 gap-1">
                                                    <Trophy className="w-3.5 h-3.5" />
                                                    {progress.percentage}% Complete
                                                </Badge>
                                            )}
                                        </div>
                                        <Progress value={progress.percentage} className="h-2.5" />
                                        {!progress.patEligible && progress.completed < progress.total && (
                                            <p className="text-xs text-slate-500 mt-2">
                                                Complete and get all projects verified by your mentor to unlock PAT assessment.
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {cat.projects.length === 0 ? (
                                <div className="text-center py-10 text-slate-500">
                                    No projects available in this catalog yet. Check back soon.
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {cat.projects.map(project => {
                                        const status = statusConfig[project.assignmentStatus || "NOT_STARTED"] || statusConfig.NOT_STARTED;
                                        const StatusIcon = status.icon;
                                        return (
                                            <Card key={project.id} className={`bg-slate-900 border-slate-800 flex flex-col h-full hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group ${project.assignmentStatus === "VERIFIED" ? "border-green-500/30" : ""}`}>
                                                <CardHeader>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex gap-0.5">
                                                            {[...Array(project.difficulty)].map((_, i) => (
                                                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                            ))}
                                                            {[...Array(Math.max(0, 5 - project.difficulty))].map((_, i) => (
                                                                <Star key={i} className="w-4 h-4 text-slate-800" />
                                                            ))}
                                                        </div>
                                                        {/* Status Badge */}
                                                        <Badge variant="outline" className={`${status.color} gap-1 text-xs`}>
                                                            <StatusIcon className="w-3 h-3" />
                                                            {status.label}
                                                        </Badge>
                                                    </div>
                                                    <CardTitle className="text-white text-xl group-hover:text-cyan-400 transition-colors">{project.name}</CardTitle>
                                                    <CardDescription className="text-slate-400 line-clamp-2 h-10">{project.tagline}</CardDescription>
                                                </CardHeader>
                                                <CardContent className="flex-grow">
                                                    <ul className="space-y-2 mb-4">
                                                        {project.coreFeatures.slice(0, 3).map((feat, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                                                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                                                                <span className="line-clamp-1 opacity-80 group-hover:opacity-100 transition-opacity">{feat}</span>
                                                            </li>
                                                        ))}
                                                        {project.coreFeatures.length > 3 && (
                                                            <li className="text-xs text-slate-500 pl-6 italic">
                                                                +{project.coreFeatures.length - 3} more features...
                                                            </li>
                                                        )}
                                                    </ul>
                                                </CardContent>
                                                <CardFooter>
                                                    <Button
                                                        className="w-full bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-300 border border-slate-700 hover:border-cyan-500 transition-all"
                                                        onClick={() => setSelectedProject(project)}
                                                    >
                                                        View Project Details
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        );
                                    })}
                                </div>
                            )}
                        </TabsContent>
                    );
                })}
            </Tabs>

            {/* Detail Modal */}
            <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
                <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-4xl h-[85vh] flex flex-col p-0 overflow-hidden">
                    <DialogHeader className="p-6 border-b border-slate-800 bg-slate-900/50">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <DialogTitle className="text-3xl font-bold flex items-center gap-3 mb-2">
                                    {selectedProject?.name}
                                    <div className="flex gap-0.5 bg-slate-900 rounded-lg p-1 border border-slate-800">
                                        {[...Array(selectedProject?.difficulty || 0)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        ))}
                                    </div>
                                </DialogTitle>
                                <DialogDescription className="text-lg text-slate-300 font-medium">
                                    {selectedProject?.tagline}
                                </DialogDescription>
                            </div>
                            {selectedProject?.assignmentStatus && (
                                <Badge variant="outline" className={`${statusConfig[selectedProject.assignmentStatus]?.color || statusConfig.NOT_STARTED.color} gap-1 shrink-0`}>
                                    {statusConfig[selectedProject.assignmentStatus]?.label || "Not Started"}
                                </Badge>
                            )}
                        </div>
                    </DialogHeader>

                    <ScrollArea className="flex-grow">
                        <div className="p-8 space-y-10">
                            {/* Description */}
                            <div className="prose prose-invert max-w-none">
                                <p className="text-slate-300 text-lg leading-relaxed">{selectedProject?.description}</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">
                                {/* Core Features Column */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                                        <CheckCircle2 className="w-6 h-6 text-cyan-400" /> Core Features
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedProject?.coreFeatures.map((feat, i) => (
                                            <li key={i} className="flex items-start gap-3 bg-slate-900/30 p-3 rounded-lg border border-slate-800/50 hover:bg-slate-900 hover:border-cyan-500/30 transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                                                <span className="text-slate-200">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Right Column: Startup Angle & Skills */}
                                <div className="space-y-8">
                                    {selectedProject?.startupAngle && (
                                        <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
                                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <Rocket className="w-24 h-24 rotate-12" />
                                            </div>
                                            <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2 relative z-10">
                                                <Rocket className="w-5 h-5" /> Startup Potential
                                            </h3>
                                            <p className="text-purple-100/90 relative z-10 leading-relaxed">{selectedProject.startupAngle}</p>
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                                            <BrainCircuit className="w-6 h-6 text-pink-400" /> Skills & Concepts
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject?.conceptsCovered && Object.values(selectedProject.conceptsCovered).map((concept: any, i) => (
                                                <Badge key={i} variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-3 py-1 text-sm border border-slate-700">
                                                    {String(concept)}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    );
}
