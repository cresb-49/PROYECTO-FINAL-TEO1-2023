import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.obtenerUsuario();
    const usuario = this.authService.getUsuario();

    this.authService.verEstadisticasGenerales(usuario.username)
      .subscribe({
        next: (result: any) => {
          this.partidasGenerales = result.generales;
          this.partidasJuego = result.juegos;
          console.log(this.partidasJuego);
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

}
