import { Component } from '@angular/core';
import { Hanoi } from '../models/Hanoi';
import { Torre } from '../models/Torre';
import { Disco } from '../models/Disco';
import { EstadisticaHanoi } from '../models/EstadisticaHanoi';

@Component({
  selector: 'app-juego-hanoi',
  templateUrl: './juego-hanoi.component.html',
  styleUrls: ['./juego-hanoi.component.css']
})
export class JuegoHanoiComponent {

  contador: number = 1;
  torres: Torre[] = [];
  parametros: Hanoi = {
    codigo: '123456',
    torres: 4,
    discos: 2
  }

  estadisticaHanoi: EstadisticaHanoi = {
    movimientos: [],
    terminado: false,
    movExperados: 0
  }

  public iniciar(): void {
    this.estadisticaHanoi.movExperados = Math.pow(2, this.parametros.discos) - 1;
    for (let index = 1; index <= this.parametros.torres; index++) {
      this.torres.push(new Torre(('Torre #' + index), []));
    }
    let discos: Disco[] = [];
    let contador: number = 10;
    for (let index = 0; index < this.parametros.discos; index++) {
      discos.push(new Disco(contador));
      contador--;
    }
    this.torres[0].discos = discos.reverse();
  }

  public generarTorres(): number {
    let altura = (59 * this.parametros.discos) + 65;
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
    console.log(this.estadisticaHanoi);
  }

  ngOnInit() {
    this.iniciar();
  }
}
