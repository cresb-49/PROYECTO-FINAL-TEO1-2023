import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { InformacionUsuarioComponent } from './pages/informacion-usuario/informacion-usuario.component';
import { ModificarInformacionComponent } from './pages/modificar-informacion/modificar-informacion.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "informacion", component: InformacionUsuarioComponent },
      { path: "modificar", component: ModificarInformacionComponent },
      { path: "estadisticas", component: EstadisticasComponent },
      { path: "**", redirectTo: "login" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
