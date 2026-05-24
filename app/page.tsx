import HeroSection from "./components/heroSection/HeroSection";
import RaidSection from "./components/raidSection/RaidSection";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <RaidSection />
      </main>
      <footer>{/* footer content */}</footer>
    </>
  );
}
