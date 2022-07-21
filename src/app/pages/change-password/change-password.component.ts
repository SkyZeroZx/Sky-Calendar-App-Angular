import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Constant } from "src/app/Constants/Constant";
import { AuthService } from "src/app/services/auth/auth.service";
import { ThemeService } from "src/app/services/theme/theme.service";
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private themeService: ThemeService
  ) {}
  darkTheme: boolean = this.themeService.getLocalStorageItem("darkTheme");

  changePasswordForm: FormGroup;
  //Variable booleana para validacion de password el cambio de contraseña (OldPassword & NewPassword)
  diferent: boolean = false;
  // Arreglo de variables booleanas para mostrar el password segun se requiera
  show_button: boolean[] = [false, false, false];
  show_eye: boolean[] = [false, false, false];

  //Inicializamos el formulario al renderizar el componente
  ngOnInit() {
    this.crearFormChangePassword();
  }

  // Creamos el formulario changePassword
  crearFormChangePassword() {
    // Asignamos las validaciones al formulario
    this.changePasswordForm = this.fb.group({
      oldPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      newPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmedPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onChangePassword() {
    this.diferent = false;
    if (
      this.changePasswordForm.value.newPassword !==
      this.changePasswordForm.value.confirmedPassword
    ) {
      this.diferent = true;
      return;
    }

    this.authService.changePassword(this.changePasswordForm.value).subscribe({
      next: (res) => {
        if (res.message == Constant.MENSAJE_OK) {
          if (this.authService.getItemToken("firstLogin")) {
            this.authService.logout();
            this.router.navigate(["/login"]);
            this.toastrService.success(
              "Se cambio con exitosa la contraseña",
              "Exito"
            );
          } else {
            this.toastrService.success(
              "Se cambio con exitosa la contraseña",
              "Exito"
            );
            switch (this.authService.getItemToken("role")) {
              case "admin":
                this.router.navigate(["/calendar-admin"]);
                break;
              case "viewer":
                this.router.navigate(["/calendar-view"]);
                break;
              default:
                break;
            }
          }
        } else {
          this.toastrService.error(res.message, "Error");
        }
      },
      error: (err) => {
        this.toastrService.error("Error al cambiar contraseña ", "Error");
      },
    });
  }

  retrocederFirstLogin() {
    if (this.authService.getItemToken("firstLogin")) {
      this.authService.logout();
      this.router.navigate(["/login"]);
    } else {
      switch (this.authService.getItemToken("role")) {
        case "admin":
          this.router.navigate(["/calendar-admin"]);
          break;
        case "viewer":
          this.router.navigate(["/calendar-view"]);
          break;
        default:
          break;
      }
    }
  }
}
