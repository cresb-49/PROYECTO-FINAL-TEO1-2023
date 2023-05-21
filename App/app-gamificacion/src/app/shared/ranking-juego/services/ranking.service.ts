import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  readonly API_ENDPOINT = "http://localhost:5000/api"

  constructor(private httpClient: HttpClient) { }

  public obtenerRanking(codigoJuego: string) {
    return this.httpClient.get<any[]>(this.API_ENDPOINT + "/ranking?juego=" + codigoJuego)
  }
}
