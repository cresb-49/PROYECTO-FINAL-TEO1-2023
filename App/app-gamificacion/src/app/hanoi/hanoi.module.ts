import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HanoiRoutingModule } from './hanoi-routing.module';
import { MainComponent } from './pages/main/main.component';
import { DiscoHanoiComponent } from './disco-hanoi/disco-hanoi.component';
import { JuegoHanoiComponent } from './juego-hanoi/juego-hanoi.component';
import { TorreHanoiComponent } from './torre-hanoi/torre-hanoi.component';
import { PrincipalComponent } from './pages/principal/principal.component';


@NgModule({
  declarations: [
    MainComponent,
    JuegoHanoiComponent,
    DiscoHanoiComponent,
    TorreHanoiComponent,
    PrincipalComponent,
  ],
  imports: [
    CommonModule,
    HanoiRoutingModule
  ]
})
export class HanoiModule { }
