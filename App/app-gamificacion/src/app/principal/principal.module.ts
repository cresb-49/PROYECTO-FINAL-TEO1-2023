import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { MainComponent } from './pages/main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule
  ]
})
export class PrincipalModule { }
