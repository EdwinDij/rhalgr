"use client";
import { useState } from "react";
import { difficulties } from "@/lib/difficulties";
import DifficultyCard from "../raidsCard/DifficultyCard";
import RaidTierCard from "../raidsCard/RaidTierCard";
import { filterByDifficulty } from "@/lib/raidUtils";
import { Raid } from "@/lib/raids";
import AnimatedCard from "../ui/AnimatedCard";
import { Skull } from "lucide-react";
import Link from "next/link";

interface RaidSectionProps {
  raids: Raid[];
}

const filters = ["Tous", "Savage", "Extreme", "Ultimate"] as const;

export default function RaidSection({ raids }: RaidSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("Tous");
  const currentTierRaids = raids.filter((raid) => raid.currentTier === "oui");
  const filteredRaids = filterByDifficulty(currentTierRaids, activeFilter);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl font-bold mb-8">Contenu par difficulté</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {difficulties.map((diff) => (
          <DifficultyCard key={diff.id} difficulty={diff} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-16 mb-6 gap-4">
        <h2 className="text-3xl font-bold text-center">Tiers de Raid</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded text-sm font-medium cursor-pointer transition-colors ${
                activeFilter === filter
                  ? "bg-amber-500 text-black"
                  : "bg-gray-800/60 text-white hover:bg-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      {filteredRaids.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRaids.map((raid, index) => (
            <AnimatedCard key={raid.id} index={index}>
              <RaidTierCard raid={raid} />
            </AnimatedCard>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-white/30">
          <Skull className="mx-auto mb-4" size={48} />
          Aucun guide ne correspond à ces filtres et/ou extension.
          <br />
          <Link
            className="inline-flex items-center gap-1 mt-4 text-sm text-white/50 hover:text-white transition-colors underline hover:no-underline"
            href="/raids"
          >
            Voir tous les raids présents sur le site
          </Link>
        </div>
      )}
    </section>
  );
}
