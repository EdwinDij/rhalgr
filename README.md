# XIV Rhalgr

> Plateforme communautaire de guides stratégiques pour les raids de **Final Fantasy XIV** — mécaniques, positionnements et outils visuels pour la communauté francophone.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![Keystatic](https://img.shields.io/badge/CMS-Keystatic-6d28d9)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

---

## Présentation

**Thaliak** est un site de guides de raid pour FFXIV, pensé pour la communauté EU francophone. Il propose :

- Des guides détaillés par boss avec mécaniques, conseils et schémas de positionnement
- Un éditeur visuel de stratégie (Strat Board) pour créer et partager des positionnements
- Un glossaire complet des termes de raid
- Un CMS intégré (Keystatic) pour rédiger des guides sans toucher au code

---

## Stack technique

| Domaine | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Style | Tailwind CSS 4 |
| Animations | Framer Motion |
| Contenu | MDX (fichiers plats, zéro base de données) |
| CMS | Keystatic (route `/keystatic`, auth GitHub) |
| Tests | Vitest + Testing Library |
| CI/CD | GitHub Actions + Vercel |

---

## Architecture du contenu

```
content/
  guides/
    savage/      # Guides Sadique
    extreme/     # Guides Extrême
    ultimate/    # Guides Fatal (Ultimate)
```

Chaque guide est un fichier `.mdx` avec un frontmatter contenant les métadonnées :

```yaml
---
title: "Anabaseios — P9S"
description: "Guide complet du premier boss du tier Anabaseios."
difficulty: Savage
extension: Endwalker
bossCount: 1
iLvl: 640
currentTier: oui
coverImage: /images/guides/savage/p9s.jpg
updatedAt: 2024-01-15
---
```

---

## Composants MDX disponibles

### `<MechanicCard />`

Affiche une mécanique de raid avec son type, sa description et un conseil optionnel.

```mdx
<MechanicCard
  name="Dissonance"
  type="Raidwide"
  description="Attaque de zone touchant tout le groupe."
  tip="Placez vos cooldowns défensifs avant l'impact."
/>
```

Types disponibles : `Raidwide` · `Tankbuster` · `Stack` · `Spread` · `Positional` · `Enrage`

---

### `<PositionSchema />`

Affiche un schéma de positionnement interactif sur une arène SVG. Supporte un mode avant/après.

```mdx
<PositionSchema
  shape="circle"
  label="Placement initial"
  positions='[{"role":"MT","x":0.5,"y":0.15},{"role":"Boss","x":0.5,"y":0.5}]'
  positionsAfter='[{"role":"MT","x":0.2,"y":0.2},{"role":"Boss","x":0.5,"y":0.5}]'
/>
```

**Paramètres :**
- `shape` : `circle` · `square` · `rectangle`
- `positions` : JSON string des positions (avant)
- `positionsAfter` : JSON string des positions (après) — optionnel, affiche les boutons Avant/Après
- `label` : titre affiché au-dessus du schéma
- `size` : taille en pixels (défaut : 400)

**Rôles supportés :** `MT` · `OT` · `H1` · `H2` · `M1` · `M2` · `R1` · `R2` · `Boss`

**Waymarks :** `A` · `B` · `C` · `D` · `1` · `2` · `3` · `4`

**Types d'AoE dans le JSON :** `circle` · `cone` · `rect` · `share` · `tankbuster`

---

## Strat Board

L'éditeur visuel de stratégie est accessible sur `/strat-board` (desktop uniquement).

Il permet de :
- Positionner joueurs, boss et waymarks sur une arène interactive
- Dessiner des AoE (cône, cercle, ligne, stack, tankbuster)
- Gérer un état **Avant** et **Après** pour illustrer le déplacement
- Exporter le JSON compatible avec `<PositionSchema />`

---

## CMS — Keystatic

L'interface d'administration est accessible sur `/keystatic` (authentification GitHub requise).

Elle permet de créer et éditer des guides avec :
- Formulaire structuré (titre, difficulté, extension, iLvl...)
- Éditeur MDX riche avec insertion de `MechanicCard` et `PositionSchema`
- Upload d'images de couverture
- Marquage "Tier actuel" pour l'affichage en page d'accueil

---

## Installation locale

```bash
# Cloner le repo
git clone https://github.com/EdwinDij/thaliak.git
cd thaliak

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Remplir les valeurs dans .env.local

# Lancer le serveur de développement
npm run dev
```

### Variables d'environnement requises

```env
NEXT_PUBLIC_REPO_OWNER=EdwinDij
NEXT_PUBLIC_REPO_NAME=thaliak
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=thaliak-keystatic

KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=
```

---

## Tests

```bash
# Lancer les tests
npm test

# Mode watch
npm run test:watch
```

Les tests couvrent :
- `lib/glossaryUtils.ts` — filtres par catégorie, recherche, tri alphabétique
- `lib/raidUtils.ts` — filtres par difficulté et par extension

---

## Structure du projet

```
app/
  components/
    footer/
    heroSection/
    navbar/
    raidComponents/    # RaidSection, RaidsClient
    raidsCard/         # DifficultyCard, RaidTierCard, MechanicCard
    raidComponents/    # PositionSchema
    ui/                # Card, AnimatedCard
  glossary/
  keystatic/
  raids/
    [slug]/
  strat-board/
  page.tsx
  layout.tsx

content/
  guides/
    savage/
    extreme/
    ultimate/

lib/
  difficulties.ts
  extensions.ts
  glossary.ts
  glossaryUtils.ts
  mdx.ts
  raids.ts
  raidUtils.ts

public/
  images/
    guides/
```

---

## Déploiement

Le site est déployé automatiquement sur **Vercel** à chaque push sur `main`.

Les tests GitHub Actions s'exécutent avant chaque déploiement — un build échoue si les tests ne passent pas.

---

## Licence

Projet de Edwin Dijeont non officiel et a but non lucratif. Final Fantasy XIV © 2010–2026 SQUARE ENIX CO., LTD.
