import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

export const getGoogleAuth = (accessToken: string) => {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: accessToken });
    return oAuth2Client;
};

export const getClassrooms = async (accessToken: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.courses.list({
            courseStates: ["ACTIVE"],
            teacherId: "me"
        });
        const courses = response.data.courses || [];
        // if (courses.length > 0) console.log(...) // specific debug log removed
        return courses;
    } catch (error: any) {
        console.error("Error fetching classrooms:", JSON.stringify(error.response?.data || error, null, 2));
        if (error.response?.data?.error) {
            return { error: error.response.data.error.message };
        }
        return [];
    }
};

export const getStudentClassrooms = async (accessToken: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.courses.list({
            courseStates: ["ACTIVE"],
            studentId: "me"
        });
        const courses = response.data.courses || [];
        return courses;
    } catch (error: any) {
        console.error("Error fetching student classrooms:", JSON.stringify(error.response?.data || error, null, 2));
        if (error.response?.data?.error) {
            return { error: error.response.data.error.message };
        }
        return [];
    }
};



export const getCourse = async (accessToken: string, courseId: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.courses.get({
            id: courseId
        });
        return response.data;
    } catch (error: any) {
        console.error("Error fetching course:", error);
        return { error: error.message || "Failed to fetch course" };
    }
};

export const createCourse = async (accessToken: string, courseDetails: { name: string, section?: string, descriptionHeading?: string, description?: string, room?: string }) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.courses.create({
            requestBody: {
                name: courseDetails.name,
                section: courseDetails.section,
                descriptionHeading: courseDetails.descriptionHeading,
                description: courseDetails.description,
                room: courseDetails.room,
                ownerId: "me",
                courseState: "ACTIVE"
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error creating course:", JSON.stringify(error.response?.data || error, null, 2));
        return { error: error.response?.data?.error?.message || "Failed to create course" };
    }
};

export const deleteCourse = async (accessToken: string, courseId: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });

        // First archive the course (required before deletion)
        await classroom.courses.patch({
            id: courseId,
            updateMask: 'courseState',
            requestBody: {
                courseState: 'ARCHIVED'
            }
        });

        // Then delete
        await classroom.courses.delete({
            id: courseId
        });

        return { success: true };
    } catch (error: any) {
        console.error("Error deleting course:", JSON.stringify(error.response?.data || error, null, 2));
        return { error: error.response?.data?.error?.message || "Failed to delete course" };
    }
};

export const getCourseStudents = async (accessToken: string, courseId: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.courses.students.list({
            courseId,
            // Requesting specific fields usually helps, but GClassroom API behaves differently with fields mask.
            // By default it should return profiles if scope is correct.
            // Let's try explicitly setting fields if standard call fails, but actually...
            // the scope 'https://www.googleapis.com/auth/classroom.rosters' allows viewing students.
            // 'https://www.googleapis.com/auth/classroom.profile.emails' is often needed.
            // For now, let's verify if 'fields' parameter changes anything.
        });

        // If email is missing, we might need to fetch user profiles individually or ensure the scope includes emails.
        // However, iterating everyone is slow.
        // Let's return what we have.
        return response.data.students || [];
    } catch (error) {
        console.error("Error fetching students:", error);
        return [];
    }
};

export const createMeetLink = async (accessToken: string, summary: string, startTime: string, endTime: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const calendar = google.calendar({ version: "v3", auth });

        const event = {
            summary: summary,
            description: "Live Session via SkillCred",
            start: {
                dateTime: startTime, // ISO format
                timeZone: 'UTC',
            },
            end: {
                dateTime: endTime,
                timeZone: 'UTC',
            },
            conferenceData: {
                createRequest: {
                    requestId: Math.random().toString(36).substring(7),
                    conferenceSolutionKey: {
                        type: "hangoutsMeet"
                    }
                }
            }
        };

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1
        });

        return response.data;
    } catch (error) {
        console.error("Error creating meet link:", error);
        throw error;
    }
};


export const getCourseWork = async (accessToken: string, courseId: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.courses.courseWork.list({
            courseId,
            courseWorkStates: ["PUBLISHED", "DRAFT"]
        });
        return response.data.courseWork || [];
    } catch (error) {
        console.error("Error fetching courseWork:", error);
        return [];
    }
};

export const createCourseWork = async (accessToken: string, courseId: string, workDetails: any) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.courses.courseWork.create({
            courseId,
            requestBody: workDetails
        });
        return response.data;
    } catch (error: any) {
        console.error("Error creating courseWork:", JSON.stringify(error.response?.data || error, null, 2));
        return { error: error.response?.data?.error?.message || "Failed to create assignment" };
    }
};

export const getTopics = async (accessToken: string, courseId: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.courses.topics.list({
            courseId
        });
        return response.data.topic || [];
    } catch (error) {
        console.error("Error fetching topics:", error);
        return [];
    }
};

export const createTopic = async (accessToken: string, courseId: string, name: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.courses.topics.create({
            courseId,
            requestBody: { name }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error creating topic:", JSON.stringify(error.response?.data || error, null, 2));
        return { error: error.response?.data?.error?.message || "Failed to create topic" };
    }
};

export const getCourseWorkStudentSubmissions = async (accessToken: string, courseId: string, courseWorkId: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.courses.courseWork.studentSubmissions.list({
            courseId,
            courseWorkId
        });
        return response.data.studentSubmissions || [];
    } catch (error) {
        console.error("Error fetching submissions:", error);
        return [];
    }
};

