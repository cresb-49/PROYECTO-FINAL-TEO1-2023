export class MeGusta {
    juego: string;
    usuario: string;
    like: boolean;
    constructor(juego: string, usuario: string, like: boolean) {
        this.juego = juego;
        this.usuario = usuario;
        this.like = like;
    }
}