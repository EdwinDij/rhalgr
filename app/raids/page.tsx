import { getAllGuides } from "@/lib/mdx";
import RaidsClient from "../components/raidSection/RaidsClient";

export default async function RaidsPage() {
  const guides = getAllGuides();
  return <RaidsClient raids={guides} />;
}