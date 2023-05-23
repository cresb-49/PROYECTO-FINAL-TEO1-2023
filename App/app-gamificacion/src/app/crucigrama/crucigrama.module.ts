import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrucigramaRoutingModule } from './crucigrama-routing.module';
import { MainComponent } from './pages/main/main.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from '@angular/forms';
import { CrearComponent } from './pages/crear/crear.component';
import { JuegoCrucigramaComponent } from './game/juego-crucigrama/juego-crucigrama.component';
import { CuadroComponent } from './game/cuadro/cuadro.component';
import { DropdownModule } from 'primeng/dropdown';
import { ViewCuadroComponent } from "./game/view-cuadro/view-cuadro.component";
import { PlayCuadroComponent } from './game/play-cuadro/play-cuadro.component';



@NgModule({
    declarations: [
        MainComponent,
        PrincipalComponent,
        CrearComponent,
        JuegoCrucigramaComponent,
        CuadroComponent,
        ViewCuadroComponent,
        PlayCuadroComponent
    ],
    imports: [
        CommonModule,
        CrucigramaRoutingModule,
        SharedModule,
        FormsModule,
        DropdownModule

    ]
})
export class CrucigramaModule { }
