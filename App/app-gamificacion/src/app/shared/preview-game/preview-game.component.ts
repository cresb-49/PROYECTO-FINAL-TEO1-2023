import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ComentariosService } from './services/comentarios.service';
import { Comentario } from './model/Comentario';
import { MeGustaService } from './services/megusta.service';
import { MeGusta } from './model/MeGusta';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-preview-game',
  templateUrl: './preview-game.component.html',
  styleUrls: ['./preview-game.component.css']
})
export class PreviewGameComponent implements OnInit {
  @Input() juego: string | null = null;
  @Input() desc = 'Descripcion default del componenete asignamos el valor al input desc';
  @Input() infoLike = null;
  @Input() likeUsuario = null;
  @Input() comentarioUsuario: string = "";
  @Input() comentarios: Comentario[] = []

  cantidadLikes: number = 0;
  cantidadDislikes: number = 0;

  constructor(private comentariosService: ComentariosService, private meGustaService: MeGustaService, private formsModule: FormsModule, private toast: NgToastService) { }
  ngOnInit(): void {
    this.actualizarComentarios();
    this.actualizarMeGustaUsuario();
    this.obtenerMegustaNoMegusta();
  }

  /**
   * Ejecuta la logica del Me Gusta
  */
  onMeGusta(estado: boolean) {
    //Se comprueba si se esta logeado, si no, se envia una alerta y se retorna
    if (localStorage.getItem("usuario") === null || localStorage.getItem("usuario") === undefined) {
      Swal.fire({
        icon: 'warning',
        title: 'Me Gusta',
        text: 'Debes iniciar sesion para dar Me Gusta o No Me Gusta'
      });
      return;
    }

    //Se obtiene el username del usuario logeado
    let username: any = JSON.parse(localStorage.getItem("usuario")!).username

    //Si no se ha dado Like o Dislike al juego se agrega el Like o Dislike al servidor
    if (this.likeUsuario === null) {
      this.meGustaService.publicarMeGusta(new MeGusta(this.juego!, username, estado))
        .subscribe({
          next: (response: any) => {
            this.toast.success({ detail: "Me Gusta", summary: 'Gracias por el ' + (estado ? '' : 'No ') + 'Me Gusta!', duration: 5000 });
            this.cantidadLikes = response.likes;
            this.cantidadDislikes = response.dislikes;
            this.actualizarMeGustaUsuario()
          },
          error: (error: any) => {
            console.log(error)
          }
        })

      //Si se ha dado like previamente y se vuelve a dar like se removera el like
    } else if (this.likeUsuario && estado) {
      this.meGustaService.removerMeGusta(username, this.juego!)
        .subscribe({
          next: (response: any) => {
            this.toast.success({ detail: "Me Gusta", summary: "Se ha quitado el " + (estado ? "" : 'No ') + 'Me Gusta!', duration: 5000 });
            this.cantidadLikes = response.likes;
            this.cantidadDislikes = response.dislikes;
            this.actualizarMeGustaUsuario()
          },
          error: (error: any) => {
            console.log(error)
          }
        })
      //Si se ha dado dislike previamente y se vuelve a dar dislike se removera el dislike
    } else if (!this.likeUsuario && !estado) {
      this.meGustaService.removerMeGusta(username, this.juego!)
        .subscribe({
          next: (response: any) => {
            this.toast.success({ detail: "No Me Gusta", summary: "Se ha quitado el " + (estado ? "" : 'No ') + 'Me Gusta!', duration: 5000 });
            this.cantidadLikes = response.likes;
            this.cantidadDislikes = response.dislikes;
            this.actualizarMeGustaUsuario()
          },
          error: (error: any) => {
            console.log(error)
          }
        })
      //Si se ha dado like o dislike previamente y se da a la opcion contraria se actualizara el estado
    } else if (this.likeUsuario !== estado) {
      this.meGustaService.publicarMeGusta(new MeGusta(this.juego!, username, estado))
        .subscribe({
          next: (response: any) => {
            this.toast.success({ detail: "No Me Gusta", summary: 'Gracias por el ' + (estado ? '' : 'No ') + 'Me Gusta!', duration: 5000 });
            this.cantidadLikes = response.likes;
            this.cantidadDislikes = response.dislikes;
            this.actualizarMeGustaUsuario()
          },
          error: (error: any) => {
            console.log(error)
          }
        })
    }
  }

  estadoMostrarLikes() {
    return this.likeUsuario !== null && this.likeUsuario
  }

  /**
   * Guarda un comentario escrito
  */
  guardarComentario() {
    let username: any = JSON.parse(localStorage.getItem("usuario")!).username
    this.comentariosService.publicarComentario(username, this.comentarioUsuario, this.juego!)
      .subscribe({
        next: (response: any) => {
          this.actualizarComentarios()
          this.comentarioUsuario = ""
        }, error: (error: any) => {
          console.log(error)
        }
      })
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

  /**
   * Actualiza la informacion del like del usuario
  */
  actualizarMeGustaUsuario(): void {
    if (localStorage.getItem("usuario") === null || localStorage.getItem("usuario") === undefined) {
      return;
    }
    let username: any = JSON.parse(localStorage.getItem("usuario")!).username
    let meGustaJugador = this.meGustaService.obtenerMeGusta(username, this.juego!)
      .subscribe({
        next: (meGusta: any) => {
          //El usuario no tiene registrado interaccion
          if (meGusta.like !== null) {
            this.likeUsuario = meGusta.like
          } else {
            this.likeUsuario = null
          }
        },
        error: ((error: any) => {
          console.log(error)
        })
      })
  }
  /**
   * Obtiene el objeto juego base de la base de datos para tener los parametros de la cantidad de likes y no likes
   */
  obtenerMegustaNoMegusta() {
    this.meGustaService.getCantidadMeGustaNoMeGusta(this.juego!).subscribe({
      next: (game: any) => {
        this.cantidadLikes = game.likes;
        this.cantidadDislikes = game.dislikes;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
