import { describe, it, expect } from 'vitest';
import Toto from '../Toto';

describe('Toto class', () => {
    it("should create a new instance", () => {
        const toto = new Toto();
        expect(toto.merkozesek).toEqual([]);
    });

    it("should add a new result", () => {
        const toto = new Toto();
        toto.ujEredmeny("csapat1", 2, "csapat2", 1);
        expect(toto.merkozesek).toEqual([{ csapat1: "csapat1", gol1: 2, csapat2: "csapat2", gol2: 1 }]);
    });

    it("should throw an error if more than 14 results are added", () => {
        const toto = new Toto();
        for (let i = 0; i < 14; i++) {
            toto.ujEredmeny("csapat1", 2, "csapat2", 1);
        }
        expect(() => toto.ujEredmeny("csapat1", 2, "csapat2", 1)).toThrow("Már rögzítettük a 14 mérkőzés eredményét.");
    });

    it("should throw an error if invalid input is provided", () => {
        const toto = new Toto();
        expect(() => toto.ujEredmeny("", 2, "csapat2", 1)).toThrow("Érvénytelen bemenet.");
        expect(() => toto.ujEredmeny("csapat1", 2, "csapat2", -1)).toThrow("Érvénytelen bemenet.");
    });

    it("should return the result of a match", () => {
        const toto = new Toto();
        toto.ujEredmeny("csapat1", 2, "csapat2", 1);
        expect(toto.merkozesEredmeny(0)).toBe("2-1");
    });

    it("should return the teams of a match", () => {
        const toto = new Toto();
        toto.ujEredmeny("csapat1", 2, "csapat2", 1);
        expect(toto.merkozesCsapatok(0)).toBe("csapat1 - csapat2");
    });

    it("should throw an error if an invalid match id is provided", () => {
        const toto = new Toto();
        expect(() => toto.merkozesEredmeny(-1)).toThrow("Érvénytelen mérkőzés azonosító.");
        expect(() => toto.merkozesEredmeny(0)).toThrow("Érvénytelen mérkőzés azonosító.");
    });

    it("should validate a ticket", () => {
        const toto = new Toto();
        for (let i = 0; i < 14; i++) {
            toto.ujEredmeny(`csapat${i}`, i % 3, `csapat${i + 1}`, (i + 1) % 3);
        }

        const validTicket = ["1", "X", "2", "1", "X", "2", "1", "X", "2", "1", "X", "2", "1", "X"];
        expect(toto.szelvenytEllenoriz(validTicket)).toBeGreaterThanOrEqual(0);
    });

    it("should throw an error if an invalid ticket is provided", () => {
        const toto = new Toto();
        for (let i = 0; i < 14; i++) {
            toto.ujEredmeny(`csapat${i}`, i % 3, `csapat${i + 1}`, (i + 1) % 3);
        }

        const invalidTicket = ["1", "X", "2", "1", "X", "2", "1", "X", "2", "1", "X", "2", "1"];
        expect(() => toto.szelvenytEllenoriz(invalidTicket)).toThrow("Érvénytelen szelvény.");
    });
});
