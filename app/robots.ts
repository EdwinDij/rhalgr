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
    sitemap: "https://Rhalgr.vercel.app/sitemap.xml",
  };
}