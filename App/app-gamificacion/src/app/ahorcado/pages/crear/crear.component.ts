import { Component } from '@angular/core';
import { AhorcadoService } from '../../services/ahorcado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {

  palabras: string[] = [];
  palabraActual: string = "";
  alertDisabled = true;

  constructor(private ahorcadoService: AhorcadoService) {

  }

  agregarPalabra() {
    if (this.palabraActual != '') {
      const repeticion = this.palabras.includes(this.palabraActual)
      if (repeticion == false) {
        const nuevaPalabra = this.palabraActual.replace(/\s+/g, '');
        const palabraSinNumeros = nuevaPalabra.replace(/[0-9]/g, "");
        const palabraSinEspeciales = palabraSinNumeros.replace(/[^\w\s]/gi, "");
        const repeticion = this.palabras.includes(palabraSinEspeciales.toLowerCase());
        if (repeticion == false) {
          if (palabraSinEspeciales != "") {
            this.palabras.push(palabraSinEspeciales.toLowerCase());
          }
        } else {
          this.alertDisabled = false;
          setTimeout(() => { this.alertDisabled = true }, 1500)
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
    if (this.palabras.length > 0) {
      this.ahorcadoService.obtenerUsuario();
      const usuario = this.ahorcadoService.getUsuario();
      const body = {
        juego: "J00002",
        usuario: usuario.username,
        data: { palabras: this.palabras }
      }
      console.log(body);
      this.ahorcadoService.registrarPartida(body)
        .subscribe({
          next: (result: any) => {
            if (result) {
              this.borrarLista();
              Swal.fire({
                icon: 'success',
                title: 'Juego Creado',
                text: `El juego ha sido creado correctamente. El codigo es: ${result.codigo}`
              });
            }
          },
          error: (error: any) => { console.log(error); }
        })
    }
  }
}
