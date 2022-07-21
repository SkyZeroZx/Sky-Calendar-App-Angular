import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ITaskResponse, IUserByTask, IRegisterTask, IAddUserTask, ICodTask } from 'src/app/entities/task';
import { IType } from 'src/app/entities/type';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private auth: AuthService) { }
  
  /* ********************* SERVICIOS TASK *********************** */

  getAllTasks(): Observable<ITaskResponse[]> {
    return this.http
      .get<any>(`${environment.API_URL}/task`)
      .pipe(catchError(this.handlerError));
  }

  getTaskByUser(): Observable<ITaskResponse[]> {
    return this.http
      .get<any>(`${environment.API_URL}/task/user`)
      .pipe(catchError(this.handlerError));
  }

  getUsersByTask(taskId: Object): Observable<IUserByTask[]> {
    return this.http
      .post<any>(`${environment.API_URL}/task/task_user`, taskId)
      .pipe(catchError(this.handlerError));
  }

  createNewTask(task: IRegisterTask) {
    return this.http
      .post<any>(`${environment.API_URL}/task/`, task)
      .pipe(catchError(this.handlerError));
  }

  updateTask(task: any): Observable<any> {
    return this.http
      .patch(`${environment.API_URL}/task`, task)
      .pipe(catchError(this.handlerError));
  }

  deleteUserToTask(userToTask: IAddUserTask): Observable<any> {
    return this.http
      .delete<any>(`${environment.API_URL}/task`, {
        body: userToTask,
      })
      .pipe(catchError(this.handlerError));
  }

  addUserToTask(userToTask: IAddUserTask): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/task/add_user`, userToTask)
      .pipe(catchError(this.handlerError));
  }

  deleteTask(task: ICodTask): Observable<any> {
    return this.http
      .delete<any>(`${environment.API_URL}/task/remove_task`, {
        body: task,
      })
      .pipe(catchError(this.handlerError));
  }

  /********************* SERVICIOS TYPE ******************************** */

  getAllTypes(): Observable<IType[]> {
    return this.http
      .get<any>(`${environment.API_URL}/type`)
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
