import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PrincipalService {
    baseUrl = "http://localhost:5000/api"
    constructor(private http: HttpClient) { }

    obtenerJuegos() {
        return this.http.get(`${this.baseUrl}/juegos`);
    }
}