"use server";

import { auth } from "@/auth";
import { getClassrooms, createMeetLink } from "@/lib/google";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
// Types for reference - Google API returns Schema$Course which has nullable id
// import type { GoogleCourse, GoogleStudent } from "@/lib/types/google";

export async function fetchClassrooms() {
    const session = await auth();
    if (!session?.accessToken) {
        return { error: "Not authenticated with Google" };
    }

    // 1. Fetch from Google
    const googleCourses = await getClassrooms(session.accessToken);
    if (!Array.isArray(googleCourses)) {
        return googleCourses; // Propagate error
    }

    // 2. Fetch local overrides
    const localData = await prisma.googleClassroom.findMany({
        where: {
            googleCourseId: { in: googleCourses.map((c) => c.id).filter((id): id is string => !!id) }
        }
    });

    // 3. Merge - Note: meetLink is our custom extension, not part of Schema$Course
    const mergedCourses = googleCourses.map((course) => {
        const local = localData.find((l) => l.googleCourseId === course.id);
        return {
            ...course,
            meetLink: local?.meetLink || (course as any).meetLink || undefined
        };
    });

    // 4. Fetch student counts (Parallel)
    const { getCourseStudents } = await import("@/lib/google");
    const coursesWithStudents = await Promise.all(mergedCourses.map(async (course) => {
        const students = await getCourseStudents(session.accessToken!, course.id!);
        return {
            ...course,
            students: Array.isArray(students) ? students : []
        };
    }));

    return coursesWithStudents;
}

export async function fetchStudentClassrooms() {
    const session = await auth();
    if (!session?.accessToken) {
        return { error: "Not authenticated with Google" };
    }

    const { getStudentClassrooms } = await import("@/lib/google");

    // 1. Fetch from Google (Student view)
    const googleCourses = await getStudentClassrooms(session.accessToken);

    if (!Array.isArray(googleCourses)) {
        return googleCourses; // Propagate error
    }

    // 2. Fetch local overrides (Meet Links set by Mentors)
    const localData = await prisma.googleClassroom.findMany({
        where: {
            googleCourseId: { in: googleCourses.map((c: any) => c.id) }
        }
    });

    // 3. Merge
    const mergedCourses = googleCourses.map((course: any) => {
        const local = localData.find((l) => l.googleCourseId === course.id);
        return {
            ...course,
            meetLink: local?.meetLink || course.meetLink // Use the mentor-set link
        };
    });

    return mergedCourses;
}



export async function fetchGoogleClassroom(courseId: string) {
    const session = await auth();
    if (!session?.accessToken) {
        return { error: "Not authenticated with Google" };
    }

    const { getCourse } = await import("@/lib/google");
    const course = await getCourse(session.accessToken, courseId);

    if (course && !('error' in course)) {
        // Fetch local override for meet link
        const localData = await prisma.googleClassroom.findUnique({
            where: { googleCourseId: courseId }
        });

        if (localData?.meetLink) {
            (course as any).meetLink = localData.meetLink;
        }
    }

    return course;
}

export async function createGoogleClassroom(data: { name: string, section?: string, room?: string, description?: string }) {
    const session = await auth();
    if (!session?.accessToken) {
        return { error: "Not authenticated with Google" };
    }

    const { createCourse } = await import("@/lib/google");
    const result = await createCourse(session.accessToken, {
        name: data.name,
        section: data.section,
        descriptionHeading: data.name, // Using name as heading by default
        description: data.description,
        room: data.room
    });

    if ((result as any).error) return { error: (result as any).error };

    // Sync with local DB immediately
    try {
        await prisma.googleClassroom.create({
            data: {
                googleCourseId: (result as any).id,
                mentorId: session.user.id!,
                meetLink: "", // Default empty, user can set later
            }
        });
    } catch (dbError) {
        console.error("Failed to sync new classroom to DB:", dbError);
        // We don't fail the whole action, as the Google Classroom WAS created.
    }

    revalidatePath("/dashboard/mentor/classroom");
    return { success: true, course: result };
}

export async function fetchCoursePeople(courseId: string) {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { getCourseStudents, getCourseTeachers } = await import("@/lib/google");
    const [students, teachers] = await Promise.all([
        getCourseStudents(session.accessToken, courseId),
        getCourseTeachers(session.accessToken, courseId)
    ]);

    return { students, teachers };
}

export async function inviteStudentAction(courseId: string, email: string) {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { inviteStudent } = await import("@/lib/google");
    const result = await inviteStudent(session.accessToken, courseId, email);

    if ((result as any).error) return { error: (result as any).error };

    // Note: Invitations don't immediately show in student list until accepted usually, 
    // but they might show in 'invitations' list. For now just returning success.
    revalidatePath(`/dashboard/mentor/classroom/${courseId}`);
    return { success: true };
}



