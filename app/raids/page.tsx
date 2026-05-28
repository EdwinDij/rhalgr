import { getAllGuides } from "@/lib/mdx";
import RaidsClient from "../components/raidComponents/RaidsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Raids",
  description:
    "Tous les guides de raids FFXIV — Sadique, Extrême et Fatal. Mécaniques détaillées et stratégies pour la communauté EU francophone.",
};
export default async function RaidsPage() {
  const guides = getAllGuides();
  return <RaidsClient raids={guides} />;
}
