"use client";

import { useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Brain,
    Coffee,
    Globe,
    Shield,
    BarChart,
    Cloud,
    Settings,
    Code,
    Database,
    Server,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import { enrollInStream } from "@/app/actions/enrollment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Icon mapping
const IconMap: Record<string, any> = {
    "Brain": Brain,
    "Coffee": Coffee,
    "Globe": Globe,
    "Shield": Shield,
    "BarChart": BarChart,
    "Cloud": Cloud,
    "Settings": Settings,
    "Snake": Code, // Fallback for Snake if not in Lucide (Code is close enough)
};

interface Track {
    id: string;
    title: string;
    slug: string;
    description: string;
    icon: string | null;
    defaultMentor: {
        user: { name: string | null }
    } | null;
    _count: { students: number };
}

interface Enrollment {
    trackId: string;
    status: string;
}

export default function StreamCatalog({ streams, enrollments }: { streams: Track[], enrollments: Enrollment[] }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const enrolledTrackIds = new Set(enrollments.map(e => e.trackId));

    const handleJoin = (slug: string) => {
        startTransition(async () => {
            const result = await enrollInStream(slug);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`Enrolled in ${result.trackTitle}!`, {
                    description: `Your mentor is ${result.mentorName || "assigned"}.`
                });
                router.refresh();
            }
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streams.map((stream) => {
                const Icon = IconMap[stream.icon || ""] || Code;
                const isEnrolled = enrolledTrackIds.has(stream.id);

                return (
                    <Card key={stream.id} className={`flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg ${isEnrolled ? "border-primary/50 bg-primary/5" : "border-white/10 bg-white/5"}`}>
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-start mb-2">
                                <div className={`p-3 rounded-xl ${isEnrolled ? "bg-primary/20 text-primary" : "bg-white/10 text-muted-foreground"}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                {isEnrolled && (
                                    <Badge variant="default" className="bg-primary text-primary-foreground">
                                        Enrolled
                                    </Badge>
                                )}
                            </div>
                            <CardTitle className="text-xl font-bold">{stream.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <p className="text-muted-foreground text-sm line-clamp-2">
                                {stream.description}
                            </p>

                            {/* Mentor Info */}
                            {stream.defaultMentor && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 p-2 rounded-lg">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-[10px] text-white font-bold">
                                        {stream.defaultMentor.user.name?.[0] || "M"}
                                    </div>
                                    <span>Lead Mentor: <span className="text-foreground font-medium">{stream.defaultMentor.user.name}</span></span>
                                </div>
                            )}

                            {/* Stats */}
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Database className="w-3 h-3" />
                                    <span>{stream._count.students} Students</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Server className="w-3 h-3" />
                                    <span>5 Projects</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                            {isEnrolled ? (
                                <Button className="w-full gap-2" variant="outline" onClick={() => router.push(`/dashboard/student/lms/${stream.slug}`)}>
                                    Continue Learning <ArrowRight className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    className="w-full gap-2"
                                    onClick={() => handleJoin(stream.slug)}
                                    disabled={isPending}
                                >
                                    {isPending ? "Joining..." : "Join Stream"}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
