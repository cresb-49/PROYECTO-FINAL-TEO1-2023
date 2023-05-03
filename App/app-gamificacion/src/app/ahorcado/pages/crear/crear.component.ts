import { Component } from '@angular/core';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {

  palabras: string[] = [];
  palabraActual: string = "";
  alertDisabled = true
  constructor() {

  }

  agregarPalabra() {
    if (this.palabraActual != '') {
      const repeticion = this.palabras.includes(this.palabraActual)
      if (repeticion == false) {
        const nuevaPalabra = this.palabraActual.replace(/\s+/g, '');
        const palabraSinNumeros = nuevaPalabra.replace(/[0-9]/g, "");
        const palabraSinEspeciales = palabraSinNumeros.replace(/[^\w\s]/gi, "");
        if (palabraSinEspeciales != "") {
          this.palabras.push(palabraSinEspeciales.toLowerCase());
        }
        this.palabraActual = "";
      } else {
        this.alertDisabled = false;
        setTimeout(() => { this.alertDisabled = true }, 1500)
      }
    }
  }

  borrarPalabra(i: number) {
    this.palabras.splice(i, 1)
  }

  borrarLista() {
    this.palabras = [];
  }

  crearPartida() {
    console.log(this.palabras);
  }
}
