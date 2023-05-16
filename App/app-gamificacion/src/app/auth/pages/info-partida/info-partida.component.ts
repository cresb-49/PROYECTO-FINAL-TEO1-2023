import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-partida',
  templateUrl: './info-partida.component.html',
  styleUrls: ['./info-partida.component.css']
})
export class InfoPartidaComponent implements OnInit {

  codigoJuego: string = "";
  modelo: any

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.codigoJuego = params.codigo;
    });

    this.authService.obtenerModelosporCodigo(this.codigoJuego)
      .subscribe({
        next: (result: any) => {
          this.modelo = result;
        },
        error: (err:any) => {
          Swal.fire({
            title: 'Error',
            text: err.error.error,
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(["/auth/partidas"])
            } else {
              this.router.navigate(["/auth/partidas"])
            }
          })
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

  regresar(){
    this.router.navigate(["/auth/partidas"])
  }
}
