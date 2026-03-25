"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Helper to verify admin access
async function requireAdmin() {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized: Admin access required");
    }
    return session;
}

// ---- PUBLIC ----

export async function getBlogPosts() {
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        select: {
            id: true,
            slug: true,
            title: true,
            subtitle: true,
            excerpt: true,
            tags: true,
            stream: true,
            readTime: true,
            coverColor: true,
            publishedAt: true,
        },
    });
    return posts;
}

export async function getBlogPost(slug: string) {
    const post = await prisma.blogPost.findUnique({
        where: { slug },
        include: {
            author: {
                select: { name: true, image: true },
            },
        },
    });
    if (!post || !post.published) return null;
    return post;
}

// ---- ADMIN ----

export async function getAllBlogPostsAdmin() {
    await requireAdmin();
    const posts = await prisma.blogPost.findMany({
        orderBy: { updatedAt: "desc" },
        select: {
            id: true,
            slug: true,
            title: true,
            stream: true,
            published: true,
            publishedAt: true,
            updatedAt: true,
            readTime: true,
            tags: true,
        },
    });
    return posts;
}

export async function createBlogPost(data: {
    title: string;
    slug: string;
    subtitle?: string;
    excerpt: string;
    content: string;
    tags: string[];
    stream?: number;
    readTime?: number;
    coverColor?: string;
    published?: boolean;
}) {
    const session = await requireAdmin();

    const existing = await prisma.blogPost.findUnique({ where: { slug: data.slug } });
    if (existing) {
        return { error: "A blog post with this slug already exists" };
    }

    try {
        const post = await prisma.blogPost.create({
            data: {
                ...data,
                authorId: session.user.id,
                publishedAt: data.published ? new Date() : null,
            },
        });
        revalidatePath("/blog");
        revalidatePath("/dashboard/admin/blog");
        return { success: true, post };
    } catch (error: any) {
        console.error("Error creating blog post:", error);
        return { error: "Failed to create blog post" };
    }
}

export async function updateBlogPost(
    id: string,
    data: {
        title?: string;
        slug?: string;
        subtitle?: string;
        excerpt?: string;
        content?: string;
        tags?: string[];
        stream?: number | null;
        readTime?: number;
        coverColor?: string;
        published?: boolean;
    }
) {
    await requireAdmin();

    try {
        // If slug changed, check uniqueness
        if (data.slug) {
            const existing = await prisma.blogPost.findFirst({
                where: { slug: data.slug, NOT: { id } },
            });
            if (existing) {
                return { error: "Another post with this slug already exists" };
            }
        }

        const current = await prisma.blogPost.findUnique({ where: { id } });
        const updateData: any = { ...data };

        // Set publishedAt when first publishing
        if (data.published && !current?.publishedAt) {
            updateData.publishedAt = new Date();
        }

        const post = await prisma.blogPost.update({
            where: { id },
            data: updateData,
        });

        revalidatePath("/blog");
        revalidatePath(`/blog/${post.slug}`);
        revalidatePath("/dashboard/admin/blog");
        return { success: true, post };
    } catch (error: any) {
        console.error("Error updating blog post:", error);
        return { error: "Failed to update blog post" };
    }
}

export async function deleteBlogPost(id: string) {
    await requireAdmin();

    try {
        const post = await prisma.blogPost.delete({ where: { id } });
        revalidatePath("/blog");
        revalidatePath("/dashboard/admin/blog");
        return { success: true, slug: post.slug };
    } catch (error: any) {
        console.error("Error deleting blog post:", error);
        return { error: "Failed to delete blog post" };
    }
}

export async function togglePublish(id: string) {
    await requireAdmin();

    try {
        const post = await prisma.blogPost.findUnique({ where: { id } });
        if (!post) return { error: "Post not found" };

        const updated = await prisma.blogPost.update({
            where: { id },
            data: {
                published: !post.published,
                publishedAt: !post.published ? new Date() : post.publishedAt,
            },
        });

        revalidatePath("/blog");
        revalidatePath(`/blog/${updated.slug}`);
        revalidatePath("/dashboard/admin/blog");
        return { success: true, published: updated.published };
    } catch (error: any) {
        console.error("Error toggling publish:", error);
        return { error: "Failed to toggle publish status" };
    }
}

export async function getBlogPostById(id: string) {
    await requireAdmin();
    const post = await prisma.blogPost.findUnique({ where: { id } });
    return post;
}
