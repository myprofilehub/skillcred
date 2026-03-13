"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// ============================================================================
// JOB CRUD OPERATIONS (HR ONLY)
// ============================================================================

export async function createJob(data: {
    title: string;
    description: string;
    location: string;
    type: "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "CONTRACT";
    skills: string[];
    salary?: string;
}) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "HR") {
        return { error: "Unauthorized" };
    }

    try {
        const hrProfile = await prisma.hRProtocol.findUnique({
            where: { userId: session.user.id },
        });

        if (!hrProfile) {
            return { error: "HR profile not found" };
        }

        const job = await prisma.job.create({
            data: {
                hrId: hrProfile.id,
                title: data.title,
                description: data.description,
                location: data.location,
                type: data.type,
                skills: data.skills,
                salary: data.salary,
            },
        });

        revalidatePath("/dashboard/hr/jobs");
        return { success: true, job };
    } catch (error) {
        console.error("Error creating job:", error);
        return { error: "Failed to create job" };
    }
}

export async function updateJob(
    jobId: string,
    data: {
        title?: string;
        description?: string;
        location?: string;
        type?: "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "CONTRACT";
        skills?: string[];
        salary?: string;
        isActive?: boolean;
    }
) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "HR") {
        return { error: "Unauthorized" };
    }

    try {
        const hrProfile = await prisma.hRProtocol.findUnique({
            where: { userId: session.user.id },
        });

        if (!hrProfile) {
            return { error: "HR profile not found" };
        }

        // Verify ownership
        const existingJob = await prisma.job.findFirst({
            where: { id: jobId, hrId: hrProfile.id },
        });

        if (!existingJob) {
            return { error: "Job not found" };
        }

        const job = await prisma.job.update({
            where: { id: jobId },
            data,
        });

        revalidatePath("/dashboard/hr/jobs");
        revalidatePath(`/dashboard/hr/jobs/${jobId}`);
        return { success: true, job };
    } catch (error) {
        console.error("Error updating job:", error);
        return { error: "Failed to update job" };
    }
}

