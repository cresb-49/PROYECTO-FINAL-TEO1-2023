import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Entrada } from '../../models/Entrada';

@Component({
  selector: 'app-play-cuadro',
  templateUrl: './play-cuadro.component.html',
  styleUrls: ['./play-cuadro.component.css']
})
export class PlayCuadroComponent implements OnInit {

  @ViewChild('miInput', { static: false }) miInput!: ElementRef;
  @Input() cuadro!: Entrada;
  constructor() { }

  ngOnInit() {
  }

}
