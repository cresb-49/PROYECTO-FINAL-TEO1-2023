import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AhorcadoService } from '../../services/ahorcado.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LogrosService } from 'src/app/services/logros.service';
import { SesionService } from 'src/app/services/sesion.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JuegoComponent implements OnInit {

  palabras = [
    'manzana',
    'computadora'
  ];

  numeroPalabra = 0;
  botonDesabilitado = false;
  palabraActual = '';
  cantidadErrores: number = 0;
  cantidadAciertos: number = 0;
  srcImagen = `../../../../assets/img${this.cantidadErrores}.png`;
  punteoTotal: number = 0;
  codigoJuego = "";
  palabrasEntontradas = 0;
  palabrasFalladas = 0;

  constructor(private router: Router, private route: ActivatedRoute, private ahorcadoService: AhorcadoService, private authService: AuthService, private logrosService: LogrosService
    , private sessionService: SesionService, private toast: NgToastService) {

  }

  ngOnInit(): void {
    this.cambiarEstadoBotones(true);
    this.numeroPalabra = 0;

    this.route.queryParams.subscribe((params: any) => {
      this.codigoJuego = params.codigo;
    });
    this.ahorcadoService.obtenerPartida(this.codigoJuego, "J00002")
      .subscribe({
        next: (result: any) => {
          if (result) {
            this.palabras = result.data.palabras
            Swal.fire({
              icon: 'success',
              title: 'Comienza el juego',
              showConfirmButton: true
            });
          }
        },
        error: (error: any) => {
          this.router.navigate(["/ahorcado/principal"]);
          Swal.fire({
            icon: 'error',
            title: 'Error al buscar buscar la partida',
            text: error.error.error,
            showConfirmButton: true
          });
        }
      });
  }

  obtenerPalabra() {
    this.botonDesabilitado = true;
    this.cambiarEstadoBotones(false)
    this.cantidadAciertos = 0;
    this.cantidadErrores = 0;
    const divPalabras = document.getElementById('palabra_a_adivinar');
    divPalabras!.innerHTML = '';
    this.palabraActual = this.palabras[this.numeroPalabra];
    const cantidadLetras = this.palabraActual.length;
    for (let i = 0; i < cantidadLetras; i++) {
      const span = document.createElement('span');
      divPalabras!.appendChild(span);
    }
    this.numeroPalabra++;
  }

  clickTecla(letra: string, event: any) {
    if (this.palabraActual != "") {
      event.target.disabled = true;
      const spans = document.querySelectorAll('#palabra_a_adivinar span')
      let acerto = false;
      for (let i = 0; i < this.palabraActual.length; i++) {
        if (letra == this.palabraActual[i]) {
          acerto = true;
          spans[i].innerHTML = letra;
          this.cantidadAciertos++;
        }
      }

      if (acerto == false) {
        this.cantidadErrores++;
        this.srcImagen = `../../../../assets/img${this.cantidadErrores}.png`
      }

      if (this.cantidadErrores == 7) {
        Swal.fire({
          icon: 'error',
          title: 'Perdiste',
          text: `La palabra era: ${this.palabraActual}`
        });
        this.palabrasFalladas++;
        this.finalizarJuego();
      } else if (this.cantidadAciertos == this.palabraActual.length) {
        let punteo = 100 - (this.cantidadErrores * 15);
        this.punteoTotal += punteo;
        this.palabrasEntontradas++;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Bien! Adivinaste la palabra',
          text: `Punteo Obtenido: ${punteo}`,
          showConfirmButton: false,
          timer: 1500
        });
        this.finalizarJuego();
      }
    }
  }

  finalizarJuego() {
    this.cambiarEstadoBotones(true);
    this.botonDesabilitado = false;
    this.srcImagen = `../../../../assets/img${0}.png`;

    if (this.numeroPalabra == this.palabras.length) {
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Termino el juego',
          text: 'Tu puntuacion es de: ' + this.punteoTotal,
        });
        if (this.sessionService.verificarSesion()) {
          this.ahorcadoService.obtenerUsuario();
          const usuario = this.ahorcadoService.getUsuario();
          const fechaActual = moment().format("YYYY-MM-DD");
          const data = {
            palabrasEncontradas: this.palabrasEntontradas,
            palabrasFalladas: this.palabrasFalladas,
            punteo: this.punteoTotal
          }
          const resultadoBody = {
            codigo: this.codigoJuego,
            juego: "J00002",
            usuario: usuario.username,
            fecha: fechaActual,
            data
          }
          this.ahorcadoService.guardarResultado(resultadoBody)
            .subscribe({
              next: (resultado: any) => {
                this.obtenerLogros(usuario.username), this.toast.info({
                  detail: "Partida Registrada",
                  summary: 'Se registro con exito la partida',
                  duration: 5000
                });
              },
              error: (error: any) => {
                this.toast.error({
                  detail: "Error",
                  summary: 'No se registro la partida error con el servidor',
                  duration: 5000
                });
              }
            });
        } else {
          this.toast.info({
            detail: "Guardado de Resultado?",
            summary: 'Debes de iniciar sesion para poder guardar tus resultados',
            duration: 5000
          });
        }
        this.palabrasEntontradas = 0;
        this.palabrasFalladas = 0;
        this.router.navigate(["/ahorcado"]);
      }, 1500)
      this.numeroPalabra = 0;
    }
  }

  obtenerLogros(username: string) {
    this.authService.obtenerUsuarioDB(username)
      .subscribe({
        next: (result: any) => { this.logrosService.obtenerLogrosGenerales(result); this.logrosService.obtenerLogrosAhorcado(result) },
        error: (err) => { console.log(err); }
      });
  }

  cambiarEstadoBotones(estado: boolean) {
    const buttons = document.querySelectorAll<HTMLButtonElement>('#letras button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = estado;
    }
  }

  terminarJuego() {
    this.router.navigate(['/ahorcado']);
  }
}
