import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SopaRoutingModule } from './sopa-routing.module';
import { MainComponent } from './pages/main/main.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { JuegoSopaLetrasComponent } from './game/juego-sopa-letras/juego-sopa-letras.component';
import { FormsModule } from '@angular/forms';
import { CrearSopaComponent } from './pages/crear/crear.component';


@NgModule({
  declarations: [
    MainComponent,
    PrincipalComponent,
    JuegoSopaLetrasComponent,
    CrearSopaComponent
  ],
  imports: [
    CommonModule,
    SopaRoutingModule,
    FormsModule
  ]
})
export class SopaModule { }
