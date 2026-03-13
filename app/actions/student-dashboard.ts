"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { google } from "googleapis";

// ============================================================================
// GET STUDENT'S ENROLLED CLASSROOMS
// ============================================================================
export async function getStudentClassrooms() {
    const session = await auth();
    if (!session?.user?.id || !session.accessToken || session.error) {
        return { error: "Not authenticated" };
    }

    try {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: session.accessToken });

        const classroom = google.classroom({ version: "v1", auth: oauth2Client });

        const response = await classroom.courses.list({
            studentId: "me",
            courseStates: ["ACTIVE"],
        });

        const courses = response.data.courses || [];

        const enrichedCourses = await Promise.all(
            courses.map(async (course) => {
                const localData = await prisma.googleClassroom.findFirst({
                    where: { googleCourseId: course.id || "" },
                });

                let mentorName = null;
                let mentorEmail = null;

                if (localData?.mentorId) {
                    const mentor = await prisma.mentor.findUnique({
                        where: { id: localData.mentorId },
                        include: { user: true }
                    });
                    if (mentor) {
                        mentorName = mentor.user.name;
                        mentorEmail = mentor.user.email;
                    }
                }

                return {
                    id: course.id || "",
                    name: course.name || "Untitled Course",
                    section: course.section,
                    descriptionHeading: course.descriptionHeading,
                    room: course.room,
                    alternateLink: course.alternateLink,
                    meetLink: localData?.meetLink || null,
                    mentorName,
                    mentorEmail,
                };
            })
        );

        return enrichedCourses;
    } catch (error) {
        console.error("Error fetching student classrooms:", error);
        return { error: "Failed to fetch classrooms" };
    }
}

// ============================================================================
// GET STUDENT'S UPCOMING SCHEDULE
// ============================================================================
export async function getStudentSchedule() {
    const session = await auth();
    if (!session?.user?.id || !session.accessToken || session.error) {
        return { error: "Not authenticated" };
    }

    try {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: session.accessToken });

        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        const now = new Date();
        const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const response = await calendar.events.list({
            calendarId: "primary",
            timeMin: now.toISOString(),
            timeMax: oneWeekLater.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
            maxResults: 20,
        });

        const events = response.data.items || [];

        const classEvents = events
            .filter((event) => (event.hangoutLink || event.conferenceData) && (event.start?.dateTime || event.start?.date))
            .map((event) => ({
                id: event.id || "",
                title: event.summary || "Untitled Event",
                description: event.description || null,
                start: (event.start?.dateTime || event.start?.date)!,
                end: event.end?.dateTime || event.end?.date || null,
                meetLink: event.hangoutLink || event.conferenceData?.entryPoints?.[0]?.uri || null,
                location: event.location || null,
                status: event.status || "confirmed",
            }));

        return classEvents;
    } catch (error) {
        console.error("Error fetching student schedule:", error);
        return { error: "Failed to fetch schedule" };
    }
}

// ============================================================================
// GET STUDENT'S ATTENDANCE RECORDS
// ============================================================================
export async function getMyAttendance() {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Not authenticated" };
    }

    try {
        // Fetch attendance sessions where this user has a record
        const attendanceSessions = await prisma.attendanceSession.findMany({
            where: {
                records: {
                    some: {
                        studentId: session.user.id, // User ID
                    },
                },
            },
            include: {
                records: {
                    where: { studentId: session.user.id },
                },
                googleClassroom: true,
            },
            orderBy: { startTime: "desc" },
            take: 50,
        });

        const stats = attendanceSessions.reduce((acc, session) => {
            const classroomId = session.googleClassroomId || "unknown";
            const classroomName = session.googleClassroom?.googleCourseId || "Unknown Class";

            if (!acc[classroomId]) {
                acc[classroomId] = {
                    classroomName,
                    total: 0,
                    present: 0,
                };
            }
            acc[classroomId].total++;
            if (session.records[0]?.status === "PRESENT") {
                acc[classroomId].present++;
            }
            return acc;
        }, {} as Record<string, { classroomName: string; total: number; present: number }>);

        return {
            sessions: attendanceSessions.map((s) => ({
                id: s.id,
                date: s.startTime,
                status: s.records[0]?.status || "UNKNOWN",
                classroomId: s.googleClassroomId,
                duration: s.durationMinutes,
            })),
            stats: Object.values(stats).map((s) => ({
                ...s,
                percentage: s.total > 0 ? Math.round((s.present / s.total) * 100) : 0,
            })),
        };
    } catch (error) {
        console.error("Error fetching attendance:", error);
        return { error: "Failed to fetch attendance" };
    }
}

// ============================================================================
// GET STUDENT'S ASSIGNMENTS
// ============================================================================
export async function getMyAssignments() {
    const session = await auth();
    if (!session?.user?.id || !session.accessToken || session.error) {
        return { error: "Not authenticated" };
    }

    try {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: session.accessToken });

        const classroom = google.classroom({ version: "v1", auth: oauth2Client });

        const coursesResponse = await classroom.courses.list({
            studentId: "me",
            courseStates: ["ACTIVE"],
        });

        const courses = coursesResponse.data.courses || [];
        const allAssignments: any[] = [];

        // Fetch coursework for each course
        // Note: Promise.all might hit rate limits, but for a student (few classes/assignments) it might be okay.
        // Serial for safety.
        for (const course of courses) {
            if (!course.id) continue;
            try {
                const courseWorkResponse = await classroom.courses.courseWork.list({
                    courseId: course.id,
                    orderBy: "dueDate desc",
                });

                const courseWorks = courseWorkResponse.data.courseWork || [];

                for (const work of courseWorks) {
                    if (!work.id) continue;
                    try {
                        const submissionsResponse = await classroom.courses.courseWork.studentSubmissions.list({
                            courseId: course.id,
                            courseWorkId: work.id,
                            userId: "me",
                        });

                        const submission = submissionsResponse.data.studentSubmissions?.[0];

                        allAssignments.push({
                            id: work.id,
                            courseId: course.id,
                            courseName: course.name || "Untitled Course",
                            title: work.title || "Untitled Assignment",
                            description: work.description,
                            dueDate: work.dueDate
                                ? new Date(
                                    work.dueDate.year!,
                                    (work.dueDate.month || 1) - 1,
                                    work.dueDate.day || 1
                                ).toISOString()
                                : null,
                            maxPoints: work.maxPoints,
                            state: submission?.state || "NEW",
                            grade: submission?.assignedGrade,
                            alternateLink: work.alternateLink,
                            submissionLink: submission?.alternateLink,
                        });
                    } catch {
                        // Ignore
                    }
                }
            } catch {
                // Ignore
            }
        }

        allAssignments.sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });

        return allAssignments;
    } catch (error) {
        console.error("Error fetching assignments:", error);
        return { error: "Failed to fetch assignments" };
    }
}

