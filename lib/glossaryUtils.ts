import { GlossaryEntry } from "./glossary";

export function filterByCategory(entries: GlossaryEntry[], category: string) {
  if (category === "Tous") return entries;
  return entries.filter((entry) => entry.category === category);
}

export function filterBySearch(entries: GlossaryEntry[], search: string) {
  if (!search) return entries;
  return entries.filter((entry) =>
    entry.term.toLowerCase().includes(search.toLowerCase())
  );
}

export function sortAlphabetically(entries: GlossaryEntry[]) {
  return [...entries].sort((a, b) => a.term.localeCompare(b.term));
}