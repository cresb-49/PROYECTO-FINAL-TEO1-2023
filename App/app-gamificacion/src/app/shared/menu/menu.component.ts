import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/services/sesion.service';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  picProfile: any = '../../../assets/no-profile-picture.png';
  usuario: any;

  nombre = () => {
    if (this.sesionService.verificarSesion()) {
      return this.sesionService.obtenerUsername()
    } else {
      return 'Guest'
    }
  }

  constructor(private router: Router, private sesionService: SesionService, private menuService: MenuService) { }

  ngOnInit(): void {
    const jsonUsuario = localStorage.getItem("usuario");
    if (jsonUsuario) {
      this.usuario = JSON.parse(jsonUsuario);
    }
    this.menuService.getPic().subscribe(
      {
        next: (respuesta: any) => {
          this.picProfile = respuesta.imagen
        },
        error: (error: any) => {
          this.picProfile = '../../../assets/no-profile-picture.png';
        }
      }
    );
  }


  inicio() {
    this.router.navigate(["/principal"]);
  }

  login() {
    this.router.navigate(["/auth/login"]);
  }

  verInformacion() {
    if (this.sesionService.verificarSesion()) {
      this.router.navigate(["/auth/informacion"]);
    }
  }

  salir() {
    this.router.navigate(['/principal'])
    localStorage.removeItem("usuario");
    this.usuario = null;
    this.sesionService.cerrarSesion();
    this.picProfile = '../../../assets/no-profile-picture.png';
  }
}
