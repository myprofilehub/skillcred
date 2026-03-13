import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Video, Film, PlayCircle, Calendar, Search, ExternalLink } from "lucide-react";
import { getMyRecordings } from "@/app/actions/student-dashboard";
import Link from "next/link";

export default async function StudentRecordingsPage() {
    const session = await auth();
    if (!session?.user) redirect("/auth/signin");

    const recordings = await getMyRecordings();

    if ("error" in recordings) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Recordings</h1>
                <Card className="border-destructive/50 bg-destructive/10">
                    <CardContent className="p-6">
                        <p className="text-destructive">{recordings.error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const { live, library } = recordings;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading">Recordings</h1>
                <p className="text-muted-foreground">Watch class recordings and course content</p>
            </div>

            <Tabs defaultValue="live" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="live" className="gap-2">
                        <Video className="w-4 h-4" /> Class Recordings ({live.length})
                    </TabsTrigger>
                    <TabsTrigger value="library" className="gap-2">
                        <Film className="w-4 h-4" /> Course Library ({library.length})
                    </TabsTrigger>
                </TabsList>

                {/* Live Session Recordings */}
                <TabsContent value="live" className="space-y-6">
                    {live.length === 0 ? (
                        <Card className="border-dashed bg-white/5">
                            <CardContent className="p-12 text-center">
                                <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                                <h3 className="text-lg font-semibold mb-2">No Class Recordings Yet</h3>
                                <p className="text-muted-foreground">
                                    Recordings from your live classes will appear here after your mentor uploads them.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {live.map((recording) => (
                                <Card key={recording.id} className="border-white/10 bg-white/5 hover:border-red-500/30 transition-colors">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                                                    <Video className="w-6 h-6 text-red-500" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{recording.title}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Calendar className="w-3 h-3" />
                                                        <span>{new Date(recording.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link href={recording.url} target="_blank">
                                                <Button className="gap-2 bg-red-500 hover:bg-red-600">
                                                    <PlayCircle className="w-4 h-4" /> Watch
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* Course Library */}
                <TabsContent value="library" className="space-y-6">
                    {/* Search */}
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search library..."
                            className="pl-10 bg-white/5 border-white/10"
                        />
                    </div>

                    {library.length === 0 ? (
                        <Card className="border-dashed bg-white/5">
                            <CardContent className="p-12 text-center">
                                <Film className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                                <h3 className="text-lg font-semibold mb-2">Course Library Empty</h3>
                                <p className="text-muted-foreground">
                                    Pre-recorded lessons and tutorials will appear here.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {library.map((recording) => (
                                <Card key={recording.id} className="group border-white/10 bg-white/5 hover:border-primary/30 transition-colors overflow-hidden">
                                    <div className="aspect-video bg-black/40 relative flex items-center justify-center group-hover:bg-black/60 transition-colors">
                                        <PlayCircle className="w-16 h-16 text-white/30 group-hover:text-primary group-hover:scale-110 transition-all" />
                                        <Badge className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm border-0">
                                            {recording.track}
                                        </Badge>
                                    </div>
                                    <CardContent className="p-4">
                                        <h4 className="font-semibold line-clamp-1">{recording.title}</h4>
                                        {recording.description && (
                                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                {recording.description}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(recording.createdAt).toLocaleDateString()}
                                            </span>
                                            <Link href={recording.url} target="_blank">
                                                <Button size="sm" className="h-8 text-xs">
                                                    <ExternalLink className="w-3 h-3 mr-1" /> Watch
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
