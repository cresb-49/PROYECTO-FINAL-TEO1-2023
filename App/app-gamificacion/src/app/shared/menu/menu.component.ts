import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario: any;

  nombre = () => {
    this.usuario = this.sesionService.obtenerSesion();
    if (this.sesionService.verificarSesion()) {
      return this.usuario.username;
    } else {
      return 'Guest'
    }
  }

  constructor(private router: Router, private sesionService: SesionService) { }

  ngOnInit(): void {
    this.usuario = this.sesionService.obtenerSesion();
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
    this.usuario = null;
    this.sesionService.cerrarSesion()
  }
}
