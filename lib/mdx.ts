import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Raid } from "./raids";

const guidesDirectory = path.join(process.cwd(), "content/guides");

export function getAllGuides(): Raid[] {
  if (!fs.existsSync(guidesDirectory)) return [];

  const files = fs.readdirSync(guidesDirectory);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const rawId = file.replace(/\.mdx$/, "");
      const id = rawId.toLowerCase().replace(/\s+/g, "-");

      const filePath = path.join(guidesDirectory, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      // let cleanTitle = id;
      // if (data.title) {
      //   if (typeof data.title === "object" && data.title.name) {
      //     cleanTitle = data.title.name;
      //   } else if (typeof data.title === "string") {
      //     cleanTitle = data.title;
      //   }
      // }

      // console.log(`Chargement du guide : ${data.title} (ID: ${id})`);
      // console.log("Données frontmatter :", data);
      return {
        id: id,
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        extension: data.extension,
        bossCount: data.bossCount,
        iLvl: data.iLvl,
        currentTier: data.currentTier,
        coverImage: data.coverImage,
      } as Raid;
    });
}

export function getGuideById(id: string) {
  const cleanId = id.toLowerCase().replace(/\s+/g, "-");
  const filePath = path.join(guidesDirectory, `${cleanId}.mdx`);
  console.log(`Recherche du guide avec ID : ${cleanId} vs dans le fichier : ${filePath}`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  let cleanTitle = cleanId.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  if (data.title) {
    if (typeof data.title === "object" && data.title.name) {
      cleanTitle = data.title.name;
    } else if (typeof data.title === "string") {
      cleanTitle = data.title;
    }
  }

  const finalContent = content && content.trim() !== "" ? content : (data.content || "");

  const { title, ...restOfData } = data;

  return {
    frontmatter: {
      ...restOfData,
      title: cleanTitle,
      id: cleanId
    } as Raid,
    content: finalContent,
  };
}