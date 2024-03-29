import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, catchError, throwError } from "rxjs";
import {
  UserResponse,
  UserLogin,
  ChangePassword,
  ChangePasswordRes,
} from "src/app/entities/user";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();
@Injectable({
  providedIn: "root",
})
export class AuthService {
  // Servicio de autenticacion
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<UserResponse>(null);

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  get user$(): Observable<UserResponse> {
    return this.user.asObservable();
  }

  get userValue(): UserResponse {
    return this.user.getValue();
  }

  login(authData: UserLogin): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
      .pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user);
          this.user.next(user);
          return user;
        })
      );
  }

  changePassword(authPassword: ChangePassword): Observable<ChangePasswordRes> {
    return this.http
      .post<ChangePasswordRes>(
        `${environment.API_URL}/auth/change-password`,
        authPassword
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  /********************** SERVICIOS FINGERPRINT **************************** */
  getRegistrationAuthnWeb() {
    return this.http.get<any>(
      `${environment.API_URL}/auth/generate-registration-options`
    );
  }

  verifyRegistration(data) {
    return this.http.post<any>(
      `${environment.API_URL}/auth/verify-registration`,
      data
    );
  }

  startAuthentication(username: string) {
    return this.http.post<any>(
      `${environment.API_URL}/auth/generate-authentication-options`,
      { username }
    );
  }
  verifityAuthentication(data) {
    return this.http
      .post<any>(`${environment.API_URL}/auth/verify-authentication`, data)
      .pipe(
        map((user) => {
          this.saveLocalStorage(user.data);
          this.user.next(user.data);
          return user;
        })
      );
  }

  /********************** UTILITARIOS  **************************** */

  logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("user");
    this.user.next(null);
    this.loggedIn.next(false);
  }

  getItemToken(item: string) {
    return helper.decodeToken(JSON.parse(localStorage.getItem("user")).token)[
      item
    ];
  }

  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem("user")) || null;

    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      } else {
        this.user.next(user);
      }
    }
  }

  private saveLocalStorage(user: UserResponse): void {
    const { userId, message, role, ...rest } = user;
    localStorage.setItem("user", JSON.stringify(rest));
  }
}
