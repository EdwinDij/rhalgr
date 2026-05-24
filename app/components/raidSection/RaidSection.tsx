import { difficulties } from "@/lib/difficulties";
import DifficultyCard from "../raids/DifficultyCard";

export default function RaidSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl font-bold mb-4">Contenu par difficulté</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {difficulties.map((diff) => (
          <DifficultyCard key={diff.id} difficulty={diff} />
        ))}
      </div>
    </section>
  );
}