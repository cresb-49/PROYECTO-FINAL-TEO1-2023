import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PreviewGameComponent } from './preview-game/preview-game.component';
import { ComentarioJuegoComponent } from './comentario-juego/comentario-juego.component';
import { FormsModule } from '@angular/forms';
import { GamePageComponent } from './game-page/game-page.component';



@NgModule({
  declarations: [
    MenuComponent,
    PreviewGameComponent,
    ComentarioJuegoComponent,
    GamePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ], 
  exports: [
    MenuComponent,
    PreviewGameComponent,
    ComentarioJuegoComponent,
    GamePageComponent
  ]
})
export class SharedModule { }
