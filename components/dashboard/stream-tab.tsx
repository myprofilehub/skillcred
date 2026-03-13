"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createAnnouncementAction } from "@/app/actions/google-classroom";
import { toast } from "sonner";
import { Loader2, Send, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface StreamTabProps {
    courseId: string;
    announcements: any[];
    user: any;
}

export function StreamTab({ courseId, announcements, user }: StreamTabProps) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = async () => {
        if (!text.trim()) return;
        setLoading(true);

        const result = await createAnnouncementAction(courseId, text);
        setLoading(false);

        if (result.success) {
            toast.success("Announcement posted!");
            setText("");
            setIsExpanded(false);
            // Ideally optimistic update or router refresh here, assume parent handles refresh or we force it?
            // The action revalidates the path, so Next.js should handle it.
        } else {
            toast.error("Failed to post announcement");
        }
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* Create Announcement Input */}
            <Card className="border shadow-sm">
                <CardContent className="p-4">
                    <div className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={user?.image} />
                            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                            {isExpanded ? (
                                <>
                                    <Textarea
                                        placeholder="Announce something to your class"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="min-h-[100px]"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" onClick={() => setIsExpanded(false)}>Cancel</Button>
                                        <Button onClick={handleSubmit} disabled={loading} className="gap-2">
                                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                            Post
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div
                                    className="p-3 bg-muted/30 rounded-md text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors text-sm"
                                    onClick={() => setIsExpanded(true)}
                                >
                                    Announce something to your class...
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Announcements List */}
            <div className="space-y-4">
                {announcements.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg border-dashed bg-muted/20">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium">No announcements yet</h3>
                        <p className="text-muted-foreground">Communicate with your class!</p>
                    </div>
                ) : (
                    announcements.map((announcement) => (
                        <Card key={announcement.id} className="border shadow-sm">
                            <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3 space-y-0">
                                <Avatar className="w-10 h-10">
                                    {/* Google API doesn't always return creator profile pic directly here easily w/o extra call, using generic fallback or mapping if available */}
                                    <AvatarFallback>T</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-semibold text-sm">Teacher</div> {/* Name fetching requires user profile lookup */}
                                    <div className="text-xs text-muted-foreground">
                                        {new Date(announcement.creationTime).toLocaleDateString()}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                                <p className="whitespace-pre-wrap text-sm leading-relaxed">{announcement.text}</p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
