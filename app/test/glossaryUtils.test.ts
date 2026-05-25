import { filterByCategory, filterBySearch, sortAlphabetically } from "../../lib/glossaryUtils";
import { GlossaryEntry } from "../../lib/glossary";

const mockEntries: GlossaryEntry[] = [
    { term: "Wipe", definition: "Mort du groupe.", category: "Stratégie" },
    { term: "AoE", definition: "Zone d'effet.", category: "Mécanique" },
    { term: "Buff", definition: "Effet bénéfique.", category: "Statut" },
    { term: "BiS", definition: "Meilleur équipement.", category: "Équipement" },
];

describe("filterByCategory", () => {
    it("retourne toutes les entrées si la catégorie est 'Tous'", () => {
        expect(filterByCategory(mockEntries, "Tous")).toHaveLength(4);
    });

    it("filtre correctement par catégorie", () => {
        const result = filterByCategory(mockEntries, "Mécanique");
        expect(result).toHaveLength(1);
        expect(result[0].term).toBe("AoE");
    });

    it("retourne un tableau vide si aucune entrée ne correspond", () => {
        expect(filterByCategory(mockEntries, "Communauté")).toHaveLength(0);
    });
});

describe("filterBySearch", () => {
    it("retourne toutes les entrées si la recherche est vide", () => {
        expect(filterBySearch(mockEntries, "")).toHaveLength(4);
    });

    it("filtre correctement par terme", () => {
        const result = filterBySearch(mockEntries, "buff");
        expect(result).toHaveLength(1);
        expect(result[0].term).toBe("Buff");
    });

    it("est insensible à la casse", () => {
        expect(filterBySearch(mockEntries, "AOE")).toHaveLength(1);
        expect(filterBySearch(mockEntries, "aoe")).toHaveLength(1);
    });
});

describe("sortAlphabetically", () => {
    it("trie les entrées par ordre alphabétique", () => {
        const result = sortAlphabetically(mockEntries);
        expect(result[0].term).toBe("AoE");
        expect(result[1].term).toBe("BiS");
        expect(result[2].term).toBe("Buff");
        expect(result[3].term).toBe("Wipe");
    });

    it("ne modifie pas le tableau original", () => {
        sortAlphabetically(mockEntries);
        expect(mockEntries[0].term).toBe("Wipe");
    });
});