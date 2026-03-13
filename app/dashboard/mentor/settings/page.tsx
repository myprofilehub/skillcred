import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { SettingsForm } from "./settings-form";

export default async function MentorSettingsPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");

    // Fetch fresh user data including preferences
    const user = await prisma.user.findUnique({
        where: { id: session.user.id }
    });

    if (!user) redirect("/auth/signin");

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-heading">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>
            <Separator />

            <SettingsForm user={user} />
        </div>
    );
}

