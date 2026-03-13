"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Video, FileVideo } from "lucide-react";

interface RecordedSessionsProps {
    courseId: string;
}

export function RecordedSessions({ courseId }: RecordedSessionsProps) {
    // Mock data for now - real implementation uses fetchMeetRecordings
    const recordings = [
        { id: 1, title: "Lecture 1: Introduction", date: "Jan 28, 2026", duration: "45:00", thumbnail: null },
        { id: 2, title: "Lecture 2: Advanced Topics", date: "Jan 30, 2026", duration: "52:20", thumbnail: null },
    ];

    return (
        <Card className="border-white/10 bg-white/5">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Video className="h-5 w-5 text-red-500" />
                    Recorded Sessions Library
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                    View All
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recordings.map((rec) => (
                        <div key={rec.id} className="group relative rounded-lg border border-white/10 bg-black/20 overflow-hidden hover:border-primary/50 transition-colors">
                            <div className="aspect-video bg-gray-900 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                                <PlayCircle className="h-12 w-12 text-white/50 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                            </div>
                            <div className="p-3">
                                <h4 className="font-medium text-sm line-clamp-1">{rec.title}</h4>
                                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                    <span>{rec.date}</span>
                                    <span>{rec.duration}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {recordings.length === 0 && (
                        <div className="col-span-full py-8 text-center text-muted-foreground flex flex-col items-center">
                            <FileVideo className="h-8 w-8 mb-2 opacity-50" />
                            <p>No recordings found for this class yet.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
