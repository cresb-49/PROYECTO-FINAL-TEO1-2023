import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Entrada } from '../../models/Entrada';

@Component({
  selector: 'app-play-cuadro',
  templateUrl: './play-cuadro.component.html',
  styleUrls: ['./play-cuadro.component.css']
})
export class PlayCuadroComponent implements OnInit {

  @ViewChild('miInput', { static: false }) miInput!: ElementRef;
  @Input() cuadro!: Entrada;
  @Input() habilitado!: boolean;

  init: boolean = false;
  @Output() startEvent = new EventEmitter<boolean>();
  @Output() cambioValor = new EventEmitter<boolean>();

  letra: string = '';

  constructor() { }

  ngOnInit() {
  }

  private sendInit(): void {
    this.init = true;
    this.startEvent.emit(this.init);
    this.init = false;
  }
  valorCambio(event: any) {
    const caracteresPermitidos = /^[a-zA-ZñÑ]$/;
    const teclaPresionada = String.fromCharCode(event.keyCode);
    if (!caracteresPermitidos.test(teclaPresionada)) {
      event.preventDefault();
    } else {
      this.sendInit();
      this.cuadro.entrada = teclaPresionada;
      let val = this.cuadro.entrada.toLowerCase() === this.cuadro.letra.toLowerCase();
      console.log(val);
      this.cambioValor.emit(val);
      console.log(this.cuadro);
    }
  }

  seleccionarTexto(input: any ) {
    if (input)
      input.select();
  }

  modelCambio($event: any) {
    this.cuadro.entrada = this.letra;
  }
}
