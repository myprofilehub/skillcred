import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Film, Search } from "lucide-react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/navbar";
import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { VideoPlayer } from "@/components/ui/video-player";
import { getVideoThumbnail } from "@/lib/utils";

export const metadata = {
    title: "Free Library | SkillCred",
};

export default async function FreeLibraryPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const awaitedParams = await searchParams;
    const tracksParam = awaitedParams.tracks;
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
    let allTracks: any[] = [];
    let error = null;

    try {
        allTracks = await prisma.track.findMany({
            select: { title: true, slug: true },
            orderBy: { title: "asc" }
        });

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
        slug: r.track?.slug || "",
        createdAt: r.createdAt,
    }));

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white selection:bg-indigo-500/30">
            <LandingNavbar />
            
            <main className="pt-24 px-6 max-w-[1600px] mx-auto pb-20">
                {/* Horizontal Category Pills */}
                <div className="flex overflow-x-auto pb-4 gap-3 mb-6 border-b border-white/5 sticky top-16 z-20 bg-[#0f0f0f] pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <Link href="/library" className="shrink-0" scroll={false}>
                        <Badge variant={selectedSlugs.length === 0 ? "default" : "outline"} className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm cursor-pointer transition-colors ${selectedSlugs.length === 0 ? "bg-white text-black hover:bg-gray-200" : "bg-white/5 text-white/80 border-transparent hover:bg-white/10"}`}>
                            All
                        </Badge>
                    </Link>
                    {allTracks.map(track => {
                        const isSelected = selectedSlugs.includes(track.slug);
                        return (
                            <Link key={track.slug} href={`/library?tracks=${track.slug}`} className="shrink-0" scroll={false}>
                                <Badge variant={isSelected ? "default" : "outline"} className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm cursor-pointer transition-colors ${isSelected ? "bg-white text-black hover:bg-gray-200" : "bg-white/5 text-white/80 border-transparent hover:bg-white/10"}`}>
                                    {track.title}
                                </Badge>
                            </Link>
                        );
                    })}
                </div>

                {library.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <Search className="w-10 h-10 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2 text-white">No Videos Found</h3>
                        <p className="text-muted-foreground max-w-md mx-auto mb-8">
                            We couldn't find any pre-recorded masterclasses for the selected streams. Try clearing your filters.
                        </p>
                        <Link href="/library">
                            <Badge className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-sm font-medium rounded-full cursor-pointer">
                                Clear Filters
                            </Badge>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
                        {library.map((recording: any) => (
                            <Dialog key={recording.id}>
                                <DialogTrigger asChild>
                                    <div className="group flex flex-col cursor-pointer text-left">
                                        <div className="aspect-video bg-[#272727] rounded-xl overflow-hidden relative mb-3 transition-transform duration-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
                                            {/* Play Hover State */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                                <PlayCircle className="w-12 h-12 text-white drop-shadow-md" />
                                            </div>
                                            {/* Thumbnail Image or Fallback */}
                                            {getVideoThumbnail(recording.url) ? (
                                                <img 
                                                    src={getVideoThumbnail(recording.url)!} 
                                                    alt={recording.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className={`w-full h-full bg-gradient-to-br from-indigo-900/30 to-purple-900/10 flex items-center justify-center`}>
                                                    <Film className="w-10 h-10 text-white/10" />
                                                </div>
                                            )}
                                            {/* Badges/Duration at bottom right */}
                                            <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-1.5 py-0.5 text-xs font-semibold text-white/90 rounded border border-white/10 z-20">
                                                Premium
                                            </span>
                                        </div>
                                        
                                        <div className="flex gap-3 items-start px-1">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 shrink-0 flex items-center justify-center font-bold text-sm text-indigo-400 mt-0.5">
                                                {recording.track.substring(0, 1)}
                                            </div>
                                            <div className="flex flex-col overflow-hidden">
                                                <h4 className="font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                                                    {recording.title}
                                                </h4>
                                                <div className="text-[14px] text-[#aaaaaa] hover:text-white transition-colors mt-1 truncate">
                                                    SkillCred • {recording.track}
                                                </div>
                                                <div className="text-[14px] text-[#aaaaaa] flex items-center gap-1.5">
                                                    <span>
                                                        {formatDistanceToNow(new Date(recording.createdAt), { addSuffix: true })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl p-0 bg-black border-white/10 overflow-hidden sm:rounded-xl">
                                    <DialogTitle className="sr-only">{recording.title}</DialogTitle>
                                    <VideoPlayer url={recording.url} />
                                    {recording.description && (
                                        <div className="p-6 pt-4 text-slate-300 text-sm">
                                            <h3 className="text-white font-semibold text-lg mb-2">{recording.title}</h3>
                                            {recording.description}
                                        </div>
                                    )}
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
