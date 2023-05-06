import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrincipalService } from '../../services/principal.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  usuario: number = 0;
  juegos!: Array<any>;
  constructor(private router: Router, private principalService: PrincipalService) { }

  ngOnInit() {
    let usuario = this.getUsuaio();
    if (usuario) {
      this.usuario = parseInt(usuario.rol);
    }
    this.cargarJuegos();
  }

  getUsuaio() {
    const jsonUsuario = localStorage.getItem("usuario");
    let usuario = null;
    if (jsonUsuario) {
      usuario = JSON.parse(jsonUsuario);
    }
    return usuario;
  }

  ejecutarJuego(codigo: string) {
    console.log(codigo);
    
    if (codigo === 'J00001') {
      this.router.navigate(['/hanoi/principal']);
    } else if (codigo === "J00002") {
      this.router.navigate(['/ahorcado/principal']);
    } else if (codigo === 'J00003') {
      this.router.navigate(['/crusigrama/principal']);
    } else if (codigo === 'J00004') {
      this.router.navigate(['/sopa/principal']);
    } else {
      this.router.navigate(['/principal'])
    }
  }

  crearJuego(codigo: string) {
    if (codigo === 'J00001') {
      this.router.navigate(['/hanoi/crear']);
    } else if (codigo === "J00002") {
      this.router.navigate(['/ahorcado/crear']);
    } else if (codigo === 'J00003') {
      this.router.navigate(['/crusigrama/crear']);
    } else if (codigo === 'J00004') {
      this.router.navigate(['/sopa/crear']);
    } else {
      this.router.navigate(['/principal'])
    }
  }

  cargarJuegos() {
    this.principalService.obtenerJuegos()
      .subscribe({
        next: (result: any) => {
          this.juegos = result;
        },
        error: (error: any) => {
          Swal.fire({
            title: 'Error',
            text: 'Parece que nuestros servidores no funcionan, intentalo mas tarde',
            icon: 'error',
            confirmButtonText: 'Salir'
          });
        }
      });
  }
}
