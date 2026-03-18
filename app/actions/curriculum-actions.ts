"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// ============================================================================
// GET STREAMS (TRACKS)
// ============================================================================
export async function getStreamsForAdmin() {
    try {
        const streams = await prisma.track.findMany({
            include: {
                _count: {
                    select: {
                        catalogProjects: true,
                        curriculumPhases: true
                    }
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
// GET PUBLIC RECORDINGS (FREE LIBRARY)
// ============================================================================
export async function getPublicLibraryRecordings() {
    try {
        const recordings = await prisma.recording.findMany({
            where: {
                type: "PRE_RECORDED",
                // isPublic: true,  // Depending on if seeded videos are marked public
            },
            include: {
                track: {
                    select: {
                        title: true,
                        slug: true,
                        icon: true
                    }
                }
            },
            orderBy: { createdAt: "desc" },
            // We fetch a larger pool and filter in memory to ensure 1 per track
            take: 50 
        });

        const seenTracks = new Set<string>();
        const uniqueRecordings = [];

        for (const rec of recordings) {
            if (rec.trackId && !seenTracks.has(rec.trackId)) {
                seenTracks.add(rec.trackId);
                uniqueRecordings.push(rec);
            }
        }

        return uniqueRecordings.slice(0, 8); // Return up to 8 distinct streams
    } catch (error) {
        console.error("Error fetching library recordings:", error);
        return [];
    }
}

// ============================================================================
// PROJECT CATALOG ACTIONS
// ============================================================================

export async function getProjectCatalog(trackSlug: string) {
    try {
        const track = await prisma.track.findUnique({
            where: { slug: trackSlug },
            select: { id: true, title: true }
        });

        if (!track) return { error: "Track not found" };

        const projects = await prisma.projectCatalogItem.findMany({
            where: { trackId: track.id },
            orderBy: { createdAt: "desc" }
        });

        return { track, projects };
    } catch (error) {
        console.error("Error fetching project catalog:", error);
        return { error: "Failed to fetch catalog" };
    }
}

export async function addProjectToCatalog(data: {
    trackId: string;
    name: string;
    tagline: string;
    description?: string;
    difficulty: number;
    coreFeatures: string[];
    startupAngle?: string;
    conceptsCovered?: any;
}) {
    const session = await auth();
    if (!session?.user?.id || (session.user.role !== "ADMIN" && session.user.role !== "MENTOR")) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.projectCatalogItem.create({
            data: {
                ...data,
                addedBy: session.user.id
            }
        });

        revalidatePath("/dashboard/admin/curriculum");
        revalidatePath("/dashboard/mentor/curriculum");
        revalidatePath("/dashboard/student/projects");
        return { success: true };
    } catch (error) {
        console.error("Error adding project:", error);
        return { error: "Failed to add project" };
    }
}

export async function updateCatalogProject(id: string, data: Partial<{
    trackId: string;
    name: string;
    tagline: string;
    description: string;
    difficulty: number;
    coreFeatures: string[];
    startupAngle: string;
    isActive: boolean;
}>) {
    const session = await auth();
    if (!session?.user?.id || (session.user.role !== "ADMIN" && session.user.role !== "MENTOR")) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.projectCatalogItem.update({
            where: { id },
            data
        });

        revalidatePath("/dashboard/admin/curriculum");
        revalidatePath("/dashboard/mentor/curriculum");
        return { success: true };
    } catch (error) {
        console.error("Error updating project:", error);
        return { error: "Failed to update project" };
    }
}

export async function deleteCatalogProject(id: string) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "ADMIN") {
        return { error: "Unauthorized (Admin only)" };
    }

    try {
        await prisma.projectCatalogItem.delete({
            where: { id }
        });

        revalidatePath("/dashboard/admin/curriculum");
        return { success: true };
    } catch (error) {
        console.error("Error deleting project:", error);
        return { error: "Failed to delete project" };
    }
}

// ============================================================================
// CURRICULUM ACTIONS
// ============================================================================

export async function getTrackCurriculum(trackSlug: string) {
    try {
        // Map the Next.js generic stream slugs to our DB slugs
        const streamSlugToDbSlug: Record<string, string> = {
            "full-stack-development": "full-stack",
            "ai-ml": "ai-ml",
            "cybersecurity": "cybersecurity",
            "data-engineering": "data-engineering",
            "devops-cloud": "devops-cloud",
            "mobile-development": "mobile-development",
            "iot-embedded": "iot-embedded",
            "data-science": "data-science",
        };
        const dbSlug = streamSlugToDbSlug[trackSlug] || trackSlug;

        const track = await prisma.track.findUnique({
            where: { slug: dbSlug },
            include: {
                courses: {
                    include: {
                        modules: {
                            include: {
                                lessons: {
                                    orderBy: { title: "asc" }
                                }
                            },
                            orderBy: { order: "asc" }
                        }
                    }
                }
            }
        });

        return track;
    } catch (error) {
        console.error("Error fetching curriculum:", error);
        return null;
    }
}

// ============================================================================
// PUBLIC PROJECT CATALOG (No Auth - for stream pages & landing)
// ============================================================================

// Slug mapping: stream page folder name → DB track slug
const streamSlugToDbSlug: Record<string, string> = {
    "full-stack-development": "full-stack",
};

export async function getPublicProjectCatalog(streamSlug: string) {
    try {
        const dbSlug = streamSlugToDbSlug[streamSlug] || streamSlug;

        const track = await prisma.track.findUnique({
            where: { slug: dbSlug },
            select: { id: true, title: true, slug: true }
        });

        if (!track) return { track: null, projects: [] };

        const projects = await prisma.projectCatalogItem.findMany({
            where: { trackId: track.id, isActive: true },
            orderBy: { difficulty: "asc" }
        });

        return { track, projects };
    } catch (error) {
        console.error("Error fetching public catalog:", error);
        return { track: null, projects: [] };
    }
}

export async function getAllFeaturedProjects() {
    try {
        const tracks = await prisma.track.findMany({
            include: {
                catalogProjects: {
                    where: { isActive: true, difficulty: 5 },
                    take: 1,
                    orderBy: { createdAt: "desc" }
                }
            },
            orderBy: { title: "asc" }
        });

        return tracks
            .filter(t => t.catalogProjects.length > 0)
            .map(t => ({
                track: { id: t.id, title: t.title, slug: t.slug },
                project: t.catalogProjects[0]
            }));
    } catch (error) {
        console.error("Error fetching featured projects:", error);
        return [];
    }
}

// ============================================================================
// STUDENT CURRICULUM PROGRESS
// ============================================================================

export async function getStudentCurriculumProgress(trackSlug: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    try {
        const dbSlug = streamSlugToDbSlug[trackSlug] || trackSlug;

        const student = await prisma.student.findUnique({
            where: { userId: session.user.id }
        });
        if (!student) return { error: "Student profile not found" };

        const track = await prisma.track.findUnique({
            where: { slug: dbSlug },
            select: { id: true, title: true, slug: true }
        });
        if (!track) return { error: "Track not found" };

        // Get all catalog projects for this track
        const catalogProjects = await prisma.projectCatalogItem.findMany({
            where: { trackId: track.id, isActive: true },
            orderBy: { difficulty: "asc" }
        });

        // Get assignments linked to these catalog projects
        const assignments = await prisma.projectAssignment.findMany({
            where: {
                studentId: student.id,
                catalogProjectId: { in: catalogProjects.map(p => p.id) }
            },
            include: {
                submissions: {
                    orderBy: { createdAt: "desc" },
                    take: 1,
                    include: {
                        reviews: {
                            orderBy: { createdAt: "desc" },
                            take: 1
                        }
                    }
                }
            }
        });

        const assignmentMap = new Map(
            assignments.map(a => [a.catalogProjectId, a])
        );

        // Map each catalog project to its progress
        const projectsWithProgress = catalogProjects.map(project => {
            const assignment = assignmentMap.get(project.id);
            return {
                ...project,
                assignmentStatus: assignment?.status || "NOT_STARTED",
                assignmentId: assignment?.id || null,
                latestSubmission: assignment?.submissions?.[0] || null,
                latestReview: assignment?.submissions?.[0]?.reviews?.[0] || null,
            };
        });

        const totalProjects = catalogProjects.length;
        const completedProjects = assignments.filter(a => a.status === "VERIFIED").length;
        const patEligible = student.patEligible;

        return {
            track,
            projects: projectsWithProgress,
            progress: {
                total: totalProjects,
                completed: completedProjects,
                percentage: totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0,
                patEligible,
            }
        };
    } catch (error) {
        console.error("Error fetching student progress:", error);
        return { error: "Failed to fetch progress" };
    }
}

// ============================================================================
// PAT ELIGIBILITY CHECK
// ============================================================================

export async function checkAndUpdatePATEligibility(studentId: string, trackId: string) {
    try {
        // Get all catalog projects for the track
        const catalogProjects = await prisma.projectCatalogItem.findMany({
            where: { trackId, isActive: true },
            select: { id: true }
        });

        if (catalogProjects.length === 0) return { eligible: false, reason: "No projects found" };

        // Get verified assignments for this student on these projects
        const verifiedCount = await prisma.projectAssignment.count({
            where: {
                studentId,
                catalogProjectId: { in: catalogProjects.map(p => p.id) },
                status: "VERIFIED"
            }
        });

        const allVerified = verifiedCount >= catalogProjects.length;

        // Check attendance (≥ 75%)
        const student = await prisma.student.findUnique({
            where: { id: studentId },
            select: { userId: true }
        });

        let attendanceMet = true; // Default true if no sessions exist yet
        if (student) {
            const totalSessions = await prisma.attendanceRecord.count({
                where: { studentId: student.userId }
            });
            if (totalSessions > 0) {
                const presentSessions = await prisma.attendanceRecord.count({
                    where: {
                        studentId: student.userId,
                        status: { in: ["PRESENT", "LATE"] }
                    }
                });
                attendanceMet = (presentSessions / totalSessions) >= 0.75;
            }
        }

        const eligible = allVerified && attendanceMet;

        // Update student's patEligible flag
        await prisma.student.update({
            where: { id: studentId },
            data: { patEligible: eligible }
        });

        return {
            eligible,
            projectsVerified: verifiedCount,
            projectsTotal: catalogProjects.length,
            attendanceMet,
            reason: !allVerified
                ? `${verifiedCount}/${catalogProjects.length} projects verified`
                : !attendanceMet
                    ? "Attendance below 75%"
                    : "All criteria met"
        };
    } catch (error) {
        console.error("Error checking PAT eligibility:", error);
        return { eligible: false, reason: "Error checking eligibility" };
    }
}
