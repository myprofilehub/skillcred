import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import StudentDashboard from "./client-dashboard";
import { getStudentDashboardSummary } from "@/app/actions/student-dashboard";

export default async function StudentDashboardPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/api/auth/signout");
    }

    // Fetch Student Profile
    const student = await prisma.student.findUnique({
        where: { userId: session.user.id },
        include: {
            enrollments: {
                where: { status: 'ACTIVE' },
                orderBy: { createdAt: 'desc' },
                include: {
                    track: true,
                    batch: {
                        include: { project: true }
                    }
                },
                take: 1 // Get most recent primary enrollment
            },
        }
    });

    // Fetch dashboard data using new server action
    const dashboardData = await getStudentDashboardSummary();

    // Handle error case
    if ("error" in dashboardData) {
        // Return with empty data if fetch fails
        return (
            <StudentDashboard
                user={session.user}
                dashboardData={{
                    upNext: null,
                    classroomsCount: 0,
                    pendingAssignments: [],
                    recentRecordings: [],
                    overallAttendance: null,
                    attendanceStats: [],
                }}
                studentProfile={student}
            />
        );
    }

    return (
        <StudentDashboard
            user={session.user}
            dashboardData={dashboardData}
            studentProfile={student}
        />
    );
}
