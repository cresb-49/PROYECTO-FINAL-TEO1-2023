import { Component } from '@angular/core';
import { Hanoi } from '../../models/Hanoi'

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

  constructor() {
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
    //TODO: Agregar el codigo generado para el juego personalizado
    let torre = new Hanoi('XXXXX', this.cantidadTorres.value, this.cantidadDiscos.value);
    console.log(torre);
  }
}
