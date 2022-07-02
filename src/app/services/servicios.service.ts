import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserUpdate, UserResponse } from '../entities/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  constructor(private http: HttpClient, private auth: AuthService) {}

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

  getAllUsers(): Observable<UserResponse[]> {
    return this.http
      .get<any>(`${environment.API_URL}/users`)
      .pipe(catchError(this.handlerError));
  }

  /* ********************* SERVICIOS TASK *********************** */

  getAllTasks(): Observable<any> {
    return this.http
      .get<any>(`${environment.API_URL}/task`)
      .pipe(catchError(this.handlerError));
  }

  getTaskByUser(): Observable<any> {
    return this.http
      .get<any>(`${environment.API_URL}/task/user`)
      .pipe(catchError(this.handlerError));
  }

  getUsersByTask(taskId: Object): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/task/task_user`, taskId)
      .pipe(catchError(this.handlerError));
  }

  createNewTask(task: any) {
    return this.http
      .post<any>(`${environment.API_URL}/task/`, task)
      .pipe(catchError(this.handlerError));
  }

  updateTask(task: any): Observable<any> {
    return this.http
      .patch(`${environment.API_URL}/task`, task)
      .pipe(catchError(this.handlerError));
  }

  deleteUserToTask(userToTask: any): Observable<any> {
    return this.http
      .delete<any>(`${environment.API_URL}/task`, {
        body: userToTask,
      })
      .pipe(catchError(this.handlerError));
  }

  addUserToTask(userToTask: any): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/task/add_user`, userToTask)
      .pipe(catchError(this.handlerError));
  }

  deleteTask(task: any): Observable<any> {
    return this.http
      .delete<any>(`${environment.API_URL}/task/remove_task`, {
        body: task,
      })
      .pipe(catchError(this.handlerError));
  }

  /********************* SERVICIOS TYPE ******************************** */

  getAllTypes(): Observable<any> {
    return this.http
      .get<any>(`${environment.API_URL}/type`)
      .pipe(catchError(this.handlerError));
  }

  /************************ Servicios Notificacion Push *************************** */

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
    if (error.statusText == 'Unauthorized') {
      localStorage.removeItem("user");
    }
  }
}
