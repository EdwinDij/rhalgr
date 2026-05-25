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
      <div className="flex items-center justify-around mt-12">
        <h2 className="text-3xl font-bold">Tier de raid Actuel</h2>
        <div>
          <button className="px-2 py-2 bg-amber-500 text-black font-semibold rounded hover:bg-amber-600 transition-colors">
            Tous
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition-colors ml-4">
            Extrême
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition-colors ml-4">
            Sadique
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition-colors ml-4">
            Fatal
          </button>
        </div>
      </div>
      <div className="mt-8"></div>
    </section>
  );
}
