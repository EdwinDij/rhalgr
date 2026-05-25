import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Raid } from "./raids";

const guidesDirectory = path.join(process.cwd(), "content/guides");

export function getAllGuides(): Raid[] {
  const files = fs.readdirSync(guidesDirectory);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(guidesDirectory, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug: data.slug,
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        extension: data.extension,
        bossCount: data.bossCount,
        iLvl: data.iLvl,
        coverImage: data.coverImage,
      } as Raid;
    });
}

export function getGuideBySlug(slug: string) {
  const filePath = path.join(guidesDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data as Raid,
    content,
  };
}