import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion-usuario',
  templateUrl: './informacion-usuario.component.html',
  styleUrls: ['./informacion-usuario.component.css']
})
export class InformacionUsuarioComponent implements OnInit{

  usuario:any

  constructor(private router:Router){

  }

  ngOnInit(): void {
    const jsonUser = localStorage.getItem('usuario');
    if(jsonUser){
      this.usuario = JSON.parse(jsonUser)
    }
  }

  modificarInformacion(){
    this.router.navigate(["/auth/modificar"])
  }


}
