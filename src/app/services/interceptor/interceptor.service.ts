import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { SpinnerService } from "./spinner.service";

@Injectable({
  providedIn: "root",
})
export class InterceptorService {
  constructor(
    private spinnerService: SpinnerService,
    private auth: AuthService
  ) {}
  // Servicio para interceptar llamas HTTP para llamar al spinner de carga asi como envio de token en las cabeceras
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.llamarSpinner();
    if (!req.url.includes("auth/login")) {
      const userValue = this.auth.userValue;
      if (userValue !== null) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: "Bearer " + userValue.token,
          },
        });
        return next.handle(authReq).pipe(
          finalize(() => {
            this.spinnerService.detenerSpinner();
          })
        );
      }
    }
    return next.handle(req).pipe(
      finalize(() => {
        this.spinnerService.detenerSpinner();
      })
    );
  }
}
