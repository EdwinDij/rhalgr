import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/keystatic/", "/strat-board/"],
      },
    ],
    sitemap: "https://thaliak.vercel.app/sitemap.xml",
  };
}