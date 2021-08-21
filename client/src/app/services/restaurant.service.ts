import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  url = 'http://localhost:4000/api/restaurant/';

  constructor(
    private http: HttpClient
  ) { }

  getRestaurants(): Observable<any> {
    return this.http.get(this.url);
  }

  getRestaurant(id: any): Observable<any> {
    return this.http.get(this.url + id);
  } 

  saveRestaurant(restaurant: Restaurant): Observable<any> {
    return this.http.post(this.url + 'save', restaurant);
  }

  updateRestaurant(id: any, restaurant: Restaurant): Observable<any> {
    return this.http.put(`${this.url}update/${id}`, restaurant);
  }

  deleteRestaurant(id: String): Observable<any> {
    return this.http.delete(`${this.url}delete/${id}`);
  }

}
