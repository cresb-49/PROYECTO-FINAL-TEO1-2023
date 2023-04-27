import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { JuegoHanoiComponent } from './game/juego-hanoi/juego-hanoi.component';
import { PrincipalComponent } from './pages/principal/principal.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: "principal", component: PrincipalComponent},
      {path: "juego", component: JuegoHanoiComponent},
      {path: "**", redirectTo: "principal"}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HanoiRoutingModule { }
