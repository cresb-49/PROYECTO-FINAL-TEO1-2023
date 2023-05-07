import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-modificar-informacion',
  templateUrl: './modificar-informacion.component.html',
  styleUrls: ['./modificar-informacion.component.css']
})
export class ModificarInformacionComponent {
  usuario: any;
  imagenPerfil: string = "../../assets/imageNotFound.webp";
  MAXIMO_TAMANIO_BYTES = 1000000;
  hiddenInfo: boolean = false;
  hiddenPass: boolean = true;


  miFormulario: FormGroup = this.fb.group({
    username: ["", [Validators.required]]
  });

  miFormularioPass: FormGroup = this.fb.group({
    password: ["", [Validators.minLength(6), Validators.required]],
    confirm: ["", [Validators.minLength(6), Validators.required]],
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const jsonUsuario = localStorage.getItem('usuario');
    if (jsonUsuario) {
      this.usuario = JSON.parse(jsonUsuario)
    }

    this.miFormulario.setValue({
      username: this.usuario.username
    });

    if (this.usuario.perfil) {
      this.imagenPerfil = this.usuario.perfil
    }
  }

  onChange(event: any) {
    try {
      const file: File = event.target.files[0];
      const reader = new FileReader();
      if (file?.size > this.MAXIMO_TAMANIO_BYTES) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La imagen es muy pesada, busca alguna que pese menos de 1MB',
        });
      } else {
        reader.onload = (e: any) => {
          const base64Image = e.target.result;
          this.imagenPerfil = base64Image;
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      this.imagenPerfil = "../../assets/imageNotFound.webp";
    }
  }

  cambiarHidden() {
    this.hiddenInfo = !this.hiddenInfo;
    this.hiddenPass = !this.hiddenPass;
  }

  guardar() {
    if (this.miFormulario.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "No has llenado todos los campos",
      });
      return;
    } else {
      const { username } = this.miFormulario.value;
      const body = {
        nuevoUsername: username,
        usernameActual: this.usuario.username,
        perfil: this.imagenPerfil
      }
      this.authService.modificar(body)
        .subscribe({
          next: (result: any) => {
            if (result.modifiedCount == 1) {
              Swal.fire({
                icon: 'success',
                title: 'Se modificaron tus datos',
                text: "Tus datos han sido modificados correctamente",
                showConfirmButton: false,
                timer: 1500
              });
              this.usuario.username = username;;
              this.usuario.perfil = this.imagenPerfil;
              localStorage.setItem("usuario", JSON.stringify(this.usuario));
              setTimeout(() => {
                window.location.reload();
              }, 1500)
            }
          },
          error: (error: any) => { console.log(error); }
        });
    }
  }
  modificarPassword() {
    if (this.miFormularioPass.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "No has llenado todos los campos. Recueda que el minimo de caracteres es de 6",
      });
      return;
    } else {
      const { confirm, password } = this.miFormularioPass.value;
      const body = {
        passwordActual: confirm,
        nuevaPassword: password,
        username: this.usuario.username,
      }

      if (confirm === password) {
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          text: "Las contraseñas son iguales",
        });
      } else {
        this.authService.modificarPassword(body)
          .subscribe({
            next: (result: any) => {
              if (result.modifiedCount == 1) {
                Swal.fire({
                  icon: 'success',
                  title: 'Constraseña modificada'
                });
              }
            },
            error: (error: any) => { console.log(error); }
          });
      }
    }
  }
}
