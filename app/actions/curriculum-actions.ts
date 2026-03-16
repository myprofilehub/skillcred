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
        const track = await prisma.track.findUnique({
            where: { slug: trackSlug },
            include: {
                curriculumPhases: {
                    include: {
                        sessions: {
                            orderBy: { sessionNumber: "asc" }
                        }
                    },
                    orderBy: { phaseNumber: "asc" }
                }
            }
        });

        return track;
    } catch (error) {
        console.error("Error fetching curriculum:", error);
        return null;
    }
}
