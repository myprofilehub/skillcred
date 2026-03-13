"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { syncClassroomRecordings } from "@/app/actions/recordings";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Assuming sonner is set up, or remove if not. toast usually in hooks/use-toast.
// Let's use simple alert or try/catch if toast isn't verified. 
// I'll skip toast import and just use basic state or assume simple feedback.

export function SyncRecordingsButton({ googleCourseId }: { googleCourseId: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSync = async () => {
        setLoading(true);
        const result = await syncClassroomRecordings(googleCourseId);
        setLoading(false);

        if (result.success) {
            // toast.success(`Synced ${result.syncedCount} new recordings`);
            router.refresh();
        } else {
            console.error(result.error);
            // toast.error("Sync failed");
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleSync}
            disabled={loading}
            className="h-8 gap-2 text-xs text-muted-foreground hover:text-primary"
        >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Syncing..." : "Sync from Meet"}
        </Button>
    );
}
