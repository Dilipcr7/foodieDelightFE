import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css'],
})
export class AddRestaurantComponent {
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    public dialogRef: MatDialogRef<AddRestaurantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  restaurantForm!: FormGroup;

  ngOnInit(): void {
    this.isEditMode = !!this.data?.restaurant;

    this.restaurantForm = this.fb.group({
      id: [this.data?.restaurant?.id || null],
      name: [this.data?.restaurant?.name || '', Validators.required],
      address: [this.data?.restaurant?.address || '', Validators.required],
      cuisine: [this.data?.restaurant?.cuisine || '', Validators.required],
      rating: [
        this.data?.restaurant?.rating || null,
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
      description: [this.data?.restaurant?.description || ''],
      phoneNumber: [
        this.data?.restaurant?.phoneNumber || '',
        [Validators.required],
      ],
      email: [this.data?.restaurant?.email || '', [Validators.email]],
      website: [this.data?.restaurant?.website || ''],
      open: [this.data?.restaurant?.open || false],
    });
  }

  onSubmit(): void {
    if (this.restaurantForm.valid) {
      const Restaurant: Restaurant = this.restaurantForm.value;
      if (this.isEditMode) {
        this.restaurantService
          .updateRestaurant(Restaurant, Restaurant.id)
          .subscribe(() => {
            this.dialogRef.close(Restaurant);
          });
      } else {
        this.restaurantService
          .addRestaurant(Restaurant)
          .subscribe((newRestaurant) => {
            this.dialogRef.close(newRestaurant);
          });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
