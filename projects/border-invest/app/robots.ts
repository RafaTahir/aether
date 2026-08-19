import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://aether-six-azure-one.vercel.app";
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin/", "/auth", "/portfolio", "/operator"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
