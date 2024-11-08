import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUser } from '../../models/user';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { Role } from 'src/app/models/role';
import { IGenericResponse } from 'src/app/models/generic-response-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  private roles = Role;
  private authenticated = new BehaviorSubject<boolean>(false);
  private admin = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<boolean>(false);

  public isAuthenticated$ = this.authenticated.asObservable();
  public isAdmin$ = this.admin.asObservable();
  public isUser$ = this.user.asObservable();

  public constructor(private httpClient: HttpClient, private userService: UserService) { }

  public login(user: IUser): Observable<IGenericResponse<IUser>> {
    return this.httpClient.post<IGenericResponse<IUser>>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        const isAdmin = response.data?.role === this.roles.Admin;
        const isUser = response.data?.role === this.roles.User;

        if (response.data) {
          this.authenticated.next(true);
        }
        this.admin.next(isAdmin);
        this.user.next(isUser);
      })
    );
  }

  public logout(): void {
    this.userService.logout().subscribe();
    this.authenticated.next(false);
    this.admin.next(false);
    this.user.next(false);
  }
}
