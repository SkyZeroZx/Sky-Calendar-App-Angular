import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { startRegistration } from '@simplewebauthn/browser';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/Constants/Constant';
import { AuthService } from 'src/app/services/auth.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hamburguer',
  templateUrl: './hamburguer.component.html',
  styleUrls: ['./hamburguer.component.scss'],
})
export class HamburguerComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private servicios: ServiciosService,
    private toastrService: ToastrService,
    private swPush: SwPush,
  ) {}

  ngOnInit(): void {}

  // Metodo que solicita al usuario habilitar las notificaciones en el navegador
  suscribeToNotifications() {
    console.log('suscribeToNotifications');
    this.swPush
      .requestSubscription({
        serverPublicKey: environment.VAPID_PUBLIC_KEY,
      })
      .then((token) => {
        // Validamos que el usuario de permisos
        console.log('Request Token Subscription');
        this.saveNotification(token);
      })
      .catch((err) => {
        console.log('Error al suscribirse', err);
        // En caso contrario de suceder un error lo notificamos
        this.toastrService.error('Sucedio un error al suscribirse ', 'Error', {
          timeOut: 5000,
        });
      });
  }

  formatSaveToken(token) {
    return { tokenPush: JSON.stringify(token) };
  }
  // Metodo que guarda el token push con el usuario en la base de datos
  saveNotification(token) {
    this.servicios.saveUserNotification(this.formatSaveToken(token)).subscribe({
      next: (res) => {
        // Para el caso de exito de respuesta del servicio saveUserNotification
        if (res.message == Constant.MENSAJE_OK) {
          this.toastrService.success(
            'Las notificaciones fueron habilitadas exitosamente',
            'Exito',
            {
              timeOut: 5000,
            },
          );
        } else {
          this.toastrService.error(
            'Sucedio un error al suscribir sus notificaciones',
            'Error',
            {
              timeOut: 5000,
            },
          );
        }
      },
      error: (err) => {
        // En caso de un error con el servicio lo mostramos
        console.log('Error al suscribir notificaciones saveNotification ', err);
        this.toastrService.error(
          'Sucedio un error al suscribir sus notificaciones ',
          'Error',
          {
            timeOut: 5000,
          },
        );
      },
    });
  }

  // Obtener solicitud de registro de WebAuthn para el usuario desde el servicio
  async getRegistrationAuthnWeb() {
    console.log('Habilitando fingerPrint');
    this.authService.getRegistrationAuthnWeb().subscribe({
      next: async (res) => {
        try {
          // Con la respuesta empezamos el proceso
          const attResp = await startRegistration(res);
          console.log('Registrado despues de responder', attResp);
          // Si todo salio bien se llama al siguiente servicio para registrarlo
          this.registerAuthnWeb(attResp);
        } catch (e) {
          // Validamos en caso el dispositivo fue registrado anteriormente
          if (e.toString().includes('The authenticator was previously registered')) {
            Swal.fire('', 'Su dispositivo ya se encuentra registrado', 'info');
            this.storageUserData();
          } else {
            Swal.fire('Error', 'Algo salio mal al registrarse', 'error');
          }
        }
      },
      error: (err) => {
        console.log('Sucedio un error ', err);
      },
    });
  }


  // Registrar el dispositivo el metodo de verificacion
  registerAuthnWeb(data) {
    this.authService.verifyRegistration(data).subscribe({
      next: async (res) => {
        // Si todo va bien mostramos el mensaje de exito
        console.log('La respuesta register verify registration es ', res);
        Swal.fire('Exito', 'Se registro exitosamente', 'success');
        this.storageUserData();
      },
      error: (_err) => {
        console.log('Error registerAuthnWeb', _err);
        Swal.fire('Error', 'Algo salio mal al registrarse', 'error');
      },
    });
  }

  // Metodo que guarda la informacion en el localStorage del usuario 
  storageUserData(){
    localStorage.setItem('username',JSON.parse(localStorage.getItem("user")).username);
    localStorage.setItem('verified','true');
  }
}
