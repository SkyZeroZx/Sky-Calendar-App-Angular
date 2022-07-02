import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { startAuthentication } from '@simplewebauthn/browser';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/Constants/Constant';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  show_button: boolean = false;
  show_eye: boolean = false;
  userStorage: string = localStorage.getItem('username');
  enableFingerPrint: boolean = (localStorage.getItem('verified')  == null || localStorage.getItem('verified')  == 'null' ) ? true : false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
  ) {}

  //Al renderizar componente creamos el formulario
  ngOnInit() {
    localStorage.removeItem('user');
    this.crearFormularioLogin();
    this.loginForm.controls.username.setValue(
      this.userStorage == null ? '' : this.userStorage,
    );
  }

  //Funcion que muestra password al usuario
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }

  //Creamos nuestro reactiveForm para Login
  crearFormularioLogin() {
    //Creamos validaciones respectiva para nuestro ReactiveForm
    this.loginForm = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  // Llamada al servicio Login
  onLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        // Segun response realizamos una accion
        if (res.message == Constant.MENSAJE_OK) {
          this.validateLogin(res);
        } else {
          this.toastrService.error(res.message, 'Error', {
            timeOut: 3000,
          });
        }
      },
      error: (err) => {
        //En caso de error
        //   console.log("Error en onLogin ", err);
        this.toastrService.error('Error al logearse' + err, 'Error', {
          timeOut: 3000,
        });
      },
    });
  }

  validateLogin(res) {
    if (res.firstLogin) {
      // Es tu primer login modal debes cambiar tu contraseña aceptar o rechazar
      this.alertFirstLogin();
    } else {
      if (this.loginForm.value.username !== this.userStorage) {
        localStorage.setItem('verified', 'null');
      }
      localStorage.setItem('username', this.loginForm.value.username);
      if (res.role == 'admin') {
        this.router.navigate(['/calendar-admin']);
      } else {
        this.router.navigate(['/calendar-view']);
      }
    }
  }

  // Alerta de advertencia al ser primerlogin
  alertFirstLogin() {
    Swal.fire({
      title: 'Es su primer login',
      text: 'Se recomienda cambiar su contraseña',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Caso de aceptar se redirije a change-password
        this.router.navigate(['/change-password']);
      } else {
        // En caso contrario limpiamos localstorage
        localStorage.removeItem('user');
      }
    });
  }

  async startAuthentication() {
    this.authService.startAuthentication(this.userStorage).subscribe({
      next: async (res) => {
        try {
          const asseRep = await startAuthentication(await res);
          Object.assign(asseRep, { username: this.userStorage });
          this.verifityAuthentication(asseRep);
        } catch (err) {
          this.toastrService.error('Sucedio un error al intentar autenticarse', 'Error', {
            timeOut: 3000,
          });
        }
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al intentar autenticarse', 'Error', {
          timeOut: 3000,
        });
      },
    });
  }

  verifityAuthentication(data) {
    console.log('Envie desde Angular', data);
    this.authService.verifityAuthentication(data).subscribe({
      next: (res) => {
        console.log('Autentificacion OK', res);
        if (res.verified) {
          this.validateLogin(res.data);
        } else {
          this.toastrService.error('Error al logearse', 'Error', {
            timeOut: 3000,
          });
        }
      },
      error: (_err) => {
        console.log('Error al logearme ', _err);
        this.toastrService.error('Error al logearse', 'Error', {
          timeOut: 3000,
        });
      },
    });
  }
}
