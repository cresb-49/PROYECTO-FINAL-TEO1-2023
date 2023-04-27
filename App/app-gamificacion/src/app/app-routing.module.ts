import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "principal", loadChildren: () => import("./principal/principal.module").then(m => m.PrincipalModule)
  },
  {
    path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "hanoi", loadChildren: () => import("./hanoi/hanoi.module").then(m => m.HanoiModule)
  },
  {
    path: "crucigrama", loadChildren: () => import("./crucigrama/crucigrama.module").then(m => m.CrucigramaModule)
  },
  {
    path: "ahorcado", loadChildren: () => import("./ahorcado/ahorcado.module").then(m => m.AhorcadoModule)
  },
  {
    path: "sopa", loadChildren: () => import("./sopa/sopa.module").then(m => m.SopaModule)
  },
  {
    path: "**", redirectTo: "principal"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
