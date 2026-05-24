export type GlossaryCategory =
  | "Mécanique"
  | "Statut"
  | "Stratégie"
  | "Communauté"
  | "Équipement";

export interface GlossaryEntry {
  term: string;
  definition: string;
  category: GlossaryCategory;
  abbreviation?: string;
}

export const categories: GlossaryCategory[] = [
  "Mécanique",
  "Statut",
  "Stratégie",
  "Communauté",
  "Équipement",
];

export const glossary: GlossaryEntry[] = [
  // ── MÉCANIQUES ──────────────────────────────────────────────────────────────
  {
    term: "AoE",
    abbreviation: "Area of Effect",
    definition:
      "Zone d'effet. Attaque touchant tous les joueurs présents dans une zone délimitée, souvent indiquée par un marqueur au sol.",
    category: "Mécanique",
  },
  {
    term: "Raidwide",
    definition:
      "Attaque touchant l'ensemble du groupe simultanément. Nécessite généralement des soins de masse ou des cooldowns défensifs.",
    category: "Mécanique",
  },
  {
    term: "Tankbuster",
    definition:
      "Attaque ciblant uniquement le tank actif, infligeant de très lourds dégâts. Requiert souvent un invincible ou un tank-swap.",
    category: "Mécanique",
  },
  {
    term: "Stack",
    definition:
      "Mécanique demandant à plusieurs joueurs (souvent tout le groupe) de se regrouper sur une même cible pour partager les dégâts d'une attaque.",
    category: "Mécanique",
  },
  {
    term: "Spread",
    definition:
      "Mécanique demandant à chaque joueur de s'écarter des autres pour éviter de se chevaucher et de propager des dégâts ou des debuffs.",
    category: "Mécanique",
  },
  {
    term: "Flare",
    definition:
      "Marqueur ciblant un joueur dont l'explosion inflige des dégâts de proximité. Les joueurs marqués doivent s'éloigner du groupe.",
    category: "Mécanique",
  },
  {
    term: "Bait",
    definition:
      "Action d'attirer une AoE ou une mécanique vers un endroit précis en se positionnant intentionnellement à cet endroit.",
    category: "Mécanique",
  },
  {
    term: "Chariot",
    definition:
      "Grande AoE circulaire centrée sur le boss, plus large que sa hitbox. Les joueurs doivent s'éloigner du boss pour l'éviter.",
    category: "Mécanique",
  },
  {
    term: "Donut",
    definition:
      "AoE en anneau autour du boss : la zone sûre est dans le centre (sous le boss) ou à l'extérieur selon la variante.",
    category: "Mécanique",
  },
  {
    term: "Cleave",
    definition:
      "Attaque frontale du boss frappant en cône devant lui. Se placer sur les côtés ou derrière le boss permet de l'esquiver.",
    category: "Mécanique",
  },
  {
    term: "Tank Swap",
    definition:
      "Échange de l'aggro entre les deux tanks, généralement déclenché par l'accumulation de stacks d'un debuff sur le tank actif.",
    category: "Mécanique",
  },
  {
    term: "Body Check",
    definition:
      "Mécanique de vérification exigeant que tous les joueurs soient en vie et correctement positionnés. Un échec entraîne un wipe instantané.",
    category: "Mécanique",
  },
  {
    term: "Enrage",
    definition:
      "Attaque fatale déclenchée par un timer invisible si le groupe ne tue pas le boss assez vite. Synonyme de wipe garanti.",
    category: "Mécanique",
  },
  {
    term: "Soft Enrage",
    definition:
      "Phase finale répétitive qui devient ingérable si le DPS du groupe est insuffisant, menant à un wipe progressif plutôt qu'instantané.",
    category: "Mécanique",
  },
  {
    term: "Clock Spots",
    definition:
      "Assignation fixe de positions sur l'arène selon les points cardinaux et intercardinaux (N, NE, E, SE, S, SO, O, NO), une par joueur.",
    category: "Mécanique",
  },
  {
    term: "Partners",
    definition:
      "Système d'assignation par paires (souvent un tank/healer + un DPS) pour résoudre certaines mécaniques ensemble.",
    category: "Mécanique",
  },
  {
    term: "Conga Line",
    definition:
      "Stratégie où le groupe forme une ligne et se déplace en file indienne pour résoudre une mécanique basée sur la distance ou les debuffs.",
    category: "Mécanique",
  },
  {
    term: "Positional",
    definition:
      "Mécanique ou compétence nécessitant d'attaquer depuis une position précise (flanc ou derrière) pour obtenir un bonus de dégâts.",
    category: "Mécanique",
  },
  {
    term: "Tether",
    definition:
      "Lien visible reliant deux joueurs ou un joueur à un objet. Peut partager des dégâts, transférer un debuff ou nécessiter un écartement.",
    category: "Mécanique",
  },
  {
    term: "3-1",
    definition:
      "Stratégie où trois séries d'AoE apparaissent successivement : on se déplace vers la troisième zone, puis dans la zone libérée par la première.",
    category: "Mécanique",
  },
  {
    term: "Color Partners",
    definition:
      "Système de paires basé sur la couleur des waymarks : les joueurs assignés à des waymarks de même couleur (ex. 1 et A = rouge) forment une paire.",
    category: "Mécanique",
  },
  {
    term: "Waymark",
    definition:
      "Marqueur coloré (A, B, C, D, 1, 2, 3, 4) posé sur l'arène par le chef de groupe pour guider le positionnement des joueurs.",
    category: "Mécanique",
  },
  {
    term: "Invincible",
    abbreviation: "Invuln",
    definition:
      "Cooldown d'invincibilité d'un tank (ex. Hallowed Ground, Living Dead) absorbant toute attaque fatale pendant sa durée.",
    category: "Mécanique",
  },

  // ── STATUTS ─────────────────────────────────────────────────────────────────
  {
    term: "Buff",
    definition:
      "Effet bénéfique temporaire augmentant les statistiques ou capacités d'un joueur (dégâts, défense, vitesse de recharge...).",
    category: "Statut",
  },
  {
    term: "Debuff",
    definition:
      "Effet négatif temporaire réduisant les statistiques ou infligeant des effets néfastes à un joueur (vulnérabilité, silence, ralentissement...).",
    category: "Statut",
  },
  {
    term: "DoT",
    abbreviation: "Damage over Time",
    definition:
      "Dégâts infligés de façon continue sur plusieurs secondes plutôt qu'en une seule fois.",
    category: "Statut",
  },
  {
    term: "HoT",
    abbreviation: "Heal over Time",
    definition:
      "Soin continu appliqué progressivement sur plusieurs secondes.",
    category: "Statut",
  },
  {
    term: "Vuln Stack",
    abbreviation: "Vulnérabilité",
    definition:
      "Debuff augmentant les dégâts reçus. S'accumule en stacks sur un joueur, souvent suite à une erreur de positionnement.",
    category: "Statut",
  },
  {
    term: "Damage Down",
    abbreviation: "DD",
    definition:
      "Debuff réduisant significativement les dégâts infligés par un joueur, sanctionnant généralement une erreur mécanique.",
    category: "Statut",
  },
  {
    term: "Stun",
    definition:
      "Effet d'étourdissement empêchant un joueur d'effectuer toute action pendant sa durée.",
    category: "Statut",
  },
  {
    term: "Doom",
    definition:
      "Debuff fatal dont le décompte entraîne la mort instantanée du joueur s'il n'est pas soigné ou dissipé à temps.",
    category: "Statut",
  },

  // ── STRATÉGIE ───────────────────────────────────────────────────────────────
  {
    term: "Macro",
    definition:
      "Message préformaté partagé en jeu décrivant la stratégie adoptée par le groupe pour chaque mécanique d'un combat.",
    category: "Stratégie",
  },
  {
    term: "Strat",
    abbreviation: "Stratégie",
    definition:
      "Approche définie par la communauté pour résoudre une mécanique spécifique. Plusieurs strats peuvent coexister pour un même fight.",
    category: "Stratégie",
  },
  {
    term: "Pull",
    definition:
      "Déclenchement du combat par le tank. Par extension, désigne une tentative complète sur un boss.",
    category: "Stratégie",
  },
  {
    term: "Wipe",
    definition:
      "Mort de l'ensemble du groupe, mettant fin à la tentative en cours.",
    category: "Stratégie",
  },
  {
    term: "Cooldown",
    abbreviation: "CD",
    definition:
      "Compétence à usage limité dans le temps, nécessitant une période de recharge avant de pouvoir être réutilisée.",
    category: "Stratégie",
  },
  {
    term: "Mit",
    abbreviation: "Mitigation",
    definition:
      "Réduction des dégâts reçus via des cooldowns défensifs. La gestion des mits entre tanks et healers est cruciale en raid.",
    category: "Stratégie",
  },
  {
    term: "Burst",
    definition:
      "Fenêtre de DPS maximale pendant laquelle tous les joueurs utilisent leurs cooldowns offensifs simultanément pour infliger un maximum de dégâts.",
    category: "Stratégie",
  },
  {
    term: "Uptime",
    definition:
      "Temps pendant lequel un joueur reste en portée du boss et peut continuer à attaquer. Maximiser l'uptime est essentiel pour le DPS.",
    category: "Stratégie",
  },
  {
    term: "Toolbox",
    definition:
      "Outil visuel interactif (souvent FFXIV Toolbox) permettant d'animer et d'expliquer le déplacement des joueurs pour une mécanique.",
    category: "Stratégie",
  },
  {
    term: "AM",
    abbreviation: "Auto-Markers",
    definition:
      "Plugin plaçant automatiquement des marqueurs de cible sur les joueurs concernés par certaines mécaniques, pour faciliter le positionnement.",
    category: "Stratégie",
  },

  // ── COMMUNAUTÉ ──────────────────────────────────────────────────────────────
  {
    term: "Prog",
    abbreviation: "Progression",
    definition:
      "Apprentissage actif d'un combat, mécanique par mécanique. Un groupe en prog ne cherche pas encore le clear mais avance dans le contenu.",
    category: "Communauté",
  },
  {
    term: "Clear",
    definition:
      "Victoire sur un boss. Par extension, un groupe 'clear' cherche à terminer le combat pour la première fois ou pour obtenir du loot.",
    category: "Communauté",
  },
  {
    term: "Farm",
    definition:
      "Répétition de clears sur un contenu maîtrisé pour accumuler du loot ou aider d'autres joueurs.",
    category: "Communauté",
  },
  {
    term: "Blind",
    definition:
      "Approche consistant à découvrir un combat sans avoir consulté de guides au préalable.",
    category: "Communauté",
  },
  {
    term: "Fresh",
    definition:
      "Tentative sur un boss qu'on n'a jamais vu ou pratiqué, souvent en début de tier.",
    category: "Communauté",
  },
  {
    term: "PF",
    abbreviation: "Party Finder",
    definition:
      "Outil de recrutement en jeu permettant de former des groupes pour tout type de contenu avec des règles et objectifs affichés.",
    category: "Communauté",
  },
  {
    term: "C41",
    definition:
      "Abréviation de 'Clear for 1' : un joueur ayant déjà clear cherche des personnes également clears pour aider un ami ou soi-même à obtenir un clear supplémentaire.",
    category: "Communauté",
  },
  {
    term: "Aggro",
    abbreviation: "Enmity",
    definition:
      "Niveau de menace généré par un joueur auprès d'un ennemi. Le tank doit maintenir la plus haute aggro pour protéger le reste du groupe.",
    category: "Communauté",
  },
  {
    term: "Raise",
    abbreviation: "Res / Rez",
    definition:
      "Résurrection d'un joueur mort pendant le combat par un healer ou un job disposant d'un sort de relève.",
    category: "Communauté",
  },
  {
    term: "LB",
    abbreviation: "Limit Break",
    definition:
      "Compétence ultime partagée par le groupe, à 1, 2 ou 3 charges. Chaque rôle possède un LB3 distinct (tank : invincibilité du groupe, healer : résurrection totale, DPS : burst massif).",
    category: "Communauté",
  },
  {
    term: "MT / OT",
    abbreviation: "Main Tank / Off Tank",
    definition:
      "MT désigne le tank qui aggro le boss en priorité. OT est le second tank, chargé des adds ou du tank swap.",
    category: "Communauté",
  },
  {
    term: "H1 / H2",
    definition:
      "Désigne le premier et second healer du groupe. Par convention, H1 est souvent un healer pur (WHM, AST) et H2 un healer bouclier (SCH, SGE).",
    category: "Communauté",
  },
  {
    term: "M1 à M2",
    definition:
      "Désigne les 2 DPS mélées du groupe.",
    category: "Communauté",
  },
  {
    term: "R1 à R2",
    definition:
      "Désigne les 2 DPS à distance du groupe. Par convention, R1 est souvent un range physique et R2 un caster magique.",
    category: "Communauté",
  },
  {
    term: "Comp",
    abbreviation: "Composition",
    definition:
      "Combinaison de jobs sélectionnés pour former le groupe. Certaines comps sont optimisées pour le DPS grâce aux synergies entre jobs.",
    category: "Communauté",
  },

  // ── ÉQUIPEMENT ───────────────────────────────────────────────────────────────
  {
    term: "BiS",
    abbreviation: "Best in Slot",
    definition:
      "Meilleur équipement possible pour un job donné dans un slot précis. Le BiS est souvent calculé par des outils comme Etro ou Xivgear.",
    category: "Équipement",
  },
  {
    term: "iLvl",
    abbreviation: "Item Level",
    definition:
      "Niveau d'objet déterminant la puissance globale d'un équipement. Plus l'iLvl est élevé, plus l'équipement est puissant.",
    category: "Équipement",
  },
  {
    term: "Meld",
    definition:
      "Incrustation de matérias dans les emplacements libres d'un équipement pour améliorer des statistiques secondaires (Critique, Dextérité, Détermination...).",
    category: "Équipement",
  },
  {
    term: "Matéria",
    definition:
      "Gemme craftable ou obtenue par spiritbond, incrustée dans l'équipement pour augmenter une statistique secondaire.",
    category: "Équipement",
  },
  {
    term: "Coffer",
    definition:
      "Coffre de loot permettant d'obtenir une pièce d'équipement d'un slot au choix parmi une sélection, sans dépendre du hasard du loot direct.",
    category: "Équipement",
  },
  {
    term: "Tome",
    abbreviation: "Tomestone",
    definition:
      "Monnaie obtenue en effectuant du contenu endgame, échangeable contre de l'équipement de haut niveau auprès de PNJ dédiés.",
    category: "Équipement",
  },
  {
    term: "Savage",
    abbreviation: "Sadique",
    definition:
      "Niveau de difficulté le plus élevé des raids en 8 joueurs hors Ultimates. Récompense le meilleur équipement du tier en dehors du craftable.",
    category: "Équipement",
  },
  {
    term: "Ultimate",
    definition:
      "Contenu de raid de prestige ne récompensant aucun équipement supérieur mais une arme cosmétique exclusive et le titre associé.",
    category: "Équipement",
  },
];

