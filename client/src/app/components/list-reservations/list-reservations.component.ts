import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css']
})
export class ListReservationsComponent implements OnInit {

  reservationsArray: any[]  = [];

  constructor(
    private _restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this._restaurantService.getReservations().subscribe(data =>{
      this.reservationsArray = data.reservations;
    }, error => {
      console.log(error);
    });
  }

}
