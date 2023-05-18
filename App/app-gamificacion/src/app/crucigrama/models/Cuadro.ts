export class Cuadro {

    private inicio: boolean = false;
    private letra: string = "";
    private numeroHorizontal: number = 0;
    private numeroVertical: number = 0;

    private cordenada: Object = { x: 0, y: 0 };

    constructor() { }

    getInicio(): boolean {
        return this.inicio;
    }

    setInicio(inicio: boolean): void {
        this.inicio = inicio;
    }

    getLetra(): string {
        return this.letra;
    }

    setLetra(letra: string): void {
        this.letra = letra
        if (this.letra === "")
            this.inicio = false;
    }

    getNumeroH(): number {
        return this.numeroHorizontal;
    }

    setNumeroH(numero: number): void {
        this.numeroHorizontal = numero;
    }
    getNumeroV(): number {
        return this.numeroVertical;
    }

    setNumeroV(numero: number): void {
        this.numeroVertical = numero;
    }

    public setCordenada(x: number, y: number) {
        this.cordenada = { x: x, y: y };
    }

    public getCordenada(): any {
        return this.cordenada;
    }
}
