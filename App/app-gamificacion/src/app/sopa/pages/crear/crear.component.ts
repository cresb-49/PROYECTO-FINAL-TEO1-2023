import { Component } from '@angular/core';
import { SopaService } from '../../services/sopa.service';
import Swal from 'sweetalert2';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearSopaComponent {
  palabra: string = ""
  palabras: string[] = []

  constructor(private sopaService: SopaService, private sesionService: SesionService) { }

  agregarPalabra() {
    if (this.palabra !== "") {
      if (this.palabras.length === 10) {
        alert("Solo puedes ingresar un maximo de 10 palabras")
      } else {
        this.palabras.push(this.palabra)
        this.palabra = ""
      }
    } else {
      alert("Debes de ingresar una palabra")
    }
  }

  onCrearJuego() {
    if (this.palabras.length < 5) {
      alert("Debes ingresar al menos 5 palabras")
    } else {
      let username: string = this.sesionService.obtenerUsername()!;
      this.sopaService.registarJuegoPersonalizado({ juego: "J00004", usuario: username, data: { palabras: this.palabras } })
        .subscribe({
          next: (response: any) => {
            Swal.fire(
              {
                title: 'Juego creado',
                text: `El codigo del juego es "${response.codigo}"`,
                icon: 'success',
                confirmButtonText: 'Salir'
              }
            );
          },
          error: (error: any) => {
            console.log(error)
          },
          complete: () => {
            this.palabras = [];
          }
        })
    }
  }
}
