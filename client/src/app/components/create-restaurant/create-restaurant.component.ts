import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent implements OnInit {

  restaurantForm: FormGroup;
  title = 'Crear restaurante'
  id: String | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _restaurantService: RestaurantService,
    private aRouter: ActivatedRoute
  ) { 
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      photo: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEditRoute();
  }

  createRestaurant() {
    console.log(this.restaurantForm);

    const RESTAURANT: Restaurant = {
      name: this.restaurantForm.get('name')?.value,
      description: this.restaurantForm.get('description')?.value,
      address: this.restaurantForm.get('address')?.value,
      city: this.restaurantForm.get('city')?.value,
      photo: this.restaurantForm.get('photo')?.value,
    }

    if (this.id !== null) {
      // Edit restaurant

      this._restaurantService.updateRestaurant(this.id, RESTAURANT).subscribe(data => {
        this.toastr.info('El restaurante se ha actualizado!', 'Restaurante actualizado!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      });
    } else {
      // Save restaurant
      this._restaurantService.saveRestaurant(RESTAURANT).subscribe(data => {
        
        this.toastr.success('El restaurante se ha registrado!', 'Restaurante registrado!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.restaurantForm.reset();
      });
    }

  }

  isEditRoute() {
    if (this.id !== null) {
      this.title = 'Editar Restaurante';
      this._restaurantService.getRestaurant(this.id).subscribe(data => {
        data = data.restaurant;
        this.restaurantForm.setValue({
          name: data.name,
          description: data.description,
          address: data.address,
          city: data.city,
          photo: null,
        });
      }, error => {
        console.log(error);
      });
    }
  }

}
