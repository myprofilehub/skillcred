import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, PlayCircle, Calendar } from "lucide-react";
import { getMyRecordings } from "@/app/actions/student-dashboard";
import Link from "next/link";

export default async function StudentRecordingsPage() {
    const session = await auth();
    if (!session?.user) redirect("/auth/signin");

    const recordings = await getMyRecordings();

    if ("error" in recordings) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Class Recordings</h1>
                <Card className="border-destructive/50 bg-destructive/10">
                    <CardContent className="p-6">
                        <p className="text-destructive">{recordings.error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const { live } = recordings;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading">Class Recordings</h1>
                <p className="text-muted-foreground">Watch recordings from your live classes</p>
            </div>

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
                    {live.map((recording: any) => (
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
        </div>
    );
}
