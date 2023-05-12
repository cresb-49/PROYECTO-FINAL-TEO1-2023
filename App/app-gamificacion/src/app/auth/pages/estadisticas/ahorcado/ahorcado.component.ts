import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit{



  partidasJugadas: any[] = [];
  punteoTotal:number = 0;

   // Pie
   public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Ganadas' ], [ 'Falladas'] ],
    datasets: [ {
      data: [ 300, 500 ]
    } ]
  };

  
  public pieChartType: ChartType = 'pie';

  constructor(private authService: AuthService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.authService.obtenerUsuario();
    const usuario = this.authService.getUsuario();
    this.authService.obtenerPartidasPorJuego(usuario.username)
      .subscribe({
        next: (result: any) => {
          this.partidasJugadas = result;
        }
      });

    this.authService.verEstadisticasAhorcado(usuario.username)
      .subscribe({
        next: (result:any) => {
          this.punteoTotal = result[0].punteo;
          this.pieChartData = {
            labels: [["Palabras Falladas"], ["Palabras Encontradas"]],
            datasets: [ {
              data: [result[0].palabrasFalladas, result[0].palabrasEncontradas]
            } ]
          }
        }
      });
  }

 

  regresar(){
    this.router.navigate(["auth/estadisticas"])
  }

}

