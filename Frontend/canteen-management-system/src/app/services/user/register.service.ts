import { Injectable } from '@angular/core';
import { IUser } from '../../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IGenericResponse } from 'src/app/models/generic-response-dto';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl;

  public constructor(private httpClient: HttpClient) { }

  public registerUser(user: IUser): Observable<IGenericResponse<IUser>> {
    return this.httpClient.post<IGenericResponse<IUser>>(`${this.apiUrl}/register`, user);
  }

  public getUserById(userId: number): Observable<IGenericResponse<IUser>> {
    return this.httpClient.get<IGenericResponse<IUser>>(`${this.apiUrl}/user/${userId}`);
  }

  public updateUser(userId: number, user: IUser): Observable<IGenericResponse<IUser>> {
    return this.httpClient.put<IGenericResponse<IUser>>(`${this.apiUrl}/user/${userId}`, user);
  }
}
