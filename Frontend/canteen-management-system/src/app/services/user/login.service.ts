import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { Role } from 'src/app/models/role';
import { GenericResponseDTO } from 'src/app/models/generic-response-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  private roles = Role;
  private authenticated = new BehaviorSubject<boolean>(false);
  private admin = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<boolean>(false);

  isAuthenticated$ = this.authenticated.asObservable();
  isAdmin$ = this.admin.asObservable();
  isUser$ = this.user.asObservable();

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  login(user: User): Observable<GenericResponseDTO<User>> {
    return this.httpClient.post<GenericResponseDTO<User>>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        const isAdmin = response.data.role === this.roles.Admin;
        const isUser = response.data.role === this.roles.User;

        this.authenticated.next(true);
        this.admin.next(isAdmin);
        this.user.next(isUser);

      })
    );
  }

  logout() {
    this.userService.logout();
    this.authenticated.next(false);
    this.admin.next(false);
    this.user.next(false);
  }
}
