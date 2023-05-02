import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AhorcadoRoutingModule } from './ahorcado-routing.module';
import { MainComponent } from './pages/main/main.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { JuegoComponent } from './pages/juego/juego.component';
import { CrearComponent } from './pages/crear/crear.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    PrincipalComponent,
    JuegoComponent,
    CrearComponent
  ],
  imports: [
    CommonModule,
    AhorcadoRoutingModule,
    FormsModule
  ]
})
export class AhorcadoModule { }
