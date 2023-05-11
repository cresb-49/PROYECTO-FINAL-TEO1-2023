import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HanoiService {
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
}
