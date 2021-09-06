import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateReservationComponent } from './components/create-reservation/create-reservation.component';
import { CreateRestaurantComponent } from './components/create-restaurant/create-restaurant.component';
import { HomeComponent } from './components/home/home.component';
import { ListReservationsComponent } from './components/list-reservations/list-reservations.component';
import { ListRestaurantsComponent } from './components/list-restaurants/list-restaurants.component';

//Routes
const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'list-restaurants', component: ListRestaurantsComponent },
    { path: 'list-reservations', component: ListReservationsComponent },
    { path: 'create-restaurant', component: CreateRestaurantComponent },
    { path: 'edit-restaurant/:id', component: CreateRestaurantComponent },
    { path: 'create-reservation/:id', component: CreateReservationComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

// Exportar el modulo del router
export const AppRoutingProviders: any[] = [];
export const Routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

