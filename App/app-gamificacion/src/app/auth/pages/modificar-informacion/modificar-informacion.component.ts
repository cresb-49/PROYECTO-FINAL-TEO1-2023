import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-informacion',
  templateUrl: './modificar-informacion.component.html',
  styleUrls: ['./modificar-informacion.component.css']
})
export class ModificarInformacionComponent {
  usuario: any;
  imagenPerfil: string = "../../assets/imageNotFound.webp";
  MAXIMO_TAMANIO_BYTES = 1000000;

  miFormulario: FormGroup = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.minLength(6)]],
    confirm: ["", [Validators.minLength(6)]],
  })

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const jsonUsuario = localStorage.getItem('usuario');
    if (jsonUsuario) {
      this.usuario = JSON.parse(jsonUsuario)
    }

    this.miFormulario.setValue({
      username: this.usuario.username,
      password: "",
      confirm: ""
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

  guardar() {
    if (this.miFormulario.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "No has llenado todos los campos",
      });
      return;
    } else {
      
      const { confirm, password, username } = this.miFormulario.value;
      if (password != "" && confirm != "") {
        const body = {
          nuevoUsarname: username,
          passwordAnterior: confirm,
          nuevaPassword: password,
          usernameAnterior: this.usuario.username,
          perfil: this.imagenPerfil
        }
        console.log(body);
      } else {
        const body = {
          nuevoUsarname: username,
          usernameAnterior: this.usuario.username,
          perfil: this.imagenPerfil
        }
        console.log(body);
      }
    }
  }
}
