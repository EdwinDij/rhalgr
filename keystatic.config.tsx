import { config, fields, collection } from "@keystatic/core";
import { block } from "@keystatic/core/content-components";

const positionSchemaBlock = block({
  label: "Schéma de Position",
  schema: {
    label: fields.text({ label: "Nom de la phase / Mécanique (Label)" }),
    shape: fields.select({
      label: "Forme de l'arène",
      options: [
        { label: "Cercle", value: "circle" },
        { label: "Carré", value: "square" },
        { label: "Rectangle", value: "rectangle" },
      ],
      defaultValue: "circle",
    }),
    size: fields.number({ label: "Taille de l'arène (px)", defaultValue: 400 }),
    positions: fields.text({
      label: "Positions des tokens (Format JSON String)",
      multiline: true,
    }),
  },
  ContentView: (props) => {
    let count = 0;
    try {
      if (props.value.positions)
        count = JSON.parse(props.value.positions).length;
    } catch (e) {}
    return (
      <div
        style={{
          padding: "12px",
          backgroundColor: "#1e293b",
          borderRadius: "6px",
          border: "1px solid #334155",
          color: "#f8fafc",
        }}
      >
        📍 <strong>[Schéma Arena]</strong> {props.value.label || "Sans titre"} —
        Forme : <em>{props.value.shape}</em> ({count} tokens)
      </div>
    );
  },
});

const mechanicCardBlock = block({
  label: "Carte de Mécanique",
  schema: {
    name: fields.text({ label: "Nom de la mécanique" }),
    type: fields.select({
      label: "Type",
      options: [
        { label: "Raidwide", value: "Raidwide" },
        { label: "Tankbuster", value: "Tankbuster" },
        { label: "Stack", value: "Stack" },
        { label: "Spread", value: "Spread" },
        { label: "Positional", value: "Positional" },
        { label: "Enrage", value: "Enrage" },
      ],
      defaultValue: "Raidwide",
    }),
    description: fields.text({ label: "Description", multiline: true }),
    tip: fields.text({ label: "Conseil", multiline: true }),
  },
  ContentView: (props) => (
    <div
      style={{
        padding: "8px",
        backgroundColor: "#2d3748",
        borderRadius: "4px",
        borderLeft: "4px solid #ecc94b",
      }}
    >
      🃏 Mécanique : {props.value.name || "Sans nom"}
    </div>
  ),
});

const guideSchema = (difficulty: string) => ({
  title: fields.slug({
    name: { label: "Title", description: "titre du guide" },
  }),
  description: fields.text({ label: "Description", multiline: true }),
  extension: fields.select({
    label: "Extension",
    options: [
      { label: "Dawntrail", value: "Dawntrail" },
      { label: "Endwalker", value: "Endwalker" },
      { label: "Shadowbringers", value: "Shadowbringers" },
      { label: "Stormblood", value: "Stormblood" },
    ],
    defaultValue: "Dawntrail",
  }),
  bossCount: fields.number({ label: "Nombre de boss" }),
  iLvl: fields.number({ label: "iLvl minimum requis" }),
  currentTier: fields.select({
    label: "Tier actuel",
    options: [
      { label: "Oui", value: "oui" },
      { label: "Non", value: "non" },
    ],
    defaultValue: "non",
  }),
  coverImage: fields.image({
    label: "Image de couverture",
    directory: `public/images/guides/${difficulty}`,
    publicPath: `/images/guides/${difficulty}`,
  }),
  updatedAt: fields.date({ label: "Mis à jour le" }),
  content: fields.mdx({
    label: "Contenu",
    options: {
      image: {
        directory: `public/images/guides/${difficulty}`,
        publicPath: `/images/guides/${difficulty}`,
      },
    },
    components: {
      PositionSchema: positionSchemaBlock,
      MechanicCard: mechanicCardBlock,
    },
  }),
});

export default config({
  storage: {
    kind: "github",
    repo: { owner: process.env.NEXT_PUBLIC_REPO_OWNER!, name: process.env.NEXT_PUBLIC_REPO_NAME! },
  },
  collections: {
    savage: collection({
      label: "Guides Sadique (Savage)",
      slugField: "title",
      path: "content/guides/savage/*",
      format: { contentField: "content" },
      schema: guideSchema("savage"),
    }),
    extreme: collection({
      label: "Guides Extrême",
      slugField: "title",
      path: "content/guides/extreme/*",
      format: { contentField: "content" },
      schema: guideSchema("extreme"),
    }),
    ultimate: collection({
      label: "Guides Fatal (Ultimate)",
      slugField: "title",
      path: "content/guides/ultimate/*",
      format: { contentField: "content" },
      schema: guideSchema("ultimate"),
    }),
  },
});