import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFoodOrder } from 'src/app/models/food-order';
import { IGenericResponse } from 'src/app/models/generic-response-dto';
import { IUserOrder } from 'src/app/models/user-order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly apiUrl = environment.apiUrl;
  private readonly paramKey: string = "selectedUser";

  public constructor(private httpClient: HttpClient) { }

  public getOrderDetail(orderId: number): Observable<IGenericResponse<IFoodOrder>> {
    return this.httpClient.get<IGenericResponse<IFoodOrder>>(`${this.apiUrl}/order/${orderId}`);
  }

  public getOrder(): Observable<IGenericResponse<IFoodOrder[]>> {
    return this.httpClient.get<IGenericResponse<IFoodOrder[]>>(`${this.apiUrl}/order/user`);
  }

  public getAllOrders(): Observable<IGenericResponse<IFoodOrder[]>> {
    return this.httpClient.get<IGenericResponse<IFoodOrder[]>>(`${this.apiUrl}/orders`);
  }

  public getUserOrder(selectedUser: string): Observable<IGenericResponse<IFoodOrder[]>> {
    const params = new HttpParams().set(this.paramKey, selectedUser);
    return this.httpClient.get<IGenericResponse<IFoodOrder[]>>(`${this.apiUrl}/order`, { params });
  }

  public updateOrder(orderId: number, userOrder: IUserOrder[]): Observable<IGenericResponse<IFoodOrder>> {
    return this.httpClient.put<IGenericResponse<IFoodOrder>>(`${this.apiUrl}/order/${orderId}`, userOrder);
  }

  public placeOrder(userOrder: IUserOrder[]): Observable<IGenericResponse<IFoodOrder>> {
    return this.httpClient.post<IGenericResponse<IFoodOrder>>(`${this.apiUrl}/order`, userOrder);
  }
}
