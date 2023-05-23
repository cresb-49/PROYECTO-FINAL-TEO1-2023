import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-crucigrama',
  templateUrl: './crucigrama.component.html',
  styleUrls: ['./crucigrama.component.css']
})
export class CrucigramaComponent implements OnInit{
  partidasJugadas: any[] = [];
  tiempoJugado: string = "";

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Tiempo en Minutos' }
    ]
  };


  ngOnInit(): void {
    this.authService.obtenerUsuario();
    const usuario = this.authService.getUsuario();
    this.authService.obtenerPartidasPorJuego(usuario.username, "J00003")
      .subscribe({
        next: (result: any) => {
          this.partidasJugadas = result;
          this.obtenerTiempoDeJuego();
          const etiquetas:string[] = [];
          const datos:number[] = [];
          this.partidasJugadas.forEach((partida) => {
            let t = moment.duration(partida.data.tiempo);
            let minutos = t.asMinutes();
            etiquetas.push(partida.fecha)
            datos.push(minutos);
          });
          this.barChartData = {
            labels: etiquetas,
            datasets: [
              { data: datos, label: "Tiempo en Minutos"}
            ]
          }
        }
      });
  }

  constructor(private authService: AuthService, private router: Router) {

  }

  obtenerTiempoDeJuego() {
    let tiempo = 0;
    this.partidasJugadas.forEach((partida) => {
      let t = moment.duration(partida.data.tiempo);
      let segundos = t.asSeconds();
      tiempo += segundos;
    });

    let horas = Math.floor(tiempo / 3600);
    let minutos = Math.floor((tiempo % 3600) / 60);
    let segundos = tiempo % 60;
    this.tiempoJugado = horas.toString().padStart(2, '0') + ':' +
      minutos.toString().padStart(2, '0') + ':' +
      segundos.toString().padStart(2, '0');

  }

  regresar() {
    this.router.navigate(["auth/estadisticas"])
  }

}
