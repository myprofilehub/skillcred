"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import {
    createCalendarEvent,
    getCalendarEvents,
    getClassrooms,
    getCourseWork
} from "@/lib/google";
import { revalidatePath } from "next/cache";

export type ScheduleEvent = {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
    type: "CLASS" | "DEADLINE";
    meetLink?: string;
};

export async function getScheduleEvents() {
    const session = await auth();
    if (!session?.user || !session.accessToken) return { error: "Unauthorized" };

    try {
        const events: ScheduleEvent[] = [];

        // 1. Fetch Google Calendar Events (Classes)
        const calendarEvents = await getCalendarEvents(session.accessToken);

        calendarEvents.forEach((ev: any) => {
            if (ev.start?.dateTime && ev.end?.dateTime) {
                events.push({
                    id: ev.id,
                    title: ev.summary || "Untitled Event",
                    start: new Date(ev.start.dateTime),
                    end: new Date(ev.end.dateTime),
                    type: "CLASS",
                    meetLink: ev.hangoutLink,
                    resource: ev
                });
            }
        });

        // 2. Fetch Assignments (Deadlines) from All Active Classrooms
        const classrooms = await getClassrooms(session.accessToken);

        // Handle case where classrooms is not an array (error case)
        if (!Array.isArray(classrooms)) {
            return { events };
        }

        // Fetch coursework in parallel
        const courseworkPromises = classrooms.map((c: any) =>
            getCourseWork(session.accessToken!, c.id)
                .then(works => ({ course: c, works }))
                .catch(() => ({ course: c, works: [] }))
        );

        const coursesData = await Promise.all(courseworkPromises);

        coursesData.forEach(({ course, works }) => {
            if (Array.isArray(works)) {
                works.forEach((work: any) => {
                    if (work.dueDate) {
                        // Google Classroom API returns dueDate as { year: 2024, month: 2, day: 15 }
                        // and dueTime as { hours: 23, minutes: 59 }
                        const year = work.dueDate.year;
                        const month = work.dueDate.month - 1; // JS months are 0-indexed
                        const day = work.dueDate.day;
                        const hours = work.dueTime?.hours || 23;
                        const minutes = work.dueTime?.minutes || 59;

                        const dueDate = new Date(year, month, day, hours, minutes);

                        events.push({
                            id: work.id,
                            title: `Due: ${work.title} (${course.name})`,
                            start: dueDate,
                            end: dueDate,
                            allDay: false, // Show as a specific time point
                            type: "DEADLINE",
                            resource: { ...work, courseId: course.id }
                        });
                    }
                });
            }
        });

        return { events };

    } catch (error) {
        console.error("Error fetching schedule:", error);
        return { error: "Failed to fetch schedule" };
    }
}

export async function scheduleClass(data: {
    googleClassroomId: string;
    googleCourseId: string; // The numeric ID from Google
    title: string;
    description: string;
    dateTime: string; // ISO String 
    durationMinutes: number;
    recurrence?: {
        frequency: string;
        until?: string;
    };
}) {
    const session = await auth();
    if (!session?.user || !session.accessToken) return { error: "Unauthorized" };

    try {
        const startTime = new Date(data.dateTime);
        const endTime = new Date(startTime.getTime() + data.durationMinutes * 60000);

        // Construct Recurrence Rule if applicable
        const recurrenceRules: string[] = [];
        if (data.recurrence) {
            let rrule = `RRULE:FREQ=${data.recurrence.frequency}`;
            if (data.recurrence.until) {
                // Determine UNTIL date. Make it end of that day in UTC.
                const untilDate = new Date(data.recurrence.until);
                untilDate.setHours(23, 59, 59, 999);
                // RRULE expects YYYYMMDDTHHMMSSZ format
                const untilStr = untilDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                rrule += `;UNTIL=${untilStr}`;
            }
            recurrenceRules.push(rrule);
        }

        // 1. Create Calendar Event with Meet Link
        const eventResult = await createCalendarEvent(
            session.accessToken,
            'primary',
            {
                summary: data.title,
                description: data.description,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                recurrence: recurrenceRules
            }
        );

        if ('error' in eventResult) {
            throw new Error((eventResult as any).error);
        }

        const generatedMeetLink = (eventResult as any).hangoutLink;

        // 2. Bind Meet Link to Classroom (Permanent Link Logic)
        if (generatedMeetLink) {
            await prisma.googleClassroom.upsert({
                where: { googleCourseId: data.googleCourseId },
                update: { meetLink: generatedMeetLink, mentorId: session.user.id! },
                create: {
                    googleCourseId: data.googleCourseId,
                    meetLink: generatedMeetLink,
                    mentorId: session.user.id!
                }
            });
        }

        revalidatePath("/dashboard/mentor/schedule");
        return { success: true, meetLink: generatedMeetLink };

    } catch (error) {
        console.error("Error scheduling class:", error);
        return { error: "Failed to schedule class" };
    }
}
