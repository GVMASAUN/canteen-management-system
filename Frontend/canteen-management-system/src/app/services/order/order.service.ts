import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrderDetail(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/order/${orderId}`);
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/order`);
  }

  getAllOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/orders`);
  }
}
