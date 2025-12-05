import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LocationDTO } from '../../../../../dto/ LocationDTO';
import { DriverDTO } from '../../../../../dto/driverDTO';
import { Driver } from '../../../../../service/serviceDriver/driver';
import { Province } from '../../../../constant/province';
import { Role } from '../../../../constant/role';
import { DriverLocation } from "./driver-location/driver-location";

@Component({
  selector: 'app-driver-profile',
  imports: [CommonModule, RouterModule, FormsModule, DriverLocation],
  providers: [Driver],
  templateUrl: './driver-profile.html',
  styleUrls: ['./driver-profile.css'],
})
export class DriverProfile {
  driver: DriverDTO = {
    driverUUID: '',
    driverName: '',
    driverSurname: '',
    email: '',
    contact: '',
    role: Role.DRIVER,
    totalNumberOfStudents: 0,
    assignedStudents: [],
    driverLocation: {
      locationUUID: '',
      address: '',
      suburb: '',
      city: '',
      province: Province.GAUTENG,
      postalCode: '',
    },
    userId: '',
    password: '',
  };

  originalDriver: DriverDTO = { ...this.driver };

  isLoading = true;
  isEditing = false;

  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupType: 'success' | 'error' | 'info' = 'info';

  provinces = Object.values(Province);
   showRelocatePopup = false;

  constructor(private router: Router, private driverService: Driver) { }

  ngOnInit() {
    this.loadDriverData();
  }

  loadDriverData() {
    this.isLoading = true;
    this.driverService.getCurrentDriver().subscribe({
      next: (data) => {
        // Format address, suburb, city only; keep province as enum
        data.driverLocation = this.formatLocation(data.driverLocation);
        this.driver = data;
        this.originalDriver = { ...data };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading driver data:', error);
        this.isLoading = false;
      },
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  hasChanges(): boolean {
    return (
      this.driver.driverName !== this.capitalizeWords(this.originalDriver.driverName) ||
      this.driver.driverSurname !== this.capitalizeWords(this.originalDriver.driverSurname) ||
      this.driver.email !== this.originalDriver.email ||
      this.driver.contact !== this.originalDriver.contact ||
      this.driver.role !== this.originalDriver.role ||
      this.hasLocationChanged()
    );
  }

  hasLocationChanged(): boolean {
    return (
      this.driver.driverLocation?.address !==
      this.capitalizeWords(this.originalDriver.driverLocation?.address) ||
      this.driver.driverLocation?.suburb !==
      this.capitalizeWords(this.originalDriver.driverLocation?.suburb) ||
      this.driver.driverLocation?.city !==
      this.capitalizeWords(this.originalDriver.driverLocation?.city) ||
      this.driver.driverLocation?.province !== this.originalDriver.driverLocation?.province ||
      this.driver.driverLocation?.postalCode !== this.originalDriver.driverLocation?.postalCode
    );
  }

  saveChanges() {
    if (!this.hasChanges()) {
      this.showPopupMessage('No Changes', 'No changes were made to your profile.', 'info');
      return;
    }

    // Format location before sending
    //this.driver.driverLocation = this.formatLocation(this.driver.driverLocation);

    this.driverService.updateCurrentDriver(this.driver).subscribe({
      next: (updatedDriver) => {
        this.driver = updatedDriver;
        this.originalDriver = { ...updatedDriver };
        this.isEditing = false;
        this.showPopupMessage(
          'Success',
          `Profile updated successfully, ${this.driver.driverName}.`,
          'success'
        );
      },
      error: (error) => {
        console.error('Error updating driver:', error);
        this.showPopupMessage('Error', 'Error updating profile. Please try again.', 'error');
      },
    });
  }

  showPopupMessage(title: string, message: string, type: 'success' | 'error' | 'info') {
    this.popupTitle = title;
    this.popupMessage = message;
    this.popupType = type;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
     this.router.navigate(['/drivers-dashboard/home']);
  }

  goBack() {
    this.router.navigate(['/drivers-dashboard/home']);
  }

  /** Capitalize first letter of each word */
  capitalizeWords(value: string | undefined | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  /** Format location for display but keep province as enum */
  formatLocation(location: LocationDTO): LocationDTO {
    if (!location) return location;
    return {
      ...location,
      address: this.capitalizeWords(location.address),
      suburb: this.capitalizeWords(location.suburb),
      city: this.capitalizeWords(location.city),
      province: location.province, // keep enum value
      postalCode: location.postalCode?.toUpperCase() || '',
    };
  }

  /** For displaying the province nicely in dropdown */
  formatProvinceDisplay(province: Province): string {
    return province
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  }

  openReLocation() {
    this.showRelocatePopup = true;
  }

}
