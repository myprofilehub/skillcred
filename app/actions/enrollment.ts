"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// ============================================================================
// GET AVAILABLE STREAMS
// ============================================================================
export async function getStreams() {
    try {
        const activeSlugs = [
            'full-stack-development',
            'ai-ml',
            'cybersecurity',
            'data-engineering',
            'devops-cloud',
            'mobile-development',
            'iot-embedded',
            'data-science'
        ];

        const streams = await prisma.track.findMany({
            where: {
                slug: { in: activeSlugs }
            },
            include: {
                defaultMentor: {
                    include: { user: true }
                },
                _count: {
                    select: { students: true }
                }
            },
            orderBy: { title: "asc" }
        });
        return streams;
    } catch (error) {
        console.error("Error fetching streams:", error);
        return [];
    }
}

// ============================================================================
// ENROLL IN STREAM
// ============================================================================
export async function enrollInStream(trackSlug: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        const userId = session.user.id;

        // Ensure Student profile exists (using simple check or create logic if missing, consistent with portfolio)
        // Usually, dashboard loading ensures this, but safety first.
        let student = await prisma.student.findUnique({ where: { userId } });
        if (!student) {
            student = await prisma.student.create({ data: { userId } });
        }

        // 1. Get the Track and its Default Mentor
        const track = await prisma.track.findUnique({
            where: { slug: trackSlug },
            include: { defaultMentor: true }
        });

        if (!track) return { error: "Stream not found" };

        // 2. Determine the Mentor to assign
        let assignedMentorId = track.defaultMentorId;

        if (!assignedMentorId) {
            // Fallback: Find any mentor with relevant specialization or just the first one
            const fallbackMentor = await prisma.mentor.findFirst({
                where: { specialization: { contains: track.title, mode: 'insensitive' } }
            }) || await prisma.mentor.findFirst();

            assignedMentorId = fallbackMentor?.id || null;
        }

        if (!assignedMentorId) {
            return { error: "No mentors available for this stream yet." };
        }

        // 3. Create the Enrollment Record
        // Check for existing enrollment
        const existingEnrollment = await prisma.enrollment.findUnique({
            where: {
                studentId_trackId: {
                    studentId: student.id,
                    trackId: track.id
                }
            }
        });

        if (existingEnrollment) {
            return { success: true, message: "Already enrolled", mentorName: "Your assigned mentor" };
        }

        const enrollment = await prisma.enrollment.create({
            data: {
                studentId: student.id,
                trackId: track.id,
                mentorId: assignedMentorId,
                status: "ACTIVE",
                progress: 0
            },
            include: {
                mentor: { include: { user: true } }
            }
        });

        revalidatePath("/dashboard/student/streams");
        revalidatePath("/dashboard/student/classroom"); // If classroom reflects enrollments

        return {
            success: true,
            mentorName: enrollment.mentor?.user.name,
            trackTitle: track.title
        };

    } catch (error) {
        console.error("Enrollment failed:", error);
        return { error: "Failed to enroll" };
    }
}

// ============================================================================
// GET MY ENROLLMENTS
// ============================================================================
export async function getMyEnrollments() {
    const session = await auth();
    if (!session?.user?.id) return [];

    try {
        const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
        if (!student) return [];

        const enrollments = await prisma.enrollment.findMany({
            where: { studentId: student.id },
            include: {
                track: true,
                mentor: { include: { user: true } }
            }
        });

        return enrollments;
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        return [];
    }
}
