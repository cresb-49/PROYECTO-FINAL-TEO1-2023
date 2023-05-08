import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit{

  constructor(private authService: AuthService){}

  ngOnInit(): void {
      this.authService.obtenerUsuario();
      const usuario = this.authService.getUsuario();

      this.authService.verEstadisticasGenerales(usuario.username)
        .subscribe({
          next: (result: any) => {console.log(result);},
          error: (error: any) => {console.log(error);}
        });
  } 

}
