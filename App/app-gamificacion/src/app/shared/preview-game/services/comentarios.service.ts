import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Comentario } from "../model/Comentario";

@Injectable({
    providedIn: 'root'
})
export class ComentariosService {

    readonly API_ENDPOINT = "http://localhost:5000/api"

    constructor(private httpClient: HttpClient) { }

    /**
     * Obtiene los comentarios de un juego en especifico
     * @param codigoJuego Codigo del juego cuyos comentarios se desean obtener
     * @returns Array de Comentario
     */
    public obtenerComentarios(codigoJuego: string) {
        return this.httpClient.get<Comentario[]>(this.API_ENDPOINT+"/comentarios?juego="+codigoJuego)
    }

    /**
     * publicarComentario
     */
    public publicarComentario(username:string, comentario:string, juego:string) {
        return this.httpClient.post<Object>(this.API_ENDPOINT+"/comentario", {usuario:username, comentario:comentario, juego:juego})
    }
}