// ============================================================================
// GET STUDENT'S RECORDINGS
// ============================================================================
export async function getMyRecordings() {
    const session = await auth();
    if (!session?.user?.id || !session.accessToken || session.error) {
        return { error: "Not authenticated" };
    }

    try {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: session.accessToken });

        const classroom = google.classroom({ version: "v1", auth: oauth2Client });

        const coursesResponse = await classroom.courses.list({
            studentId: "me",
            courseStates: ["ACTIVE"],
        });

        const courses = coursesResponse.data.courses || [];
        const courseIds = courses.map((c) => c.id).filter((id): id is string => !!id);

        const localClassrooms = await prisma.googleClassroom.findMany({
            where: {
                googleCourseId: { in: courseIds },
            },
        });

        const localClassroomIds = localClassrooms.map((c) => c.id);

        const recordings = await prisma.recording.findMany({
            where: {
                OR: [
                    {
                        googleClassroomId: { in: localClassroomIds },
                        type: "LIVE_SESSION",
                    },
                    {
                        isPublic: true,
                        type: "PRE_RECORDED",
                    },
                ],
            },
            include: {
                track: true,
                googleClassroom: true,
            },
            orderBy: { createdAt: "desc" },
            take: 50,
        });

        const liveRecordings = recordings.filter((r) => r.type === "LIVE_SESSION");
        const libraryRecordings = recordings.filter((r) => r.type === "PRE_RECORDED");

        return {
            live: liveRecordings.map((r) => ({
                id: r.id,
                title: r.title,
                description: r.description,
                url: r.url,
                createdAt: r.createdAt,
                classroomId: r.googleClassroomId,
            })),
            library: libraryRecordings.map((r) => ({
                id: r.id,
                title: r.title,
                description: r.description,
                url: r.url,
                track: r.track?.title || "General",
                createdAt: r.createdAt,
            })),
        };
    } catch (error) {
        console.error("Error fetching recordings:", error);
        return { error: "Failed to fetch recordings" };
    }
}

// ============================================================================
// GET DASHBOARD SUMMARY
// ============================================================================
export async function getStudentDashboardSummary() {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Not authenticated" };
    }

    // Check for Google Token
    const hasGoogleToken = !!session.accessToken && !session.error;

    try {
        // If no Google Token, return empty data (Dashboard works in "Offline/Local" mode)
        if (!hasGoogleToken) {
            return {
                upNext: null,
                classroomsCount: 0,
                pendingAssignments: [],
                recentRecordings: [],
                overallAttendance: null,
                attendanceStats: [],
            };
        }

        const [classrooms, schedule, attendance, assignments, recordings] = await Promise.all([
            getStudentClassrooms(),
            getStudentSchedule(),
            getMyAttendance(),
            getMyAssignments(),
            getMyRecordings(),
        ]);

        const upNext = !("error" in schedule) && schedule.length > 0 ? schedule[0] : null;

        const pendingAssignments = !("error" in assignments)
            ? assignments.filter((a) => a.state !== "TURNED_IN" && a.state !== "RETURNED").slice(0, 5)
            : [];

        const recentRecordings = !("error" in recordings) ? recordings.live.slice(0, 3) : [];

        const overallAttendance =
            !("error" in attendance) && attendance.stats.length > 0
                ? Math.round(
                    attendance.stats.reduce((sum, s) => sum + s.percentage, 0) / attendance.stats.length
                )
                : null;

        return {
            upNext: upNext ? {
                id: upNext.id,
                title: upNext.title,
                start: upNext.start, // Guaranteed string
                meetLink: upNext.meetLink || undefined,
            } : null,
            classroomsCount: !("error" in classrooms) ? classrooms.length : 0,
            pendingAssignments,
            recentRecordings,
            overallAttendance,
            attendanceStats: !("error" in attendance) ? attendance.stats : [],
        };
    } catch (error) {
        console.error("Error fetching dashboard summary:", error);
        return { error: "Failed to fetch dashboard summary" };
    }
}

// ============================================================================
// INVESTOR ACCESS
// ============================================================================
export async function getUpcomingWorkshops() {
    try {
        return await prisma.workshop.findMany({
            where: { date: { gte: new Date() } },
            include: { investor: true },
            orderBy: { date: 'asc' },
            take: 5
        });
    } catch (error) {
        console.error("Error fetching workshops:", error);
        return [];
    }
}

export async function getActiveInvestorPosts() {
    try {
        return await prisma.investorPost.findMany({
            where: { isActive: true },
            include: { investor: true },
            orderBy: { createdAt: 'desc' },
            take: 5
        });
    } catch (error) {
        console.error("Error fetching investor posts:", error);
        return [];
    }
}
