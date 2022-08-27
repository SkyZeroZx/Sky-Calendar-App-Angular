import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  ITaskResponse,
  IUserByTask,
  IRegisterTask,
  IAddUserTask,
} from "src/app/entities/task";
import { IType } from "src/app/entities/type";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<ITaskResponse[]> {
    return this.http.get<any>(`${environment.API_URL}/task`);
  }

  getTaskByUser(): Observable<ITaskResponse[]> {
    return this.http.get<any>(`${environment.API_URL}/task/user`);
  }

  getUsersByTask(codTask: Object): Observable<IUserByTask[]> {
    return this.http.get<any>(
      `${environment.API_URL}/task/task_user/${codTask}`
    );
  }

  createNewTask(task: IRegisterTask) {
    return this.http.post<any>(`${environment.API_URL}/task/`, task);
  }

  updateTask(task: any): Observable<any> {
    return this.http.patch(`${environment.API_URL}/task`, task);
  }

  deleteUserToTask(userToTask: IAddUserTask): Observable<any> {
    return this.http.delete<any>(
      `${environment.API_URL}/task?codUser=${userToTask.codUser}&codTask=${userToTask.codTask}`
    );
  }

  addUserToTask(userToTask: IAddUserTask): Observable<any> {
    return this.http.post<any>(
      `${environment.API_URL}/task/add_user`,
      userToTask
    );
  }

  deleteTask(task: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.API_URL}/task/remove_task/${task}`
    );
  }

  /********************* SERVICIOS TYPE ******************************** */

  getAllTypes(): Observable<IType[]> {
    return this.http.get<any>(`${environment.API_URL}/type`);
  }
}
