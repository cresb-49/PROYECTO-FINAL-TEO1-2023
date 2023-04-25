import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Torre } from '../models/Torre';
import { EstadisticaHanoi } from '../models/EstadisticaHanoi';


@Component({
  selector: 'app-torre-hanoi',
  templateUrl: './torre-hanoi.component.html',
  styleUrls: ['./torre-hanoi.component.css']
})
export class TorreHanoiComponent {
  @ViewChild('selector') selector!: ElementRef;
  @Input() torre!: Torre;
  @Input() altura!: number;
  @Input() movimientoDisco!: Function;
  @Input() cantidaDiscos!: number;
  @Input() torres!: Torre[];
  @Input() estadisticas!: EstadisticaHanoi;

  public movimiento() {
    let nombreBuscado = this.selector.nativeElement.value;
    let find = this.torres.find(torre => torre.nombre === nombreBuscado);
    this.movimientoDisco(this.torre, find, this.estadisticas);
    this.verificarJuegoGanado()
  }
  verificarJuegoGanado() {
    let fin: Torre = this.torres[this.torres.length - 1];
    if (fin) {
      if (this.cantidaDiscos === fin.discos.length) {
        this.estadisticas.terminado = true;
        console.log('Juego terminado');
      }
    }
  }
  public torresFiltter() {
    let th = this;
    return this.torres.filter(t => t !== th.torre);
  }
}
