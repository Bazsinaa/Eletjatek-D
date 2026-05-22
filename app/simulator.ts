export default class Simulator {
  #matrix: number[][] = [];

  #oszlopokSzama: number;
  #sorokSzama: number;

  #jelenlegiJatekos: number = 1;

  get matrix(): number[][] {
    return this.#matrix;
  }

  get jelenlegiJatekos(): number {
    return this.#jelenlegiJatekos;
  }

  #szomszedokSzama(
    sorIndex: number,
    oszlopIndex: number,
    jatekosSzam: number
  ): number {
    let szomszedok: number = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) {
          continue;
        }

        if (
          this.#matrix[sorIndex + i][oszlopIndex + j] ==
          jatekosSzam
        ) {
          szomszedok++;
        }
      }
    }

    return szomszedok;
  }

  get #kovetkezoAllapot(): number[][] {
    const ujMatrix: number[][] =
      this.#matrix.map((sor) => [...sor]);

    for (
      let sorIndex = 1;
      sorIndex <= this.#sorokSzama;
      sorIndex++
    ) {
      for (
        let oszlopIndex = 1;
        oszlopIndex <= this.#oszlopokSzama;
        oszlopIndex++
      ) {
        const aktualis =
          this.#matrix[sorIndex][oszlopIndex];

        const szomszedok1 =
          this.#szomszedokSzama(
            sorIndex,
            oszlopIndex,
            1
          );

        const szomszedok2 =
          this.#szomszedokSzama(
            sorIndex,
            oszlopIndex,
            2
          );

        const osszes =
          szomszedok1 + szomszedok2;

        // halál
        if (
          (aktualis == 1 || aktualis == 2) &&
          (osszes < 2 || osszes > 3)
        ) {
          ujMatrix[sorIndex][oszlopIndex] = 0;
        }

        // túlélés
        else if (
          (aktualis == 1 || aktualis == 2) &&
          (osszes == 2 || osszes == 3)
        ) {
          ujMatrix[sorIndex][oszlopIndex] =
            aktualis;
        }

        // születés
        else if (
          aktualis == 0 &&
          osszes == 3
        ) {
          ujMatrix[sorIndex][oszlopIndex] =
            szomszedok1 > szomszedok2
              ? 1
              : 2;
        }
      }
    }

    return ujMatrix;
  }

  public toString(): string {
    let vissza: string = "";

    for (
      let sorIndex = 0;
      sorIndex < this.#matrix.length;
      sorIndex++
    ) {
      for (
        let oszlopIndex = 0;
        oszlopIndex < this.#matrix[0].length;
        oszlopIndex++
      ) {
        const aktualis =
          this.#matrix[sorIndex][oszlopIndex];

        if (aktualis == -1) {
          vissza += "X";
        } else if (aktualis == 0) {
          vissza += " ";
        } else if (aktualis == 1) {
          vissza += "S";
        } else if (aktualis == 2) {
          vissza += "K";
        }
      }

      vissza += "\n";
    }

    return vissza;
  }

  run(): void {
    this.#matrix = this.#kovetkezoAllapot;
  }

  lerak(sor: number, oszlop: number): void {
    if (
      this.#matrix[sor][oszlop] == -1
    ) {
      throw new Error(
        "Nem lehet a pálya szélére rakni!"
      );
    }

    if (
      this.#matrix[sor][oszlop] == 1 ||
      this.#matrix[sor][oszlop] == 2
    ) {
      throw new Error(
        "Ide már raktak sejtet!"
      );
    }

    this.#matrix[sor][oszlop] =
      this.#jelenlegiJatekos;

    this.#jelenlegiJatekos =
      this.#jelenlegiJatekos == 1
        ? 2
        : 1;
  }

  reset() {
  for (let r = 1; r <= this.#sorokSzama; r++) {
    for (let c = 1; c <= this.#oszlopokSzama; c++) {
      this.#matrix[r][c] = 0;
    }
  }

  this.#jelenlegiJatekos = 1;
}

  constructor(
    sorokSzama: number,
    oszlopokSzama: number
  ) {
    this.#sorokSzama = sorokSzama;
    this.#oszlopokSzama = oszlopokSzama;

    for (
      let sorIndex = 0;
      sorIndex < sorokSzama + 2;
      sorIndex++
    ) {
      const aktSor: number[] = [];

      for (
        let oszlopIndex = 0;
        oszlopIndex < oszlopokSzama + 2;
        oszlopIndex++
      ) {
        if (
          sorIndex == 0 ||
          oszlopIndex == 0 ||
          sorIndex == sorokSzama + 1 ||
          oszlopIndex == oszlopokSzama + 1
        ) {
          aktSor.push(-1);
        } else {
          aktSor.push(0);
        }
      }

      this.#matrix.push(aktSor);
    }
  }
}