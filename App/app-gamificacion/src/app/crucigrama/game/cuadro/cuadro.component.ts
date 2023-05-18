import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Cuadro } from '../../models/Cuadro';
import { Crusigrama } from '../../models/Crusigrama';

@Component({
  selector: 'app-cuadro',
  templateUrl: './cuadro.component.html',
  styleUrls: ['./cuadro.component.css']
})
export class CuadroComponent implements OnInit {
  @ViewChild('miInput', { static: false }) miInput!: ElementRef;
  @Input() cuadro!: Cuadro;
  @Input() modeloCrucigrama!: Crusigrama;
  letra: string = "";

  constructor() { }

  ngOnInit() {
    this.letra = this.cuadro.getLetra();
  }

  setInicio() {
    if (!(this.cuadro.getLetra() === "")) {
      let cordenadas = this.cuadro.getCordenada();
      let arriba: Cuadro = this.modeloCrucigrama.getSiguienteArriba(cordenadas.x, cordenadas.y);
      let abajo: Cuadro = this.modeloCrucigrama.getSiguienteAbajo(cordenadas.x, cordenadas.y);
      let izquierda: Cuadro = this.modeloCrucigrama.getSiguienteIzquierda(cordenadas.x, cordenadas.y);
      let derecha: Cuadro = this.modeloCrucigrama.getSiguienteDerecha(cordenadas.x, cordenadas.y);
      console.log('Arriba Abajo Izquierda Derecha');
      console.log(arriba, abajo, izquierda, derecha);

      let up = (arriba !== null ? (arriba.getLetra() !== "" ? true : false) : false);
      let down = (abajo !== null ? (abajo.getLetra() !== "" ? true : false) : false);
      let left = (izquierda !== null ? (izquierda.getLetra() !== "" ? true : false) : false);
      let rigth = (derecha !== null ? (derecha.getLetra() !== "" ? true : false) : false);

      console.log('Arriba Abajo Izquierda Derecha -> bool');
      console.log(up, down, left, rigth);

      if ((rigth && !left) || (!up && down)) {
        if ((!up && down && !rigth && left) || (!up && down && rigth && left)) {
          if (this.modeloCrucigrama.verificacionIzquierda(this.cuadro)) {
            this.cuadro.setInicio(!this.cuadro.getInicio());
          } else {
            alert('No pueden existir palabras alreves hacia la izquierda');
          }
        } else if ((up && !down && rigth && !left) || (up && down && rigth && !left)) {
          if (this.modeloCrucigrama.verificacionArriba(this.cuadro)) {
            this.cuadro.setInicio(!this.cuadro.getInicio());
          } else {
            alert('No pueden existir palabras alreves hacia arriba');
          }
        } else {
          this.cuadro.setInicio(!this.cuadro.getInicio());
        }
      } else {
        if (!up && !down && !left && !rigth) {
          alert('La casilla debe tener otra letra almenos en un lado');
        } else if (up && down && left && rigth) {
          alert('La casilla no debe estar rodeada por los cuatro lados');
        } else if ((!down && rigth && left) || (up && down && !rigth && !left)) {
          alert('La casilla no debe estar en medio de otra palabra');
        } else if (!up && !down && !rigth && left) {
          alert('No pueden existir palabras alreves hacia la izquierda');
        } else if (up && !down && !rigth && !left) {
          alert('No pueden existir palabras alreves hacia arriba');
        } else if ((up && !down && !rigth && left) || (up && down && !rigth && left)) {
          alert('No pueden existir palabras alreves hacia la izquierda o hacia arriba');
        }
      }

    } else {
      alert('Debe contener un letra para establecer esta casilla como inicio')
    }
  }

  valorCambio(event: any) {
    const caracteresPermitidos = /^[a-zA-ZñÑ]$/;
    const teclaPresionada = String.fromCharCode(event.keyCode);
    if (!caracteresPermitidos.test(teclaPresionada)) {
      event.preventDefault();
    }
  }
  asignarValor() {
    if (!this.modeloCrucigrama.isInitCreate()) {
      this.cuadro.setLetra(this.letra);
      this.modeloCrucigrama.setInitCreate(true);
      console.log(this.cuadro);
    } else {
      let cordenadas = this.cuadro.getCordenada();
      let arriba: Cuadro = this.modeloCrucigrama.getSiguienteArriba(cordenadas.x, cordenadas.y);
      let abajo: Cuadro = this.modeloCrucigrama.getSiguienteAbajo(cordenadas.x, cordenadas.y);
      let izquierda: Cuadro = this.modeloCrucigrama.getSiguienteIzquierda(cordenadas.x, cordenadas.y);
      let derecha: Cuadro = this.modeloCrucigrama.getSiguienteDerecha(cordenadas.x, cordenadas.y);
      console.log('Arriba Abajo Izquierda Derecha');
      console.log(arriba, abajo, izquierda, derecha);

      let up = (arriba !== null ? (arriba.getLetra() !== "" ? true : false) : false);
      let down = (abajo !== null ? (abajo.getLetra() !== "" ? true : false) : false);
      let left = (izquierda !== null ? (izquierda.getLetra() !== "" ? true : false) : false);
      let rigth = (derecha !== null ? (derecha.getLetra() !== "" ? true : false) : false);

      console.log('Arriba Abajo Izquierda Derecha -> bool');
      console.log(up, down, left, rigth);

      if (up || down || left || rigth) {
        this.cuadro.setLetra(this.letra);
        console.log(this.cuadro);
      } else {
        this.letra = "";
        this.miInput.nativeElement.value = '';
        console.log(this.modeloCrucigrama);
        alert('Para agregar una nueva letra, esta casilla debe de tener por lo menos una casilla vecina con letra');
        
      }

    }
  }

  seleccionarTexto(input: any) {
    input.select();
  }
}
