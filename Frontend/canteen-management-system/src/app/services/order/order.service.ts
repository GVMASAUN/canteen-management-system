import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodOrder } from 'src/app/models/food-order';
import { GenericResponseDTO } from 'src/app/models/generic-response-dto';
import { UserOrder } from 'src/app/models/user-order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getOrderDetail(orderId: number): Observable<GenericResponseDTO<FoodOrder>> {
    return this.httpClient.get<GenericResponseDTO<FoodOrder>>(`${this.apiUrl}/order/${orderId}`);
  }

  getOrder(): Observable<GenericResponseDTO<FoodOrder[]>> {
    return this.httpClient.get<GenericResponseDTO<FoodOrder[]>>(`${this.apiUrl}/user/order`);
  }

  getAllOrders(): Observable<GenericResponseDTO<FoodOrder[]>> {
    return this.httpClient.get<GenericResponseDTO<FoodOrder[]>>(`${this.apiUrl}/orders`);
  }

  getSpecificUserOrder(userId: number): Observable<GenericResponseDTO<FoodOrder[]>> {
    return this.httpClient.get<GenericResponseDTO<FoodOrder[]>>(`${this.apiUrl}/user/order/${userId}`);
  }

  updateOrder(orderId: number, userOrder: UserOrder[]): Observable<GenericResponseDTO<FoodOrder>> {
    return this.httpClient.put<GenericResponseDTO<FoodOrder>>(`${this.apiUrl}/order/${orderId}`, userOrder);
  }

  placeOrder(userOrder: UserOrder[]): Observable<GenericResponseDTO<FoodOrder>> {
    return this.httpClient.post<GenericResponseDTO<FoodOrder>>(`${this.apiUrl}/order`, userOrder);
  }
}
