import type { Metadata } from "next";
import GlossaryClient from "./glossaryClient";
export const metadata: Metadata = {
  title: "Glossaire de FFXIV",
  robots: { index: true, follow: true },
};

export default function GlossaryPage() {
  return <GlossaryClient />;
}
