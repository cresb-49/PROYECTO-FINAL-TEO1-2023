import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LogrosService } from 'src/app/services/logros.service';
import Swal2 from "sweetalert2";
import { SesionService } from 'src/app/services/sesion.service';
import * as moment from 'moment'
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { CrucigramaService } from '../../services/crucigrama.service';
import { Data } from '../../models/Data';

@Component({
  selector: 'app-juego-crucigrama',
  templateUrl: './juego-crucigrama.component.html',
  styleUrls: ['./juego-crucigrama.component.css']
})
export class JuegoCrucigramaComponent {
  @Input() codigoPartida!: string;
  data!: Data;
  constructor(private router: Router, private route: ActivatedRoute, private crucigramaService: CrucigramaService, private sesionService: SesionService, private toast: NgToastService, private logrosService: LogrosService, private authService: AuthService) { }
  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.codigoPartida = params.codigo;
    });
    this.obtenerModeloJuego();
  }

  private obtenerModeloJuego(): void {
    this.crucigramaService.obtenerJuegoPersonalizado({ codigo: this.codigoPartida, juego: 'J00003' }).subscribe(
      {
        next: (response: any) => {
          console.log(response);
          this.data = response.data;
        },
        error: (error: any) => {
          console.log(error);
          Swal2.fire({
            title: 'Error!',
            text: `No existe un partida con el codigo ${this.codigoPartida} para Torres de Hanoi`,
            icon: 'error',
            confirmButtonText: 'Salir'
          });
          this.router.navigate(['/crucigrama/principal']);
        }
      }
    );
  }
}