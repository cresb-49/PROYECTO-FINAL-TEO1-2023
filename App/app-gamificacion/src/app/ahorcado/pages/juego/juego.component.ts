import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JuegoComponent implements OnInit {

  palabras = [
    'manzana',
    'perro'
  ];

  numeroPalabra = 0;
  botonDesabilitado = false;
  palabraActual = '';
  cantidadErrores: number = 0;
  cantidadAciertos: number = 0;
  srcImagen = `../../../../assets/img${this.cantidadErrores}.png`;
  punteoTotal: number = 0;

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    this.cambiarEstadoBotones(true);
    this.numeroPalabra = 0;
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
        })
        this.finalizarJuego();
      } else if (this.cantidadAciertos == this.palabraActual.length) {
        let punteo = 100 - (this.cantidadErrores * 15);
        this.punteoTotal += punteo;
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
        this.router.navigate(["/ahorcado"])
      }, 1500)
      this.numeroPalabra = 0;
    }
  }

  cambiarEstadoBotones(estado: boolean) {
    const buttons = document.querySelectorAll<HTMLButtonElement>('#letras button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = estado;
    }
  }

  terminarJuego(){
    this.router.navigate(['/ahorcado']);
  }
}
