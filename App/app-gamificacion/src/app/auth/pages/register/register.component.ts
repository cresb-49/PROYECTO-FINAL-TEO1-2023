import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    rol: ["", [Validators.required]],
  })

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

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

  confirmarPassword() {
    return !(this.miFormulario.value.password === this.miFormulario.value.confirm)
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
      let { username, password, rol } = this.miFormulario.value;
      const body = {
        username,
        password,
        rol
      }
      this.authService.register(body)
        .subscribe({
          next: (result: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario creado',
              text: result.mensaje
            });
            this.miFormulario.reset();
            this.router.navigate(['/auth/login']);
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al crear usuario',
              text: error.error.error
            })
          }
        });
    }
  }
}
