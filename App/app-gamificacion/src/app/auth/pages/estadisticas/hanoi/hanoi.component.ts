import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-hanoi',
  templateUrl: './hanoi.component.html',
  styleUrls: ['./hanoi.component.css']
})
export class HanoiComponent implements OnInit {

  partidasJugadas: any[] = [];
  tiempoJugado: string = "";


  ngOnInit(): void {
    this.authService.obtenerUsuario();
    const usuario = this.authService.getUsuario();
    this.authService.obtenerPartidasPorJuego(usuario.username, "J00001")
      .subscribe({
        next: (result: any) => {
          this.partidasJugadas = result;
          this.obtenerTiempoDeJuego();

        }
      });



    let tiempo1 = moment('01:05:30', 'hh:mm:ss');
    let tiempo2 = moment('00:05:00', 'hh:mm:ss');
    let tiempoSumado = moment.duration(tiempo1.diff(moment().startOf('day'))).add(moment.duration(tiempo2.diff(moment().startOf('day')))).asMilliseconds();
    let tiempoSumado2 = moment.utc(tiempoSumado).format('hh:mm:ss');
    let tiempo3 = moment(tiempoSumado2, 'hh:mm:ss');
    let tiempo4 = moment('00:00:00', 'hh:mm:ss');
    let tiempoSumado3 = moment.duration(tiempo3.diff(moment().startOf('day'))).add(moment.duration(tiempo4.diff(moment().startOf('day')))).asMilliseconds();
    let tiempoSumado4 = moment.utc(tiempoSumado3).format('hh:mm:ss');
    console.log(tiempoSumado2);
    console.log(tiempoSumado4);

    let t1 = moment.duration("15:30:00");
    let s1 = t1.asSeconds();

    let t2 = moment.duration("15:30:00");
    let s2 = t1.asSeconds();

    let s = s1 + s2;

    let horas = Math.floor(s / 3600);
    let minutos = Math.floor((s % 3600) / 60);
    let segundos = s % 60;
    console.log(s);
    let tiempoFormateado = horas.toString().padStart(2, '0') + ':' +
      minutos.toString().padStart(2, '0') + ':' +
      segundos.toString().padStart(2, '0');

    console.log(tiempoFormateado);

  }

  constructor(private authService: AuthService, private router: Router) {

  }

  obtenerTiempoDeJuego() {
    let tiempo = 0;
    this.partidasJugadas.forEach((partida) => {
      console.log(partida.data.tiempo);
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
