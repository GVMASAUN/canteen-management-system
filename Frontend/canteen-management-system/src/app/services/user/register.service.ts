import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericResponseDTO } from 'src/app/models/generic-response-dto';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User): Observable<GenericResponseDTO<User>> {
    return this.httpClient.post<GenericResponseDTO<User>>(`${this.apiUrl}/register`, user);
  }

  getUserById(userId: number): Observable<GenericResponseDTO<User>> {
    return this.httpClient.get<GenericResponseDTO<User>>(`${this.apiUrl}/user/${userId}`);
  }

  updateUser(userId: number, user: User): Observable<GenericResponseDTO<User>> {
    return this.httpClient.put<GenericResponseDTO<User>>(`${this.apiUrl}/user/${userId}`, user);
  }
}
