class Toto {
    constructor() {
        this.merkozesek = [];
    }

    ujEredmeny(csapat1, gol1, csapat2, gol2) {
        if (this.merkozesek.length >= 14) {
            throw new Error("Már rögzítettük a 14 mérkőzés eredményét.");
        }
        if (!csapat1 || !csapat2 || gol1 < 0 || gol2 < 0) {
            throw new Error("Érvénytelen bemenet.");
        }
        this.merkozesek.push({ csapat1, gol1, csapat2, gol2 });
    }

    merkozesEredmeny(id) {
        if (id < 0 || id >= this.merkozesek.length) {
            throw new Error("Érvénytelen mérkőzés azonosító.");
        }
        const merkozes = this.merkozesek[id];
        return `${merkozes.gol1}-${merkozes.gol2}`;
    }

    merkozesCsapatok(id) {
        if (id < 0 || id >= this.merkozesek.length) {
            throw new Error("Érvénytelen mérkőzés azonosító.");
        }
        const merkozes = this.merkozesek[id];
        return `${merkozes.csapat1} - ${merkozes.csapat2}`;
    }

    szelvenytEllenoriz(szelveny) {
        if (!Array.isArray(szelveny) || szelveny.length !== 14) {
            throw new Error("Érvénytelen szelvény.");
        }
        const validTippek = ["1", "2", "X"];
        let helyesTippek = 0;

        for (let i = 0; i < szelveny.length; i++) {
            if (!validTippek.includes(szelveny[i])) {
                throw new Error("Érvénytelen szelvény.");
            }
            const merkozes = this.merkozesek[i];
            if (!merkozes) continue;

            const hazaiGyozelem = merkozes.gol1 > merkozes.gol2 && szelveny[i] === "1";
            const vendegGyozelem = merkozes.gol2 > merkozes.gol1 && szelveny[i] === "2";
            const dontetlen = merkozes.gol1 === merkozes.gol2 && szelveny[i] === "X";

            if (hazaiGyozelem || vendegGyozelem || dontetlen) {
                helyesTippek++;
            }
        }

        return helyesTippek;
    }
}

export default Toto;
