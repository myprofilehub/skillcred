import { getPublicProjectCatalog } from "@/app/actions/curriculum-actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Users, Trophy } from "lucide-react";

interface ProjectRoadmapProps {
    trackSlug: string;
    accentColor?: string; // e.g. "purple", "cyan", "orange"
}

const colorMap: Record<string, { border: string; badge: string; dot: string; gradient: string }> = {
    purple: { border: "border-purple-500/50", badge: "border-purple-500/30 text-purple-400 bg-purple-500/10", dot: "bg-purple-500", gradient: "from-purple-500/50 to-pink-500/50" },
    cyan: { border: "border-cyan-500/50", badge: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10", dot: "bg-cyan-500", gradient: "from-cyan-500/50 to-blue-500/50" },
    orange: { border: "border-orange-500/50", badge: "border-orange-500/30 text-orange-400 bg-orange-500/10", dot: "bg-orange-500", gradient: "from-orange-500/50 to-red-500/50" },
    green: { border: "border-green-500/50", badge: "border-green-500/30 text-green-400 bg-green-500/10", dot: "bg-green-500", gradient: "from-green-500/50 to-emerald-500/50" },
    blue: { border: "border-blue-500/50", badge: "border-blue-500/30 text-blue-400 bg-blue-500/10", dot: "bg-blue-500", gradient: "from-blue-500/50 to-indigo-500/50" },
    red: { border: "border-red-500/50", badge: "border-red-500/30 text-red-400 bg-red-500/10", dot: "bg-red-500", gradient: "from-red-500/50 to-pink-500/50" },
    yellow: { border: "border-yellow-500/50", badge: "border-yellow-500/30 text-yellow-400 bg-yellow-500/10", dot: "bg-yellow-500", gradient: "from-yellow-500/50 to-orange-500/50" },
    pink: { border: "border-pink-500/50", badge: "border-pink-500/30 text-pink-400 bg-pink-500/10", dot: "bg-pink-500", gradient: "from-pink-500/50 to-rose-500/50" },
};

function getCategoryInfo(difficulty: number) {
    switch (difficulty) {
        case 3: return { label: "Solo Project", icon: User, color: "border-green-500" };
        case 4: return { label: "Pair Project", icon: Users, color: "border-yellow-500" };
        default: return { label: "Capstone", icon: Trophy, color: "border-red-500" };
    }
}

export async function ProjectRoadmap({ trackSlug, accentColor = "purple" }: ProjectRoadmapProps) {
    const { projects } = await getPublicProjectCatalog(trackSlug);
    const colors = colorMap[accentColor] || colorMap.purple;

    if (!projects || projects.length === 0) {
        return null;
    }

    const solo = projects.filter(p => p.difficulty === 3);
    const pair = projects.filter(p => p.difficulty === 4);
    const capstone = projects.filter(p => p.difficulty >= 5);

    const allProjects = [
        ...solo.map((p, i) => ({ ...p, idx: i + 1 })),
        ...pair.map((p, i) => ({ ...p, idx: solo.length + i + 1 })),
        ...capstone.map((p, i) => ({ ...p, idx: solo.length + pair.length + i + 1 })),
    ];

    return (
        <div className="w-full">
            <div className="w-full">
                <div className="text-center md:text-left mb-16">
                    <h2 className="text-3xl font-bold font-heading mb-4">
                        Project Roadmap ({projects.length} Projects)
                    </h2>
                    <p className="text-muted-foreground">
                        From solo builds to team capstones — real-world projects that prove your skills
                    </p>
                    <div className="flex justify-center gap-6 mt-6 text-sm">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-green-400" />
                            <span className="text-muted-foreground">{solo.length} Solo</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-yellow-400" />
                            <span className="text-muted-foreground">{pair.length} Pair</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-red-400" />
                            <span className="text-muted-foreground">{capstone.length} Capstone</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-8 relative">
                    {/* Vertical Line */}
                    <div className={`absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b ${colors.gradient} hidden md:block`} />

                    {allProjects.map((project) => {
                        const category = getCategoryInfo(project.difficulty);
                        return (
                            <div key={project.id} className="relative md:pl-24">
                                <div className="hidden md:flex absolute left-4 -translate-x-1/2 top-6 w-8 h-8 rounded-full bg-background border-4 border-muted items-center justify-center z-10">
                                    <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                                </div>
                                <Card className={`border-l-4 ${category.color} bg-white/5`}>
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="w-fit">
                                                    Project {project.idx}
                                                </Badge>
                                                <Badge variant="outline" className={colors.badge}>
                                                    <category.icon className="w-3 h-3 mr-1" />
                                                    {category.label}
                                                </Badge>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                                        {project.description && (
                                            <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                                        )}
                                        {project.coreFeatures.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {project.coreFeatures.slice(0, 4).map((feat: string, i: number) => (
                                                    <Badge key={i} variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                                                        {feat}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                        {project.startupAngle && (
                                            <p className="text-xs text-muted-foreground mt-3 italic">
                                                💼 {project.startupAngle}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
