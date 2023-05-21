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

  constructor(private rankingService: RankingService) { }

  ngOnInit() {
    //Obtenemos los datos desde la base de datos
    this.rankingService.obtenerRanking(this.juego).subscribe(
      {
        next: (response: any[]) => {
          console.log(response);
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
}