export const patchStudentSubmission = async (accessToken: string, courseId: string, courseWorkId: string, id: string, assignedGrade: number, draftGrade?: number) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });

        const updateMask = ["assignedGrade"];
        if (draftGrade !== undefined) updateMask.push("draftGrade");

        const response = await classroom.courses.courseWork.studentSubmissions.patch({
            courseId,
            courseWorkId,
            id,
            updateMask: updateMask.join(","),
            requestBody: {
                assignedGrade,
                draftGrade
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error grading submission:", JSON.stringify(error.response?.data || error, null, 2));
        return { error: error.response?.data?.error?.message || "Failed to grade submission" };
    }
};

export const returnStudentSubmission = async (accessToken: string, courseId: string, courseWorkId: string, id: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.courses.courseWork.studentSubmissions.return({
            courseId,
            courseWorkId,
            id,
            requestBody: {}
        });
        return response.data;
    } catch (error: any) {
        console.error("Error returning submission:", JSON.stringify(error.response?.data || error, null, 2));
        return { error: error.response?.data?.error?.message || "Failed to return submission" };
    }
};

export const getCourseTeachers = async (accessToken: string, courseId: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.courses.teachers.list({
            courseId
        });
        return response.data.teachers || [];
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return [];
    }
};

export const inviteStudent = async (accessToken: string, courseId: string, email: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.invitations.create({
            requestBody: {
                courseId,
                role: "STUDENT",
                userId: email
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error inviting student:", JSON.stringify(error.response?.data || error, null, 2));
        return { error: error.response?.data?.error?.message || "Failed to invite student" };
    }
};

// --- Calendar Integration ---

export const createCalendarEvent = async (accessToken: string, calendarId: string, eventDetails: { summary: string, description: string, startTime: string, endTime: string, recurrence?: string[] }) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const calendar = google.calendar({ version: "v3", auth });

        const event = {
            summary: eventDetails.summary,
            description: eventDetails.description,
            start: {
                dateTime: eventDetails.startTime,
                timeZone: 'UTC',
            },
            end: {
                dateTime: eventDetails.endTime,
                timeZone: 'UTC',
            },
            conferenceData: {
                createRequest: {
                    requestId: Math.random().toString(36).substring(7),
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet'
                    }
                }
            },
            recurrence: eventDetails.recurrence
        };

        const response = await calendar.events.insert({
            calendarId: calendarId,
            requestBody: event,
            conferenceDataVersion: 1
        });

        return response.data;
    } catch (error: any) {
        console.error("Error creating calendar event:", JSON.stringify(error.response?.data || error, null, 2));
        return { error: error.response?.data?.error?.message || "Failed to create event" };
    }
};

export const getCalendarEvents = async (accessToken: string, calendarId: string = 'primary') => {
    try {
        const auth = getGoogleAuth(accessToken);
        const calendar = google.calendar({ version: "v3", auth });

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const response = await calendar.events.list({
            calendarId,
            timeMin: oneMonthAgo.toISOString(),
            maxResults: 50, // Increased from 10 to see more
            singleEvents: true,
            orderBy: 'startTime',
        });

        return response.data.items || [];
    } catch (error) {
        console.error("Error fetching calendar events:", error);
        return [];
    }
};

// --- Announcements ---

export const getAnnouncements = async (accessToken: string, courseId: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.courses.announcements.list({
            courseId,
            // @ts-ignore: googleapis types might be outdated regarding announcementStates
            announcementStates: ["PUBLISHED", "DRAFT"]
        } as any);
        return response.data.announcements || [];
    } catch (error) {
        console.error("Error fetching announcements:", error);
        return [];
    }
};

export const createAnnouncement = async (accessToken: string, courseId: string, text: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const classroom = google.classroom({ version: "v1", auth });
        const response = await classroom.courses.announcements.create({
            courseId,
            requestBody: {
                text,
                state: "PUBLISHED"
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error creating announcement:", JSON.stringify(error.response?.data || error, null, 2));
        return { error: error.response?.data?.error?.message || "Failed to create announcement" };
    }
};

// --- Google Meet (Attendance & Recordings) ---

export const getConferenceRecords = async (accessToken: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const meet = google.meet({ version: 'v2', auth });

        // List recent conference records
        const response = await meet.conferenceRecords.list({
            // pageSize: 10
        });
        return response.data.conferenceRecords || [];
    } catch (error) {
        console.error("Error fetching conference records:", error);
        return [];
    }
};

export const getConferenceParticipants = async (accessToken: string, conferenceRecordId: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const meet = google.meet({ version: 'v2', auth });
        const response = await meet.conferenceRecords.participants.list({
            parent: conferenceRecordId
        });
        return response.data.participants || [];
    } catch (error) {
        console.error("Error fetching participants:", error);
        return [];
    }
};

export const getConferenceRecordings = async (accessToken: string, conferenceRecordId: string) => {
    try {
        const auth = getGoogleAuth(accessToken);
        const meet = google.meet({ version: 'v2', auth });
        const response = await meet.conferenceRecords.recordings.list({
            parent: conferenceRecordId
        });
        return response.data.recordings || [];
    } catch (error) {
        console.error("Error fetching recordings:", error);
        return [];
    }
};
