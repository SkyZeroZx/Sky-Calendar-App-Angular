import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UserUpdate, IUser } from 'src/app/entities/user';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }


  /* **************************** SERVICIOS GESTION USUARIOS **************************************** */
  resetPassword(username): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/auth/reset-password`, username)
      .pipe(catchError(this.handlerError));
  }

  updateUser(user: UserUpdate): Observable<any> {
    return this.http
      .patch(`${environment.API_URL}/users`, user)
      .pipe(catchError(this.handlerError));
  }

  deleteUser(id): Observable<any> {
    console.log('id', id);
    return this.http
      .delete<any>(`${environment.API_URL}/users`, {
        body: {
          id: id,
        },
      })
      .pipe(catchError(this.handlerError));
  }

  createUser(user: UserUpdate): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/users`, user)
      .pipe(catchError(this.handlerError));
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http
      .get<any>(`${environment.API_URL}/users`)
      .pipe(catchError(this.handlerError));
  }



  saveUserNotification(data): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/notificacion`, data)
      .pipe(catchError(this.handlerError));
  }

  sendNotification(data): Observable<any> {
    console.log('Estoy enviando en sendNotification ', data);
    return this.http
      .post<any>(`${environment.API_URL}/notificacion/send`, data)
      .pipe(catchError(this.handlerError));
  }

  /* *********************UTILITARIOS*********************** */
  handlerError(error): any {
    console.log('Entre en handlerError' , error);
    if (error.statusText == 'Unauthorized') {
      localStorage.removeItem("user");
      location.reload();
    }
  }
}
