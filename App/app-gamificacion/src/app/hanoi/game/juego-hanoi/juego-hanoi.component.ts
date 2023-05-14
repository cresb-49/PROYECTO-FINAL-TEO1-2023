import { Component, Input } from '@angular/core';
import { Hanoi } from '../../models/Hanoi';
import { Torre } from '../../models/Torre';
import { Disco } from '../../models/Disco';
import { EstadisticaHanoi } from '../../models/EstadisticaHanoi';
import { JuegoHanoi } from '../../models/JuegoHanoi';
import { Data } from '../../models/Data';
import { HanoiService } from '../../services/hanoi.service';
import Swal2 from "sweetalert2";

@Component({
  selector: 'app-juego-hanoi',
  templateUrl: './juego-hanoi.component.html',
  styleUrls: ['./juego-hanoi.component.css']
})
export class JuegoHanoiComponent {
  @Input() codigoPartida!: string;

  contador: number = 1;
  torres: Torre[] = [];
  juegoHanoi!: JuegoHanoi;


  estadisticaHanoi: EstadisticaHanoi = {
    movimientos: [],
    terminado: false,
    movExperados: 0
  }

  constructor(private hanoiService: HanoiService) { }

  public iniciar(): void {
    this.estadisticaHanoi.movExperados = Math.pow(2, this.juegoHanoi.hanoi.discos) - 1;
    for (let index = 1; index <= this.juegoHanoi.hanoi.torres; index++) {
      this.torres.push(new Torre(('Torre #' + index), []));
    }
    let discos: Disco[] = [];
    let contador: number = 10;
    for (let index = 0; index < this.juegoHanoi.hanoi.discos; index++) {
      discos.push(new Disco(contador));
      contador--;
    }
    this.torres[0].discos = discos.reverse();
  }

  public generarTorres(): number {
    let altura = (59 * this.juegoHanoi.hanoi.discos) + 65;
    return altura;
  }

  public movimientoDisco(origen: Torre, destino: Torre, estadisticas: EstadisticaHanoi) {
    if (!estadisticas.terminado) {
      let bandera = false;
      if (origen.discos.length > 0) {
        let discotmp: Disco | undefined = origen.discos.reverse().pop();
        origen.discos.reverse();
        if (discotmp != undefined) {
          if (destino.discos.length > 0) {
            let peso = destino.discos[0].peso;
            if (peso > discotmp.peso) {
              estadisticas.movimientos.push(`Movimieto pieza${discotmp.peso} de ${origen.nombre} a ${destino.nombre}`);
              destino.discos.reverse().push(discotmp);
              destino.discos.reverse();
              bandera = true;
            }
          } else {
            estadisticas.movimientos.push(`Movimieto pieza${discotmp.peso} de ${origen.nombre} a ${destino.nombre}`);
            destino.discos.reverse().push(discotmp);
            destino.discos.reverse();
            bandera = true;
          }
          if (!bandera) {
            alert(`No puede mover la pieza a la ${destino.nombre}`)
            origen.discos.reverse().push(discotmp);
            origen.discos.reverse();
          }
        }
      }
    } else {
      alert('Juego Terminado ya no puedes realizar movimientos');
    }
  }

  public registrarPartida() {
    let result = new Data(this.estadisticaHanoi.movimientos.length, this.estadisticaHanoi.movExperados, this.estadisticaHanoi.movimientos, "");
    console.log(result);
  }

  ngOnInit() {
    this.hanoiService.obtenerJuegoPersonalizado({ codigo: this.codigoPartida, juego: 'J00001' }).subscribe(
      {
        next: (response: any) => {
          console.log(response);
          this.juegoHanoi = new JuegoHanoi('xxxxx', new Hanoi(4, 2));
          this.iniciar();
        },
        error: (error: any) => {
          console.log(error);
          Swal2.fire({
            title: 'Error!',
            text: `No existe un partida con el codigo ${this.codigoPartida} para Torres de Hanoi`,
            icon: 'error',
            confirmButtonText: 'Salir'
          });
        }
      }
    );
  }

  private iniciarReloj(): void {
    //TODO: logica de reloj
  }

  private reloj(): void {

  }

  private pararReloj(): void {

  }
}
