import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class SesionService {

    readonly API_ENDPOINT = "http://localhost:5000/api"

    constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

    /**
     * Inicia sesion en la pagina y guarda la informacion relevante en una cookie
     * @param username - username del usaurio que quiere iniciar sesion
     * @param rol  - rol de usuario que se quiere iniciar sesion
     */
    iniciarSesion(username: string, rol: string) {
        this.cookieService.set('sesion',  JSON.stringify({username: username, rol: rol}))
    }

    /**
     * Cierra la sesion actual y elimina la informacion de la cookie
     */
    cerrarSesion() {
        this.cookieService.delete('sesion')
    }

    /**
     * Obtiene el username de la sesion actual si existe
     * @returns string - username si existe, null - si la sesion no esta iniciada
     */
    obtenerUsername(): string | null {
        //Si la sesion existe se devuelve el username
        if (this.cookieService.check('sesion')) {
            return JSON.parse(this.cookieService.get('sesion')).username
        } else {
            //Caso contrario se devuelve null
            return null
        }
    }

    /**
     * Obtiene el rol de la sesion actual si existe
     * @returns string - rol si existe, null - si la sesion no esta iniciada
     */
    obtenerRol(): string|null {
        //Si la sesion existe se devuelve el rol de usuario
        if (this.cookieService.check('sesion')) {
            return JSON.parse(this.cookieService.get('sesion')).rol
        } else {
            //Caso contrario se devuelve null
            return null
        }
    }
    
    /**
     * Obtiene el objeto con la sesion si existe
     * @returns object - si la sesion existe, null - si la sesion no esta iniciada
     */
    obtenerSesion(): string|null {
        //Si la sesion existe se devuelve
        if (this.cookieService.check('sesion')) {
            return JSON.parse(this.cookieService.get('sesion'))
        } else {
            //Caso contrario se devuelve null
            return null
        }
    }
    
    /**
     * Verifica si la sesion esta iniciada o no
     * @returns boolean - true si la sesion esta iniciada, false si no esta iniciada
     */
    verificarSesion(): boolean{
        return this.cookieService.check('sesion')
    }
}