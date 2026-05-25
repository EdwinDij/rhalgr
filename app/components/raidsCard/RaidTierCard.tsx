import { Swords } from "lucide-react";
import Card from "../ui/card/Card";
import { Raid } from "@/lib/raids";
import { getDifficulty } from "@/lib/difficulties";

interface RaidTierCardProps {
  raid: Raid;
}

export default function RaidTierCard({ raid }: RaidTierCardProps) {
  const difficulty = getDifficulty(raid.difficulty);

  return (
    <Card href={`/raids/${raid.slug}`}>
      <div className="relative h-40 bg-gray-700/50 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
        <div className="absolute top-3 left-3 flex gap-2 z-20">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded border ${difficulty?.color.badge}`}
          >
            {raid.difficulty}
          </span>
          <span className="text-xs font-semibold px-2 py-1 rounded border border-white/20 text-white/70">
            {raid.extension}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-2">
        <h3 className="font-bold text-white">{raid.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
          {raid.description}
        </p>
        <div className="flex gap-4 mt-2 text-white/40 text-xs">
          <span className="flex items-center gap-1">
            <Swords size={12} /> {raid.bossCount} boss
          </span>
          <span>iLvl {raid.iLvl}+</span>
        </div>
      </div>
    </Card>
  );
}
