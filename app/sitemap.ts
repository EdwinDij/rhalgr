import { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllGuides();
  const baseUrl = "https://Rhalgr.vercel.app";

  const guideUrls = guides.map((guide) => ({
    url: `${baseUrl}/raids/${guide.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/raids`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...guideUrls,
  ];
}