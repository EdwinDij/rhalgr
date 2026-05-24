"use client";
import { useState } from "react";
import { BookOpenText, Search, ChevronDown } from "lucide-react";
import { categories, glossary } from "./glossary";

export default function Page() {
  const [openTerm, setOpenTerm] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const categoryColors: Record<string, string> = {
    Mécanique: "text-blue-400 border-blue-400 bg-blue-400/10",
    Statut: "text-purple-400 border-purple-400 bg-purple-400/10",
    Stratégie: "text-green-400 border-green-400 bg-green-400/10",
    Communauté: "text-amber-400 border-amber-400 bg-amber-400/10",
    Équipement: "text-rose-400 border-rose-400 bg-rose-400/10",
  };

  return (
    <div className="pt-24 min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-2">
          <BookOpenText className="inline mr-4 text-amber-500" size={36} />
          Glossaire
        </h1>
        <p className="text-white/75">
          Lexique des termes utilisés dans les raids et la communauté FFXIV.
        </p>
        <div className="mt-8 space-y-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Rechercher un terme..."
              className="w-full mb-2 pl-10 px-4 py-3 rounded bg-gray-800/60 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              className={`px-4 py-2 rounded text-sm font-medium capitalize cursor-pointer transition-colors ${
                selectedCategory === "Tous"
                  ? "bg-amber-500 text-black"
                  : "bg-gray-800/60 text-white hover:bg-gray-700"
              }`}
              onClick={() => setSelectedCategory("Tous")}
            >
              Tous
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded text-sm font-medium capitalize cursor-pointer transition-colors ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-black"
                    : "bg-gray-800/60 text-white hover:bg-gray-700"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <section className="mt-12 space-y-2">
          {glossary
            .sort((a, b) => a.term.localeCompare(b.term))
            .filter(
              (entry) =>
                selectedCategory === "Tous" ||
                entry.category === selectedCategory,
            )
            .filter((entry) =>
              entry.term.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((entry) => (
              <div
                key={entry.term}
                className="bg-gray-800/60 rounded-lg overflow-hidden border border-gray-700/80"
              >
                <button
                  onClick={() =>
                    setOpenTerm(openTerm === entry.term ? null : entry.term)
                  }
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-700/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-white">
                      {entry.term}{" "}
                    </span>
                    {entry.abbreviation && (
                      <span className="text-xs text-amber-500/80">
                        {entry.abbreviation}
                      </span>
                    )}
                    <span
                      className={`text-sm font-medium ${categoryColors[entry.category]} border border-current rounded px-2 py-0.5`}
                    >
                      {entry.category}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-white/50 transition-transform ${openTerm === entry.term ? "rotate-180" : ""}`}
                  />
                </button>
                {openTerm === entry.term && (
                  <div className="px-5 py-4 text-white/75 text-sm leading-relaxed border border-gray-800 bg-gray-800/85">
                    {entry.definition}
                  </div>
                )}
              </div>
            ))}
        </section>
      </div>
    </div>
  );
}
