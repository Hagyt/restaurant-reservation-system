import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateRestaurantComponent } from './components/create-restaurant/create-restaurant.component';
import { ListRestaurantsComponent } from './components/list-restaurants/list-restaurants.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateRestaurantComponent,
    ListRestaurantsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
