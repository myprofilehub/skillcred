"use server";

import { auth } from "@/auth";
import { getConferenceRecords } from "@/lib/google";
import { format } from "date-fns";

export async function getMeetingParticipants(courseId?: string) {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    try {
        const records = await getConferenceRecords(session.accessToken);

        if (!Array.isArray(records)) {
            console.error("Meet API Error:", records);
            return [];
        }

        // Filter by courseId if we could (Meet API doesn't link perfectly to Classroom ID in list view)
        // For now, we return all and maybe client-side filter or show all recent sessions.
        // Ideally, we'd look up the `spaceName` if we stored it when scheduling.

        const enhancedRecords = await Promise.all(records.map(async (record: any) => {
            const { getConferenceParticipants } = await import("@/lib/google");
            const participants = await getConferenceParticipants(session.accessToken!, record.name); // record.name is the ID

            return {
                id: record.name,
                startTime: record.startTime,
                endTime: record.endTime,
                duration: new Date(record.endTime).getTime() - new Date(record.startTime).getTime(),
                participants: Array.isArray(participants) ? participants : []
            };
        }));

        // Sort by recent first
        return enhancedRecords.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

    } catch (error) {
        console.error("Error fetching meet participants:", error);
        return [];
    }
}
