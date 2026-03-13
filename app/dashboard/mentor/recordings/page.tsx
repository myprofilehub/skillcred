import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Video, Film, Search, ExternalLink, Calendar, Lock, Unlock } from "lucide-react";
import { AddRecordingDialog } from "@/components/dashboard/recordings/add-recording-dialog";
import { SyncRecordingsButton } from "@/components/dashboard/recordings/sync-button";
import { getRecordings } from "@/app/actions/recordings";
import { fetchClassrooms } from "@/app/actions/google-classroom";
import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function RecordedContentPage() {
    const session = await auth();
    if (!session?.user) redirect("/auth/signin");

    // 1. Fetch Classrooms (for Live Sessions grouping)
    const classroomsData = await fetchClassrooms();
    const classrooms = Array.isArray(classroomsData) ? classroomsData : [];

    // 2. Fetch Pre-recorded Library
    const libraryRecordings = await getRecordings({ type: "PRE_RECORDED" });

    // 3. Organize Live Recordings
    // We fetch ALL live recordings and filter/group them in JS to save N+1 DB calls if possible,
    // OR we iterate classrooms and fetch. Since we might have many recordings, fetching all LIVE_SESSION first is better.
    // actually getRecordings returns a flat list.
    const allLiveRecordings = await getRecordings({ type: "LIVE_SESSION" });
    // Group by Classroom ID
    const liveRecordingsMap = new Map();
    if (Array.isArray(allLiveRecordings)) {
        allLiveRecordings.forEach((rec: any) => {
            const cid = rec.googleClassroomId;
            if (!liveRecordingsMap.has(cid)) liveRecordingsMap.set(cid, []);
            liveRecordingsMap.get(cid).push(rec);
        });
    }

    // Helper to get recordings for a course
    const getCourseRecordings = (courseId: string) => {
        // We need to map Google Course ID (from API) to DB ID (from Prisma) to match `googleClassroomId`.
        // `classrooms` from API has `course.id`. 
        // `allLiveRecordings` has `rec.googleClassroomId` which is the internal DB ID.
        // We need to resolve this.
        // Actually, `fetchClassrooms` returns Google API objects.
        // We need the internal DB ID for each classroom to look up recordings.
        // Grouping logic is tricky without the map.
        // Let's just list courses and query the DB for their recordings individually? No, bad perf.

        // Better: Query DB for all GoogleClassrooms matching the mentor's user ID?
        // We don't link GoogleClassroom to User directly in schema easily? 
        // Schema: GoogleClassroom { id, googleCourseId, meetLink, mentorId }
        // So we can fetch all GoogleClassrooms for this mentor.
        return [];
    }

    // Fetch DB Classrooms map
    // We need to resolve Mentor ID first
    const mentor = await prisma.mentor.findUnique({
        where: { userId: session.user.id }
    });

    let dbClassroomMap = new Map();
    if (mentor) {
        const dbClassrooms = await prisma.googleClassroom.findMany({
            where: { mentorId: mentor.id }
        });
        dbClassroomMap = new Map(dbClassrooms.map((c: any) => [c.googleCourseId, c]));
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Recorded Content</h1>
                    <p className="text-muted-foreground">Manage live session archives and pre-recorded lessons.</p>
                </div>
                <AddRecordingDialog />
            </div>

            <Tabs defaultValue="live" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="live" className="gap-2"><Video className="w-4 h-4" /> Live Sessions</TabsTrigger>
                    <TabsTrigger value="library" className="gap-2"><Film className="w-4 h-4" /> Course Library</TabsTrigger>
                </TabsList>

                <TabsContent value="live" className="space-y-6">
                    {classrooms.length === 0 ? (
                        <Card className="border-dashed bg-white/5 p-8 text-center">
                            <p className="text-muted-foreground">No active classrooms found. Sync Google Classroom first.</p>
                        </Card>
                    ) : (
                        <div className="grid gap-6">
                            {classrooms.map((course: any) => {
                                const dbClassroom = dbClassroomMap.get(course.id);
                                const recordings = dbClassroom ? liveRecordingsMap.get(dbClassroom.id) || [] : [];

                                return (
                                    <Card key={course.id} className="bg-white/5 border-white/10 overflow-hidden">
                                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                                            <div>
                                                <h3 className="font-semibold text-lg">{course.name}</h3>
                                                <p className="text-xs text-muted-foreground">{course.section}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="text-xs font-normal">
                                                    {recordings.length} Recordings
                                                </Badge>
                                                {/* Only show Sync if we have a DB record (meaning we have meet link stored) */}
                                                {dbClassroom ? (
                                                    <SyncRecordingsButton googleCourseId={course.id} />
                                                ) : (
                                                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" disabled>
                                                        Link Meet First
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                        <CardContent className="p-0">
                                            {recordings.length > 0 ? (
                                                <div className="divide-y divide-white/5">
                                                    {recordings.map((rec: any) => (
                                                        <div key={rec.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded bg-red-500/10 flex items-center justify-center text-red-500">
                                                                    <Video className="w-5 h-5" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-sm">{rec.title}</p>
                                                                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                                                                        <Calendar className="w-3 h-3" />
                                                                        {new Date(rec.createdAt).toLocaleDateString()}
                                                                        <span>•</span>
                                                                        {rec.meetCode && <span className="font-mono bg-white/10 px-1 rounded">{rec.meetCode}</span>}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <Link href={rec.url} target="_blank">
                                                                <Button size="sm" variant="outline" className="gap-2">
                                                                    <ExternalLink className="w-3 h-3" /> Play
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-8 text-center text-sm text-muted-foreground">
                                                    No recordings synced yet. Click "Sync" to fetch from Google Meet.
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="library">
                    <div className="mb-6 flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search library..."
                                className="pl-8 bg-white/5 border-white/10"
                            />
                        </div>
                        {/* Filter dropdown could go here */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.isArray(libraryRecordings) && libraryRecordings.map((rec: any) => (
                            <Card key={rec.id} className="group border-white/10 bg-white/5 hover:border-primary/30 transition-colors">
                                <div className="aspect-video bg-black/40 relative flex items-center justify-center">
                                    <Film className="w-12 h-12 text-white/20 group-hover:text-primary transition-colors" />
                                    <Badge className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm border-0">
                                        {rec.track?.title || "General"}
                                    </Badge>
                                </div>
                                <CardContent className="p-4 space-y-3">
                                    <div>
                                        <h4 className="font-semibold line-clamp-1">{rec.title}</h4>
                                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                            {rec.description || "No description provided."}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <Badge variant={rec.isPublic ? "outline" : "secondary"} className="text-[10px] h-5">
                                            {rec.isPublic ? <Unlock className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                                            {rec.isPublic ? "Public" : "Private"}
                                        </Badge>
                                        <Link href={rec.url} target="_blank">
                                            <Button size="sm" className="h-8 text-xs">Watch Now</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {(!libraryRecordings || (Array.isArray(libraryRecordings) && libraryRecordings.length === 0)) && (
                            <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed border-white/10 rounded-lg">
                                <Film className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p>No pre-recorded lessons found.</p>
                                <p className="text-sm">Upload a video to get started.</p>
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
