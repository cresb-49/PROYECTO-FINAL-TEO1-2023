export class Cuadro {

    inicio!: boolean;
    letra!: string;
    numero!: number;

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
    }

    getNumero(): number {
        return this.numero;
    }

    setNumero(numero: number): void {
        this.numero = numero;
    }
}
