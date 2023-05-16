import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.css']
})
export class PartidasComponent implements OnInit {

  partidasCreadas: any[] = [];

  constructor(private sessionService: SesionService, private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    const usuario = this.sessionService.obtenerUsername();
    this.authService.obtenerModelosporUsuario(usuario!)
      .subscribe({
        next: (result: any) => {
          this.partidasCreadas = result;
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }

  verNombre(codigo: string) {
    if (codigo == "J00001") {
      return "Hanoi";
    } else if (codigo == "J00002") {
      return "Ahorcado";
    } else if (codigo == "J00003") {
      return "Crucigrama";
    } else {
      return "Sopa de Letras";
    }
  }

  verPartida(i: number) {
    const partida = this.partidasCreadas[i];
    this.router.navigate(["/auth/infoPartida"], { queryParams: { "codigo": partida.codigo } });
  }

  borrarPartida(i: number) {
    const partida = this.partidasCreadas[i];
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras recuperar esta partida",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.borrarModelo(partida.codigo)
          .subscribe({
            next: (result: any) => {
              if (result.deletedCount == 1) {
                Swal.fire(
                  'Exito!',
                  'La partida fue borrada',
                  'success'
                )
                this.partidasCreadas.splice(i, 1);
              }
            },
            error: (err: any) => {
              console.log(err);
            }
          });
      }
    })
  }
}
