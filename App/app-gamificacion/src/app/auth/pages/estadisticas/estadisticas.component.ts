import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { Router } from '@angular/router';
import { LogrosService } from 'src/app/services/logros.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  partidasGenerales: number = 0;
  partidasJuego: any[] = [];
  logros: any[] = [];
  usuario: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.obtenerUsuario();
    const session = this.authService.getUsuario();
    this.authService.verEstadisticasGenerales(session.username)
      .subscribe({
        next: (result: any) => {
          this.partidasGenerales = result.generales;
          this.partidasJuego = result.juegos;
          const data: any = [];
          this.partidasJuego.forEach((partida: any) => {
            this.doughnutChartLabels.push(this.cambiarNombreJuego(partida._id));
            data.push(partida.partidas)
          })
          this.doughnutChartData = {
            labels: this.doughnutChartLabels,
            datasets: [
              { data }
            ]
          };
        },
        error: (error: any) => { console.log(error); }
      });

    this.authService.obtenerUsuarioDB(session.username)
      .subscribe({
        next: (res) => {
          this.usuario = res;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  cambiarNombreJuego(nombreJuego: string) {
    if (nombreJuego == "J00001") {
      return "Hanoi";
    } else if (nombreJuego == "J00002") {
      return "Ahorcado";
    } else if (nombreJuego == "J00003") {
      return "Crucigrama";
    } else {
      return "Sopa de Letras"
    }
  }

  verEstadisticasAhorcado() {
    this.router.navigate(["/auth/ahorcado"]);
  }

  verEstadisticasHanoi() {
    this.router.navigate(["/auth/hanoi"]);
  }

  verEstadisticasSopa() {
    this.router.navigate(["/auth/sopa"]);
  }

  verEstadisticasCrucigrama() {
    this.router.navigate(["/auth/crucigrama"]); 
  }

}
