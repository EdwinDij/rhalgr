import { Raid } from "./raids";

export function filterByDifficulty(raids: Raid[], difficulty: string): Raid[] {
  if (difficulty === "Tous") return raids;
  return raids.filter((raid) => raid.difficulty === difficulty);
}

export function filterByExtension(raids: Raid[], extension: string): Raid[] {
  if (extension === "Toutes") return raids;
  return raids.filter((raid) => raid.extension === extension);
}