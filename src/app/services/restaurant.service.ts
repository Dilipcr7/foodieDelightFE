import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private apiEndPoint = environment.backendApiUrl;

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiEndPoint}api/getRestaurants`);
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(
      `${this.apiEndPoint}api/addRestaurant`,
      restaurant
    );
  }

  updateRestaurant(restaurant: Restaurant, id: number): Observable<Restaurant> {
    return this.http.put<Restaurant>(
      `${this.apiEndPoint}api/editRestaurant/${id}`,
      restaurant
    );
  }

  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiEndPoint}api/deleteRestaurant/${id}`
    );
  }
}
