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

@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegisterComponent,
    InformacionUsuarioComponent,
    ModificarInformacionComponent,
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class AuthModule { }
