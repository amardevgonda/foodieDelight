import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from 'src/app/restaurant.service';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent {
  restaurantForm: FormGroup;
  restaurantId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.params['id'];
    if (this.restaurantId) {
      this.restaurantService.getRestaurantById(this.restaurantId).subscribe(data => {
        this.restaurantForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.restaurantForm.valid) {
      if (this.restaurantId) {
        this.restaurantService.updateRestaurant(this.restaurantId, this.restaurantForm.value).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.restaurantService.addRestaurant(this.restaurantForm.value).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
