import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserUpdate, IUser } from "src/app/entities/user";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  resetPassword(username): Observable<any> {
    return this.http.post<any>(
      `${environment.API_URL}/auth/reset-password`,
      username
    );
  }

  updateUser(user: UserUpdate): Observable<any> {
    return this.http.patch(`${environment.API_URL}/users`, user);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/users`, {
      body: {
        id: id,
      },
    });
  }

  createUser(user: UserUpdate): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/users`, user);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<any>(`${environment.API_URL}/users`);
  }

  saveUserNotification(data): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/notificacion`, data);
  }

  getProfile(): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/users/profile`, null);
  }

  sendNotification(data): Observable<any> {
    return this.http.post<any>(
      `${environment.API_URL}/notificacion/send`,
      data
    );
  }
}
