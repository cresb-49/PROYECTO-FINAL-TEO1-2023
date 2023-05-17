import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { JuegoComponent } from './pages/juego/juego.component';
import { CrearComponent } from './pages/crear/crear.component';
import { ProfesorGuard } from '../guards/profesor.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: "principal", component: PrincipalComponent },
      { path: "juego", component: JuegoComponent },
      { path: "crear", component: CrearComponent, canActivate: [ProfesorGuard] },
      { path: "**", redirectTo: "principal" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AhorcadoRoutingModule { }
