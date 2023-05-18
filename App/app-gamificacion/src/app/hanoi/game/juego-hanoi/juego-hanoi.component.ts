import { Component, Input } from '@angular/core';
import { Hanoi } from '../../models/Hanoi';
import { Torre } from '../../models/Torre';
import { Disco } from '../../models/Disco';
import { EstadisticaHanoi } from '../../models/EstadisticaHanoi';
import { JuegoHanoi } from '../../models/JuegoHanoi';
import { Data } from '../../models/Data';
import { HanoiService } from '../../services/hanoi.service';
import Swal2 from "sweetalert2";
import { SesionService } from 'src/app/services/sesion.service';
import * as moment from 'moment'
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { GamePageComponent } from 'src/app/shared/game-page/game-page.component';
import { LogrosService } from 'src/app/services/logros.service';
import { AuthService } from 'src/app/auth/services/auth.service';

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

  //Variables del reloj
  public minutos: number = 0;
  public segundos: number = 0;

  public isPause: boolean = false;

  private idInterval: any;


  estadisticaHanoi: EstadisticaHanoi = {
    movimientos: [],
    terminado: false,
    movExperados: 0
  }

  constructor(private router: Router, private route: ActivatedRoute, private hanoiService: HanoiService, private sesionService: SesionService, private toast: NgToastService, private logrosService: LogrosService, private authService: AuthService) { }

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

  public movimientoDisco(origen: Torre, destino: Torre, estadisticas: EstadisticaHanoi, iniciarReloj: Function) {
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
    let horas: number = Math.trunc(this.minutos / 60);
    let minutos: number = ((this.minutos / 60) - horas) * 60;
    let segundos: number = this.segundos;
    let result: Data = new Data(this.estadisticaHanoi.movimientos.length, this.estadisticaHanoi.movExperados, this.estadisticaHanoi.movimientos, `${(horas < 10 ? "0" + horas : horas)}:${(minutos < 10 ? "0" + minutos : minutos)}:${(segundos < 10 ? "0" + segundos : segundos)}`);
    Swal2.fire({
      title: 'Partida Terminada!',
      text: `Ha completado el juego en ${this.estadisticaHanoi.movimientos.length} movimientos , en un tiempo de ${this.minutos} minutos con ${this.segundos} segundos`,
      icon: 'success',
      confirmButtonText: 'Salir'
    });

    let body: any = {
      codigo: this.juegoHanoi.codigo, //Codigo de partida personalizada
      juego: this.juegoHanoi.juego, //Codigo del juego
      usuario: this.sesionService.obtenerUsername(), //Nombre de usuario
      fecha: moment().format("YYYY-MM-DD"), // Fecha de realización de la partida
      data: result //Resultado de la partida
    }
    this.hanoiService.registrarResultado(body).subscribe({
      next: (result: any) => {
        this.toast.info({
          detail: "Partida Registrada",
          summary: 'Se registro con exito la partida',
          duration: 5000
        });
      },
      error: (error: any) => {
        this.toast.error({
          detail: "Error",
          summary: 'No se registro la partida error con el servidor',
          duration: 5000
        });
      },
      complete: () => {
        this.obtenerLogros();
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.codigoPartida = params.codigo;
    });
    this.obtenerModeloJuego();
  }

  private obtenerModeloJuego(): void {
    this.hanoiService.obtenerJuegoPersonalizado({ codigo: this.codigoPartida, juego: 'J00001' }).subscribe(
      {
        next: (response: any) => {
          this.juegoHanoi = new JuegoHanoi(response.codigo, new Hanoi(4, 2));
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
          this.router.navigate(['/hanoi/principal']);
        }
      }
    );
  }

  private banderaRejol: boolean = false; //False no activado, true activado el reloj
  public receiveMenssge($event: any) {
    if ($event) {
      if (!this.banderaRejol) {
        this.banderaRejol = !this.banderaRejol;
        this.iniciarReloj();
      }
    } else {
      this.banderaRejol = !this.banderaRejol;
      this.pararReloj();
      if (this.sesionService.obtenerSesion() !== null) {
        this.registrarPartida();
      } else {
        this.toast.info({
          detail: "Guardado de Resultado?",
          summary: 'Debes de iniciar sesion para poder guardar tus resultados',
          duration: 5000
        });
      }
    }
  }

  public iniciarReloj(): void {
    this.isPause = false;
    if (this.idInterval) {
      clearInterval(this.idInterval);
    }
    this.idInterval = setInterval(() => this.reloj(), 1000);
  }

  private reloj(): void {
    if (!this.isPause) {
      if (++this.segundos > 59) {
        this.segundos = 0;
        this.minutos++;
      }
    }
  }

  private resetTimer(): void {
    this.minutos = 0;
    this.segundos = 0;
  }

  public pararReloj(): void {
    this.isPause = true;
  }

  public reiniciarjuego(): void {
    this.contador = 1;
    this.torres = [];
    this.estadisticaHanoi = {
      movimientos: [],
      terminado: false,
      movExperados: 0
    };
    this.resetTimer();
    this.obtenerModeloJuego();
  }

  obtenerLogros(): void {
    let username: string | null = this.sesionService.obtenerUsername();
    if (username) {
      this.authService.obtenerUsuarioDB(username).subscribe(
        {
          next: (result: any) => {
            this.logrosService.obtenerLogrosGenerales(result);
            this.logrosService.obtenerLogrosHanoi(result);
          },
          error: (error: any) => {
            this.toast.error({
              detail: "Error",
              summary: error,
              duration: 3000
            });
          }
        }
      );
    }
  }
}
