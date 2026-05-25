import { Raid } from "../../lib/raids";
import { filterByDifficulty } from "../../lib/raidUtils";

const mockRaids: Raid[] = [
    {
        title: "Raid 1", difficulty: "Savage", id: "raid-1",
        description: "",
        extension: "Dawntrail",
        bossCount: 0,
        iLvl: 0,
        coverImage: ""
    },
    {
        title: "Raid 2", difficulty: "Extreme", id: "raid-2",
        description: "",
        extension: "Dawntrail",
        bossCount: 0,
        iLvl: 0,
        coverImage: ""
    },
    {
        title: "Raid 3", difficulty: "Ultimate", id: "raid-3",
        description: "",
        extension: "Dawntrail",
        bossCount: 0,
        iLvl: 0,
        coverImage: ""
    }
];

describe("filterByDifficulty", () => {
    it("retourne les raids si la difficulté est 'Tous'", () => {
        const result = filterByDifficulty(mockRaids, "Tous");
        expect(result).toHaveLength(mockRaids.length);
    });

    it("filtre correctement par difficulté", () => {
        const result = filterByDifficulty(mockRaids, "Savage");
        expect(result.every(raid => raid.difficulty === "Savage")).toBe(true);
    });

    it("retourne un tableau vide si aucune raid ne correspond", () => {
        const result = filterByDifficulty(mockRaids, "NonExistentDifficulty");
        expect(result).toHaveLength(0);
    });


})