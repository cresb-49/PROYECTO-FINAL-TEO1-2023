import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SopaRoutingModule } from './sopa-routing.module';
import { MainComponent } from './pages/main/main.component';
import { PrincipalComponent } from './pages/principal/principal.component';


@NgModule({
  declarations: [
    MainComponent,
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    SopaRoutingModule
  ]
})
export class SopaModule { }
