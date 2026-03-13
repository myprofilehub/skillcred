"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { LogOut, Save } from "lucide-react";
import { updateProfileSettings, updateNotificationSettings } from "@/app/actions/settings";
import { signOut } from "next-auth/react";

interface SettingsFormProps {
    user: any; // Type strictly if possible, using any for speed now
}

export function SettingsForm({ user }: SettingsFormProps) {
    const [name, setName] = useState(user.name || "");
    const [emailNotif, setEmailNotif] = useState(user.emailNotifications ?? true);
    const [projectNotif, setProjectNotif] = useState(user.projectUpdateNotifications ?? true);
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    async function handleProfileUpdate() {
        setIsSavingProfile(true);
        const res = await updateProfileSettings({ name });
        setIsSavingProfile(false);
        if (res.error) {
            alert("Failed to update profile");
        } else {
            // Optional: toast success
        }
    }

    async function handleToggleEmail(checked: boolean) {
        setEmailNotif(checked); // Optimistic
        const res = await updateNotificationSettings({ emailNotifications: checked });
        if (res.error) setEmailNotif(!checked); // Revert
    }

    async function handleToggleProject(checked: boolean) {
        setProjectNotif(checked);
        const res = await updateNotificationSettings({ projectUpdateNotifications: checked });
        if (res.error) setProjectNotif(!checked);
    }

    return (
        <div className="grid gap-6">
            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Your public profile information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.image || ""} />
                            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2 flex-1">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Display Name</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-background/50"
                                    />
                                    <Button
                                        onClick={handleProfileUpdate}
                                        disabled={isSavingProfile || name === user.name}
                                        size="sm"
                                    >
                                        {isSavingProfile ? "Saving..." : <Save className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-xs text-muted-foreground">Email</Label>
                                <div className="text-sm font-medium text-muted-foreground">{user.email}</div>
                            </div>
                            <div className="grid gap-1">
                                <Label className="text-xs text-muted-foreground">Role</Label>
                                <div className="text-xs text-muted-foreground capitalize px-2 py-0.5 rounded-full bg-primary/20 text-primary w-fit">
                                    {user.role?.toLowerCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you receive alerts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive emails about student submissions.</p>
                        </div>
                        <Switch
                            checked={emailNotif}
                            onCheckedChange={handleToggleEmail}
                            aria-label="Email Notifications"
                        />
                    </div>
                    <Separator className="bg-white/10" />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Project Updates</Label>
                            <p className="text-sm text-muted-foreground">Get notified when a student submits a project.</p>
                        </div>
                        <Switch
                            checked={projectNotif}
                            onCheckedChange={handleToggleProject}
                            aria-label="Project Updates"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-red-500/20 bg-red-500/5">
                <CardHeader>
                    <CardTitle className="text-red-500">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Using client-side signOut for better handled redirect */}
                    <Button
                        variant="destructive"
                        className="w-full sm:w-auto"
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
