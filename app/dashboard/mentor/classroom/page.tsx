import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, School, ExternalLink, Plus, BookOpen, MessageSquare, Calendar, RefreshCw, Video } from "lucide-react";
import Link from "next/link";
import { fetchClassrooms } from "@/app/actions/google-classroom";
import { SetMeetLinkDialog } from "@/components/dashboard/set-meet-link-dialog";
import { CreateClassDialog } from "@/components/dashboard/create-class-dialog";


import { ClassroomCard } from "@/components/dashboard/classroom-card";
import { ClassroomList } from "@/components/dashboard/classroom-list";

export default async function ClassroomPage() {
    const classroomsData = await fetchClassrooms();
    const classrooms = Array.isArray(classroomsData) ? classroomsData : [];
    const error = !Array.isArray(classroomsData) ? classroomsData.error : null;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Classroom Management</h1>
                    <p className="text-muted-foreground">Sync and manage your Google Classrooms.</p>
                </div>
                <div className="flex gap-2">
                    <form action={async () => {
                        "use server";
                        // Next.js will revalidate the page automatically on form submission if we used revalidatePath
                        // But for now, a simple refresh button is okay, the page load does the fetch.
                    }}>
                        <Button variant="outline" className="gap-2">
                            <RefreshCw className="w-4 h-4" /> Refresh List
                        </Button>
                    </form>
                    <Link href="https://classroom.google.com" target="_blank">
                        <Button variant="outline" className="gap-2 mr-2">
                            <ExternalLink className="w-4 h-4" /> Go to Google Classroom
                        </Button>
                    </Link>
                    <CreateClassDialog />
                </div>
            </div>

            {error && (
                <div className="p-6 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="font-semibold text-blue-400 text-lg">Connect Google Classroom</h3>
                        <p className="text-muted-foreground text-sm">{error || "Authentication required."} Link your Google Workspace account to sync classrooms.</p>
                    </div>
                    <form action={async () => {
                        "use server";
                        const { auth } = await import("@/auth");
                        const session = await auth();
                        const { googleLogin } = await import("@/actions/login");
                        await googleLogin("/dashboard/mentor/classroom", session?.user?.email || undefined);
                    }}>
                        <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white border-0 gap-2">
                            <School className="w-4 h-4" />
                            Connect Google Account
                        </Button>
                    </form>
                </div>
            )}



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ClassroomList classrooms={classrooms} />
            </div>
        </div>
    );
}
