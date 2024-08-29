import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AddRestaurantComponent } from '../add-restaurant/add-restaurant.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRestaurantComponent } from '../delete-restaurant/delete-restaurant.component';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  imagePath = 'assets/background.jpg';

  paginatedRestaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  restaurants: Restaurant[] = [];
  pageSize = 4;
  pageIndex = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private restaurantService: RestaurantService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.fetchRestaurants();
  }

  fetchRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(
      (response: any) => {
        this.restaurants = response;
        this.filteredRestaurants = [...this.restaurants];
        this.updatePaginatedRestaurants();
      },
      (error) => {
        this.messageService.handleError('Error fetching restaurants');
      }
    );
  }

  updatePaginatedRestaurants() {
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedRestaurants = this.filteredRestaurants.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedRestaurants();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filteredRestaurants = this.restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(filterValue)
    );
    this.pageIndex = 0;
    this.updatePaginatedRestaurants();
  }

  openAddRestaurantDialog(): void {
    const dialogRef = this.dialog.open(AddRestaurantComponent, {
      width: '600px',
      height: 'auto',
      maxWidth: '90vw',
      maxHeight: '90vh',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.messageService.handleSuccess(
          'Restaurant details added successfully'
        );
        this.fetchRestaurants();
      }
    });
  }

  editRestaurant(restaurant: Restaurant): void {
    const dialogRef = this.dialog.open(AddRestaurantComponent, {
      width: '600px',
      height: 'auto',
      maxWidth: '90vw',
      maxHeight: '90vh',
      disableClose: true,
      data: { restaurant },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.messageService.handleSuccess(
          'Restaurant details edited successfully'
        );
        this.fetchRestaurants();
      }
    });
  }

  deleteRestaurant(restaurant: any) {
    const dialogRef = this.dialog.open(DeleteRestaurantComponent, {
      width: '400px',
      data: { restaurantName: restaurant.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.restaurantService.deleteRestaurant(restaurant.id).subscribe(
          (response) => {
            this.fetchRestaurants();
            this.messageService.handleSuccess(
              'Restaurant deleted successfully'
            );
          },
          (error) => {
            this.fetchRestaurants();
            this.messageService.handleSuccess(
              'Restaurant deleted successfully'
            );
          }
        );
      }
    });
  }
}
