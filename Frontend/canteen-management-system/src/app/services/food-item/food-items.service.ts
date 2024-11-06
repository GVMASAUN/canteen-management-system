import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodItem } from 'src/app/models/food-item';
import { GenericResponseDTO } from 'src/app/models/generic-response-dto';
import { UserOrder } from 'src/app/models/user-order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodItemsService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getFoodItems(): Observable<GenericResponseDTO<FoodItem[]>> {
    return this.httpClient.get<GenericResponseDTO<FoodItem[]>>(`${this.apiUrl}/item`);
  }

  getFoodItem(itemId: number): Observable<GenericResponseDTO<FoodItem>> {
    return this.httpClient.get<GenericResponseDTO<FoodItem>>(`${this.apiUrl}/item/${itemId}`);
  }

  addFoodItem(foodItem: FoodItem): Observable<GenericResponseDTO<FoodItem>> {
    return this.httpClient.post<GenericResponseDTO<FoodItem>>(`${this.apiUrl}/item`, foodItem);
  }

  editFoodItem(foodItem: FoodItem): Observable<GenericResponseDTO<FoodItem>> {
    return this.httpClient.put<GenericResponseDTO<FoodItem>>(`${this.apiUrl}/item`, foodItem);
  }
}