export async function getHRJobs() {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "HR") {
        return { error: "Unauthorized" };
    }

    try {
        const hrProfile = await prisma.hRProtocol.findUnique({
            where: { userId: session.user.id },
        });

        if (!hrProfile) {
            return { error: "HR profile not found" };
        }

        const jobs = await prisma.job.findMany({
            where: { hrId: hrProfile.id },
            include: {
                _count: {
                    select: { applications: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return { jobs };
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return { error: "Failed to fetch jobs" };
    }
}

export async function getJobWithApplications(jobId: string) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "HR") {
        return { error: "Unauthorized" };
    }

    try {
        const hrProfile = await prisma.hRProtocol.findUnique({
            where: { userId: session.user.id },
        });

        if (!hrProfile) {
            return { error: "HR profile not found" };
        }

        const job = await prisma.job.findFirst({
            where: { id: jobId, hrId: hrProfile.id },
            include: {
                applications: {
                    include: {
                        student: {
                            include: {
                                user: {
                                    select: {
                                        name: true,
                                        email: true,
                                        image: true,
                                    },
                                },
                                portfolio: {
                                    select: {
                                        headline: true,
                                        skills: true,
                                        isUnlocked: true,
                                    },
                                },
                                enrollments: {
                                    include: {
                                        track: {
                                            select: {
                                                title: true,
                                            },
                                        },
                                    },
                                    take: 1,
                                },
                            },
                        },
                    },
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        if (!job) {
            return { error: "Job not found" };
        }

        return { job };
    } catch (error) {
        console.error("Error fetching job:", error);
        return { error: "Failed to fetch job" };
    }
}

// ============================================================================
// STUDENT JOB OPERATIONS
// ============================================================================

export async function getActiveJobs() {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    try {
        const jobs = await prisma.job.findMany({
            where: { isActive: true },
            include: {
                hr: {
                    select: {
                        company: true,
                        position: true,
                    },
                },
                _count: {
                    select: { applications: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return { jobs };
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return { error: "Failed to fetch jobs" };
    }
}

export async function applyToJob(jobId: string, coverLetter?: string) {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    try {
        // Get student profile
        const student = await prisma.student.findUnique({
            where: { userId: session.user.id },
            include: {
                portfolio: true,
            },
        });

        if (!student) {
            return { error: "Student profile not found" };
        }

        // Check if portfolio is unlocked (PAT completed)
        if (!student.portfolio?.isUnlocked) {
            return { error: "Complete your PAT assessment to unlock job applications" };
        }

        // Check if already applied
        const existingApplication = await prisma.jobApplication.findFirst({
            where: { jobId, studentId: student.id },
        });

        if (existingApplication) {
            return { error: "You have already applied to this job" };
        }

        // Get job details for notification
        const job = await prisma.job.findUnique({
            where: { id: jobId },
            include: { hr: { include: { user: true } } },
        });

        if (!job || !job.isActive) {
            return { error: "Job not found or no longer active" };
        }

        // Create application
        const application = await prisma.jobApplication.create({
            data: {
                jobId,
                studentId: student.id,
                coverLetter,
            },
        });

        // Create notification for HR
        await prisma.notification.create({
            data: {
                userId: job.hr.userId,
                title: "New Job Application",
                message: `A student has applied for "${job.title}"`,
                type: "info",
                link: `/dashboard/hr/jobs/${job.id}`,
            },
        });

        revalidatePath("/dashboard/student/hr");
        revalidatePath(`/dashboard/hr/jobs/${jobId}`);

        return { success: true, application };
    } catch (error) {
        console.error("Error applying to job:", error);
        return { error: "Failed to apply" };
    }
}

export async function getStudentApplications() {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    try {
        const student = await prisma.student.findUnique({
            where: { userId: session.user.id },
        });

        if (!student) {
            return { error: "Student profile not found" };
        }

        const applications = await prisma.jobApplication.findMany({
            where: { studentId: student.id },
            include: {
                job: {
                    include: {
                        hr: {
                            select: {
                                company: true,
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return { applications };
    } catch (error) {
        console.error("Error fetching applications:", error);
        return { error: "Failed to fetch applications" };
    }
}

// ============================================================================
// APPLICATION STATUS MANAGEMENT (HR ONLY)
// ============================================================================

export async function updateApplicationStatus(
    applicationId: string,
    status: "APPLIED" | "REVIEWED" | "SHORTLISTED" | "REJECTED" | "INTERVIEW_SCHEDULED"
) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "HR") {
        return { error: "Unauthorized" };
    }

    try {
        const application = await prisma.jobApplication.findUnique({
            where: { id: applicationId },
            include: {
                job: { include: { hr: true } },
                student: { include: { user: true } },
            },
        });

        if (!application) {
            return { error: "Application not found" };
        }

        // Verify HR owns the job
        const hrProfile = await prisma.hRProtocol.findUnique({
            where: { userId: session.user.id },
        });

        if (!hrProfile || application.job.hrId !== hrProfile.id) {
            return { error: "Unauthorized" };
        }

        const updated = await prisma.jobApplication.update({
            where: { id: applicationId },
            data: { status },
        });

        // Notify student of status change
        await prisma.notification.create({
            data: {
                userId: application.student.user.id,
                title: "Application Update",
                message: `Your application for "${application.job.title}" has been updated to: ${status.replace("_", " ")}`,
                type: status === "SHORTLISTED" || status === "INTERVIEW_SCHEDULED" ? "success" : "info",
                link: "/dashboard/student/hr",
            },
        });

        revalidatePath(`/dashboard/hr/jobs/${application.jobId}`);
        return { success: true, application: updated };
    } catch (error) {
        console.error("Error updating application:", error);
        return { error: "Failed to update application" };
    }
}

// ============================================================================
// STUDENT PROFILE FOR HR VIEW
// ============================================================================

export async function getStudentProfileForHR(studentId: string) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "HR") {
        return { error: "Unauthorized" };
    }

    try {
        const hrProfile = await prisma.hRProtocol.findUnique({
            where: { userId: session.user.id },
        });

        if (!hrProfile) {
            return { error: "HR profile not found" };
        }

        const student = await prisma.student.findUnique({
            where: { id: studentId },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                portfolio: {
                    include: {
                        projects: {
                            include: {
                                project: true,
                            },
                        },
                        recommendations: {
                            include: {
                                mentor: {
                                    include: {
                                        user: {
                                            select: { name: true },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                enrollments: {
                    include: {
                        track: true,
                    },
                },
                assignments: {
                    include: {
                        project: true,
                    },
                },
                assessmentResults: {
                    include: {
                        assessment: true,
                    },
                },
            },
        });

        if (!student || !student.hrVisibile) {
            return { error: "Student not found or not visible to HR" };
        }

        // Record profile view
        await prisma.hRView.create({
            data: {
                hrId: hrProfile.id,
                studentId: student.id,
            },
        });

        // Calculate progress metrics
        const totalProjects = student.assignments.length;
        const completedProjects = student.assignments.filter(
            (a) => a.status === "VERIFIED"
        ).length;
        const projectCompletionRate = totalProjects > 0
            ? Math.round((completedProjects / totalProjects) * 100)
            : 0;

        const totalAssessments = student.assessmentResults.length;
        const passedAssessments = student.assessmentResults.filter(
            (r) => r.passed
        ).length;
        const assessmentPassRate = totalAssessments > 0
            ? Math.round((passedAssessments / totalAssessments) * 100)
            : 0;

        const avgScore = student.assessmentResults.length > 0
            ? Math.round(
                student.assessmentResults.reduce((sum, r) => sum + r.score, 0) /
                student.assessmentResults.length
            )
            : 0;

        return {
            student,
            metrics: {
                totalProjects,
                completedProjects,
                projectCompletionRate,
                totalAssessments,
                passedAssessments,
                assessmentPassRate,
                avgScore,
                patPassed: !!student.portfolio?.patPassedAt,
                portfolioUnlocked: !!student.portfolio?.isUnlocked,
            },
        };
    } catch (error) {
        console.error("Error fetching student profile:", error);
        return { error: "Failed to fetch profile" };
    }
}
