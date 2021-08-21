import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRestaurantComponent } from './components/create-restaurant/create-restaurant.component';
import { ListRestaurantsComponent } from './components/list-restaurants/list-restaurants.component';

//Routes
const routes: Routes = [
    { path: '', component: ListRestaurantsComponent },
    { path: 'create-restaurant', component: CreateRestaurantComponent },
    { path: 'edit-restaurant/:id', component: CreateRestaurantComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

// Exportar el modulo del router
export const AppRoutingProviders: any[] = [];
export const Routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

