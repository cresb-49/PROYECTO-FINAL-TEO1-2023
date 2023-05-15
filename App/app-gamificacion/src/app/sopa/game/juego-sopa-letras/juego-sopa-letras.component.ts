import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Data } from "../../models/Data";
import { ActivatedRoute } from "@angular/router";
import { SopaService } from '../../services/sopa.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-juego-sopa-letra',
  templateUrl: './juego-sopa-letras.component.html',
  styleUrls: ['./juego-sopa-letras.component.css']
})
export class JuegoSopaLetrasComponent implements OnInit {
  stopwatch: Stopwatch = new Stopwatch();
  codigoJuego: string = "";
  
  constructor (private route: ActivatedRoute, private sopaService: SopaService, private sesionService: SesionService){}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe({
        next: (params) => {
          this.codigoJuego = params['juego']
          this.sopaService.obtenerJuegoPersonalizado({codigo: params['juego'], juego: 'J00004'})
            .subscribe({
              next: (response: any) => {
                alert(response)
                this.generarTablero(response.data.palabras);
              },
              error: (error:any) => {
                console.log(error)
              }
            })
        }
      })
    this.stopwatch.start()
  }

  //tablero[y][x]
  tablero: string[][] = []
  //map(palabra, [x,y,orientacion, direccion])
  posicionesPalabras: Map<string, number[]> = new Map()

  cantidadPalabras: number = 0;
  palabra: string = ""
  palabrasEncontradas: string[] = []

  generarTablero(palabras: string[]) {
    this.cantidadPalabras = palabras.length;
    let palabraLarga = ""
    let sizeTablero = 0
    palabras.forEach(palabra => {
      if (palabra.length > palabraLarga.length) {
        palabraLarga = palabra
      }
    });

    if (palabraLarga.length <= 6) {
      sizeTablero = 10
    } else {
      sizeTablero = palabraLarga.length
    }

    //se resetea el juego
    this.tablero = []
    this.posicionesPalabras = new Map()
    this.palabrasEncontradas = []

    palabras.sort((a, b) => {
      return b.length - a.length;
    });

    for (let index = 0; index < sizeTablero; index++) {
      this.tablero.push(new Array(palabraLarga.length).fill('0') as string[])
    }

    palabras.forEach(palabra => {
      //se prueban posiciones y orientaciones hasta que la palabra se pone
      while (true) {
        let x = this.obtenerPosicionAleatoria(sizeTablero);
        let y = this.obtenerPosicionAleatoria(sizeTablero);
        let orientacion = Math.floor(Math.random() * 2); //0 horizontal, 1 vertical
        let espacio = true;

        console.log(palabra, "en", x, y)
        //Se verifica si hay espacio para poner la palabra en horizontal y hacia que direccion
        if (orientacion === 0) {
          //Se prueba derecha
          console.log("espacio:x", x + palabra.length, "tablero:", sizeTablero)
          if (x + palabra.length <= sizeTablero) {
            //Si hay espacio a la derecha se comprueba si los espacios estan vacios
            for (let index = x; index < palabra.length + x; index++) {
              const elemento = this.tablero[y][index];
              console.log(index, elemento, "en", index, y)
              if (elemento !== '0') {
                espacio = false;
              }
            }
            //Si se comprueba que hay espacio se pone la palabra
            if (espacio) {
              this.ponerPalabra([x, y], palabra, orientacion, 0);
              break;
            } else {
              console.log("no se pone", palabra)
            }
          } else {
            console.log("no se pone", palabra)
          }
        } else {
          //Se prueba abajo
          console.log("espacio:y", y + palabra.length, "tablero:", sizeTablero)
          if (y + palabra.length <= sizeTablero) {
            //Si hay espacio hacia abajo se comprueba si los espacios estan vacios
            for (let index = y; index < palabra.length + y; index++) {
              const elemento = this.tablero[index][x];
              console.log(index, elemento, "en", x, index)
              if (elemento !== '0') {
                espacio = false;
              }
            }
            //Si se comprueba que hay espacio se pone la palabra
            if (espacio) {
              console.log("se pone en", x, y)
              this.ponerPalabra([x, y], palabra, orientacion, 0);
              break;
            } else {
              console.log("no se pone", palabra)
            }
          } else {
            console.log("no se pone", palabra)
          }
        }
      }
    });
    this.rellenarTablero()
    console.log(this.posicionesPalabras)
  }

  ponerPalabra(posicionInicial: number[], palabra: string, orientacion: number, direccion: number) {
    //posiciones [x, y]
    //orientacion 0 horizontal, 1 vertical
    //direccion 0 derecha-abajo, 1 izquierda-arriba
    this.posicionesPalabras.set(palabra, [posicionInicial[0], posicionInicial[1], orientacion, direccion])

    //se pone la palabra en horizontal
    if (orientacion === 0) {
      for (let index = posicionInicial[0]; direccion == 0 ? index < palabra.length + posicionInicial[0] : index > posicionInicial[0] - palabra.length; direccion === 0 ? index++ : index--) {
        const caracter = palabra.at(direccion === 0 ? index - posicionInicial[0] : Math.abs(index - posicionInicial[0]));
        this.tablero[posicionInicial[1]][index] = caracter!
      }
    } else {
      for (let index = posicionInicial[1]; direccion == 0 ? index < palabra.length + posicionInicial[1] : index > posicionInicial[1] - palabra.length; direccion === 0 ? index++ : index--) {
        const caracter = palabra.at(direccion === 0 ? index - posicionInicial[1] : Math.abs(index - posicionInicial[1]));
        this.tablero[index][posicionInicial[0]] = caracter!
      }
    }
  }

  marcarPalabra(palabra: string) {
    let datosPalabra = this.posicionesPalabras.get(palabra)!
    let posicionInicial = [datosPalabra[0], datosPalabra[1]]
    let orientacion = datosPalabra[2]
    let direccion = datosPalabra[3]
    //posiciones [x, y]
    //orientacion 0 horizontal, 1 vertical
    //direccion 0 derecha-abajo, 1 izquierda-arriba

    //se pone la palabra en horizontal
    if (orientacion === 0) {
      for (let index = posicionInicial[0]; direccion == 0 ? index < palabra.length + posicionInicial[0] : index > posicionInicial[0] - palabra.length; direccion === 0 ? index++ : index--) {
        const caracter = palabra.at(direccion === 0 ? index - posicionInicial[0] : Math.abs(index - posicionInicial[0]));
        this.tablero[posicionInicial[1]][index] += ' '
      }
    } else {
      for (let index = posicionInicial[1]; direccion == 0 ? index < palabra.length + posicionInicial[1] : index > posicionInicial[1] - palabra.length; direccion === 0 ? index++ : index--) {
        const caracter = palabra.at(direccion === 0 ? index - posicionInicial[1] : Math.abs(index - posicionInicial[1]));
        this.tablero[index][posicionInicial[0]] += ' '
      }
    }
  }
  
  rellenarTablero(){
    for (let fila = 0; fila < this.tablero.length; fila++) {
      for (let columna = 0; columna < this.tablero.length; columna++) {
        if (this.tablero[fila][columna] === '0') {
          this.tablero[fila][columna] = this.obtenerCaracterAleatorio()!
        }
      }
    }
  }
  
  obtenerCaracterAleatorio(){
    const caracteres = "abcdefghijklmnopqrstuvwxyz";
    return caracteres.at(Math.floor(Math.random() * 26))
  }

  obtenerPosicionAleatoria(maximo: number) {
    return Math.floor(Math.random() * maximo);
  }

  onIngresarPalabra() {
    if (this.posicionesPalabras.has(this.palabra)) {
      alert("Palabra encontrada")
      this.marcarPalabra(this.palabra)
      this.posicionesPalabras.delete(this.palabra)
      this.palabrasEncontradas.push(this.palabra)
      if (this.posicionesPalabras.size === 0) {
        this.stopwatch.stop()
        alert("Has ganado! en: "+this.stopwatch.getTime())
        if (this.sesionService.obtenerUsername() !== null) {
          let dataPartida = new Data(this.stopwatch.getTime())
          this.sopaService.registrarResultado({codigo: this.codigoJuego, juego: 'J00004', usuario: this.sesionService.obtenerUsername(), fecha: moment().format('YYYY/MM/DD'), data: dataPartida})
          .subscribe({
            next: (response: any) => {
            }, error: (error:any) => {
              console.log(error)
            }
          })
        }
      }
    } else {
      if (this.palabrasEncontradas.includes(this.palabra)) {
        alert("Esta palabra ya ha sido encontrada")
      } else {
        alert("Esta palabra no esta en la sopa")
      }
    }
    this.palabra = ""
  }
}

export class Stopwatch {
  private startTime: moment.Moment;
  private stopTime: moment.Moment;
  private running: boolean;

  constructor() {
    this.startTime = moment();
    this.stopTime = moment();
    this.running = false;
  }

  start() {
    if (!this.running) {
      this.startTime = moment();
      this.running = true;
    }
  }

  stop() {
    if (this.running) {
      this.stopTime = moment();
      this.running = false;
    }
  }

  reset() {
    this.startTime = moment();
    this.stopTime = moment();
    this.running = false;
  }

  getTime(): string {
    const diff = this.stopTime.diff(this.startTime);
    const duration = moment.duration(diff);
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
}