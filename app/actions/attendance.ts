"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { AttendanceStatus } from "@prisma/client";

export async function saveAttendanceSession(
    courseId: string,
    log: any,
    attendanceData: { studentId: string; status: AttendanceStatus }[]
) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        // 1. Get or Create GoogleClassroom record
        // (Ideally should exist, but create if missing to link session)
        let googleClassroom = await prisma.googleClassroom.findUnique({
            where: { googleCourseId: courseId }
        });

        const internalClassroomId = googleClassroom?.id;

        // 2. Check overlap
        const existingSession = await prisma.attendanceSession.findUnique({
            where: {
                googleCourseId_startTime: {
                    googleCourseId: courseId,
                    startTime: new Date(log.startTime)
                }
            }
        });

        if (existingSession) {
            return { error: "Session already verified!" };
        }

        // 3. Create Session with Precise Records
        const newSession = await prisma.attendanceSession.create({
            data: {
                googleCourseId: courseId,
                googleClassroomId: internalClassroomId,
                startTime: new Date(log.startTime),
                endTime: new Date(log.endTime),
                durationMinutes: Math.round(new Date(log.endTime).getTime() - new Date(log.startTime).getTime()) / 60000,
                meetCode: log.conferenceId,
                verifiedBy: session.user.id,
                records: {
                    create: attendanceData.map(record => ({
                        studentId: record.studentId,
                        status: record.status
                    }))
                }
            }
        });

        revalidatePath(`/dashboard/mentor/students/${courseId}`);
        return { success: true, count: attendanceData.length };

    } catch (error) {
        console.error("Save Attendance failed:", error);
        return { error: "Failed to save attendance." };
    }
}

/**
 * Verify a single session - simplified version of saveAttendanceSession
 * Used by the verify-session-button component
 */
export async function verifySession(
    courseId: string,
    sessionId: string,
    log: { startTime: string; endTime: string; conferenceId?: string }
) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        // Check if already verified
        const existing = await prisma.attendanceSession.findUnique({
            where: {
                googleCourseId_startTime: {
                    googleCourseId: courseId,
                    startTime: new Date(log.startTime)
                }
            }
        });

        if (existing) {
            return { error: "Session already verified" };
        }

        // Create verified session record
        await prisma.attendanceSession.create({
            data: {
                googleCourseId: courseId,
                startTime: new Date(log.startTime),
                endTime: new Date(log.endTime),
                durationMinutes: Math.round((new Date(log.endTime).getTime() - new Date(log.startTime).getTime()) / 60000),
                meetCode: log.conferenceId,
                verifiedBy: session.user.id
            }
        });

        revalidatePath(`/dashboard/mentor/students/${courseId}`);
        return { success: true };
    } catch (error) {
        console.error("Verify session failed:", error);
        return { error: "Failed to verify session" };
    }
}
