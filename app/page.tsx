import HeroSection from "./components/heroSection/HeroSection";
import RaidSection from "./components/raidComponents/RaidSection";
import { getAllGuides } from "@/lib/mdx";
export default function Home() {
  const guides = getAllGuides();

  return (
    <>
      <main>
        <HeroSection />
        <RaidSection raids={guides} />
      </main>
    </>
  );
}
