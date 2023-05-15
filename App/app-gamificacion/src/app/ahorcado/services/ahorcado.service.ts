import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  usuario: any;
  baseUrl: string = "http://localhost:5000/api";

  constructor(private http: HttpClient, private sessionService: SesionService) { }

  obtenerUsuario() {
    this.usuario = this.sessionService.obtenerSesion();
  }

  getUsuario() {
    return this.usuario;
  }

  registrarPartida(body: any) {
    return this.http.post(`${this.baseUrl}/modelo`, body);
  }

  obtenerPartida(codigo: string, juego: string) {
    return this.http.get(`${this.baseUrl}/modelo?codigo=${codigo}&juego=${juego}`);
  }

  guardarResultado(body: any) {
    return this.http.post(`${this.baseUrl}/partida`, body);
  }

  obtenerLogros(){
    this.obtenerUsuario();
    
  }

}
