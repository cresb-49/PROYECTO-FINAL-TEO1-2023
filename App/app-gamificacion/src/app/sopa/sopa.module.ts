import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SopaRoutingModule } from './sopa-routing.module';
import { MainComponent } from './pages/main/main.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { JuegoSopaLetrasComponent } from './game/juego-sopa-letras/juego-sopa-letras.component';
import { FormsModule } from '@angular/forms';
import { CrearSopaComponent } from './pages/crear/crear.component';
import { GamePageComponent } from '../shared/game-page/game-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainComponent,
    PrincipalComponent,
    JuegoSopaLetrasComponent,
    CrearSopaComponent,
  ],
  imports: [
    CommonModule,
    SopaRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class SopaModule { }
