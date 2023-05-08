import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SopaService {
  baseUrl = "http://localhost:5000/api"

  constructor(private http: HttpClient) { }
  /**
   * Registro de un juego personalizado hacia la API
   * @param body Parametros solicitados por la api
   * @returns Resultado de la paeticion HTTP
   */
  registarJuegoPersonalizado(body: any) {
    return this.http.post(`${this.baseUrl}/modelo`, body);
  }

  obtenerJuegoPersonalizado(query: any) {
    return this.http.get(`${this.baseUrl}/modelo?codigo=${query.codigo}&juego=${query.juego}`)
  }

  registrarResultado(body: any) {
    return this.http.post(`${this.baseUrl}/partida`, body);
  }
  /**
   * Retono del usuario del local storage
   * @returns Objeto uusuario del local storage
   */
  getUsuaio() {
    const jsonUsuario = localStorage.getItem("usuario");
    let usuario = null;
    if (jsonUsuario) {
      usuario = JSON.parse(jsonUsuario);
    }
    return usuario;
  }
}
