import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.AUTH_URL || "https://www.skillcred.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",     // Protected student/mentor/admin interfaces
        "/actions/",       // Server actions
        "/unauthorized",   // Error handling route
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
