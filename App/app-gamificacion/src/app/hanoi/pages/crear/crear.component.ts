import { Component } from '@angular/core';
import { Hanoi } from '../../models/Hanoi'
import { Router } from '@angular/router';
import { HanoiService } from '../../services/hanoi.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {

  public cantidadTorres!: any;
  public cantidadDiscos!: any;
  public numeroTorres!: any[];
  public numeroTorresRen!: any[];
  public numeroDiscos!: any[];
  public numeroDiscosRen!: any[];

  constructor(private router: Router, private hanoiService: HanoiService) {
    this.numeroDiscos = [
      { id: 1, value: 2 },
      { id: 2, value: 3 },
      { id: 3, value: 4 },
      { id: 4, value: 5 },
      { id: 5, value: 6 },
      { id: 6, value: 7 },
      { id: 7, value: 8 },
      { id: 8, value: 9 }
    ]
    this.numeroTorres = [
      { id: 1, value: 3 },
      { id: 2, value: 4 },
      { id: 3, value: 5 },
      { id: 4, value: 6 },
      { id: 5, value: 7 },
      { id: 6, value: 8 },
      { id: 7, value: 9 },
      { id: 8, value: 10 },
    ]
    this.numeroTorresRen = [
      { id: 1, value: 1 },
      { id: 2, value: 2 },
      { id: 3, value: 3 },
      { id: 4, value: 4 },
      { id: 5, value: 5 },
      { id: 6, value: 6 },
      { id: 7, value: 7 },
      { id: 8, value: 8 },
      { id: 9, value: 9 },
      { id: 10, value: 10 },
    ]
    this.numeroDiscosRen = [
      { id: 1, value: 1 },
      { id: 2, value: 2 },
      { id: 3, value: 3 },
      { id: 4, value: 4 },
      { id: 5, value: 5 },
      { id: 6, value: 6 },
      { id: 7, value: 7 },
      { id: 8, value: 8 },
      { id: 9, value: 9 },
    ]

    this.cantidadTorres = this.numeroTorres[0];
    this.cantidadDiscos = this.numeroDiscos[0];
  }


  generarPartida() {
    let torre = new Hanoi(this.cantidadTorres.value, this.cantidadDiscos.value);
    const body = {
      juego: 'J00001',
      usuario: JSON.parse(localStorage.getItem('usuario')!).username,
      data: torre
    }
    this.hanoiService.registarJuegoPersonalizado(body)
      .subscribe({
        next: (result: any) => {
          Swal.fire(
            {
              title: 'Juego creado',
              text: 'Se creo con exito el juego personalizado',
              icon: 'success',
              confirmButtonText: 'Salir'
            }
          )
          console.log(result);
        },
        error: (error: any) => {
          Swal.fire(
            {
              title: 'Error',
              text: error.error.error,
              icon: 'error',
              confirmButtonText: 'Salir'
            }
          )
          console.log(error.error.error);//TODO: Verificar la informacion de error
        }
      })

  }
}
