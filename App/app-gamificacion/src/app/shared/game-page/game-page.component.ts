import { AfterViewInit, Component, ElementRef, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements AfterViewInit {
  @ViewChild('miDiv', { static: true }) divRef!: ElementRef;
  private idInterval: any;

  @Input() juego: string | null = null;
  @Input() desc = 'Descripcion default del componenete asignamos el valor al input desc';
  @Input() infoLike = null;
  @Input() likeUsuario = null;
  @Input() comentarioUsuario: string = "";

  cantidadLikes: number = 0;
  cantidadDislikes: number = 0;


  constructor(private formsModule: FormsModule, private toast: NgToastService) { }
  ngOnInit(): void {
    this.intervaloActualizacion();
  }

  estadoMostrarLikes() {
    return this.likeUsuario !== null && this.likeUsuario
  }

  anchoDiv!: number;

  obtenerAlturaDiv() {
    this.anchoDiv = this.divRef.nativeElement.offsetHeight*0.2037;
  }

  ngAfterViewInit() {
    this.obtenerAlturaDiv();
  }

  public intervaloActualizacion(): void {
    if (this.idInterval) {
      clearInterval(this.idInterval);
    }
    this.idInterval = setInterval(() => this.obtenerAlturaDiv(), 1);
  }
}
