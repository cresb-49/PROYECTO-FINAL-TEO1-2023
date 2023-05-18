import { Component } from '@angular/core';
import { Crusigrama } from '../../models/Crusigrama';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { Cuadro } from '../../models/Cuadro';
import { Pista } from '../../models/Pistas';
import { Data } from '../../models/Data';
import { Entrada } from '../../models/Entrada';
import { SesionService } from 'src/app/services/sesion.service';
import { CrucigramaService } from '../../services/crucigrama.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  modeloCrusigrama: Crusigrama = new Crusigrama();
  tamY: number = 5;
  tamX: number = 5;
  validado: boolean = false;

  tmpCuadro: Cuadro = new Cuadro();

  pistasV: Array<Pista> = [];
  pistasH: Array<Pista> = [];

  errores: boolean = false;
  errors: Array<any> = [];


  constructor(private router: Router, private sesionServide: SesionService, private crucigramaService: CrucigramaService) { }

  ngOnInit() {
    this.tmpCuadro.setLetra('p');
    console.log(this.modeloCrusigrama);
  }

  cambioSize() {
    this.modeloCrusigrama.setNewSize(this.tamX, this.tamY);
  }

  verificarCrusigrama() {
    this.errors = this.modeloCrusigrama.verificar();
    if (this.errors.length === 0) {
      Swal.fire({
        icon: 'success',
        title: 'Crusigrama Verificado',
        text: 'Ahora puede introducir las pistas del juego',
        showConfirmButton: true
      });
      let pistas = this.modeloCrusigrama.calculoPistasJuego();
      this.validado = true;
      for (let v = 1; v < pistas.numPistas.numV; v++) {
        this.pistasV.push(new Pista("", v, 'Vertical'));
      }
      for (let h = 1; h < pistas.numPistas.numH; h++) {
        this.pistasH.push(new Pista("", h, 'Horizontal'));
      }
      console.log(this.pistasH);
      console.log(this.pistasV);
      this.errores = false;

    } else {
      //Mostrar los errores  
      console.log(this.errors);
      this.errores = true;
    }
  }

  registroFinalCrusigrama() {
    let matriz: Array<Array<Entrada>> = [];
    for (const fila of this.modeloCrusigrama.getMatriz()) {
      let fila2: Array<Entrada> = [];
      for (const cuadro of fila) {
        fila2.push(new Entrada(cuadro.getInicio(), cuadro.getLetra(), "", cuadro.getNumeroH(), cuadro.getNumeroV(), cuadro.getCordenada()));
      }
      matriz.push(fila2);
    }
    let data: Data = new Data(matriz, this.pistasH, this.pistasV);
    const body = {
      juego: "J00003",
      usuario: this.sesionServide.obtenerUsername(),
      data: data
    }
    console.log(body);
    this.crucigramaService.registrarPartida(body).subscribe({
      next: (result: any) => {
        if (result) {
          Swal.fire({
            icon: 'success',
            title: 'Juego Creado',
            text: `El codigo del juego es: ${result.codigo}`
          });
        }
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error
        });
      },
      complete: () => {
        this.router.navigate(["/crucigrama/principal"]);
      }
    });
  }
}
