export default class Simulator{
    #matrix: number[][] = [];

    #oszlopokSzama: number;
    #sorokSzama: number;

    #jelenlegiJatekos: number = 1;

    #szomszedokSzama(sorIndex: number, oszlopIndex: number): number{
        const m: number[][] = this.#matrix;
        let szomszedok: number = 0;
        if (m[sorIndex - 1][oszlopIndex - 1] == 1) szomszedok += 1;
        if (m[sorIndex - 1][oszlopIndex] == 1) szomszedok += 1;
        if (m[sorIndex - 1][oszlopIndex + 1] == 1) szomszedok += 1;
        if (m[sorIndex][oszlopIndex - 1] == 1) szomszedok += 1;
        if (m[sorIndex][oszlopIndex + 1] == 1) szomszedok += 1;
        if (m[sorIndex + 1][oszlopIndex - 1] == 1) szomszedok += 1;
        if (m[sorIndex + 1][oszlopIndex] == 1) szomszedok += 1;
        if (m[sorIndex + 1][oszlopIndex + 1] == 1) szomszedok += 1;
        return szomszedok
    }

    get #kovetkezoAllapot(): number[][]{
        const m: number[][] = this.#matrix;
        for (let sorIndex = 0; sorIndex < this.#matrix.length; sorIndex++) {
            for (let oszlopIndex = 0; oszlopIndex < this.#matrix[0].length; oszlopIndex++) {
                const szomszédok: number = this.#szomszedokSzama(sorIndex, oszlopIndex) 
                if (m[sorIndex][oszlopIndex] == -1){
                    continue;
                }
                if (m[sorIndex][oszlopIndex] == 1 && (szomszédok < 2 || szomszédok > 3)){
                    m[sorIndex][oszlopIndex] = 0;
                }
                if (m[sorIndex][oszlopIndex] == 0 && (szomszédok == 3)){
                    m[sorIndex][oszlopIndex] = 1;
                }
                
            }
        }
        this.#matrix = m;
        return m;
    }

    get #megjelenit(): string {

        let vissza: string = "";

        for (let sorIndex = 0; sorIndex < this.#matrix.length; sorIndex++) {

            for (let oszlopIndex = 0; oszlopIndex < this.#matrix[0].length; oszlopIndex++) {

                const aktualis: number = this.#matrix[sorIndex][oszlopIndex];

                if (aktualis == -1) {
                    vissza += "X";
                }
                else if (aktualis == 0) {
                    vissza += " ";
                }
                else if (aktualis == 1) {
                    vissza += "S";
                }
            }

            vissza += "\n";
        }

        return vissza;
    }

    public toString(): string {
        return this.#megjelenit;
    }

    get run(){
        this.#megjelenit;
        
    }

    lerak(sor: number, oszlop: number): void {
        if(this.#matrix[sor][oszlop] == -1){
            throw new Error("Nem lehet lerakni a pálya szélére!");
            //TOAST POPUP - DÁVID DÁVID
        }

        if(this.#matrix[sor][oszlop] == 1 || this.#matrix[sor][oszlop] == 2)
        {
            throw new Error("Nem lehet lerakni egy már élő cellára!");
            //TOAST POPUP - DÁVID DÁVID
        }

        this.#matrix[sor][oszlop] = this.#jelenlegiJatekos;
        this.#jelenlegiJatekos = this.#jelenlegiJatekos == 1 ? 2 : 1;
    }

    constructor(sorokSzáma: number, oszlopokSzáma: number) {
        for (let sorIndex = 0; sorIndex < sorokSzáma +2 ; sorIndex++) {
            const aktSor: number[] = [];
            for (let oszlopIndex = 0; oszlopIndex < oszlopokSzáma + 2; oszlopIndex++) {
                if (sorIndex == 0 || oszlopIndex == 0 || sorIndex == sorokSzáma + 2 || oszlopIndex == oszlopokSzáma + 2){
                    aktSor.push(-1)
                }
                else
                {
                    aktSor.push(0);
                }
            }
            this.#matrix.push(aktSor);
        }
        this.#sorokSzama = sorokSzáma;
        this.#oszlopokSzama = oszlopokSzáma;
    }
}