import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { startRegistration } from '@simplewebauthn/browser';
 import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/Constants/Constant';
import { AuthService } from 'src/app/services/auth.service';
import { ServiciosService } from 'src/app/services/servicios.service';
 import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-hamburguer',
  templateUrl: './hamburguer.component.html',
  styleUrls: ['./hamburguer.component.scss'],
})
export class HamburguerComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private servicios :ServiciosService,
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

  async getRegistrationAuthnWeb() {
    console.log('Habilitando fingerPrint');

    this.authService.getRegistrationAuthnWeb().subscribe({
      next: async (res) => {
        let attResp;
        console.log('Retorne Changelle Fingerprint', res);
        attResp = await startRegistration(res);
        console.log('Registrado despues de responder', attResp);
        this.registerAuthnWeb(attResp);
      },
      error: (err) => {
        console.log('Sucedio un error ', err);
      },
    });
  }

  registerAuthnWeb(data) {
    this.authService.verifyRegistration(data).subscribe({
      next: async (res) => {
        console.log('La respuesta register verify registration es ', res);
      },
      error: (err) => {
        console.log('Error es ', err);
      },
    });
  }

}
