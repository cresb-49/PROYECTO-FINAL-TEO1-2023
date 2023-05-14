/**
 * Clase referente a los resultados del juego torres de hanoi
 */
export class Data {

    private movimientos: number;
    private movimientosEsperados: number;
    private secuencia: Array<string>;
    private tiempo: string;

    constructor(movimientos: number, movimientosEsperados: number, secuencia: Array<string>, tiempo: string) {
        this.movimientos = movimientos;
        this.movimientosEsperados = movimientosEsperados;
        this.secuencia = secuencia;
        this.tiempo = tiempo;
    }

    public getMovimientos(): number {
        return this.movimientos;
    }

    public getMovimientosEsperados(): number {
        return this.movimientosEsperados;
    }

    public getSecuencia(): Array<string> {
        return this.secuencia;
    }

    public getTiempo(): string {
        return this.tiempo;
    }

    public setMovimientos(movimientos: number): void {
        this.movimientos = movimientos;
    }

    public setMovimientosEsperados(movimientosEsperados: number): void {
        this.movimientosEsperados = movimientosEsperados;
    }

    public setSecuencia(secuencia: Array<string>): void {
        this.secuencia = secuencia;
    }

    public setTiempo(tiempo: string): void {
        this.tiempo = tiempo;
    }
}