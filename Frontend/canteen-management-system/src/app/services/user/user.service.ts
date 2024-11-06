import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponseDTO } from 'src/app/models/generic-response-dto';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private roles = Role;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isSimpleUser: boolean = false;

  constructor(private httpClient: HttpClient) { }

  isAuthenticatedUser(): boolean {
    let currentUserString: string | null = localStorage.getItem('currentUser');
    if (currentUserString) {
      if (JSON.parse(currentUserString).token) {
        this.isAuthenticated = true;
      }
    }
    return this.isAuthenticated;
  }

  isAdminUser(): boolean {
    let currentUserString: string | null = localStorage.getItem('currentUser');

    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      if (currentUser.role === this.roles.Admin) {
        this.isAdmin = true;
      }
    }
    return this.isAdmin;
  }

  isUser(): boolean {
    let currentUserString: string | null = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      if (currentUser.role === this.roles.User) {
        this.isSimpleUser = true;
      }
    }
    return this.isSimpleUser;
  }

  logout(): void {
    if (typeof (localStorage) !== undefined) {
      localStorage.clear();
    }
  }

  getUsers(): Observable<GenericResponseDTO<User[]>> {
    return this.httpClient.get<GenericResponseDTO<User[]>>(`${this.apiUrl}/users`);
  }

  deleteUser(userId: number): Observable<GenericResponseDTO<User>> {
    return this.httpClient.delete<GenericResponseDTO<User>>(`${this.apiUrl}/user/${userId}`);
  }
}
