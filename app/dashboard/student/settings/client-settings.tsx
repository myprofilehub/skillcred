"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Bell,
    CreditCard,
    Shield,
    Mail,
    Smartphone,
    Upload,
    Save
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useUserState } from "@/components/providers/user-state-provider";
import { updateStudentProfile, updateStudentNotifications, updateStudentPassword } from "@/app/actions/student-settings";

interface ClientSettingsProps {
    data: {
        name: string;
        username: string;
        email: string;
        headline: string;
        bio: string;
        emailNotifications: boolean;
        projectUpdateNotifications: boolean;
        subscription: string;
    };
}

export default function ClientSettings({ data }: ClientSettingsProps) {
    const { subscription, toggleSubscription } = useUserState(); // Keep Context for Dev Toggle

    // Profile State
    const [name, setName] = useState(data.name);
    const [username, setUsername] = useState(data.username);
    const [headline, setHeadline] = useState(data.headline);
    const [bio, setBio] = useState(data.bio);
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    // Notification State
    const [emailNotifs, setEmailNotifs] = useState(data.emailNotifications);
    const [projectNotifs, setProjectNotifs] = useState(data.projectUpdateNotifications);

    // Security State
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSavingPassword, setIsSavingPassword] = useState(false);

    const handleSaveProfile = async () => {
        setIsSavingProfile(true);
        const result = await updateStudentProfile({ name, username, headline, bio });
        setIsSavingProfile(false);

        if (result.success) {
            toast.success("Profile updated successfully!");
        } else {
            toast.error(result.error || "Failed to update profile.");
        }
    };

    const handleToggleEmailNotifs = async (checked: boolean) => {
        setEmailNotifs(checked);
        const result = await updateStudentNotifications({ emailNotifications: checked });
        if (!result.success) {
            setEmailNotifs(!checked); // Revert on fail
            toast.error("Failed to update notification preferences.");
        }
    };

    const handleToggleProjectNotifs = async (checked: boolean) => {
        setProjectNotifs(checked);
        const result = await updateStudentNotifications({ projectUpdateNotifications: checked });
        if (!result.success) {
            setProjectNotifs(!checked); // Revert on fail
            toast.error("Failed to update notification preferences.");
        }
    };

    const handleUpdatePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("All password fields are required.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        setIsSavingPassword(true);
        const result = await updateStudentPassword({ currentPassword, newPassword });
        setIsSavingPassword(false);

        if (result.success) {
            toast.success("Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } else {
            toast.error(result.error || "Failed to update password.");
        }
    };

    // Use initial DB subscription value if context differs? 
    // Usually Context overrides for UI testing based on previous implementation. 
    // We will stick to the Context's `subscription` variable.

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="bg-secondary/20 p-1 border border-white/5 w-full md:w-auto overflow-x-auto justify-start">
                    <TabsTrigger value="profile" className="gap-2"><User className="w-4 h-4" /> Profile</TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2"><Bell className="w-4 h-4" /> Notifications</TabsTrigger>
                    <TabsTrigger value="billing" className="gap-2"><CreditCard className="w-4 h-4" /> Billing</TabsTrigger>
                    <TabsTrigger value="account" className="gap-2"><Shield className="w-4 h-4" /> Account</TabsTrigger>
                </TabsList>

                {/* PROFILE TAB */}
                <TabsContent value="profile" className="space-y-6">
                    <Card className="border-white/10">
                        <CardHeader>
                            <CardTitle>Public Profile</CardTitle>
                            <CardDescription>This is how others will see you on the platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full bg-secondary/30 flex items-center justify-center text-3xl font-bold border-2 border-white/10 uppercase">
                                    {name.substring(0, 2) || "AJ"}
                                </div>
                                <div>
                                    <Button variant="outline" size="sm" className="gap-2 mb-2">
                                        <Upload className="w-4 h-4" /> Change Avatar
                                    </Button>
                                    <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max 1MB.</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Full Name</label>
                                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Username</label>
                                    <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="@username" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input value={data.email} disabled className="opacity-50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Headline</label>
                                    <Input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Full Stack Developer" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Bio</label>
                                <textarea
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Passionate about building scalable web applications..."
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="border-t border-white/5 pt-6 flex justify-end">
                            <Button onClick={handleSaveProfile} disabled={isSavingProfile}>
                                {isSavingProfile ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* NOTIFICATIONS TAB */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card className="border-white/10">
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Choose what you want to be notified about.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="font-medium flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-primary" /> Email Notifications
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium">General Announcements</div>
                                        <div className="text-xs text-muted-foreground">Platform updates and general emails.</div>
                                    </div>
                                    <Switch checked={emailNotifs} onCheckedChange={handleToggleEmailNotifs} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium">Project Updates</div>
                                        <div className="text-xs text-muted-foreground">Alerts related to your ongoing projects and assignments.</div>
                                    </div>
                                    <Switch checked={projectNotifs} onCheckedChange={handleToggleProjectNotifs} />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <h3 className="font-medium flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-primary" /> Push Notifications
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium">Live Session Reminders</div>
                                        <div className="text-xs text-muted-foreground">15 min before class starts.</div>
                                    </div>
                                    <Switch defaultChecked disabled />
                                </div>
                                <p className="text-xs text-muted-foreground italic">Push notifications are currently managed via the mobile app.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* BILLING TAB */}
                <TabsContent value="billing" className="space-y-6">
                    <Card className="border-white/10">
                        <CardHeader>
                            <CardTitle>Current Plan</CardTitle>
                            <CardDescription>View your active subscriptions.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-secondary/10 border border-white/5 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-2xl font-bold">{subscription === "PRO" ? "Pro Tier" : "Free Tier"}</h3>
                                        <Badge variant="outline" className={`border-${subscription === "PRO" ? "purple" : "green"}-500/30 text-${subscription === "PRO" ? "purple" : "green"}-400`}>Active</Badge>
                                    </div>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                        {subscription === "PRO" ? (
                                            <>
                                                <li>• Unlimited Course Access</li>
                                                <li>• Verified Portfolio & Certificate</li>
                                                <li>• Priority Mentor Support</li>
                                            </>
                                        ) : (
                                            <>
                                                <li>• Access to Recorded Sessions</li>
                                                <li>• Basic Profile Builder</li>
                                                <li>• Limited Project Verifications</li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                                {subscription === "FREE" && (
                                    <Link href="/dashboard/student/upgrade">
                                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0">
                                            Upgrade to Pro
                                        </Button>
                                    </Link>
                                )}
                            </div>

                            {/* TEST USER TOGGLE */}
                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-yellow-500 flex items-center gap-2">
                                            <Shield className="w-4 h-4" /> Developer Mode
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                            Toggle subscription status for testing purposes.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{subscription}</span>
                                        <Switch
                                            checked={subscription === "PRO"}
                                            onCheckedChange={toggleSubscription}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ACCOUNT TAB */}
                <TabsContent value="account" className="space-y-6">
                    <Card className="border-white/10">
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>Manage your password and security settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Current Password</label>
                                    <Input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">New Password</label>
                                    <Input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Confirm New Password</label>
                                    <Input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="mt-2"
                                onClick={handleUpdatePassword}
                                disabled={isSavingPassword || !currentPassword || !newPassword || !confirmPassword}
                            >
                                {isSavingPassword ? "Updating..." : "Update Password"}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-red-500/20 bg-red-500/5">
                        <CardHeader>
                            <CardTitle className="text-red-400">Danger Zone</CardTitle>
                            <CardDescription>Irreversible actions requiring confirmation.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-between items-center">
                            <div className="space-y-1">
                                <h4 className="font-medium">Delete Account</h4>
                                <p className="text-xs text-muted-foreground">Permanently remove your account and all data.</p>
                            </div>
                            <Button variant="destructive" size="sm">Delete Account</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
