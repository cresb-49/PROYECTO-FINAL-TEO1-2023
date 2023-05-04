import { Hanoi } from "./Hanoi";

export class JuegoHanoi {
    codigo: string;
    juego: string = "J00001";
    hanoi: Hanoi;
    constructor(codigo: string, hanoi: Hanoi) {
        this.codigo = codigo;
        this.hanoi = hanoi;
    }
}