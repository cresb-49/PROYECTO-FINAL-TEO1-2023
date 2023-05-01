import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AhorcadoRoutingModule } from './ahorcado-routing.module';
import { MainComponent } from './pages/main/main.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { JuegoComponent } from './pages/juego/juego.component';


@NgModule({
  declarations: [
    MainComponent,
    PrincipalComponent,
    JuegoComponent
  ],
  imports: [
    CommonModule,
    AhorcadoRoutingModule
  ]
})
export class AhorcadoModule { }
