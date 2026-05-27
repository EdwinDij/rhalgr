"use client";
import { useState } from "react";
import { Skull, Swords } from "lucide-react";
import { Raid, extensions, ExtensionId } from "../../../lib/raids";
import { difficulties, DifficultyId } from "../../../lib/difficulties";
import RaidTierCard from "../raidsCard/RaidTierCard";
import { useSearchParams } from "next/navigation";
import { filterByExtension, filterByDifficulty } from "../../../lib/raidUtils";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCard from "../ui/AnimatedCard";

type FilterDifficulty = DifficultyId | "Tous";
type FilterExtension = ExtensionId | "Toutes";

export default function RaidsClient({ raids }: { raids: Raid[] }) {
  const searchParams = useSearchParams();
  const difficultyParam = searchParams.get(
    "difficulty",
  ) as FilterDifficulty | null;

  const [activeDifficulty, setActiveDifficulty] = useState<FilterDifficulty>(
    difficultyParam ?? "Tous",
  );
  const [activeExtension, setActiveExtension] =
    useState<FilterExtension>("Toutes");

  const filteredRaids = filterByExtension(
    filterByDifficulty(raids, activeDifficulty),
    activeExtension,
  );

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            <Swords className="inline mr-4 text-amber-500" size={36} />
            Raids
          </h1>
          <p className="text-white/75">
            Tous les guides de raids FFXIV — mécaniques, stratégies.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveDifficulty("Tous")}
              className={`px-4 py-2 rounded text-sm font-medium cursor-pointer transition-colors ${
                activeDifficulty === "Tous"
                  ? "bg-amber-500 text-black"
                  : "bg-gray-800/60 text-white hover:bg-gray-700"
              }`}
            >
              Tous
            </button>
            {difficulties.map((diff) => (
              <button
                key={diff.id}
                onClick={() => setActiveDifficulty(diff.id)}
                className={`px-4 py-2 rounded text-sm font-medium cursor-pointer transition-colors ${
                  activeDifficulty === diff.id
                    ? "bg-amber-500 text-black"
                    : "bg-gray-800/60 text-white hover:bg-gray-700"
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>

          <select
            value={activeExtension}
            onChange={(e) =>
              setActiveExtension(e.target.value as FilterExtension)
            }
            className="px-4 py-2 rounded text-sm font-medium bg-gray-800/60 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="Toutes">Toutes les extensions</option>
            {extensions.map((ext) => (
              <option key={ext.id} value={ext.id}>
                {ext.label}
              </option>
            ))}
          </select>
        </div>

        <motion.p
          key={filteredRaids.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/40 text-sm mb-6"
        >
          {filteredRaids.length} guide{filteredRaids.length > 1 ? "s" : ""}{" "}
          trouvé{filteredRaids.length > 1 ? "s" : ""}
        </motion.p>

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRaids.map((raid, index) => (
              <AnimatedCard key={raid.id} index={index}>
                <RaidTierCard raid={raid} />
              </AnimatedCard>
            ))}
          </div>
        </AnimatePresence>

        {filteredRaids.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <Skull className="mx-auto mb-4" size={48} />
            Aucun guide ne correspond à ces filtres.
          </div>
        )}
      </div>
    </div>
  );
}
