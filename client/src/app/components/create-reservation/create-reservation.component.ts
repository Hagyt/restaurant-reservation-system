import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from 'src/app/models/reservation';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {

  reservationForm: FormGroup;
  id: String | null;
  reservationsArray: Reservation[] = [];
  availableTables: Number[];

  constructor(
    private _restaurantService: RestaurantService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) { 
    this.reservationForm = this.fb.group({
      table: ['', Validators.required],
      reservationDate: ['', Validators.required]
    })

    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.availableTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  }

  ngOnInit(): void {
  }

  getAvailableTables() {
    this._restaurantService.getReservationsByRestaurant(this.id).subscribe( data => {
      this.reservationsArray = data.reservations;
      console.log(this.reservationsArray);
      this.reservationsArray = this.reservationsArray.filter( reservation => {
        return reservation.date.includes(this.reservationForm.get('reservationDate')?.value);
      });

      let tablesReserved = this.reservationsArray.map( reservation => {
        return reservation.table;
      });

      this.availableTables = this.availableTables.filter(table => {
        return !tablesReserved.includes(table);
      });
    }, error => {
      console.log(error);
    });
  }

  createReservation() {
    const RESERVATION: Reservation = {
      table: this.reservationForm.get('table')?.value,
      date: this.reservationForm.get('reservationDate')?.value
    }

    // Save reservation
    this._restaurantService.saveReservation(this.id, RESERVATION).subscribe(data => {
      this.toastr.success('Se ha reservado con exito!', 'Reservado!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      if (error.status == 400) {
        this.toastr.error('No es posible hacer mas reservas', 'Cupo lleno!');
      } else {
        this.toastr.error('Ha ocurrido un error', 'Error');
      }
      this.reservationForm.reset();
    });
  }
}
