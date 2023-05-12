import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit{

  partidasJugadas: any[] = [];

  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.authService.obtenerUsuario();
    const usuario = this.authService.getUsuario();
    console.log(usuario.username);
    this.authService.obtenerPartidasPorJuego(usuario.username)
      .subscribe({
        next: (result: any) => {
          this.partidasJugadas = result;
        }
      });

  }

}

