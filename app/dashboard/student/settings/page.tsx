import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import ClientSettings from "./client-settings";

export default async function SettingsPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/api/auth/signout");
    }

    // Fetch comprehensive user data
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            studentProfile: {
                include: {
                    portfolio: true
                }
            }
        }
    });

    if (!user) {
        redirect("/api/auth/signout");
    }

    // Prepare data payload for client component
    const settingsData = {
        name: user.name || "",
        username: user.username || "",
        email: user.email || user.lmsEmail || "",
        headline: user.studentProfile?.portfolio?.headline || "",
        bio: user.studentProfile?.bio || user.studentProfile?.portfolio?.bio || "",
        emailNotifications: user.emailNotifications,
        projectUpdateNotifications: user.projectUpdateNotifications,
        subscription: user.studentProfile?.subscription || "FREE"
    };

    return <ClientSettings data={settingsData} />;
}
