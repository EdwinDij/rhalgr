import { config, fields, collection } from "@keystatic/core";
import { block } from "@keystatic/core/content-components";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    guides: collection({
      label: "Guides de raid",
      slugField: "title",
      path: "content/guides/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: { label: "Title", description: "titre du guide" },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        difficulty: fields.select({
          label: "Difficulté",
          options: [
            { label: "Savage", value: "Savage" },
            { label: "Extreme", value: "Extreme" },
            { label: "Fatal", value: "Ultimate" },
          ],
          defaultValue: "Savage",
        }),
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
          label: "Tiers actuel",
          options: [
            { label: "Oui", value: "oui" },
            { label: "Non", value: "non" },
          ],
          defaultValue: "non",
        }),
        coverImage: fields.image({
          label: "Image de couverture",
          directory: "public/images/guides",
          publicPath: "/images/guides",
        }),
        updatedAt: fields.date({ label: "Mis à jour le" }),

        content: fields.mdx({
          label: "Contenu",
          options: {
            image: {
              directory: "public/images/guides",
              publicPath: "/images/guides",
            },
          },
          components: {
            PositionSchema: block({
              label: "Schéma de Position",
              schema: {
                label: fields.text({
                  label: "Nom de la phase / Mécanique (Label)",
                }),
                name: fields.text({ label: "Nom (Alternative)" }),
                shape: fields.select({
                  label: "Forme de l'arène",
                  options: [
                    { label: "Cercle", value: "circle" },
                    { label: "Carré", value: "square" },
                    { label: "Rectangle", value: "rectangle" },
                  ],
                  defaultValue: "circle",
                }),
                size: fields.number({
                  label: "Taille de l'arène (px)",
                  defaultValue: 400,
                }),
                positions: fields.text({
                  label: "Positions des tokens (Format JSON String)",
                  multiline: true,
                }),
              },
              ContentView: (props) => {
                let count = 0;
                try {
                  if (props.value.positions) {
                    count = JSON.parse(props.value.positions).length;
                  }
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
                    📍 <strong>[Schéma Arena]</strong>{" "}
                    {props.value.label || props.value.name || "Sans titre"} —
                    Forme : <em>{props.value.shape}</em> ({count} tokens)
                  </div>
                );
              },
            }),

            MechanicCard: block({
              label: "Carte de Mécanique",
              schema: {
                title: fields.text({ label: "Nom de la mécanique" }),
                name: fields.text({ label: "Nom alternatif" }),
                type: fields.text({ label: "Type de mécanique" }),
                description: fields.text({
                  label: "Description",
                  multiline: true,
                }),
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
                  🃏 Mécanique :{" "}
                  {props.value.title || props.value.name || "Sans nom"}
                </div>
              ),
            }),
          },
        }),
      },
    }),
  },
});
