import { config, fields, collection } from "@keystatic/core";
import { block, wrapper } from "@keystatic/core/content-components";

const phaseSectionWrapper = wrapper({
  label: "Phase / Section",
  schema: {
    name: fields.text({ label: "Nom de la phase" }),
    timeline: fields.text({ label: "Timeline (ex: ~1:30)", validation: { isRequired: false } }),
  },
  ContentView: (props) => (
    <div
      style={{
        padding: "8px 12px",
        backgroundColor: "#1e293b",
        borderRadius: "6px",
        borderLeft: "3px solid #f59e0b",
        color: "#f8fafc",
      }}
    >
      ⚔️ <strong>{props.value.name || "Phase sans nom"}</strong>
      {props.value.timeline && (
        <span style={{ marginLeft: "8px", color: "#f59e0b", fontSize: "12px" }}>
          {props.value.timeline}
        </span>
      )}
    </div>
  ),
});

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
    backgroundImage: fields.image({
      label: "Image de fond de l'arène",
      directory: "public/images/arenas",
      publicPath: "/images/arenas/",
    }),
    positions: fields.text({
      label: "Positions initiales (Format JSON String)",
      multiline: true,
    }),
    positionsAfter: fields.text({
      label: "Positions — Après (JSON, optionnel)",
      multiline: true,
    }),
    phases: fields.text({
      label: "Phases (Format JSON Array, optionnel)",
      multiline: true,
    }),
  },
  ContentView: (props) => {
    let tokenCount = 0;
    let aoeCount = 0;

    try {
      if (props.value.positions) {
        const parsed = JSON.parse(props.value.positions);
        if (Array.isArray(parsed)) {
          tokenCount = parsed.length;
        } else if (typeof parsed === "object" && parsed !== null) {
          tokenCount = parsed.tokens?.length || 0;
          aoeCount = parsed.aoes?.length || 0;
        }
      }
    } catch (e) {
      // Le JSON est en cours d'écriture ou invalide, on ignore l'erreur en attendant la saisie complète
    }

    const hasBgImage = !!props.value.backgroundImage;

    return (
      <div
        style={{
          padding: "12px",
          backgroundColor: "#1e293b",
          borderRadius: "6px",
          border: "1px solid #334155",
          color: "#f8fafc",
          display: "flex",
          justifyContent: "between",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div style={{ flex: 1 }}>
          📍 <strong>[Schéma Arena]</strong> {props.value.label || "Sans titre"}{" "}
          — Forme :{" "}
          <span style={{ textTransform: "capitalize", color: "#f59e0b" }}>
            {props.value.shape}
          </span>{" "}
          ({tokenCount} joueurs{aoeCount > 0 ? ` • ${aoeCount} AoE` : ""})
        </div>
        {hasBgImage && (
          <span
            title="Image de fond détectée"
            style={{
              fontSize: "14px",
              backgroundColor: "#334155",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            🖼️ Fond
          </span>
        )}
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
        { label: "Protean", value: "Protean" },
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
      PhaseSection: phaseSectionWrapper,
      PositionSchema: positionSchemaBlock,
      MechanicCard: mechanicCardBlock,
    },
  }),
});

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: process.env.NEXT_PUBLIC_REPO_OWNER!,
      name: process.env.NEXT_PUBLIC_REPO_NAME!,
    },
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
