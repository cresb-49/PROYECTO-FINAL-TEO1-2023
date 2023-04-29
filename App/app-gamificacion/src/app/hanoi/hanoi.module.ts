import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HanoiRoutingModule } from './hanoi-routing.module';
import { MainComponent } from './pages/main/main.component';
import { DiscoHanoiComponent } from './game/disco-hanoi/disco-hanoi.component';
import { JuegoHanoiComponent } from './game/juego-hanoi/juego-hanoi.component';
import { TorreHanoiComponent } from './game/torre-hanoi/torre-hanoi.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { PreviewGameComponent } from '../shared/preview-game/preview-game.component';

@NgModule({
  declarations: [
    MainComponent,
    JuegoHanoiComponent,
    DiscoHanoiComponent,
    TorreHanoiComponent,
    PrincipalComponent,
    PreviewGameComponent
  ],
  imports: [
    CommonModule,
    HanoiRoutingModule
  ]
})
export class HanoiModule { }
