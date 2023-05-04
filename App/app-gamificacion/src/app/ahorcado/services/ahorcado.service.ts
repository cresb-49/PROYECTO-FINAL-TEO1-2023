import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  usuario: any;
  baseUrl: string = "http://localhost:5000/api";

  constructor(private http: HttpClient) { }

  obtenerServicio(){
    const jsonUsuario = localStorage.getItem("usuario");
    if(jsonUsuario){
      this.usuario = JSON.parse(jsonUsuario);
    }
  }

  getUsuario(){
    return this.usuario;
  }

  registrarPartida(body: any){
    return this.http.post(`${this.baseUrl}/modelo`, body);
  }

  
}
