export class EstadisticaHanoi {
    movimientos: string[];
    terminado: Boolean;
    movExperados: number;
    constructor(movimientos: string[], terminado: Boolean, movEsperados: number) {
        this.movimientos = movimientos;
        this.terminado = terminado;
        this.movExperados = movEsperados;
    }
}