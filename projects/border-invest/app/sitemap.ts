import type { MetadataRoute } from "next";
import { projects } from "@/src/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://aether-six-azure-one.vercel.app";
  const staticRoutes = ["", "/about", "/how-it-works", "/funding", "/funder"];
  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.lastUpdated,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
