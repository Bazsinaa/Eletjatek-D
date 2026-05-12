export default class Simulator{
    #matrix: number[][] = [];

    #oszlopokSzama: number;
    #sorokSzama: number;

    get #kovetkezoAllapot(): number[][]{
        const m: number[][] = [];
        return m
    }

    get #megjelenit(): string{
        let vissza: string = ""
        return vissza
    }

    constructor(sorokSzáma: number, oszlopokSzáma: number) {
        for (let sorIndex = 0; sorIndex < sorokSzáma +2 ; sorIndex++) {
            const aktSor: number[] = [];
            for (let oszlopIndex = 0; oszlopIndex < oszlopokSzáma + 2; oszlopIndex++) {
                if (sorIndex == 0 || oszlopIndex == 0){
                    aktSor.push(0)
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