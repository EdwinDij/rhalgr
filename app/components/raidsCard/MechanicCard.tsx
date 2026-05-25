import { Zap } from "lucide-react";

type MechanicType = "Raidwide" | "Tankbuster" | "Protean" | "Enrage" | "Stack" | "Spread";

const mechanicColors: Record<MechanicType, string> = {
  Raidwide: "border-red-400 text-red-400 bg-red-400/10",
  Tankbuster: "border-orange-400 text-orange-400 bg-orange-400/10",
  Protean: "border-blue-400 text-blue-400 bg-blue-400/10",
  Enrage: "border-rose-600 text-rose-500 bg-rose-600/10",
  Stack: "border-purple-400 text-purple-400 bg-purple-400/10",
  Spread: "border-green-400 text-green-400 bg-green-400/10",
};

interface MechanicCardProps {
  name: string;
  type: MechanicType;
  description: string;
  tip?: string;
}

export default function MechanicCard({ name, type, description, tip }: MechanicCardProps) {
  return (
    <div className="bg-gray-800/60 border border-gray-700/80 rounded-lg p-5">
      <div className="flex items-center gap-3 mb-2">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${mechanicColors[type]}`}>
          {type}
        </span>
        <h3 className="font-semibold text-white">{name}</h3>
      </div>
      <p className="text-white/60 text-sm leading-relaxed">{description}</p>
      {tip && (
        <div className="mt-3 flex items-start gap-2 bg-amber-500/5 border border-amber-500/20 rounded p-3">
          <Zap size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-amber-200/70 text-xs leading-relaxed">{tip}</p>
        </div>
      )}
    </div>
  );
}