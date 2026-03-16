import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Film, ExternalLink } from "lucide-react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/navbar";

export const metadata = {
    title: "Free Library | SkillCred",
};

export default async function FreeLibraryPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const tracksParam = searchParams.tracks;
    const selectedSlugs = typeof tracksParam === 'string' 
        ? tracksParam.split(',') 
        : [];

    let whereClause: any = {
        type: "PRE_RECORDED",
        isPublic: true,
    };

    if (selectedSlugs.length > 0) {
        whereClause.track = {
            slug: { in: selectedSlugs }
        };
    }

    let libraryRecordings: any[] = [];
    let error = null;

    try {
        libraryRecordings = await prisma.recording.findMany({
            where: whereClause,
            include: {
                track: true
            },
            orderBy: { createdAt: "desc" }
        });
    } catch (e) {
        console.error("Error fetching library:", e);
        error = "Failed to fetch course library.";
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
                <LandingNavbar />
                <main className="pt-32 px-6 max-w-7xl mx-auto pb-20">
                    <h1 className="text-3xl font-bold font-heading mb-4">Course Library</h1>
                    <p className="text-destructive">{error}</p>
                </main>
            </div>
        );
    }

    const library = libraryRecordings.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        url: r.url,
        track: r.track?.title || "General",
        createdAt: r.createdAt,
    }));

    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <LandingNavbar />
            
            <main className="pt-32 px-6 max-w-7xl mx-auto pb-20">
                <div className="mb-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-2">Our Public Library</h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            {selectedSlugs.length > 0 
                                ? "Pre-recorded tutorials and masterclasses perfectly tailored to your selected career streams."
                                : "Explore our entire collection of free masterclasses and tutorials from industry-leading mentors."}
                        </p>
                    </div>
                    {/* Add back to stream selection button if they came from landing */}
                    <div className="shrink-0 flex gap-3">
                        <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/10">
                            <Link href="/#interest-form">Update Interests</Link>
                        </Button>
                    </div>
                </div>

                {library.length === 0 ? (
                    <Card className="border-dashed bg-white/5 border-white/20">
                        <CardContent className="p-16 text-center">
                            <Film className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                            <h3 className="text-xl font-semibold mb-2">No Videos Found</h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                There are currently no public pre-recorded videos for your selected streams. Check back soon as mentors upload new content!
                            </p>
                            <div className="mt-8">
                                <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/10">
                                    <Link href="/">Try Different Streams</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {library.map((recording: any) => (
                            <Card key={recording.id} className="group border-white/10 bg-black/60 hover:bg-white/5 hover:border-indigo-500/50 transition-all duration-300 overflow-hidden flex flex-col">
                                <div className="aspect-video bg-indigo-950/30 relative flex items-center justify-center group-hover:bg-indigo-900/40 transition-colors">
                                    <PlayCircle className="w-12 h-12 text-white/30 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-300" />
                                    <Badge className="absolute top-3 right-3 bg-black/80 text-xs backdrop-blur-md border-white/10 text-indigo-200">
                                        {recording.track}
                                    </Badge>
                                </div>
                                <CardContent className="p-5 flex-1 flex flex-col">
                                    <h4 className="font-semibold text-white/90 group-hover:text-white transition-colors line-clamp-2 mb-2 leading-snug">
                                        {recording.title}
                                    </h4>
                                    {recording.description && (
                                        <p className="text-sm text-muted-foreground line-clamp-2 mt-auto">
                                            {recording.description}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                                        <span className="text-xs font-medium text-white/40">
                                            {new Date(recording.createdAt).toLocaleDateString(undefined, {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </span>
                                        <Link href={recording.url} target="_blank">
                                            <Button size="sm" className="h-8 gap-2 bg-indigo-600 hover:bg-indigo-500 text-white">
                                                <ExternalLink className="w-3.5 h-3.5" /> Watch
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
