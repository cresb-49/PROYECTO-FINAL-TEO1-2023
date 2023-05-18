import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Cuadro } from '../../models/Cuadro';
import { Crusigrama } from '../../models/Crusigrama';

@Component({
  selector: 'app-view-cuadro',
  templateUrl: './view-cuadro.component.html',
  styleUrls: ['./view-cuadro.component.css']
})
export class ViewCuadroComponent implements OnInit {
  @ViewChild('miInput', { static: false }) miInput!: ElementRef;
  @Input() cuadro!: Cuadro;
  @Input() modeloCrucigrama!: Crusigrama;
  constructor() { }

  ngOnInit() {
  }

}
