import { DifficultyId } from "./difficulties";

export type ExtensionId = "Dawntrail" | "Endwalker" | "Shadowbringers" | "Stormblood";

export interface Raid {
    id: string;
    title: string;
    description: string;
    difficulty: DifficultyId;
    extension: ExtensionId;
    bossCount: number;
    currentTier?: string;
    iLvl: number;
    coverImage: string;
}
export interface Extension {
    id: ExtensionId;
    label: string;
}
export const extensions: Extension[] = [
    { id: "Dawntrail", label: "Dawntrail" },
    { id: "Endwalker", label: "Endwalker" },
    { id: "Shadowbringers", label: "Shadowbringers" },
    { id: "Stormblood", label: "Stormblood" },
];
// export const raids: Raid[] = [
//     {
//         id: "pandaemonium-anabaseios",
//         title: "Pandaemonium: Anabaseios",
//         description: "Le dernier tier de raid d'Endwalker. L'ultime confrontation au cœur du Pandaemonium.",
//         difficulty: "Savage",
//         extension: "Endwalker",
//         bossCount: 4,
//         iLvl: 640,
//         coverImage: "/images/raids/anabaseios.jpg",
//     },
//     {
//         id: "anabaseios-extreme",
//         title: "Golbez Extrême",
//         description: "Affrontez Golbez dans sa forme la plus redoutable.",
//         difficulty: "Extreme",
//         extension: "Endwalker",
//         bossCount: 1,
//         iLvl: 635,
//         coverImage: "/images/raids/golbez.jpg",
//     },
//     {
//         id: "omega-protocol",
//         title: "The Omega Protocol",
//         description: "L'Ultimate d'Endwalker. Un combat en plusieurs phases contre Omega.",
//         difficulty: "Ultimate",
//         extension: "Endwalker",
//         bossCount: 1,
//         iLvl: 645,
//         coverImage: "/images/raids/omega.jpg",
//     },
//     {
//         id: "eden-anabaseios",
//         title: "Eden's Promise",
//         description: "Le dernier tier de raid de Shadowbringers.",
//         difficulty: "Savage",
//         extension: "Shadowbringers",
//         bossCount: 4,
//         iLvl: 510,
//         coverImage: "/images/raids/eden.jpg",
//     },
//     {
//         id: "zeromus-extreme",
//         title: "Zeromus Extrême",
//         description: "Affrontez Zeromus dans sa forme ultime.",
//         difficulty: "Extreme",
//         extension: "Dawntrail",
//         bossCount: 1,
//         iLvl: 700,
//         coverImage: "/images/raids/zeromus.jpg",
//     },
//     {
//         id: "futures-rewritten",
//         title: "Futures Rewritten",
//         description: "L'Ultimate de Dawntrail aux mécaniques labyrinthiques.",
//         difficulty: "Ultimate",
//         extension: "Dawntrail",
//         bossCount: 1,
//         iLvl: 730,
//         coverImage: "/images/raids/futures.jpg",
//     },
// ];