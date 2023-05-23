import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InformacionUsuarioComponent } from './pages/informacion-usuario/informacion-usuario.component';
import { ModificarInformacionComponent } from './pages/modificar-informacion/modificar-informacion.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { NgChartsModule } from 'ng2-charts';
import { AhorcadoComponent } from './pages/estadisticas/ahorcado/ahorcado.component';
import { HanoiComponent } from './pages/estadisticas/hanoi/hanoi.component';
import { SopaComponent } from './pages/estadisticas/sopa/sopa.component';
import { PartidasComponent } from './pages/partidas/partidas.component';
import { InfoPartidaComponent } from './pages/info-partida/info-partida.component';
import { CrucigramaComponent } from './pages/estadisticas/crucigrama/crucigrama.component';

@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegisterComponent,
    InformacionUsuarioComponent,
    ModificarInformacionComponent,
    EstadisticasComponent,
    AhorcadoComponent,
    HanoiComponent,
    SopaComponent,
    PartidasComponent,
    InfoPartidaComponent,
    CrucigramaComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class AuthModule { }
