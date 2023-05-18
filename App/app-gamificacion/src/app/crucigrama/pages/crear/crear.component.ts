import { Component } from '@angular/core';
import { Crusigrama } from '../../models/Crusigrama';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  modeloCrusigrama: Crusigrama = new Crusigrama();
  tamY: number = 5;
  tamX: number = 5;

  ngOnInit() {
    console.log(this.modeloCrusigrama);
  }

  cambioSize() {
    this.modeloCrusigrama.setNewSize(this.tamX, this.tamY);
  }

  verificarCrusigrama() {
    let result: Array<any> = this.modeloCrusigrama.verificar();
    if (result.length === 0) {
      //Generacion del juego
      //Calculo de las pistas del juego
      let pistas = this.modeloCrusigrama.calculoPistasJuego();
      console.log(pistas);

    } else {
      //Mostrar los errores  
      console.log(result);
    }
  }
}
