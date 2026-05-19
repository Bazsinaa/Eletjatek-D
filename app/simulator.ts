export default class Simulator {
  #matrix: number[][] = [];

  #oszlopokSzama: number;
  #sorokSzama: number;

  #jelenlegiJatekos: number = 1;

  #szomszedokSzama(sorIndex: number, oszlopIndex: number, jatekosSzam: number): number {

        const m: number[][] = this.#matrix;
        let szomszedok: number = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {

                if (i == 0 && j == 0) {
                    continue;
                }

                if (m[sorIndex + i][oszlopIndex + j] == jatekosSzam) {
                    szomszedok++;
                }
            }
        }

        return szomszedok;
    }



  get #kovetkezoAllapot(): number[][]{
        const m: number[][] = this.#matrix;
        const mFinal: number[][] = this.#matrix;
        for (let sorIndex = 0; sorIndex < this.#matrix.length; sorIndex++) {
            for (let oszlopIndex = 0; oszlopIndex < this.#matrix[0].length; oszlopIndex++) {
                const szomszédok1: number = this.#szomszedokSzama(sorIndex, oszlopIndex, 1);
                const szomszédok2: number = this.#szomszedokSzama(sorIndex, oszlopIndex, 2);
                const szomszédokOssz: number = szomszédok1 + szomszédok2;
                if (m[sorIndex][oszlopIndex] == -1){
                    continue;
                }
                if ((m[sorIndex][oszlopIndex] == 1 || m[sorIndex][oszlopIndex] == 2) && (szomszédokOssz < 2 || szomszédokOssz > 3)){
                    mFinal[sorIndex][oszlopIndex] = 0;
                }
                if (m[sorIndex][oszlopIndex] == 0 && (szomszédokOssz == 3)){
                    if  (szomszédok1 > szomszédok2){
                        mFinal[sorIndex][oszlopIndex] = 1;
                    } else{
                        mFinal[sorIndex][oszlopIndex] = 2;
                    }
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
        } else if (aktualis == 0) {
          vissza += " ";
        } else if (aktualis == 1) {
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
        this.#matrix = this.#kovetkezoAllapot
        
    }

  lerak(sor: number, oszlop: number): void {
    if (this.#matrix[sor][oszlop] == -1) {
      throw new Error("Nem lehet lerakni a pálya szélére!");
      //TOAST POPUP - DÁVID DÁVID
    }

    if (this.#matrix[sor][oszlop] == 1 || this.#matrix[sor][oszlop] == 2) {
      throw new Error("Nem lehet lerakni egy már élő cellára!");
      //TOAST POPUP - DÁVID DÁVID
    }

    this.#matrix[sor][oszlop] = this.#jelenlegiJatekos;
    this.#jelenlegiJatekos = this.#jelenlegiJatekos == 1 ? 2 : 1;
  }

  constructor(sorokSzáma: number, oszlopokSzáma: number) {
    for (let sorIndex = 0; sorIndex < sorokSzáma + 2; sorIndex++) {
      const aktSor: number[] = [];
      for (let oszlopIndex = 0; oszlopIndex < oszlopokSzáma + 2; oszlopIndex++) {
        if (
          sorIndex == 0 ||
          oszlopIndex == 0 ||
          sorIndex == sorokSzáma + 2 ||
          oszlopIndex == oszlopokSzáma + 2
        ) {
          aktSor.push(-1);
        } else {
          aktSor.push(0);
        }
      }
      this.#matrix.push(aktSor);
    }
    this.#sorokSzama = sorokSzáma;
    this.#oszlopokSzama = oszlopokSzáma;
  }
}
