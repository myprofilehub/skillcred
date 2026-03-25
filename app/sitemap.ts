import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.AUTH_URL || "https://www.skillcred.in";

  // Public primary routes
  const routes = [
    "",
    "/contact",
    "/library",
    "/enroll",
    "/apply-mentor",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Programs routes
  const programRoutes = [
    "/programs/capstone",
    "/programs/fast-track",
    "/programs/standard",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Streams routes
  const streamRoutes = [
    "/streams/ai-ml",
    "/streams/cybersecurity",
    "/streams/data-engineering",
    "/streams/data-science",
    "/streams/devops-cloud",
    "/streams/full-stack-development",
    "/streams/iot-embedded",
    "/streams/mobile-development",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // PAT routes
  const patRoutes = [
    "/pat/about",
    "/pat/evaluate",
    "/pat/process",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Auth routes
  const authRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/lms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog post routes (dynamic from DB)
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // DB unavailable during build — skip
  }

  return [...routes, ...programRoutes, ...streamRoutes, ...patRoutes, ...authRoutes, ...blogRoutes];
}