export async function saveClassroomMeetLink(googleCourseId: string, meetLink: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    try {
        await prisma.googleClassroom.upsert({
            where: { googleCourseId },
            update: { meetLink, mentorId: session.user.id },
            create: {
                googleCourseId,
                meetLink,
                mentorId: session.user.id
            }
        });
        revalidatePath("/dashboard/mentor/classroom");
        return { success: true };
    } catch (error) {
        console.error("Failed to save meet link:", error);
        return { error: "Failed to save link" };
    }
}

export async function deleteGoogleClassroom(courseId: string) {
    const session = await auth();
    if (!session?.accessToken) {
        return { error: "Not authenticated with Google" };
    }

    try {
        const { deleteCourse } = await import("@/lib/google");
        const result = await deleteCourse(session.accessToken, courseId);

        if ((result as any).error) return { error: (result as any).error };

        // Also delete from local DB if exists
        try {
            await prisma.googleClassroom.delete({
                where: { googleCourseId: courseId }
            });
        } catch (dbError) {
            // May not exist in local DB, ignore
        }

        revalidatePath("/dashboard/mentor/classroom");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete classroom:", error);
        return { error: "Failed to delete classroom" };
    }
}

export async function scheduleMeeting(summary: string, startTime: string, endTime: string) {
    const session = await auth();
    if (!session?.accessToken) {
        return { error: "Not authenticated with Google" };
    }
    return await createMeetLink(session.accessToken, summary, startTime, endTime);
}

export async function fetchCourseContent(courseId: string) {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { getCourseWork, getTopics } = await import("@/lib/google");
    const [courseWork, topics] = await Promise.all([
        getCourseWork(session.accessToken, courseId),
        getTopics(session.accessToken, courseId)
    ]);

    return { courseWork, topics };
}

export async function createAssignmentAction(courseId: string, data: any) {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { createCourseWork, createTopic } = await import("@/lib/google");

    // If a new topic name is provided (assumed logic in component), create it first
    let topicId = data.topicId;
    if (data.newTopicName) {
        const topicRes = await createTopic(session.accessToken, courseId, data.newTopicName);
        if ((topicRes as any).topicId) {
            topicId = (topicRes as any).topicId;
        }
    }

    const workPayload = {
        title: data.title,
        description: data.description,
        workType: "ASSIGNMENT",
        state: "PUBLISHED",
        maxPoints: data.points || 100,
        topicId: topicId,
        materials: data.materials || [], // Links, YouTube, Drive
    };

    const result = await createCourseWork(session.accessToken, courseId, workPayload);

    if ((result as any).error) return { error: (result as any).error };

    revalidatePath(`/dashboard/mentor/classroom/${courseId}`);
    return { success: true };
}

export async function fetchSubmissions(courseId: string, courseWorkId: string) {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { getCourseWorkStudentSubmissions } = await import("@/lib/google");
    const submissions = await getCourseWorkStudentSubmissions(session.accessToken, courseId, courseWorkId);

    return submissions;
}

export async function gradeSubmissionAction(courseId: string, courseWorkId: string, submissionId: string, grade: number) {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { patchStudentSubmission } = await import("@/lib/google");
    const result = await patchStudentSubmission(session.accessToken, courseId, courseWorkId, submissionId, grade);

    if ((result as any).error) return { error: (result as any).error };

    revalidatePath(`/dashboard/mentor/classroom/${courseId}`);
    return { success: true };
}

export async function returnSubmissionAction(courseId: string, courseWorkId: string, submissionId: string) {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { returnStudentSubmission } = await import("@/lib/google");
    const result = await returnStudentSubmission(session.accessToken, courseId, courseWorkId, submissionId);

    if ((result as any).error) return { error: (result as any).error };

    revalidatePath(`/dashboard/mentor/classroom/${courseId}`);
    return { success: true };
}

export async function fetchAnnouncements(courseId: string) {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { getAnnouncements } = await import("@/lib/google");
    const announcements = await getAnnouncements(session.accessToken, courseId);

    return announcements;
}

export async function createAnnouncementAction(courseId: string, text: string) {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { createAnnouncement } = await import("@/lib/google");
    const result = await createAnnouncement(session.accessToken, courseId, text);

    if ((result as any).error) return { error: (result as any).error };

    revalidatePath(`/dashboard/mentor/classroom/${courseId}`);
    return { success: true };
}

export async function createClassEvent(calendarId: string, event: { summary: string, description: string, startTime: string, endTime: string }) {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { createCalendarEvent } = await import("@/lib/google");
    const result = await createCalendarEvent(session.accessToken, calendarId, event);

    if ((result as any).error) return { error: (result as any).error };

    revalidatePath('/dashboard/mentor');
    return { success: true, event: result };
}

