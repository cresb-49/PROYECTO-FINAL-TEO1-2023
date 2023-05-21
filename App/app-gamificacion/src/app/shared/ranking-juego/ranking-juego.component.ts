import { Component, Input, OnInit } from '@angular/core';
import { RankingService } from './services/ranking.service';

@Component({
  selector: 'app-ranking-juego',
  templateUrl: './ranking-juego.component.html',
  styleUrls: ['./ranking-juego.component.css']
})
export class RankingJuegoComponent implements OnInit {
  @Input() juego!: string;

  public ranking!: any[];
  public parametros!: string[];

  constructor(private rankingService: RankingService) { }

  ngOnInit() {
    //Obtenemos los datos desde la base de datos
    this.rankingService.obtenerRanking(this.juego).subscribe(
      {
        next: (response: any[]) => {
          console.log(response);
          this.ranking = response;
        },
        error: (error) => {
          console.log(error);

        }
      }
    );
  }

  public ObjToString(ranking: any): string {
    return JSON.stringify(ranking);
  }

  public calcularParametros(item: any): any {
    let tmp: string[] = [];
    if (this.juego === 'J00001') {
      tmp.push(`Partidas Jugadas: ${item.jugado}`);
      tmp.push(`Movimientos de Mas: ${item.movimientosDeMas}`);
      tmp.push(`Tiempo: ${item.tiempo}`);
      return tmp;
    } else if (this.juego === 'J00002') {
      tmp.push(`Punteo: ${item.punteo}`);
      tmp.push(`Partidas Jugadas: ${item.jugado}`);
      tmp.push(`Palabras Encontradas: ${item.palabrasEncontradas}`);
      tmp.push(`Palabras Falladas: ${item.palabrasFalladas}`);
      return tmp;
    } else if (this.juego === 'J00003') {
      tmp.push(`Partidas Jugadas: ${item.jugado}`);
      tmp.push(`Tiempo: ${item.tiempo}`);
      return tmp;
    } else if (this.juego === 'J00004') {
      tmp.push(`Partidas Jugadas: ${item.jugado}`);
      tmp.push(`Tiempo: ${item.tiempo}`);
      return tmp;
    }
  }
}
