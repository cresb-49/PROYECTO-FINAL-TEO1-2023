import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LogrosService } from 'src/app/services/logros.service';
import Swal2 from "sweetalert2";
import { SesionService } from 'src/app/services/sesion.service';
import * as moment from 'moment'
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { CrucigramaService } from '../../services/crucigrama.service';
import { Data } from '../../models/Data';

@Component({
  selector: 'app-juego-crucigrama',
  templateUrl: './juego-crucigrama.component.html',
  styleUrls: ['./juego-crucigrama.component.css']
})
export class JuegoCrucigramaComponent {

  @Input() codigoPartida!: string;
  data!: Data;

  public minutos: number = 0;
  public segundos: number = 0;

  public isPause: boolean = false;

  private idInterval: any;

  private modeloPartida: any;

  public partidaTerminada: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private crucigramaService: CrucigramaService, private sesionService: SesionService, private toast: NgToastService, private logrosService: LogrosService, private authService: AuthService) { }
  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.codigoPartida = params.codigo;
    });
    this.obtenerModeloJuego();
  }
  private obtenerModeloJuego(): void {
    this.crucigramaService.obtenerJuegoPersonalizado({ codigo: this.codigoPartida, juego: 'J00003' }).subscribe(
      {
        next: (response: any) => {
          this.modeloPartida = response;
          this.data = response.data;
        },
        error: (error: any) => {
          console.log(error);
          Swal2.fire({
            title: 'Error!',
            text: `No existe un partida con el codigo ${this.codigoPartida} para Torres de Hanoi`,
            icon: 'error',
            confirmButtonText: 'Salir'
          });
          this.router.navigate(['/crucigrama/principal']);
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
    }
  }

  cambioDeValor($event: boolean) {
    if ($event) {
      this.validarCrusigrama();
    }
  }

  validarCrusigrama() {
    let contador: number = 0;
    for (const fila of this.data.matriz) {
      for (const cuadro of fila) {
        if (cuadro.entrada.toLowerCase() === cuadro.letra.toLowerCase()) {
          contador++;
        }
      }
    }
    let y = this.data.matriz.length;
    let x = this.data.matriz[0].length;
    console.log(contador, x, y);

    if ((y * x) === contador) {
      this.banderaRejol = !this.banderaRejol;
      this.partidaTerminada = !this.partidaTerminada;
      this.pararReloj();
      if (this.sesionService.obtenerSesion() !== null) {
        this.registrarPartida();
      } else {
        this.toast.info({
          detail: "Guardado de Resultado?",
          summary: 'Debes de iniciar sesion para poder guardar tus resultados',
          duration: 5000
        });
        Swal2.fire({
          title: 'Partida Terminada!',
          text: `Ha completado el juego en un tiempo de ${this.minutos} minutos con ${this.segundos} segundos`,
          icon: 'success',
          confirmButtonText: 'Salir'
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

  public registrarPartida() {
    let horas: number = Math.trunc(this.minutos / 60);
    let minutos: number = ((this.minutos / 60) - horas) * 60;
    let segundos: number = this.segundos;
    let result: any = { tiempo: `${(horas < 10 ? "0" + horas : horas)}:${(minutos < 10 ? "0" + minutos : minutos)}:${(segundos < 10 ? "0" + segundos : segundos)}` };
    Swal2.fire({
      title: 'Partida Terminada!',
      text: `Ha completado el juego en un tiempo de ${this.minutos} minutos con ${this.segundos} segundos`,
      icon: 'success',
      confirmButtonText: 'Salir'
    });
    let body: any = {
      codigo: this.modeloPartida.codigo, //Codigo de partida personalizada
      juego: this.modeloPartida.juego, //Codigo del juego
      usuario: this.sesionService.obtenerUsername(), //Nombre de usuario
      fecha: moment().format("YYYY-MM-DD"), // Fecha de realización de la partida
      data: result //Resultado de la partida
    }
    this.crucigramaService.registrarResultado(body).subscribe({
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
        this.router.navigate(["/crucigrama/principal"]);
      }
    });
  }
  obtenerLogros(): void {
    let username: string | null = this.sesionService.obtenerUsername();
    if (username) {
      this.authService.obtenerUsuarioDB(username).subscribe(
        {
          next: (result: any) => {
            this.logrosService.obtenerLogrosGenerales(result);
            this.logrosService.obtenerLogrosCrucigrama(result);
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