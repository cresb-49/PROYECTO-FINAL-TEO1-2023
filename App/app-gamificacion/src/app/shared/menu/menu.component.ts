import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  usuario: any;

  nombre = () => {
    if(this.usuario){
      return this.usuario.username;
    } else {
      return 'Guest';
    }
  }

  constructor(private router: Router){}

  ngOnInit(): void {
    const jsonUsuario = localStorage.getItem("usuario");
    if(jsonUsuario){
      this.usuario = JSON.parse(jsonUsuario);
    }
  }


  inicio(){
    this.router.navigate(["/principal"]);
  }

  login(){
    this.router.navigate(["/auth/login"]);
  } 

  salir(){
    this.router.navigate(['/principal'])
    localStorage.removeItem("usuario");
    this.usuario = null;
  }
}
