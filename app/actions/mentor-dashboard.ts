"use server";

import { cache } from "react";
import { auth } from "@/auth";
import { fetchClassrooms } from "@/app/actions/google-classroom";
import { getScheduleEvents } from "@/app/actions/schedule";
import { addMinutes, isAfter, isBefore } from "date-fns";

// Memoize this function per request to prevent duplicate API calls
export const getDashboardStats = cache(async function getDashboardStatsInternal() {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    try {
        // 1. Fetch Core Data (Parallel)
        const [classrooms, eventsResult] = await Promise.all([
            fetchClassrooms(),
            getScheduleEvents()
        ]);

        const validClassrooms = Array.isArray(classrooms) ? classrooms : [];

        // Handle potential error from getScheduleEvents - it returns { events: [...] } or { error: string }
        let validEvents: any[] = [];
        if (eventsResult && typeof eventsResult === 'object') {
            if ('events' in eventsResult && Array.isArray((eventsResult as any).events)) {
                validEvents = (eventsResult as any).events;
            }
        }

        // 2. Process Stats
        const totalStudents = validClassrooms.reduce((acc: number, c: any) => acc + (c.students?.length || 0), 0);
        const activeCourses = validClassrooms.length;

        // 3. Find "Up Next" Session
        const now = new Date();

        const futureEvents = validEvents
            .filter((e: any) => {
                const start = new Date(e.start);
                return start > now;
            })
            .sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime());

        const nextEvent = futureEvents[0] || null;

        // Check if "Live Now" (Event started less than 60 mins ago and hasn't ended)
        const liveNowEvent = validEvents.find((e: any) => {
            const start = new Date(e.start);
            const end = new Date(e.end);
            return isBefore(start, now) && isAfter(end, now);
        });

        // 4. Calculate Pending Actions (Mock/Derived for now)
        // In a real scenario, we'd fetch ungraded assignments here.
        // For now, we'll use "Assignments due today" as a proxy for attention needed.
        const pendingReviews = 5; // Placeholder
        const upcomingSessions = futureEvents.filter((e: any) => e.eventType === "COURSE").length;


        return {
            stats: {
                totalStudents,
                activeCourses,
                pendingReviews,
                upcomingSessions
            },
            upNext: liveNowEvent ? { ...liveNowEvent, isLive: true } : (nextEvent ? { ...nextEvent, isLive: false } : null),
            recentClassrooms: validClassrooms.slice(0, 3)
        };

    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return { error: "Failed to load dashboard data" };
    }
});

/**
 * Fetches action items for the mentor dashboard:
 * 1. Ungraded assignments from Google Classroom
 * 2. Pending attendance verification sessions
 */
export async function getActionItems() {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    try {
        const { getClassrooms, getCourseWork, getCourseWorkStudentSubmissions } = await import("@/lib/google");
        const { prisma } = await import("@/lib/db");

        // 1. Fetch all classrooms
        const classrooms = await getClassrooms(session.accessToken);
        if (!Array.isArray(classrooms)) {
            return { ungradedCount: 0, pendingAttendanceCount: 0, classroomsWithPendingAttendance: [] };
        }

        // 2. Count ungraded submissions across all courses
        let ungradedCount = 0;
        const ungradedByClass: { courseId: string; courseName: string; count: number }[] = [];
        const accessToken = session.accessToken as string;

        for (const course of classrooms) {
            const courseWorks = await getCourseWork(accessToken, course.id!);
            if (!Array.isArray(courseWorks)) continue;

            let courseUngradedCount = 0;
            for (const work of courseWorks) {
                const submissions = await getCourseWorkStudentSubmissions(accessToken, course.id!, work.id!);
                if (!Array.isArray(submissions)) continue;

                // Count submissions that are TURNED_IN but not yet graded
                const ungraded = submissions.filter((s: any) =>
                    s.state === "TURNED_IN" && !s.assignedGrade
                );
                courseUngradedCount += ungraded.length;
            }

            if (courseUngradedCount > 0) {
                ungradedByClass.push({
                    courseId: course.id || "",
                    courseName: course.name || "",
                    count: courseUngradedCount
                });
            }
            ungradedCount += courseUngradedCount;
        }

        // 3. Check for pending attendance verification
        // Find calendar events from the past that don't have a corresponding AttendanceSession
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Get verified sessions from DB
        const verifiedSessions = await prisma.attendanceSession.findMany({
            where: {
                startTime: {
                    gte: oneWeekAgo,
                    lte: now
                }
            },
            select: {
                googleCourseId: true,
                startTime: true
            }
        });

        // Compare with calendar events to find unverified ones
        const eventsResult = await getScheduleEvents();
        let pendingAttendanceCount = 0;
        const classroomsWithPendingAttendance: { courseId: string; courseName: string; eventDate: string }[] = [];

        if (eventsResult && 'events' in eventsResult) {
            const pastEvents = (eventsResult as any).events.filter((e: any) => {
                const endTime = new Date(e.end);
                return endTime < now && endTime >= oneWeekAgo && e.type === "CLASS";
            });

            for (const event of pastEvents) {
                // Check if this event has been verified
                const isVerified = verifiedSessions.some(s => {
                    const sessionDate = new Date(s.startTime).toDateString();
                    const eventDate = new Date(event.start).toDateString();
                    return sessionDate === eventDate;
                });

                if (!isVerified) {
                    pendingAttendanceCount++;
                    // Find the course name from classrooms
                    const course = classrooms.find((c: any) =>
                        event.title?.includes(c.name) || event.resource?.courseId === c.id
                    );
                    if (course) {
                        classroomsWithPendingAttendance.push({
                            courseId: course.id || "",
                            courseName: course.name || "",
                            eventDate: new Date(event.start).toLocaleDateString()
                        });
                    }
                }
            }
        }

        return {
            ungradedCount,
            ungradedByClass,
            pendingAttendanceCount,
            classroomsWithPendingAttendance
        };

    } catch (error) {
        console.error("Error fetching action items:", error);
        return { error: "Failed to fetch action items" };
    }
}
