import { getAllFeaturedProjects } from "@/app/actions/curriculum-actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";

const trackColors: Record<string, string> = {
    "full-stack": "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
    "ai-ml": "from-purple-500/20 to-pink-500/20 border-purple-500/30",
    "cybersecurity": "from-red-500/20 to-orange-500/20 border-red-500/30",
    "data-engineering": "from-green-500/20 to-teal-500/20 border-green-500/30",
    "devops-cloud": "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
    "mobile-development": "from-pink-500/20 to-rose-500/20 border-pink-500/30",
    "iot-embedded": "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
    "data-science": "from-emerald-500/20 to-cyan-500/20 border-emerald-500/30",
};

const trackBadge: Record<string, string> = {
    "full-stack": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "ai-ml": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "cybersecurity": "bg-red-500/20 text-red-400 border-red-500/30",
    "data-engineering": "bg-green-500/20 text-green-400 border-green-500/30",
    "devops-cloud": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "mobile-development": "bg-pink-500/20 text-pink-400 border-pink-500/30",
    "iot-embedded": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    "data-science": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

// Map DB slug to stream page path
const slugToPath: Record<string, string> = {
    "full-stack": "full-stack-development",
};

export async function FeaturedProjects() {
    const featured = await getAllFeaturedProjects();

    if (!featured || featured.length === 0) return null;

    return (
        <section className="py-12 px-6 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05),transparent_60%)]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                    <Badge variant="outline" className="border-white/20 text-white/80 px-4 py-1">
                        <Trophy className="w-3 h-3 mr-1" /> Capstone Projects
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading">
                        Build Real-World{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Capstone Projects
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Each stream culminates in industry-grade capstone projects. Here's a glimpse of what you'll build.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featured.map(({ track, project }) => {
                        const cardColors = trackColors[track.slug] || "from-slate-500/20 to-slate-600/20 border-slate-500/30";
                        const badgeColor = trackBadge[track.slug] || "bg-slate-500/20 text-slate-400 border-slate-500/30";
                        const streamPath = slugToPath[track.slug] || track.slug;

                        return (
                            <Link
                                key={project.id}
                                href={`/streams/${streamPath}`}
                                className="group"
                            >
                                <Card className={`h-full bg-gradient-to-br ${cardColors} border hover:scale-[1.02] transition-all duration-300 hover:shadow-xl`}>
                                    <CardContent className="p-6 flex flex-col h-full">
                                        <Badge variant="outline" className={`${badgeColor} w-fit mb-3 text-xs`}>
                                            {track.title}
                                        </Badge>
                                        <h3 className="font-bold text-white text-lg mb-2 group-hover:text-indigo-300 transition-colors">
                                            {project.name}
                                        </h3>
                                        {project.description && (
                                            <p className="text-sm text-muted-foreground line-clamp-3 flex-grow mb-4">
                                                {project.description}
                                            </p>
                                        )}
                                        <div className="flex items-center text-sm text-muted-foreground group-hover:text-indigo-400 transition-colors mt-auto pt-2 border-t border-white/5">
                                            View stream
                                            <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
