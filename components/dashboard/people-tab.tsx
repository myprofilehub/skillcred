"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Mail, MoreVertical, Trash2 } from "lucide-react";
import { inviteStudentAction } from "@/app/actions/google-classroom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface PeopleTabProps {
    courseId: string;
    people: {
        students: any[];
        teachers: any[];
    };
}

export function PeopleTab({ courseId, people }: PeopleTabProps) {
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviting, setInviting] = useState(false);

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmail) return;

        setInviting(true);
        const result = await inviteStudentAction(courseId, inviteEmail);
        setInviting(false);

        if (result.success) {
            toast.success("Invitation sent successfully!");
            setInviteEmail("");
        } else {
            toast.error(`Failed to invite: ${result.error}`);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Teachers Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2 border-primary/20">
                    <h3 className="text-2xl font-semibold text-primary">Teachers</h3>
                </div>
                <div className="space-y-1">
                    {people.teachers.map((teacher) => (
                        <div key={teacher.userId} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={teacher.profile.photoUrl} />
                                    <AvatarFallback>{teacher.profile.name.fullName[0]}</AvatarFallback>
                                </Avatar>
                                <span>{teacher.profile.name.fullName}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Students Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2 border-primary/20">
                    <h3 className="text-2xl font-semibold text-primary">Students</h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        {people.students.length} students
                    </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg border border-white/5 mb-6">
                    <form onSubmit={handleInvite} className="flex gap-2 items-center">
                        <Input
                            placeholder="Invite student by email..."
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            className="bg-background"
                        />
                        <Button type="submit" disabled={inviting}>
                            {inviting ? "Inviting..." : <><UserPlus className="w-4 h-4 mr-2" /> Invite</>}
                        </Button>
                    </form>
                </div>

                <div className="space-y-1">
                    {people.students.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">No students yet. Invite them above!</p>
                    ) : (
                        people.students.map((student) => (
                            <div key={student.userId} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors group">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={student.profile.photoUrl} />
                                        <AvatarFallback>{student.profile.name.fullName?.[0] || "?"}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{student.profile.name.fullName}</div>
                                        {/* Google Classroom API often doesn't give email directly unless scope is broad, but we can try */}
                                        {/* <div className="text-xs text-muted-foreground">{student.profile.emailAddress}</div> */}
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="text-red-500 focus:text-red-500">
                                            <Trash2 className="w-4 h-4 mr-2" /> Remove
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
