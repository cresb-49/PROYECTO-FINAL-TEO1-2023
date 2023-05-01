import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JuegoComponent implements OnInit {

  palabras = [
    'manzana',
    'perro',
    'computadora',
    'murcielago',
    'locura',
    'microfono',
    'calculadora',
  ];

  numeroPalabra = 0;
  botonDesabilitado = false;
  palabraActual = '';
  cantidadErrores: number = 0;
  cantidadAciertos: number = 0;
  srcImagen = `../../../../assets/img${this.cantidadErrores}.png`

  ngOnInit(): void {
    this.cambiarEstadoBotones(true);
  }

  verPalabras() {
    this.botonDesabilitado = true;
    this.cambiarEstadoBotones(false)
    this.cantidadAciertos = 0;
    this.cantidadErrores = 0;
    const divPalabras = document.getElementById('palabra_a_adivinar');
    divPalabras!.innerHTML = '';
    this.numeroPalabra = 2;
    this.palabraActual = this.palabras[this.numeroPalabra];
    const cantidadLetras = this.palabraActual.length;
    for (let i = 0; i < cantidadLetras; i++) {
      const span = document.createElement('span');
      divPalabras!.appendChild(span);
    }
    console.log(divPalabras);
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
        console.log('perdiste');
        this.finalizarJuego();
      } else if (this.cantidadAciertos == this.palabraActual.length) {
        console.log('Ganaste');
        this.finalizarJuego();
      }
    }
  }

  finalizarJuego() {
    this.cambiarEstadoBotones(true);
    this.botonDesabilitado = false;
  }

  cambiarEstadoBotones(estado: boolean) {
    const buttons = document.querySelectorAll<HTMLButtonElement>('#letras button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = estado;
    }
  }
}
