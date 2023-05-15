import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  @Input() juego: string | null = null;
  @Input() desc = 'Descripcion default del componenete asignamos el valor al input desc';
  @Input() infoLike = null;
  @Input() likeUsuario = null;
  @Input() comentarioUsuario: string = "";

  cantidadLikes: number = 0;
  cantidadDislikes: number = 0;

  constructor(private formsModule: FormsModule, private toast: NgToastService) { }
  ngOnInit(): void {
  }

  estadoMostrarLikes() {
    return this.likeUsuario !== null && this.likeUsuario
  }
}
