import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { SesionService } from 'src/app/services/sesion.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]]
  })

  constructor(private fb: FormBuilder, private router: Router, private toast: NgToastService, private authService: AuthService, private sesionService: SesionService) { }

  ngOnInit(): void {
    localStorage.removeItem("carrito");
  }

  /**
   * Comprueba si un campo tiene errores
   * @param campo El campo del formulario
   * @returns Si hay errores
   */
  campoValido(campo: string) {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched
  }

  /**
   * Obtiene los datos del formulario y llama al servicio para obtener un usuario.
   * Si encuentra un usuario, lo guarda en el LocalStorage
   * @returns 
   */
  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    } else {
      let { username, password } = this.miFormulario.value;
      const body = {
        username,
        password
      }
      this.authService.login(body)
        .subscribe({
          next: (result: any) => {
            this.sesionService.iniciarSesion(result.usuario.username, result.usuario.rol);
            this.toast.success({ detail: result.mensaje, summary: "Ingreso correcto", duration: 2000 });
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 0);
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error.error
            })
          }
        });
    }
  }

}
