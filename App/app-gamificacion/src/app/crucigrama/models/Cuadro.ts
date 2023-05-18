export class Cuadro {

    private inicio: boolean = false;
    private letra: string = "";
    private numero: number = -1;

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

    getNumero(): number {
        return this.numero;
    }

    setNumero(numero: number): void {
        this.numero = numero;
    }

    public setCordenada(x: number, y: number) {
        this.cordenada = { x: x, y: y };
    }

    public getCordenada(): any {
        return this.cordenada;
    }
}
