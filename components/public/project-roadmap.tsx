import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { User, Users, Trophy, GitBranch, Target, Layers, Blocks } from "lucide-react";
import { RM_PBL_CURRICULUM } from "@/lib/curriculum-data";

interface ProjectRoadmapProps {
    trackSlug: string;
    accentColor?: string; // e.g. "purple", "cyan", "orange"
    showMiniProjects?: boolean;
}

const colorMap: Record<string, { border: string; badge: string; dot: string; gradient: string; text: string; bg: string }> = {
    purple: { border: "border-purple-200 dark:border-purple-500/20", badge: "border-purple-200 text-purple-700 bg-purple-50 dark:border-purple-500/30 dark:bg-purple-500/10 dark:text-purple-400", dot: "bg-purple-500", gradient: "from-purple-300 to-pink-300", text: "text-purple-700 dark:text-purple-400", bg: "bg-purple-500/10" },
    cyan: { border: "border-cyan-200 dark:border-cyan-500/20", badge: "border-cyan-200 text-cyan-700 bg-cyan-50 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-400", dot: "bg-cyan-500", gradient: "from-cyan-300 to-blue-300", text: "text-cyan-700 dark:text-cyan-400", bg: "bg-cyan-500/10" },
    orange: { border: "border-orange-200 dark:border-orange-500/20", badge: "border-orange-200 text-orange-700 bg-orange-50 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-400", dot: "bg-orange-500", gradient: "from-orange-300 to-red-300", text: "text-orange-700 dark:text-orange-400", bg: "bg-orange-500/10" },
    green: { border: "border-green-200 dark:border-green-500/20", badge: "border-green-200 text-green-700 bg-green-50 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-400", dot: "bg-green-500", gradient: "from-green-300 to-emerald-300", text: "text-green-700 dark:text-green-400", bg: "bg-green-500/10" },
    blue: { border: "border-blue-200 dark:border-blue-500/20", badge: "border-blue-200 text-blue-700 bg-blue-50 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400", dot: "bg-blue-500", gradient: "from-blue-300 to-indigo-300", text: "text-blue-700 dark:text-blue-400", bg: "bg-blue-500/10" },
    red: { border: "border-red-200 dark:border-red-500/20", badge: "border-red-200 text-red-700 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400", dot: "bg-red-500", gradient: "from-red-300 to-pink-300", text: "text-red-700 dark:text-red-400", bg: "bg-red-500/10" },
    yellow: { border: "border-yellow-200 dark:border-yellow-500/20", badge: "border-yellow-200 text-yellow-700 bg-yellow-50 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-400", dot: "bg-yellow-500", gradient: "from-yellow-300 to-orange-300", text: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-500/10" },
    pink: { border: "border-pink-200 dark:border-pink-500/20", badge: "border-pink-200 text-pink-700 bg-pink-50 dark:border-pink-500/30 dark:bg-pink-500/10 dark:text-pink-400", dot: "bg-pink-500", gradient: "from-pink-300 to-rose-300", text: "text-pink-700 dark:text-pink-400", bg: "bg-pink-500/10" },
};

function getPhaseIcon(idx: number) {
    switch (idx) {
        case 0: return <User className="w-3.5 h-3.5 mr-1" />;
        case 1: return <User className="w-3.5 h-3.5 mr-1" />;
        case 2: return <Users className="w-3.5 h-3.5 mr-1" />;
        case 3: return <Trophy className="w-3.5 h-3.5 mr-1" />;
        default: return <Target className="w-3.5 h-3.5 mr-1" />;
    }
}

export function ProjectRoadmap({ trackSlug, accentColor = "purple", showMiniProjects = false }: ProjectRoadmapProps) {
    const streamSlugToDbSlug: Record<string, string> = {
        "full-stack-development": "full-stack-development",
        "ai-ml": "ai-ml",
        "cybersecurity": "cybersecurity",
        "data-engineering": "data-engineering",
        "devops-cloud": "devops-cloud",
        "mobile-development": "mobile-development",
        "iot-embedded": "iot-embedded",
        "data-science": "data-science",
    };
    
    const dbSlug = streamSlugToDbSlug[trackSlug] || trackSlug;
    const curriculumData = RM_PBL_CURRICULUM[dbSlug];
    
    if (!curriculumData) {
        return null;
    }

    const colors = colorMap[accentColor] || colorMap.purple;

    return (
        <Card className="bg-white border-slate-200 shadow-xl relative overflow-hidden text-slate-800 dark:bg-slate-900/80 dark:border-white/10 dark:text-slate-100">
            <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${colors.gradient}`} />
            
            <CardHeader className="border-b border-slate-150 dark:border-white/5 pb-5 bg-slate-50/50 dark:bg-white/[0.02]">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                            <Target className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-slate-950 dark:text-white">
                                Core 4-Project Spine
                            </CardTitle>
                            <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                                Step-by-step development phases mirroring real assessment rounds
                            </CardDescription>
                        </div>
                    </div>
                    <Badge className={`${colors.badge} text-[10px] uppercase font-bold tracking-wider whitespace-nowrap`}>
                        ★ Industry Mirrored
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
                {curriculumData.spine.map((project, idx) => (
                    <div 
                        key={idx} 
                        className={`border ${colors.border} rounded-xl bg-slate-50/30 hover:bg-slate-50 transition-all dark:bg-slate-950/40 dark:hover:bg-slate-950/80 p-5 shadow-sm space-y-3`}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-white/5 pb-3">
                            <div className="flex items-center gap-2.5 flex-wrap">
                                <Badge variant="outline" className={`${colors.badge} text-xs px-2.5 py-0.5 font-bold`}>
                                    {getPhaseIcon(idx)}
                                    {project.checkpoint}
                                </Badge>
                                <span className="font-bold text-sm sm:text-base text-slate-950 dark:text-white">{project.phase}</span>
                            </div>
                            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 shrink-0">
                                <GitBranch className="w-3.5 h-3.5 text-slate-400" />
                                <span>Mirrors: {project.funnelStage}</span>
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Project Brief</span>
                            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                                {project.brief}
                            </p>
                        </div>
                    </div>
                ))}
                
                {showMiniProjects && (
                    <div className="w-full pt-2">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="mini-projects" className="border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-slate-900/50 shadow-sm px-5">
                                <AccordionTrigger className="hover:no-underline py-3.5">
                                    <div className="flex items-center gap-3 text-left">
                                        <Layers className={`w-5 h-5 ${colors.text}`} />
                                        <span className="font-semibold text-sm text-slate-900 dark:text-white">View {curriculumData.miniProjects.length} Add-On Mini-Projects</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid md:grid-cols-2 gap-3.5 pt-3.5 pb-2 border-t border-slate-200 dark:border-white/10">
                                        {curriculumData.miniProjects.map((mini, idx) => (
                                            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3.5 rounded-xl shadow-sm flex gap-3">
                                                <div className={`mt-0.5 w-6 h-6 rounded-md ${colors.badge} flex items-center justify-center shrink-0`}>
                                                    <Blocks className={`w-3 h-3 ${colors.text}`} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{mini.concept}</h4>
                                                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{mini.build}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export function MiniProjectsCard({ trackSlug, accentColor = "purple" }: ProjectRoadmapProps) {
    const streamSlugToDbSlug: Record<string, string> = {
        "full-stack-development": "full-stack-development",
        "ai-ml": "ai-ml",
        "cybersecurity": "cybersecurity",
        "data-engineering": "data-engineering",
        "devops-cloud": "devops-cloud",
        "mobile-development": "mobile-development",
        "iot-embedded": "iot-embedded",
        "data-science": "data-science",
    };
    
    const dbSlug = streamSlugToDbSlug[trackSlug] || trackSlug;
    const curriculumData = RM_PBL_CURRICULUM[dbSlug];
    
    if (!curriculumData || !curriculumData.miniProjects) {
        return null;
    }

    const colors = colorMap[accentColor] || colorMap.purple;

    return (
        <Card className="bg-white border-slate-200 shadow-xl relative overflow-hidden text-slate-800 dark:bg-slate-900/80 dark:border-white/10 dark:text-slate-100">
            <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${colors.gradient}`} />
            
            <CardHeader className="border-b border-slate-150 dark:border-white/5 pb-5 bg-slate-50/50 dark:bg-white/[0.02]">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                            <Layers className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-slate-950 dark:text-white">
                                {curriculumData.miniProjects.length} Targeted Mini-Projects
                            </CardTitle>
                            <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                                Hands-on skill builders covering practical tools & concepts
                            </CardDescription>
                        </div>
                    </div>
                    <Badge className={`${colors.badge} text-[10px] uppercase font-bold tracking-wider whitespace-nowrap`}>
                        ★ Build & Verify
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 gap-3.5">
                    {curriculumData.miniProjects.map((mini, idx) => (
                        <div 
                            key={idx} 
                            className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-300 transition-all dark:border-white/5 dark:bg-slate-950/40 dark:hover:bg-slate-950/80 dark:hover:border-white/10 flex gap-3 items-start"
                        >
                            <div className={`mt-0.5 w-6 h-6 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0`}>
                                <span className={`text-[10px] font-bold ${colors.text}`}>{idx + 1}</span>
                            </div>
                            <div className="space-y-1 min-w-0">
                                <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight truncate" title={mini.concept}>
                                    {mini.concept}
                                </h5>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">
                                    {mini.build}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
