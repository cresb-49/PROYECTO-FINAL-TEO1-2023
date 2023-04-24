import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Torre } from '../models/Torre';


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
  @Input() cantidadTorres!: number;
  @Input() torres!: Torre[];

  public movimiento() {
    let nombreBuscado = this.selector.nativeElement.value;
    let find = this.torres.find(torre => torre.nombre === nombreBuscado);
    this.movimientoDisco(this.torre, find);
  }
  public torresFiltter() {
    let th = this;
    return this.torres.filter(t => t !== th.torre);
  }
}