export async function fetchCalendarEvents(calendarId: string) {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { getCalendarEvents } = await import("@/lib/google");
    const events = await getCalendarEvents(session.accessToken, calendarId);

    return events;
}

export async function fetchMeetRecords() {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { getConferenceRecords } = await import("@/lib/google");
    return await getConferenceRecords(session.accessToken);
}

export async function fetchMeetParticipants(conferenceRecordId: string) {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { getConferenceParticipants } = await import("@/lib/google");
    return await getConferenceParticipants(session.accessToken, conferenceRecordId);
}

export async function fetchMeetRecordings(conferenceRecordId: string) {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { getConferenceRecordings } = await import("@/lib/google");
    return await getConferenceRecordings(session.accessToken, conferenceRecordId);
}

export async function createProjectAction(courseId: string, title: string, description: string, materials: any[]) {
    // Reuses createAssignmentAction but forces the topic to be "Projects"
    return await createAssignmentAction(courseId, {
        title: `[PROJECT] ${title}`,
        description,
        materials,
        newTopicName: "Projects", // Will create if not exists
        points: 100
    });
}

// --- Student Roster & Tracking ---

export async function fetchAggregatedStudents() {
    const session = await auth();
    if (!session?.accessToken) return { error: "Not authenticated" };

    const { getClassrooms, getCourseStudents, getCourseWork, getCourseWorkStudentSubmissions } = await import("@/lib/google");

    try {
        // 1. Get all courses taught by this mentor
        const courses = await getClassrooms(session.accessToken);
        if (!Array.isArray(courses)) return [];

        const allStudentsMap = new Map<string, any>();

        // 2. Parallel fetch students and coursework for each course
        await Promise.all(courses.map(async (course: any) => {
            const courseId = course.id as string;

            const [students, courseWork] = await Promise.all([
                getCourseStudents(session.accessToken!, courseId),
                getCourseWork(session.accessToken!, courseId)
            ]);

            // Filter for "Project" assignments
            const projectAssignments = Array.isArray(courseWork)
                ? courseWork.filter((w: any) => w.title?.includes("[PROJECT]") || w.topicId) // simplistic filter
                // Better filter: check if title contains "Project" or mapped topic. 
                // For now, let's assume any assignment is trackable, or filter by title "Project"
                : [];

            if (Array.isArray(students)) {
                await Promise.all(students.map(async (student: any) => {
                    const studentId = student.userId;

                    if (!allStudentsMap.has(studentId)) {
                        allStudentsMap.set(studentId, {
                            id: studentId,
                            name: student.profile.name.fullName,
                            email: student.profile.emailAddress,
                            photoUrl: student.profile.photoUrl,
                            courses: [],
                            projectsCompleted: 0,
                            projectsTotal: 0,
                            attendanceRate: Math.floor(Math.random() * 30) + 70, // Mock attendance for now (70-100%)
                            patEligible: false
                        });
                    }

                    const studentRecord = allStudentsMap.get(studentId);
                    studentRecord.courses.push({ id: course.id, name: course.name });

                    // 3. Check Project Submissions for this student in this course
                    // This is N+1 heavy, but Google API limits might be hit. 
                    // Optimization: Fetch ALL submissions for the course, then filter by student in memory?
                    // Google API `studentSubmissions.list` supports `courseWorkId` and `userId`.
                    // Retrieving ALL submissions for a courseWork is better.

                    // Let's count totals here
                    studentRecord.projectsTotal += projectAssignments.length;

                    // To get verified count, we'd need to fetch submissions. 
                    // For performance, we might skip deep verification check in the LIST view 
                    // and only load it on detail or do a lighter check.
                    // For now, let's just create a placeholder "projectsCompleted" that we can't fully fill without heavy API calls.
                    // We will fetch submissions for the courseWork and map locally.
                }));
            }
        }));

        // 3. Merge with DB data for PAT Eligibility and Persistence
        const aggregatedStudents = Array.from(allStudentsMap.values());
        const emails = aggregatedStudents.map(s => s.email).filter(Boolean);

        if (emails.length > 0) {
            const dbUsers = await prisma.user.findMany({
                where: { email: { in: emails } },
                include: { studentProfile: true }
            });

            const emailToUserMap = new Map(dbUsers.map(u => [u.email!, u]));

            aggregatedStudents.forEach(student => {
                const dbUser = emailToUserMap.get(student.email);
                if (dbUser) {
                    student.dbUserId = dbUser.id; // Store DB User ID for actions
                    student.patEligible = dbUser.studentProfile?.patEligible || false;
                    // Could also fetch real project verification count from DB here if we wanted
                }
            });
        }

        return aggregatedStudents;
    } catch (error) {
        console.error("Error aggregating students:", error);
        return [];
    }
}
