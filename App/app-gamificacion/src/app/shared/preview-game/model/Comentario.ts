export class Comentario {
    usuario: string;
    comentario: string;
    fecha: Date;
    constructor(usuario: string, comentario: string, fecha: Date) {
        this.usuario = usuario;
        this.comentario = comentario;
        this.fecha = fecha;
    }
}