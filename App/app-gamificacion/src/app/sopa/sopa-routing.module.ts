import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { JuegoSopaLetrasComponent } from './game/juego-sopa-letras/juego-sopa-letras.component';
import { CrearSopaComponent } from './pages/crear/crear.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'principal', component: PrincipalComponent },
      { path: "juego", component: JuegoSopaLetrasComponent },
      { path: "crear", component: CrearSopaComponent },
      { path: '**', redirectTo: 'principal' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SopaRoutingModule { }
