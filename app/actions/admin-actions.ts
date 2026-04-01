"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { sendMentorAssignmentEmail } from "@/lib/email";

// Helper to verify admin access
async function requireAdmin() {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized: Admin access required");
    }
    return session;
}

// ---- DASHBOARD STATS ----

export async function getAdminDashboardStats() {
    await requireAdmin();

    const [activeStreams, enrolledStudents, totalProjects, totalCourses, recentActivity] = await Promise.all([
        prisma.track.count(),
        prisma.enrollment.count({ where: { status: "ACTIVE" } }),
        prisma.projectCatalogItem.count(),
        prisma.course.count(),
        prisma.user.findMany({
            where: {
                role: { in: ["MENTOR", "STUDENT"] }
            },
            orderBy: { createdAt: "desc" },
            take: 10,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            }
        })
    ]);

    return {
        activeStreams,
        enrolledStudents,
        totalProjects,
        totalCourses,
        recentActivity
    };
}

// ---- CREATE CREDENTIAL ----

export async function createCredential(data: {
    name: string;
    username: string;
    domain: string;
    password: string;
    role: "MENTOR" | "STUDENT";
}) {
    await requireAdmin();

    const email = `${data.username}@${data.domain}`;

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        return { error: "A user with this email already exists" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email,
                password: hashedPassword,
                role: data.role,
            }
        });

        // Create role-specific profile
        if (data.role === "STUDENT") {
            await prisma.student.create({
                data: {
                    userId: user.id,
                    subscription: "PRO", // Paid tier
                }
            });
        } else if (data.role === "MENTOR") {
            await prisma.mentor.create({
                data: {
                    userId: user.id,
                }
            });
        }

        return {
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        };
    } catch (error: any) {
        console.error("Error creating credential:", error);
        return { error: "Failed to create credential" };
    }
}

// ---- GET ALL CREDENTIALS ----

export async function getAllCredentials() {
    await requireAdmin();

    const credentials = await prisma.user.findMany({
        where: {
            OR: [
                { email: { endsWith: "@codequestzone.com" } },
                { email: { endsWith: "@skillcred.in" } },
            ],
            role: { in: ["MENTOR", "STUDENT"] }
        },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            studentProfile: {
                select: { subscription: true }
            },
            mentorProfile: {
                select: { specialization: true }
            }
        }
    });

    return credentials;
}

// ---- GET ALL USERS ----

export async function getAllUsers(filter?: { role?: string; search?: string }) {
    await requireAdmin();

    const where: any = {};

    if (filter?.role && filter.role !== "ALL") {
        where.role = filter.role;
    }

    if (filter?.search) {
        where.OR = [
            { name: { contains: filter.search, mode: "insensitive" } },
            { email: { contains: filter.search, mode: "insensitive" } },
        ];
    }

    const users = await prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 100,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            studentProfile: {
                select: { subscription: true, college: true, stream: true }
            },
            mentorProfile: {
                select: { specialization: true }
            },
            hrProfile: {
                select: { company: true }
            },
            investorProfile: {
                select: { company: true }
            }
        }
    });

    return users;
}

// ---- DEACTIVATE / DELETE CREDENTIAL ----

export async function deleteCredential(userId: string) {
    await requireAdmin();

    try {
        await prisma.user.delete({ where: { id: userId } });
        return { success: true };
    } catch (error) {
        console.error("Error deleting credential:", error);
        return { error: "Failed to delete credential" };
    }
}

// ---- ENROLLMENTS (Paid Students awaiting Mentor Assignment) ----

