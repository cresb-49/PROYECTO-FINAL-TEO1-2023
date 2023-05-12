import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-informacion-usuario',
  templateUrl: './informacion-usuario.component.html',
  styleUrls: ['./informacion-usuario.component.css']
})
export class InformacionUsuarioComponent implements OnInit {

  usuario: any

  constructor(private router: Router, private sessionService: SesionService) {

  }

  ngOnInit(): void {
      this.usuario = this.sessionService.obtenerSesion();
    
  }

  modificarInformacion() {
    this.router.navigate(["/auth/modificar"]);
  }

  verEstadisticas() {
    this.router.navigate(["/auth/estadisticas"]);
  }


}
