import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Raid } from "./raids";

const DIFFICULTIES = ["savage", "extreme", "ultimate"] as const;

export function getAllGuides(): Raid[] {
  const allGuides: Raid[] = [];

  for (const difficulty of DIFFICULTIES) {
    const dir = path.join(process.cwd(), "content/guides", difficulty);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const id = file.replace(/\.mdx$/, "");
      const filePath = path.join(dir, file);
      const { data } = matter(fs.readFileSync(filePath, "utf-8"));

      const title =
        typeof data.title === "object" && data.title?.name
          ? data.title.name
          : typeof data.title === "string"
            ? data.title
            : id;

      allGuides.push({
        id,
        title,
        description: data.description || "",
        difficulty: data.difficulty || difficulty.slice(0, 1).toUpperCase() + difficulty.slice(1),
        extension: data.extension || "Dawntrail",
        bossCount: data.bossCount || 1,
        iLvl: data.iLvl || 0,
        coverImage: data.coverImage || "",
        currentTier: data.currentTier === "oui" ? "oui" : "non",
      } as Raid);
    }
  }

  return allGuides;
}

export function getGuideById(id: string) {
  const cleanId = id.toLowerCase().replace(/\s+/g, "-");

  for (const difficulty of DIFFICULTIES) {
    const filePath = path.join(
      process.cwd(),
      "content/guides",
      difficulty,
      `${cleanId}.mdx`
    );

    if (!fs.existsSync(filePath)) continue;

    const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));

    const title =
      typeof data.title === "object" && data.title?.name
        ? data.title.name
        : typeof data.title === "string"
          ? data.title
          : cleanId
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");

    const finalContent =
      content && content.trim() !== "" ? content : data.content || "";

    const { title: _, ...restOfData } = data;

    return {
      frontmatter: {
        ...restOfData,
        difficulty: data.difficulty || difficulty.slice(0, 1).toUpperCase() + difficulty.slice(1),
        title,
        id: cleanId,
      } as Raid,
      content: finalContent,
    };
  }

  return null;
}