import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.css']
})
export class ListRestaurantsComponent implements OnInit {

  restaurantsArray: Restaurant[] = [];

  constructor(
    private _restaurantService: RestaurantService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants() {
    this._restaurantService.getRestaurants().subscribe( data => {
      this.restaurantsArray = data.restaurants;
    }, error => {
      console.log(error);
    });
  }

  deleteRestaurant(id: any) {
    this._restaurantService.deleteRestaurant(id).subscribe(data => {
      this.toastr.error('El restaurante fue eliminado con exito', 'Restaurante eliminado');
      this.getRestaurants();
    }, error => {
      console.log(error);
    });
  }

}
