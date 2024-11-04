import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrderDetail(orderId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/order/${orderId}`);
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/user/order`);
  }

  getAllOrders(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/user/orders`);
  }
}
