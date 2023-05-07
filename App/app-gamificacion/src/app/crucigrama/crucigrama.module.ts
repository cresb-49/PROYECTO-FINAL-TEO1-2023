import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrucigramaRoutingModule } from './crucigrama-routing.module';
import { MainComponent } from './pages/main/main.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        MainComponent,
        PrincipalComponent
    ],
    imports: [
        CommonModule,
        CrucigramaRoutingModule,
        SharedModule
    ]
})
export class CrucigramaModule { }
