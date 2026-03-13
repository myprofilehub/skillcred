/**
 * Type definitions for Google API responses used across the application.
 * These provide type safety for data from Google Classroom, Calendar, Meet, etc.
 */

// ============ Google Classroom Types ============

export interface GoogleCourse {
    id: string;
    name: string;
    section?: string;
    descriptionHeading?: string;
    description?: string;
    room?: string;
    ownerId?: string;
    creationTime?: string;
    updateTime?: string;
    enrollmentCode?: string;
    courseState?: 'COURSE_STATE_UNSPECIFIED' | 'ACTIVE' | 'ARCHIVED' | 'PROVISIONED' | 'DECLINED' | 'SUSPENDED';
    alternateLink?: string;
    teacherGroupEmail?: string;
    courseGroupEmail?: string;
    guardiansEnabled?: boolean;
    calendarId?: string;
    // Extended by our app
    meetLink?: string;
    students?: GoogleStudent[];
}

export interface GoogleStudent {
    courseId?: string;
    userId?: string;
    profile: {
        id?: string;
        name?: {
            givenName?: string;
            familyName?: string;
            fullName?: string;
        };
        emailAddress?: string;
        photoUrl?: string;
    };
}

export interface GoogleCourseWork {
    courseId?: string;
    id?: string;
    title?: string;
    description?: string;
    state?: 'COURSE_WORK_STATE_UNSPECIFIED' | 'PUBLISHED' | 'DRAFT' | 'DELETED';
    alternateLink?: string;
    creationTime?: string;
    updateTime?: string;
    dueDate?: {
        year?: number;
        month?: number;
        day?: number;
    };
    dueTime?: {
        hours?: number;
        minutes?: number;
    };
    maxPoints?: number;
    workType?: 'COURSE_WORK_TYPE_UNSPECIFIED' | 'ASSIGNMENT' | 'SHORT_ANSWER_QUESTION' | 'MULTIPLE_CHOICE_QUESTION';
    topicId?: string;
}

export interface GoogleSubmission {
    courseId?: string;
    courseWorkId?: string;
    id?: string;
    userId?: string;
    creationTime?: string;
    updateTime?: string;
    state?: 'SUBMISSION_STATE_UNSPECIFIED' | 'NEW' | 'CREATED' | 'TURNED_IN' | 'RETURNED' | 'RECLAIMED_BY_STUDENT';
    late?: boolean;
    draftGrade?: number;
    assignedGrade?: number;
    alternateLink?: string;
}

// ============ Google Calendar Types ============

export interface GoogleCalendarEvent {
    id?: string;
    status?: string;
    htmlLink?: string;
    created?: string;
    updated?: string;
    summary?: string;
    description?: string;
    location?: string;
    creator?: {
        email?: string;
        displayName?: string;
    };
    organizer?: {
        email?: string;
        displayName?: string;
    };
    start?: {
        date?: string;
        dateTime?: string;
        timeZone?: string;
    };
    end?: {
        date?: string;
        dateTime?: string;
        timeZone?: string;
    };
    recurrence?: string[];
    hangoutLink?: string;
    conferenceData?: {
        conferenceId?: string;
        conferenceSolution?: {
            name?: string;
        };
        entryPoints?: Array<{
            entryPointType?: string;
            uri?: string;
        }>;
    };
}

// ============ Google Meet Types ============

export interface MeetParticipant {
    name?: string;
    signedinUser?: {
        user?: string;
        displayName?: string;
    };
    anonymousUser?: {
        displayName?: string;
    };
    earliestStartTime?: string;
    latestEndTime?: string;
}

export interface MeetingLog {
    id: string;
    startTime: string;
    endTime: string;
    duration: number;
    conferenceId?: string;
    participants: MeetParticipant[];
}

// ============ Schedule Types ============

export interface ScheduleEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    type: 'CLASS' | 'ASSIGNMENT' | 'MEETING';
    meetLink?: string;
    resource?: any;
}

// ============ Dashboard Stats Types ============

export interface DashboardStats {
    totalStudents: number;
    activeCourses: number;
    upcomingSessions: number;
    pendingGrades: number;
}

export interface ActionItem {
    id: string;
    type: 'UNGRADED' | 'ATTENDANCE' | 'DEADLINE';
    title: string;
    description: string;
    courseId?: string;
    courseName?: string;
    count?: number;
    dueDate?: Date;
}

// ============ API Response Wrappers ============

export type ApiResult<T> = T | { error: string };

export function isError<T>(result: ApiResult<T>): result is { error: string } {
    return typeof result === 'object' && result !== null && 'error' in result;
}

export function isSuccess<T>(result: ApiResult<T>): result is T {
    return !isError(result);
}
