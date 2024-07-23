import { Component } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent {
  restaurants: Restaurant[] = [];
  searchQuery: string = '';
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;
      console.log(this.restaurants );
      
    });
  }

  deleteRestaurant(id: number): void {
    this.restaurantService.deleteRestaurant(id).subscribe(() => {
      this.loadRestaurants();
    });
  }

  filteredRestaurants() {
    return this.restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
