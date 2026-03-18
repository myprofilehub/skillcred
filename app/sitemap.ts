import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.AUTH_URL || "https://www.skillcred.in";

  // Public primary routes
  const routes = [
    "",
    "/about",
    "/contact",
    "/library",
    "/portfolio",
    "/enroll",
    "/apply-mentor",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // How It Works routes
  const howItWorksRoutes = [
    "/how-it-works/colleges",
    "/how-it-works/hr",
    "/how-it-works/investors",
    "/how-it-works/mentors",
    "/how-it-works/students",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
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

  return [...routes, ...howItWorksRoutes, ...programRoutes, ...streamRoutes];
}
