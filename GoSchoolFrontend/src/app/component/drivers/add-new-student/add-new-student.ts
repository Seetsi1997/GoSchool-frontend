import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DriverDTO } from '../../../dto/driverDTO';
import { DriverRouteDetailsDTO } from '../../../dto/driverRouteDetailsDTO';
import { Driver } from '../../../service/serviceDriver/driver';
import { RouterService } from '../../../service/serviceRoute/router-service';

@Component({
  selector: 'app-add-new-student',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [RouterService],
  templateUrl: './add-new-student.html',
  styleUrls: ['./add-new-student.css']
})
export class AddNewStudent implements OnInit, OnChanges {


  currentDriver?: DriverDTO; // Current logged-in driver
  driverRoutes: DriverRouteDetailsDTO[] = [];
  isAddingRoute = false;
  isLoading = false;

  routeForm: FormGroup;

  constructor(
    private driverRouteService: RouterService,
    private driverService: Driver,
    private fb: FormBuilder
  ) {
    this.routeForm = this.fb.group({
      schoolName: ['', Validators.required],
      pickupTime: ['', Validators.required],
      dropOffTime: ['', Validators.required],
      monthlyFee: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadCurrentDriver();
    this.loadDriverRoute()
  }
   ngOnChanges(changes: SimpleChanges): void {
    // Handle changes to input properties here
    console.log('Input properties changed:', changes);
  }

  private loadCurrentDriver() {
    this.isLoading = true;
    // Get the current logged-in driver
    this.driverService.getCurrentDriver().subscribe({
      next: (driver: DriverDTO) => {
        this.currentDriver = driver;
        if (driver.driverUUID) {
          this.loadDriverRoutes(driver.driverUUID);
        } else {
          console.error('Current driver has no UUID!');
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error loading current driver:', err);
        this.isLoading = false;
      }
    });
  }

  private loadDriverRoutes(driverUUID: string) {
    this.driverRouteService.getRoutes(driverUUID)
      .subscribe({
        next: (routes: DriverRouteDetailsDTO[]) => {
          this.driverRoutes = routes;
          this.isLoading = false;
        },
        error: err => {
          console.error('Error fetching routes:', err);
          this.isLoading = false;
        }
      });
  }

  private loadDriverRoute() {
  this.driverRouteService.getRoute()
    .subscribe({
      next: (routes: DriverRouteDetailsDTO[]) => {
        this.driverRoutes = routes;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error fetching routes:', err);
        this.isLoading = false;
      }
    });
}


  startAddingRoute() {
    this.isAddingRoute = true;
  }

  addNewRoute() {
    if (!this.currentDriver?.driverUUID) {
      console.error('Cannot add route: No driver logged in!');
      alert('Please log in as a driver to add routes');
      return;
    }

    this.markFormGroupTouched(this.routeForm);

    if (this.routeForm.invalid) {
      console.warn('Form is invalid');
      alert('Please fill all required fields correctly');
      return;
    }

    const newRoute: DriverRouteDetailsDTO = { 
      ...this.routeForm.value
    };

    console.log('Creating route for current driver:', this.currentDriver.driverUUID, 'with data:', newRoute);

    this.driverRouteService.createRoute(this.currentDriver.driverUUID, newRoute)
      .subscribe({
        next: (savedRoute: DriverRouteDetailsDTO) => {
          this.driverRoutes.push(savedRoute);
          this.isAddingRoute = false;
          this.routeForm.reset({ monthlyFee: 0 });
          alert('Route added successfully!');
        },
        error: err => {
          console.error('Error creating route:', err);
          alert('Error creating route: ' + (err.error?.message || err.message || 'Unknown error'));
        }
      });
  }

  cancelAddRoute() {
    this.isAddingRoute = false;
    this.routeForm.reset({ monthlyFee: 0 });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }

  // Helper method to check if form field is invalid
  isFieldInvalid(fieldName: string): boolean {
    const field = this.routeForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Helper method to get field error message
  getFieldError(fieldName: string): string {
    const field = this.routeForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'This field is required';
      if (field.errors['min']) return 'Value must be greater than 0';
    }
    return '';
  }

    capitalizeRole(value:string | undefined | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}