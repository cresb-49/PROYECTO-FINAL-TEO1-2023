import { Component, Output } from '@angular/core';
import { Crucigrama } from '../models/Crucigrama';

@Component({
  selector: 'app-juego-crucigrama',
  templateUrl: './juego-crucigrama.component.html',
  styleUrls: ['./juego-crucigrama.component.css']
})
export class JuegoCrucigramaComponent {
  @Output() columnas: number = 0;
  @Output() filas: number = 0;

  crusigrama: Crucigrama = {
    palabras: [
    ]
  }

  generar() {
    console.log('Columnas: ', this.columnas, ' Filas:', this.filas);

  }
}
