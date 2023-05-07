import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:5000/api"

  constructor(private http: HttpClient) { }

  login(body: any){
    return this.http.post(`${this.baseUrl}/login`, body);
  }
  
  register(body: any){
    return this.http.post(`${this.baseUrl}/registro`, body);
  }

  modificar(body: any){
    return this.http.put(`${this.baseUrl}/modificar`, body);
  }

  modificarPassword(body: any){
    return this.http.put(`${this.baseUrl}/modificarPassword`, body);
  }
}
