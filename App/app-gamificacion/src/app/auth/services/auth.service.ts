import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: any;
  baseUrl = "http://localhost:5000/api"

  constructor(private http: HttpClient, private sessionService: SesionService) { }

  obtenerUsuario() {
    this.usuario = this.sessionService.obtenerSesion();
  }

  getUsuario() {
    return this.usuario;
  }

  login(body: any) {
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  register(body: any) {
    return this.http.post(`${this.baseUrl}/registro`, body);
  }

  modificar(body: any) {
    return this.http.put(`${this.baseUrl}/modificar`, body);
  }

  modificarPassword(body: any) {
    return this.http.put(`${this.baseUrl}/modificarPassword`, body);
  }

  verEstadisticasGenerales(username: string) {
    return this.http.get(`${this.baseUrl}/estadisticasGenerales?username=${username}`);
  }

  obtenerUsuarioDB(username: string) {
    return this.http.get(`${this.baseUrl}/usuario?username=${username}`);
  }
}
