import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserOrder } from 'src/app/models/user-order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodItemsService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getFoodItems(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/item`);
  }

  placeOrder(userOrder: UserOrder[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/order`, userOrder);
  }

  addFoodItem(foodItem: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/item`, foodItem);
  }

  editFoodItem(foodItem: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/item`, foodItem);
  }

  updateOrder(orderId: string, userOrder: UserOrder[]): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/order/${orderId}`, userOrder);
  }
}
