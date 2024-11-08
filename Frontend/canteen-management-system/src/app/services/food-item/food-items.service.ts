import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFoodItem } from 'src/app/models/food-item';
import { IGenericResponse } from 'src/app/models/generic-response-dto';
import { IUserOrder } from 'src/app/models/user-order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodItemsService {
  private apiUrl = environment.apiUrl;

  public constructor(private httpClient: HttpClient) { }

  public getFoodItems(): Observable<IGenericResponse<IFoodItem[]>> {
    return this.httpClient.get<IGenericResponse<IFoodItem[]>>(`${this.apiUrl}/item`);
  }

  public getFoodItem(itemId: number): Observable<IGenericResponse<IFoodItem>> {
    return this.httpClient.get<IGenericResponse<IFoodItem>>(`${this.apiUrl}/item/${itemId}`);
  }

  public addFoodItem(foodItem: IFoodItem): Observable<IGenericResponse<IFoodItem>> {
    return this.httpClient.post<IGenericResponse<IFoodItem>>(`${this.apiUrl}/item`, foodItem);
  }

  public editFoodItem(foodItem: IFoodItem): Observable<IGenericResponse<IFoodItem>> {
    return this.httpClient.put<IGenericResponse<IFoodItem>>(`${this.apiUrl}/item`, foodItem);
  }
}
