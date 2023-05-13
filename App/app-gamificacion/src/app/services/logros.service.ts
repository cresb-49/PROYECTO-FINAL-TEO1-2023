import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogrosService {

  baseUrl = "http://localhost:5000/api"


  constructor(private authService: AuthService, private http: HttpClient) { }

  obtenerLogrosGenerales(usuario: any) {
    const logros: any = usuario.data.logros;
    this.authService.verEstadisticasGenerales(usuario.username)
      .subscribe({
        next: (result: any) => {
          const partidas = result.generales;
          this.calcularTrofeosGenerales(partidas, logros, usuario.username);
          this.calcularTrofeosPorJuego(result.juegos, logros, usuario.username)
        },
        error: (err) => { }

      });
  }

  obtenerLogrosAhorcado(usuario: any) {
    const logros: any = usuario.data.logros;
    this.authService.verEstadisticasAhorcado(usuario.username)
      .subscribe({
        next: (result: any) => {
          const palabrasEncontradas = result[0].palabrasEncontradas;
          const punteo = result[0].punteo;
          this.calcularLogrosAhorcado(palabrasEncontradas, punteo, logros, usuario.username);
        },
        error: (err) => { }

      });
  }

  calcularLogrosAhorcado(palabrasEncontradas: number, punteo: number, logros: any[], username: string) {
    if (palabrasEncontradas >= 10) {
      const logro = {
        id: "L00100",
        nombre: "Haz encontrado 10 palabras",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (palabrasEncontradas >= 50) {
      const logro = {
        id: "L00101",
        nombre: "Haz encontrado 50 palabras",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (palabrasEncontradas >= 100) {
      const logro = {
        id: "L00102",
        nombre: "Haz encontrado 100 palabras",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (palabrasEncontradas >= 500) {
      const logro = {
        id: "L00103",
        nombre: "Haz encontrado 500 palabras",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    }

    if (punteo >= 500) {
      const logro = {
        id: "L00104",
        nombre: "Haz obtenido 500 puntos en partidas",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (punteo >= 1000) {
      const logro = {
        id: "L00105",
        nombre: "Haz obtenido 1000 puntos en partidas",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (punteo >= 2000) {
      const logro = {
        id: "L00106",
        nombre: "Haz obtenido 2000 puntos en partidas",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (punteo >= 5000) {
      const logro = {
        id: "L00107",
        nombre: "Haz obtenido 5000 puntos en partidass",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    }
  }

  calcularTrofeosGenerales(partidas: number, logros: any[], username: string) {
    if (partidas == 1) {
      const logro = {
        id: "L00002",
        nombre: "Haz jugado una partida",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (partidas == 5) {
      const logro = {
        id: "L00003",
        nombre: "Haz jugado 5 partidas",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (partidas == 10) {
      const logro = {
        id: "L00004",
        nombre: "Haz jugado 10 partidas",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (partidas == 50) {
      const logro = {
        id: "L00005",
        nombre: "Haz jugado 50 partidas",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    }
  }

  calcularTrofeosPorJuego(juegos: any[], logros: any[], username: string) {
    juegos.forEach((juego) => {
      const partidas = juego.partidas;
      if (juego._id == "J00002") {
        if (partidas == 1) {
          const logro = {
            id: "L00006",
            nombre: "Haz jugado una vez al ahorcado",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 5) {
          const logro = {
            id: "L00007",
            nombre: "Haz jugado 5 veces al ahorcado",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 10) {
          const logro = {
            id: "L00008",
            nombre: "Haz jugado 10 veces al ahorcado",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 50) {
          const logro = {
            id: "L00009",
            nombre: "Haz jugado 50 veces al ahorcado",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        }
      } else if (juego._id == "J00001") {
        if (partidas == 1) {
          const logro = {
            id: "L00010",
            nombre: "Haz jugado una vez a las torres de hanoi",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 5) {
          const logro = {
            id: "L00011",
            nombre: "Haz jugado 5 veces a las torres de hanoi",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 10) {
          const logro = {
            id: "L00012",
            nombre: "Haz jugado 10 veces a las torres de hanoi",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 50) {
          const logro = {
            id: "L00013",
            nombre: "Haz jugado 50 veces a las torres de hanoi",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        }
      }
    })
  }

  guardarLogro(logro: any, username: string) {
    const body = {
      username,
      logro
    }
    this.http.put(`${this.baseUrl}/agregarLogro`, body)
      .subscribe({
        next: (result: any) => { console.log(result); },
        error: (err) => { console.log(err); }
      });
  }
}
