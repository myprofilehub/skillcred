"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface UpNextWidgetProps {
    event: any;
}

export function UpNextWidget({ event }: UpNextWidgetProps) {
    if (!event) {
        return (
            <Card className="h-full border-dashed bg-muted/20">
                <CardContent className="flex flex-col items-center justify-center h-full py-8 text-muted-foreground">
                    <Calendar className="w-10 h-10 mb-2 opacity-20" />
                    <p>No upcoming sessions.</p>
                </CardContent>
            </Card>
        );
    }

    const isLive = event.isLive;
    const startTime = new Date(event.start);
    const endTime = new Date(event.end);

    return (
        <Card className={`h-full overflow-hidden relative group ${isLive ? 'border-green-500/50 bg-green-500/5' : 'hover:border-primary/50'}`}>
            {isLive && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-bl-lg animate-pulse">
                    LIVE NOW
                </div>
            )}

            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    {isLive ? <Video className="w-4 h-4 text-green-500" /> : <Calendar className="w-4 h-4" />}
                    {isLive ? "Happening Now" : "Up Next"}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="text-xl font-bold line-clamp-2 leading-tight mb-1">{event.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{event.resource?.name || "General Session"}</p>
                </div>

                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 bg-background/50 px-2 py-1 rounded border">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-medium">
                            {format(startTime, "h:mm a")} - {format(endTime, "h:mm a")}
                        </span>
                    </div>
                </div>

                {isLive || (startTime.getTime() - Date.now() < 15 * 60 * 1000) ? (
                    <Button className={`w-full gap-2 ${isLive ? 'bg-green-600 hover:bg-green-700' : ''}`} asChild>
                        <Link href={event.resource?.meetLink || event.resource?.alternateLink || "#"} target="_blank">
                            <Video className="w-4 h-4" />
                            {isLive ? "Join Class Now" : "Launch Class"}
                        </Link>
                    </Button>
                ) : (() => {
                    const diffMs = startTime.getTime() - Date.now();
                    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

                    let timeStr = "";
                    if (diffDays > 0) {
                        timeStr = `${diffDays}d ${diffHours}h`;
                    } else if (diffHours > 0) {
                        timeStr = `${diffHours}h ${diffMins}m`;
                    } else {
                        timeStr = `${diffMins} mins`;
                    }

                    return (
                        <Button variant="outline" className="w-full gap-2" disabled>
                            Starts in {timeStr}
                        </Button>
                    );
                })()}
            </CardContent>
        </Card>
    );
}
