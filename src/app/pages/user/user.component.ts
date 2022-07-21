import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { SwPush } from "@angular/service-worker";
import { startRegistration } from "@simplewebauthn/browser";
import { ToastrService } from "ngx-toastr";
import { Constant } from "src/app/Constants/Constant";
import { AuthService } from "src/app/services/auth/auth.service";
import { ThemeService } from "src/app/services/theme/theme.service";
import { UserService } from "src/app/services/users/user.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private fb: FormBuilder,
    private swPush: SwPush,
    private authService: AuthService,
    private toastrService: ToastrService,
    private userService: UserService,
    private router: Router
  ) {
    this.userTheme.setValue(this.darkTheme);
    this.userNavBar.setValue(this.navBarPosition);
  }

  darkTheme: boolean = this.themeService.getLocalStorageItem("darkTheme");
  navBarPosition: boolean = this.themeService.getLocalStorageItem("navBar");
  fingerPrint: boolean = this.themeService.getLocalStorageItem("verified");
  notificacionesEnabled: boolean =
    this.themeService.getLocalStorageItem("notificaciones");

  userTheme: FormControl = new FormControl(this.themeService.darkTheme);
  userNavBar: FormControl = new FormControl(this.themeService.navBarPosition);
  userFingerPrint: FormControl = new FormControl(this.fingerPrint);
  notificacionesControl: FormControl = new FormControl(
    this.notificacionesEnabled
  );

  userStorage = JSON.parse(localStorage.getItem("user"));
  userProfileForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.createUserProfileForm();
    this.suscribeChange();
  }

  createUserProfileForm() {
    this.userProfileForm = this.fb.group({
      id: this.userStorage.id,
      username: this.userStorage.username,
      nombre: new FormControl(
        this.userStorage.nombre,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(80),
          Validators.pattern("[A-Za-z ]+"),
        ])
      ),
      role: new FormControl(this.authService.getItemToken("role")),
      estado: "HABILITADO",
      apellidoMaterno: new FormControl(
        this.userStorage.apellidoMaterno,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern("[A-Za-z ]+"),
        ])
      ),
      apellidoPaterno: new FormControl(
        this.userStorage.apellidoPaterno,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
          Validators.pattern("[A-Za-z ]+"),
        ])
      ),
      createAt: this.userStorage.createAt,
      updateAt: this.userStorage.updateAt,
    });
  }

  // Nos suscribimos a nuestros formControls para escuchar los valores de los eventos y ejecutar segun sea necesario
  suscribeChange() {
    this.userTheme.valueChanges.subscribe((res) => {
      console.log("Change Theme ", res);

      this.themeService.setTheme(res);
    });

    this.userNavBar.valueChanges.subscribe((res) => {
      console.log("Change userNavBar ", res);
      this.themeService.setNavBar(res);
    });

    this.userFingerPrint.valueChanges.subscribe((res) => {
      if (res) {
        this.getRegistrationAuthnWeb();
      } else {
        this.disableFingerPrint();
      }

      localStorage.setItem("verified", res);
    });

    this.notificacionesControl.valueChanges.subscribe((res) => {
      console.log("Change notificacionesControl ", res);
      if (res) {
        this.suscribeToNotifications();
        localStorage.setItem("notificaciones", "true");
      } else {
        localStorage.setItem("notificaciones", "false");
      }
    });
  }

  // Metodo que solicita al usuario habilitar las notificaciones en el navegador
  suscribeToNotifications() {
    console.log("suscribeToNotifications");
    this.swPush
      .requestSubscription({
        serverPublicKey: environment.VAPID_PUBLIC_KEY,
      })
      .then((token) => {
        // Validamos que el usuario de permisos
        console.log("Request Token Subscription");
        this.saveNotification(token);
      })
      .catch((err) => {
        console.log("Error al suscribirse", err);
        this.disableNotificaciones();
        // En caso contrario de suceder un error lo notificamos
        this.toastrService.error("Sucedio un error al suscribirse ", "Error");
      });
  }

  disableNotificaciones() {
    this.notificacionesControl.setValue(false, { emitEvent: false });
    localStorage.setItem("notificaciones", "false");
  }

  formatSaveToken(token) {
    return { tokenPush: JSON.stringify(token) };
  }

  // Metodo que guarda el token push con el usuario en la base de datos
  saveNotification(token) {
    this.userService
      .saveUserNotification(this.formatSaveToken(token))
      .subscribe({
        next: (res) => {
          // Para el caso de exito de respuesta del servicio saveUserNotification
          if (res.message == Constant.MENSAJE_OK) {
            this.toastrService.success(
              "Las notificaciones fueron habilitadas exitosamente",
              "Exito"
            );
          } else {
            this.disableNotificaciones();
            this.toastrService.error(
              "Sucedio un error al suscribir sus notificaciones",
              "Error"
            );
          }
        },
        error: (err) => {
          // En caso de un error con el servicio lo mostramos
          console.log(
            "Error al suscribir notificaciones saveNotification ",
            err
          );
          this.disableNotificaciones();
          this.toastrService.error(
            "Sucedio un error al suscribir sus notificaciones ",
            "Error"
          );
        },
      });
  }

  disableFingerPrint() {
    this.userFingerPrint.setValue(false, { emitEvent: false });
    localStorage.setItem("verified", "false");
  }

  // Obtener solicitud de registro de WebAuthn para el usuario desde el servicio
  async getRegistrationAuthnWeb() {
    console.log("Habilitando fingerPrint");
    this.authService.getRegistrationAuthnWeb().subscribe({
      next: async (res) => {
        try {
          // Con la respuesta empezamos el proceso
          const attResp = await startRegistration(res);
          console.log("Registrado despues de responder", attResp);
          // Si todo salio bien se llama al siguiente servicio para registrarlo
          this.registerAuthnWeb(attResp);
        } catch (e) {
          // Validamos en caso el dispositivo fue registrado anteriormente
          if (
            e.toString().includes("The authenticator was previously registered")
          ) {
            Swal.fire("", "Su dispositivo ya se encuentra registrado", "info");
            this.storageUserData();
          } else {
            this.disableFingerPrint();
            Swal.fire("Error", "Algo salio mal al registrarse", "error");
          }
        }
      },
      error: (_err) => {
        this.disableFingerPrint();
        console.log("Sucedio un error ", _err);
      },
    });
  }

  // Registrar el dispositivo el metodo de verificacion
  registerAuthnWeb(data) {
    this.authService.verifyRegistration(data).subscribe({
      next: async (res) => {
        // Si todo va bien mostramos el mensaje de exito
        console.log("La respuesta register verify registration es ", res);
        Swal.fire("Exito", "Se registro exitosamente", "success");
        this.storageUserData();
      },
      error: (_err) => {
        this.disableFingerPrint();
        console.log("Error registerAuthnWeb", _err);
        Swal.fire("Error", "Algo salio mal al registrarse", "error");
      },
    });
  }

  // Metodo que guarda la informacion en el localStorage del usuario
  storageUserData() {
    localStorage.setItem(
      "username",
      JSON.parse(localStorage.getItem("user")).username
    );
    localStorage.setItem("verified", "true");
  }

  onLogout() {
    Swal.fire({
      title: "Va cerrar sesión",
      text: "¿Esta seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(["/login"]);
        localStorage.removeItem("user");
      }
    });
  }

  actualizarPerfil() {
    this.userService.updateUser(this.userProfileForm.value).subscribe({
      next: (res) => {
        if (res.message == Constant.MENSAJE_OK) {
          this.toastrService.success(
            "Se actualizo exitosamente su perfil",
            "Exito"
          );
        } else {
          this.toastrService.error(
            "Sucedio un error al actualizar su perfil",
            "Error"
          );
        }
      },
      error: (_err) => {
        this.toastrService.error("Error al actualizar su perfil ", "Error");
      },
    });
  }
}
