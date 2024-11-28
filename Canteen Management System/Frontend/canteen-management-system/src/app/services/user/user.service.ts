import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IGenericResponse } from 'src/app/models/generic-response-dto';
import { Role } from 'src/app/models/role';
import { IUser } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly CURRENT_USER = "currentUser";
  private apiUrl = environment.apiUrl;
  private roles = Role;
  private isAuthenticated: boolean = false;
  private isAdmin: boolean = false;
  private isSimpleUser: boolean = false;

  public constructor(private httpClient: HttpClient) { }

  public isAuthenticatedUser(): boolean {
    let currentUserString: string | null = localStorage.getItem(this.CURRENT_USER);
    if (currentUserString) {
      if (JSON.parse(currentUserString).token) {
        this.isAuthenticated = true;
      }
    }
    return this.isAuthenticated;
  }

  public isAdminUser(): boolean {
    let currentUserString: string | null = localStorage.getItem('currentUser');

    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      if (currentUser.role === this.roles.Admin) {
        this.isAdmin = true;
      }
    }
    return this.isAdmin;
  }

  public isUser(): boolean {
    let currentUserString: string | null = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      if (currentUser.role === this.roles.User) {
        this.isSimpleUser = true;
      }
    }
    return this.isSimpleUser;
  }

  public logout(): Observable<IGenericResponse<IUser>> {
    return this.httpClient.post<IGenericResponse<IUser>>(`${this.apiUrl}/logout`, {}).pipe(
      tap({
        next: () => {
          if (typeof localStorage !== undefined) {
            localStorage.clear();
          }
        },
        error: (err) => {
          console.error('Error occurred:', err);
        }
      })
    );
  }

  public getUsers(): Observable<IGenericResponse<IUser[]>> {
    return this.httpClient.get<IGenericResponse<IUser[]>>(`${this.apiUrl}/user`);
  }

  public deleteUser(userId: number): Observable<IGenericResponse<IUser>> {
    return this.httpClient.delete<IGenericResponse<IUser>>(`${this.apiUrl}/user/${userId}`);
  }
}
