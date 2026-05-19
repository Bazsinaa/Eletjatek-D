export default class Simulator{
    #matrix: number[][] = [];

    #oszlopokSzama: number;
    #sorokSzama: number;

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
        const mFinal: number[][] = this.#matrix;
        for (let sorIndex = 0; sorIndex < this.#matrix.length; sorIndex++) {
            for (let oszlopIndex = 0; oszlopIndex < this.#matrix[0].length; oszlopIndex++) {
                const szomszédok: number = this.#szomszedokSzama(sorIndex, oszlopIndex) 
                if (m[sorIndex][oszlopIndex] == -1){
                    continue;
                }
                if (m[sorIndex][oszlopIndex] == 1 && (szomszédok < 2 || szomszédok > 3)){
                    mFinal[sorIndex][oszlopIndex] = 0;
                }
                if (m[sorIndex][oszlopIndex] == 0 && (szomszédok == 3)){
                    mFinal[sorIndex][oszlopIndex] = 1;
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

    constructor(sorokSzáma: number, oszlopokSzáma: number) {
        for (let sorIndex = 0; sorIndex < sorokSzáma +2 ; sorIndex++) {
            const aktSor: number[] = [];
            for (let oszlopIndex = 0; oszlopIndex < oszlopokSzáma + 2; oszlopIndex++) {
                if (sorIndex == 0 || oszlopIndex == 0 || sorIndex == sorokSzáma + 2 || oszlopIndex == oszlopokSzáma + 2){
                    aktSor.push(-1)
                }
                else
                {
                    aktSor.push(Math.floor(Math.random() * 2));
                }
            }
            this.#matrix.push(aktSor);
        }
    }
}