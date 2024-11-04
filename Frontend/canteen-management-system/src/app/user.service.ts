import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isSimpleUser: boolean = false;

  constructor(private http: HttpClient) { }

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
      if (currentUser.role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    }
    return this.isAdmin;
  }

  isUser(): boolean {
    let currentUserString: string | null = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      if (currentUser.role === 'ROLE_USER') {
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

  getUsers(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/user`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/user/${userId}`);
  }
}
