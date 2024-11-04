import { Injectable } from '@angular/core';
import { FoodItem } from './food-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserOrder } from './user-order';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class FoodItemsService {

  constructor(private http: HttpClient) { }

  getFoodItems(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/item");
  }

  placeOrder(userOrder: UserOrder[]): Observable<any> {
    return this.http.post<any>("http://localhost:8080/order", userOrder);
  }

  addFoodItem(foodItem: any): Observable<any> {
    return this.http.post<any>("http://localhost:8080/item", foodItem);
  }

  editFoodItem(foodItem: any): Observable<any> {
    return this.http.put<any>("http://localhost:8080/item", foodItem);
  }

  updateOrder(orderId: string, userOrder: UserOrder[]): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/order/${orderId}`, userOrder);
  }
}
