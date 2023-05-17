import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { InformacionUsuarioComponent } from './pages/informacion-usuario/informacion-usuario.component';
import { ModificarInformacionComponent } from './pages/modificar-informacion/modificar-informacion.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { AhorcadoComponent } from './pages/estadisticas/ahorcado/ahorcado.component';
import { HanoiComponent } from './pages/estadisticas/hanoi/hanoi.component';
import { SopaComponent } from './pages/estadisticas/sopa/sopa.component';
import { PartidasComponent } from './pages/partidas/partidas.component';
import { InfoPartidaComponent } from './pages/info-partida/info-partida.component';

import { ProfesorGuard } from '../guards/profesor.guard';
import { SessionGuard } from '../guards/session.guard';
import { UsuarioGuard } from '../guards/usuario.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "informacion", component: InformacionUsuarioComponent, canActivate: [SessionGuard] },
      { path: "modificar", component: ModificarInformacionComponent, canActivate: [SessionGuard] }, 
      { path: "estadisticas", component: EstadisticasComponent, canActivate: [UsuarioGuard] },
      { path: "ahorcado", component: AhorcadoComponent, canActivate: [UsuarioGuard] },
      { path: "hanoi", component: HanoiComponent, canActivate: [UsuarioGuard] },
      { path: "sopa", component: SopaComponent, canActivate: [UsuarioGuard] },
      { path: "partidas", component: PartidasComponent, canActivate: [ProfesorGuard] },
      { path: "infoPartida", component: InfoPartidaComponent,canActivate: [ProfesorGuard] },
      { path: "**", redirectTo: "login" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
