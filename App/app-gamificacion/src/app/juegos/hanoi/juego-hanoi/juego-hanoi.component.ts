import { Component } from '@angular/core';
import { Hanoi } from '../models/Hanoi';
import { Torre } from '../models/Torre';
import { Disco } from '../models/Disco';

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
    torres: 3,
    discos: 4
  }

  public iniciar(): void {
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

  public movimientoDisco(origen: Torre, destino: Torre) {
    console.log(`Mov ${origen.nombre} to ${destino.nombre}`);
  }

  ngOnInit() {
    this.iniciar();
  }
}
