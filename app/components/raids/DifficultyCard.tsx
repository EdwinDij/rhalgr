import React from "react";
import { ArrowRight } from "lucide-react";
import Card from "../ui/card/Card";
import { Difficulty } from "@/lib/difficulties";

interface DifficultyCardProps {
  difficulty: Difficulty;
}

export default function DifficultyCard({ difficulty }: DifficultyCardProps) {
  return (
    <Card
      href={difficulty.href}
      className={`${difficulty.color.border} ${difficulty.color.bg} ${difficulty.color.hover}`}
    >
      <div className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          {difficulty.icon}
          <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${difficulty.color.badge}`}>
            {difficulty.label}
          </span>
        </div>
        <div>
          <h3 className="font-bold text-white mb-1">{difficulty.labelFr}</h3>
          <p className="text-white/60 text-sm leading-relaxed">{difficulty.description}</p>
        </div>
        <span className={`inline-flex items-center text-sm mt-auto ${difficulty.color.text}`}>
          Voir les guides <ArrowRight className="ml-1" size={14} />
        </span>
      </div>
    </Card>
  );
}