export async function getEnrollmentsForAdmin() {
    await requireAdmin();

    // Fetch all enrollments awaiting approval or active (for assignment)
    const enrollments = await prisma.enrollment.findMany({
        where: { 
            status: { in: ["PENDING_APPROVAL", "ACTIVE"] } 
        },
        include: {
            student: {
                include: {
                    user: {
                        select: { id: true, name: true, email: true, lmsEmail: true }
                    }
                }
            },
            track: {
                select: { id: true, title: true, slug: true }
            },
            mentor: {
                include: {
                    user: { select: { id: true, name: true, email: true } }
                }
            },
            batch: {
                select: { id: true, name: true }
            }
        },
        orderBy: { createdAt: "desc" }
    });

    // Fetch all available mentors for the assignment dropdown
    const mentors = await prisma.mentor.findMany({
        include: {
            user: { select: { id: true, name: true, email: true } }
        }
    });

    return { enrollments, mentors };
}

export async function assignMentorToEnrollment(enrollmentId: string, mentorId: string) {
    await requireAdmin();

    try {
        const enrollment = await prisma.enrollment.update({
            where: { id: enrollmentId },
            data: { mentorId },
            include: {
                student: { include: { user: { select: { name: true } } } },
                mentor: { include: { user: { select: { id: true, name: true, email: true } } } },
                track: { select: { title: true } }
            }
        });

        // Create a notification for the mentor
        if (enrollment.mentor?.user.id) {
            await prisma.notification.create({
                data: {
                    userId: enrollment.mentor.user.id,
                    title: "New Student Assigned",
                    message: `You have been assigned a new student "${enrollment.student.user.name}" in the "${enrollment.track.title}" stream. Please create a Google Classroom and batch for this student.`,
                    type: "info",
                    link: "/dashboard/mentor",
                }
            });

            // Send email notification via Brevo
            try {
                await sendMentorAssignmentEmail(
                    enrollment.mentor.user.email || "",
                    enrollment.mentor.user.name || "Mentor",
                    enrollment.student.user.name || "Student",
                    enrollment.track.title
                );
            } catch (emailErr) {
                console.error("Failed to send mentor assignment email:", emailErr);
            }
        }

        return {
            success: true,
            message: `Assigned ${enrollment.mentor?.user.name} as mentor for ${enrollment.student.user.name} in ${enrollment.track.title}`
        };
    } catch (error) {
        console.error("Error assigning mentor:", error);
        return { error: "Failed to assign mentor" };
    }
}

export async function approveEnrollment(enrollmentId: string) {
    await requireAdmin();

    try {
        const enrollment = await prisma.enrollment.findUnique({
            where: { id: enrollmentId },
            include: {
                student: {
                    include: {
                        user: true
                    }
                },
                track: true
            }
        });

        if (!enrollment) return { error: "Enrollment not found" };
        if (enrollment.status !== "PENDING_APPROVAL") return { error: "Enrollment is not awaiting approval" };

        const user = enrollment.student.user;

        // Generate LMS Credentials (copied from previous flow)
        const nameParts = (user.name || "student").toLowerCase().split(" ");
        const baseUsername = `${nameParts[0]}.${nameParts[1] || ""}`.replace(/[^a-z0-9.]/g, "");
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const username = `${baseUsername}${randomSuffix}`;
        const lmsEmail = `${username}@skillcred.com`;

        const tempPassword = Math.random().toString(36).slice(-8) + "Aa1!";
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Update User & Enrollment
        await prisma.$transaction([
            prisma.user.update({
                where: { id: user.id },
                data: {
                    username: username,
                    lmsEmail: lmsEmail,
                    password: hashedPassword,
                    forcePasswordChange: true
                }
            }),
            prisma.enrollment.update({
                where: { id: enrollmentId },
                data: { status: "ACTIVE" }
            })
        ]);

        // Send Email via Brevo
        const { sendLMSCredentials } = await import("@/lib/email");
        try {
            await sendLMSCredentials(
                user.email || "",
                user.name || "Student",
                lmsEmail,
                tempPassword
            );
        } catch (emailErr) {
            console.error("Failed to send LMS credentials email:", emailErr);
            // We still consider approval successful even if email fails, admin can manually notify or retry later
        }

        return { success: true, message: `Enrollment approved for ${user.name}. Credentials sent.` };

    } catch (error) {
        console.error("Error approving enrollment:", error);
        return { error: "Failed to approve enrollment" };
    }
}

