import { getAdminRecordings } from "@/app/actions/admin-recordings";
import { prisma } from "@/lib/db";
import { RecordingsList } from "./recordings-list";
import { Video } from "lucide-react";

export default async function AdminRecordingsPage() {
    const { recordings } = await getAdminRecordings();
    
    // We need tracks for the upload dialog
    const tracks = await prisma.track.findMany({
        select: { id: true, title: true, slug: true },
        orderBy: { title: "asc" }
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                    <Video className="w-8 h-8 text-cyan-400" />
                    Video Library
                </h1>
                <p className="text-slate-400 mt-1">
                    Manage pre-recorded masterclasses and live session recordings
                </p>
            </div>

            <RecordingsList initialRecordings={recordings || []} tracks={tracks} />
        </div>
    );
}
