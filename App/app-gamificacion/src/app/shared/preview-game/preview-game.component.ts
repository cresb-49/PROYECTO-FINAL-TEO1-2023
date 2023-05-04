import { Component, Input, OnInit } from '@angular/core';
import { ComentariosService } from './services/comentarios.service';
import { Comentario } from './model/Comentario';
import { MeGustaService } from './services/megusta.service';

@Component({
  selector: 'app-preview-game',
  templateUrl: './preview-game.component.html',
  styleUrls: ['./preview-game.component.css']
})
export class PreviewGameComponent implements OnInit {
  //0 -> hanoi , 1-> ahorcado , 2-> crucigrama
  @Input() imagen = 0;
  @Input() juego: string | null = null;
  @Input() desc = 'Descripcion default del componenete asignamos el valor al input desc';
  @Input() infoLike = null;
  @Input() comentarios: Comentario[] = []

  constructor(private comentariosService: ComentariosService, private meGustaService: MeGustaService) { }
  ngOnInit(): void {
    this.actualizarComentarios()
  }

  /**
   * Ejecuta la logica del Me Gusta
   */
  onMeGusta() {
    let username: any = JSON.parse(localStorage.getItem("usuario")!).username
    alert("me gusta de: " + username)
    let meGustaJugador = this.meGustaService.obtenerMeGusta(username, this.juego!)
      .subscribe({
        next: (meGusta: any) => {
          console.log("me gusta obtenido")
          console.log(meGusta)
        },
        error: ((error: any) => {
          console.log(error)
        })
      })
    console.log(meGustaJugador)
  }

  /**
   * Ejecuta la logica del No Me gusta
   */
  onNoMeGusta() {
    alert("no me gusta")
  }

  /**
   * Guarda un comentario escrito
   */
  guardarComentario() {

  }

  /**
   * Actualiza los comentarios del juego
   */
  actualizarComentarios(): void {
    this.comentariosService.obtenerComentarios(this.juego!)
      .subscribe({
        next: (comentarios: Comentario[]) => {
          this.comentarios = comentarios;
        }, error: ((error: any) => {
          console.log(error);
        })
      }
      );
  }
}
