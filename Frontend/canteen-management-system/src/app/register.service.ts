import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>("http://localhost:8080/register", user);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/user/${userId}`);
  }

  updateUser(userId: string, user: User): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/user/${userId}`, user);
  }
}
