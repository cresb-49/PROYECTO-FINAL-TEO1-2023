import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MeGusta } from "../model/MeGusta";

@Injectable({
    providedIn: 'root'
})
export class MeGustaService {

    readonly API_ENDPOINT_JUEGO_LIKE = "http://localhost:5000/api/juego/like"
    readonly API_ENDPOINT_JUEGO = "http://localhost:5000/api/juego"

    constructor(private httpClient: HttpClient) { }

    /**
     * Obtiene los comentarios de un juego en especifico
     * @param codigoJuego Codigo del juego cuyos comentarios se desean obtener
     * @returns Array de Comentario
     */
    public obtenerMeGusta(usuario: string, codigoJuego: string) {
        return this.httpClient.get<Object>(this.API_ENDPOINT_JUEGO_LIKE + "?juego=" + codigoJuego + "&usuario=" + usuario)
    }

    /**
     * Publica en el servidor el estado del me gusta del usuario
     * @param meGusta Model de Me Gusta
     * @returns Object con el response del servidor
     */
    public publicarMeGusta(meGusta: MeGusta) {
        return this.httpClient.post<Object>(this.API_ENDPOINT_JUEGO_LIKE, meGusta);
    }

    /**
     * Remueve el like o dislike del usuario del juego
     * @param username 
     * @param juego 
     * @returns 
     */
    public removerMeGusta(username: string, codigoJuego: string) {
        return this.httpClient.delete<Object>(this.API_ENDPOINT_JUEGO_LIKE, { body: { juego: codigoJuego, usuario: username } })
    }

    /**
     * Obtiene todos los parametros de un juego en especifico
     * @param codigoJuego 
     * @returns 
     */
    public getCantidadMeGustaNoMeGusta(codigoJuego: string) {
        return this.httpClient.get<Object>(this.API_ENDPOINT_JUEGO + "?juego=" + codigoJuego);
    }
}