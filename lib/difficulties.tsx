import React from "react";
import { Swords, Zap, Shield, Crown } from "lucide-react";
export type DifficultyId = "Extreme" | "Savage" | "Ultimate" | "Normal";

export interface Difficulty {
  id: DifficultyId;
  label: string;
  labelFr: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: {
    border: string;
    bg: string;
    hover: string;
    text: string;
    badge: string;
  };
}

export const difficulties: Difficulty[] = [
  {
    id: "Savage",
    label: "Savage",
    labelFr: "Sadique",
    description:
      "Les raids les plus exigeants, conçus pour les joueurs en quête de défi mécanique.",
    icon: (
      <Swords size={40} className="text-orange-400 bg-neutral-600/20 p-2 rounded-lg border border-neutral-500/40" />
    ),
    href: "/raids?difficulty=Savage",
    color: {
      border: "border-orange-500/30",
      bg: "bg-orange-500/5",
      hover: "hover:bg-orange-500/10",
      text: "text-orange-400",
      badge: "text-orange-400 bg-orange-400/10 border-orange-400",
    },
  },
  {
    id: "Ultimate",
    label: "Ultimate",
    labelFr: "Fatal",
    description:
      "Le sommet de la difficulté. Des combats longs et implacables pour tester les limites des joueurs.",
    icon: (
      <Crown size={40} className="text-red-400 bg-neutral-600/20 p-2 rounded-lg border border-neutral-500/40" />
    ),
    href: "/raids?difficulty=Ultimate",
    color: {
      border: "border-red-500/30",
      bg: "bg-red-500/5",
      hover: "hover:bg-red-500/10",
      text: "text-red-400",
      badge: "text-red-400 bg-red-400/10 border-red-400",
    },
  },
  {
    id: "Extreme",
    label: "Extreme",
    labelFr: "Extrême",
    description:
      "Des défis corsés pour les joueurs cherchant à progresser au-delà du contenu normal.",
    icon: <Zap size={40} className="text-green-400 bg-neutral-600/20 p-2 rounded-lg border border-neutral-500/40" />,
    href: "/raids?difficulty=Extreme",
    color: {
      border: "border-green-500/30",
      bg: "bg-green-500/5",
      hover: "hover:bg-green-500/10",
      text: "text-green-400",
      badge: "text-green-400 bg-green-400/10 border-green-400",
    },
  },
];

export const getDifficulty = (id: DifficultyId) =>
  difficulties.find((d) => d.id === id);
