import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class LogrosService {

  baseUrl = "http://localhost:5000/api"


  constructor(private authService: AuthService, private http: HttpClient, private toast: NgToastService) { }

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

  obtenerLogrosHanoi(usuario: any) {
    const logros: any = usuario.data.logros;
    this.authService.verEstadisticasHanoi(usuario.username)
      .subscribe({
        next: (result: any) => {
          const movimientos = result[0].movimientos;
          this.calcularLogrosHanoi(movimientos, logros, usuario.username);
        },
        error: (err) => { }

      });

    this.authService.obtenerPartidasPorJuego(usuario.username, "J00001")
      .subscribe({
        next: (result: any) => {
          const partidasJugadas: any[] = result;
          let tiempo = 0;
          partidasJugadas.forEach((partida) => {
            let t = moment.duration(partida.data.tiempo);
            let segundos = t.asSeconds();
            tiempo += segundos;
          });
          this.calcularLogrosTiempoHanoi(tiempo, logros, usuario.username);
        },
        error: (err) => { }

      });
  }

  obtenerLogrosSopa(usuario: any) {
    const logros: any = usuario.data.logros;
    this.authService.obtenerPartidasPorJuego(usuario.username, "J00004")
      .subscribe({
        next: (result: any) => {
          const partidasJugadas: any[] = result;
          let tiempo = 0;
          partidasJugadas.forEach((partida) => {
            let t = moment.duration(partida.data.tiempo);
            let segundos = t.asSeconds();
            tiempo += segundos;
          });
          this.calcularLogrosTiempoSopa(tiempo, logros, usuario.username);
        },
        error: (err) => { }

      });
  }

  obtenerLogrosCrucigrama(usuario: any) {
    const logros: any = usuario.data.logros;
    this.authService.obtenerPartidasPorJuego(usuario.username, "J00003")
      .subscribe({
        next: (result: any) => {
          const partidasJugadas: any[] = result;
          let tiempo = 0;
          partidasJugadas.forEach((partida) => {
            let t = moment.duration(partida.data.tiempo);
            let segundos = t.asSeconds();
            tiempo += segundos;
          });
          this.calcularLogrosTiempoCrucigrama(tiempo, logros, usuario.username);
        },
        error: (err) => { }
      });
  }

  calcularLogrosTiempoCrucigrama(tiempo: number, logros: any[], username: string) {
    if (tiempo >= 3600 && tiempo < 18000) {
      const logro = {
        id: "L00400",
        nombre: "Haz jugado mas de una hora al crucigrama",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (tiempo >= 18000 && tiempo < 36000) {
      const logro = {
        id: "L00401",
        nombre: "Haz jugado mas de 5 horas al crucigrama",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (tiempo >= 36000 && tiempo < 90000) {
      const logro = {
        id: "L00402",
        nombre: "Haz jugado mas de 10 horas al crucigrama",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (tiempo >= 90000) {
      const logro = {
        id: "L00403",
        nombre: "Haz jugado mas de 25 horas al crucigrama",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    }
  }

  calcularLogrosTiempoHanoi(tiempo: number, logros: any[], username: string) {
    if (tiempo >= 3600 && tiempo < 18000) {
      const logro = {
        id: "L00204",
        nombre: "Haz jugado mas de una hora a las torres hanoi",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (tiempo >= 18000 && tiempo < 36000) {
      const logro = {
        id: "L00205",
        nombre: "Haz jugado mas de 5 horas a las torres de hanoi",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (tiempo >= 36000 && tiempo < 90000) {
      const logro = {
        id: "L00206",
        nombre: "Haz jugado mas de 10 horas a las torres de hanoi",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (tiempo >= 90000) {
      const logro = {
        id: "L00207",
        nombre: "Haz jugado mas de 25 horas a las torres de hanoi",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    }
  }

  calcularLogrosTiempoSopa(tiempo: number, logros: any[], username: string) {
    if (tiempo >= 3600 && tiempo < 18000) {
      const logro = {
        id: "L00300",
        nombre: "Haz jugado mas de una hora a la sopa de letras",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (tiempo >= 18000 && tiempo < 36000) {
      const logro = {
        id: "L00301",
        nombre: "Haz jugado mas de 5 horas a la sopa de letras",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (tiempo >= 36000 && tiempo < 90000) {
      const logro = {
        id: "L00302",
        nombre: "Haz jugado mas de 10 horas a la sopa de letras",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (tiempo >= 90000) {
      const logro = {
        id: "L00303",
        nombre: "Haz jugado mas de 25 horas a la sopa de letras",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    }
  }

  calcularLogrosHanoi(movimientos: number, logros: any[], username: string) {
    if (movimientos >= 10 && movimientos < 100) {
      const logro = {
        id: "L00200",
        nombre: "Haz realizado 10 movimientos en Hanoi",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (movimientos >= 100 && movimientos < 500) {
      const logro = {
        id: "L00201",
        nombre: "Haz realizado 100 movimientos en Hanoi",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (movimientos >= 500 && movimientos < 1000) {
      const logro = {
        id: "L00202",
        nombre: "Haz realizado 500 movimientos en Hanoi",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (movimientos >= 1000) {
      const logro = {
        id: "L00203",
        nombre: "Haz encontrado 1000 movimientos en Hanoi",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    }
  }

  calcularLogrosAhorcado(palabrasEncontradas: number, punteo: number, logros: any[], username: string) {
    if (palabrasEncontradas >= 10 && palabrasEncontradas < 50) {
      const logro = {
        id: "L00100",
        nombre: "Haz encontrado 10 palabras",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (palabrasEncontradas >= 50 && palabrasEncontradas < 100) {
      const logro = {
        id: "L00101",
        nombre: "Haz encontrado 50 palabras",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (palabrasEncontradas >= 100 && palabrasEncontradas < 500) {
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

    if (punteo >= 500 && punteo < 1000) {
      const logro = {
        id: "L00104",
        nombre: "Haz obtenido 500 puntos en partidas",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (punteo >= 1000 && punteo < 2000) {
      const logro = {
        id: "L00105",
        nombre: "Haz obtenido 1000 puntos en partidas",
        fecha: moment().format("YYYY-MM-DD")
      }
      const verificacion = logros.find(lr => lr.id == logro.id);
      if (!verificacion) {
        this.guardarLogro(logro, username);
      }
    } else if (punteo >= 2000 && punteo < 5000) {
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
      } else if (juego._id == "J00003") {
        if (partidas == 1) {
          const logro = {
            id: "L00014",
            nombre: "Haz jugado una vez al crucigrama",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 5) {
          const logro = {
            id: "L00015",
            nombre: "Haz jugado 5 veces al crucigrama",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 10) {
          const logro = {
            id: "L00016",
            nombre: "Haz jugado 10 veces al crucigrama",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 50) {
          const logro = {
            id: "L00017",
            nombre: "Haz jugado 50 veces al crucigrama",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        }
      } else if (juego._id == "J00003") {
        if (partidas == 1) {
          const logro = {
            id: "L00014",
            nombre: "Haz jugado una vez al crucigrama",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 5) {
          const logro = {
            id: "L00015",
            nombre: "Haz jugado 5 veces al crucigrama",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 10) {
          const logro = {
            id: "L00016",
            nombre: "Haz jugado 10 veces al crucigrama",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 50) {
          const logro = {
            id: "L00017",
            nombre: "Haz jugado 50 veces al crucigrama",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        }
      } else if (juego._id == "J00004") {
        if (partidas == 1) {
          const logro = {
            id: "L00018",
            nombre: "Haz jugado una vez a la sopa de letras",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 5) {
          const logro = {
            id: "L00019",
            nombre: "Haz jugado 5 veces a la sopa de letras",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 10) {
          const logro = {
            id: "L00020",
            nombre: "Haz jugado 10 veces a la sopa de letras",
            fecha: moment().format("YYYY-MM-DD")
          }
          const verificacion = logros.find(lr => lr.id == logro.id);
          if (!verificacion) {
            this.guardarLogro(logro, username);
          }
        } else if (partidas == 50) {
          const logro = {
            id: "L00021",
            nombre: "Haz jugado 50 veces a la sopa de letras",
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
        next: (result: any) => {
          this.toast.info({
            detail: "Nuevo Logro!!",
            summary: logro.nombre,
            duration: 5000
          });
        },
        error: (err) => { console.log(err); }
      });
  }
}
