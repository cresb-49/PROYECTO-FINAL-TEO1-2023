import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PreviewGameComponent } from './preview-game/preview-game.component';
import { ComentarioJuegoComponent } from './comentario-juego/comentario-juego.component';



@NgModule({
  declarations: [
    MenuComponent,
    PreviewGameComponent,
    ComentarioJuegoComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    MenuComponent,
    PreviewGameComponent,
    ComentarioJuegoComponent
  ]
})
export class SharedModule { }
