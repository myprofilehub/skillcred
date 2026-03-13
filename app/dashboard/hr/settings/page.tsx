import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, User, Mail, Shield } from "lucide-react";

export default async function HRSettingsPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/signin");
    }

    if (session.user.role !== "HR") {
        redirect("/dashboard/student");
    }

    // Get HR profile
    const hrProfile = await prisma.hRProtocol.findUnique({
        where: { userId: session.user.id },
    });

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            name: true,
            email: true,
            image: true,
            emailNotifications: true,
        },
    });

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account and company information
                </p>
            </div>

            {/* Profile Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profile Information
                    </CardTitle>
                    <CardDescription>
                        Your personal account details
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            defaultValue={user?.name || ""}
                            placeholder="Your name"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="flex gap-2">
                            <Input
                                id="email"
                                defaultValue={user?.email || ""}
                                disabled
                                className="flex-1"
                            />
                            <Badge variant="outline" className="self-center">
                                <Shield className="h-3 w-3 mr-1" />
                                Verified
                            </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Email cannot be changed for security reasons.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Company Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Company Information
                    </CardTitle>
                    <CardDescription>
                        Your organization details shown to candidates
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                            id="company"
                            defaultValue={hrProfile?.company || ""}
                            placeholder="Your company name"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="position">Your Position</Label>
                        <Input
                            id="position"
                            defaultValue={hrProfile?.position || ""}
                            placeholder="e.g. HR Manager, Talent Acquisition"
                        />
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                        Save Changes
                    </Button>
                </CardContent>
            </Card>

            {/* Notifications Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Notification Preferences
                    </CardTitle>
                    <CardDescription>
                        Control how you receive updates
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">
                                Receive updates when candidates respond to your requests
                            </p>
                        </div>
                        <Button variant="outline" size="sm">
                            {user?.emailNotifications ? "Enabled" : "Disabled"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
