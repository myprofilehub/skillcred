import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, ExternalLink } from "lucide-react";
import { getStudentSchedule } from "@/app/actions/student-dashboard";
import Link from "next/link";

export default async function StudentSchedulePage() {
    const session = await auth();
    if (!session?.user) redirect("/auth/signin");

    const schedule = await getStudentSchedule();

    if ("error" in schedule) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">My Schedule</h1>
                <Card className="border-destructive/50 bg-destructive/10">
                    <CardContent className="p-6">
                        <p className="text-destructive">{schedule.error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Group events by date
    const groupedEvents = schedule.reduce((acc, event) => {
        const date = new Date(event.start).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
        });
        if (!acc[date]) acc[date] = [];
        acc[date].push(event);
        return acc;
    }, {} as Record<string, typeof schedule>);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-heading">My Schedule</h1>
                    <p className="text-muted-foreground">Upcoming classes and sessions for the next 7 days</p>
                </div>
            </div>

            {Object.keys(groupedEvents).length === 0 ? (
                <Card className="border-dashed bg-white/5">
                    <CardContent className="p-12 text-center">
                        <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                        <h3 className="text-lg font-semibold mb-2">No Upcoming Classes</h3>
                        <p className="text-muted-foreground">
                            You don't have any scheduled classes in the next 7 days.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6">
                    {Object.entries(groupedEvents).map(([date, events]) => (
                        <div key={date}>
                            <h2 className="text-lg font-semibold mb-3 text-muted-foreground">{date}</h2>
                            <div className="space-y-3">
                                {events.map((event) => {
                                    const startTime = new Date(event.start).toLocaleTimeString("en-US", {
                                        hour: "numeric",
                                        minute: "2-digit",
                                    });
                                    const endTime = event.end
                                        ? new Date(event.end).toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit",
                                        })
                                        : null;
                                    const isNow = new Date(event.start) <= new Date() &&
                                        (!event.end || new Date(event.end) >= new Date());

                                    return (
                                        <Card
                                            key={event.id}
                                            className={`border-white/10 ${isNow ? "bg-green-500/10 border-green-500/30" : "bg-white/5"
                                                }`}
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isNow ? "bg-green-500/20" : "bg-primary/10"
                                                            }`}>
                                                            {event.meetLink ? (
                                                                <Video className={`w-6 h-6 ${isNow ? "text-green-500" : "text-primary"}`} />
                                                            ) : (
                                                                <Calendar className="w-6 h-6 text-primary" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold">{event.title}</h3>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Clock className="w-3 h-3" />
                                                                <span>{startTime}{endTime ? ` - ${endTime}` : ""}</span>
                                                                {isNow && (
                                                                    <Badge className="bg-green-500 text-white text-xs">
                                                                        Live Now
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {event.meetLink && (
                                                        <Link href={event.meetLink} target="_blank">
                                                            <Button
                                                                className={`gap-2 ${isNow
                                                                        ? "bg-green-500 hover:bg-green-600 text-white"
                                                                        : ""
                                                                    }`}
                                                                variant={isNow ? "default" : "outline"}
                                                            >
                                                                <ExternalLink className="w-4 h-4" />
                                                                {isNow ? "Join Now" : "Join"}
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
