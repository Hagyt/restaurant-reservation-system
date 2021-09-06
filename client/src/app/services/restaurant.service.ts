import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  url = 'http://localhost:4000/api/'
  restaurants_url = `${this.url}restaurants/`;
  reservations_url = `${this.url}reservations/`;

  constructor(
    private http: HttpClient
  ) { }

  getRestaurants(): Observable<any> {
    return this.http.get(this.restaurants_url);
  }

  getRestaurant(id: any): Observable<any> {
    return this.http.get(this.restaurants_url + id);
  }

  saveRestaurant(restaurant: Restaurant): Observable<any> {
    return this.http.post(this.restaurants_url, restaurant);
  }

  updateRestaurant(id: any, restaurant: Restaurant): Observable<any> {
    return this.http.put(this.restaurants_url + id, restaurant);
  }
  
  
  deleteRestaurant(id: String): Observable<any> {
    return this.http.delete(this.restaurants_url + id);
  }
  
  getReservations(): Observable<any> {
    return this.http.get(this.reservations_url);
  }

  getReservationsByRestaurant(id: any): Observable<any> {
    return this.http.get(this.reservations_url + id);
  }
  
  saveReservation(id: any, reservation: Reservation): Observable<any> {
    return this.http.post(this.reservations_url + id, reservation);
  }

}
