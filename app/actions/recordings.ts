"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getConferenceRecords, getConferenceRecordings } from "@/lib/google";
import { revalidatePath } from "next/cache";

// --- Types ---

export type RecordingFilter = {
    type?: "LIVE_SESSION" | "PRE_RECORDED";
    stream?: string; // Track slug
    classroomId?: string; // Google Classroom ID
};

// --- Actions ---

export async function getRecordings(filter: RecordingFilter) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    const where: any = {};

    if (filter.type) {
        where.type = filter.type;
    }

    // Filter by Stream (Track)
    if (filter.stream) {
        // Find track by slug first
        const track = await prisma.track.findUnique({
            where: { slug: filter.stream }
        });
        if (track) {
            where.trackId = track.id;
        }
    }

    // Filter by Classroom
    if (filter.classroomId) {
        // Find GoogleClassroom ID by googleCourseId
        const classroom = await prisma.googleClassroom.findUnique({
            where: { googleCourseId: filter.classroomId }
        });
        if (classroom) {
            where.googleClassroomId = classroom.id;
        }
    }

    try {
        const recordings = await prisma.recording.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                googleClassroom: true,
                track: true
            }
        });
        return recordings;
    } catch (error) {
        console.error("Error fetching recordings:", error);
        return { error: "Failed to fetch recordings" };
    }
}

export async function syncClassroomRecordings(googleCourseId: string) {
    const session = await auth();
    if (!session?.user || !session.accessToken) return { error: "Unauthorized or missing token" };

    try {
        // 1. Get Classroom & Meet Link from DB
        const classroom = await prisma.googleClassroom.findUnique({
            where: { googleCourseId }
        });

        if (!classroom || !classroom.meetLink) {
            return { error: "Classroom not found or no Meet link linked." };
        }

        // 2. Extract Meeting Code
        // Link formats: https://meet.google.com/abc-defg-hij or https://meet.google.com/lookup/randomstring
        // The API filters by 'space.name' or we filter manually.
        // Simple extraction for standard links:
        const codeMatch = classroom.meetLink.match(/meet\.google\.com\/([a-z0-9-]+)/);
        if (!codeMatch) return { error: "Invalid Meet Link format" };

        const meetCode = codeMatch[1].replace(/-/g, ""); // Remove dashes for stricter comparison if needed, but API usually takes dashes? 
        // Actually conferenceRecords usually don't expose the "lookup" alias directly in list lightly.
        // We will fetch ALL recent records and filter those that match. 
        // Note: 'lookup' links redirect to real codes. The DB might have the lookup link.
        // If it's a lookup link, we might be out of luck unless we resolve it.
        // Assuming standard code for now.

        // 3. Fetch Recent Conferences
        const records = await getConferenceRecords(session.accessToken);

        let syncedCount = 0;

        // 4. Iterate and Match
        // Google Meet API `space.meetingCode` is what we look for.
        for (const record of records as any[]) {
            if (!record.space?.meetingCode) continue;

            // Compare codes (ignoring dashes)
            const recordCode = record.space.meetingCode.replace(/-/g, "");
            const targetCode = meetCode.replace(/-/g, "");

            if (recordCode === targetCode) {
                // Found a match! Fetch its recordings.
                const recordingsData = await getConferenceRecordings(session.accessToken, record.name); // record.name is the resource ID

                for (const rec of recordingsData as any[]) {
                    // 5. Upsert Recording
                    // rec.driveDestination.file is the ID in some versions, or it might be deeper.
                    // The API typically returns driveDestination: { file: 'ID', ... }

                    const fileId = rec.driveDestination?.file; // correct field is usually 'file' which is the ID string
                    const exportUri = rec.driveDestination?.exportUri;

                    const url = exportUri || (fileId ? `https://drive.google.com/file/d/${fileId}/view` : "");

                    if (!url) continue;

                    const startTime = record.startTime ? new Date(record.startTime) : new Date();
                    const title = `Live Session - ${startTime.toLocaleDateString()}`;

                    const existing = await prisma.recording.findFirst({
                        where: { url }
                    });

                    if (!existing) {
                        await prisma.recording.create({
                            data: {
                                title,
                                url,
                                type: "LIVE_SESSION",
                                googleClassroomId: classroom.id,
                                meetCode: record.space.meetingCode, // Store actual code used
                                createdAt: startTime
                            }
                        });
                        syncedCount++;
                    }
                }
            }
        }

        revalidatePath("/dashboard/mentor/recordings");
        return { success: true, syncedCount };

    } catch (error) {
        console.error("Sync Error:", error);
        return { error: "Failed to sync recordings" };
    }
}

export async function createManualRecording(data: { title: string, url: string, description?: string, trackId: string, isPublic: boolean }) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    try {
        await prisma.recording.create({
            data: {
                title: data.title,
                url: data.url,
                description: data.description,
                type: "PRE_RECORDED",
                trackId: data.trackId,
                isPublic: data.isPublic
            }
        });
        revalidatePath("/dashboard/mentor/recordings");
        return { success: true };
    } catch (error) {
        console.error("Create Error:", error);
        return { error: "Failed to create recording" };
    }
}
