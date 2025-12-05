import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DriverDTO } from '../../../../../../dto/driverDTO';
import { Driver } from '../../../../../../service/serviceDriver/driver';
import { Province } from '../../../../../constant/province';

@Component({
  selector: 'app-driver-location',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './driver-location.html',
  styleUrls: ['./driver-location.css'],
})
export class DriverLocation {
  driver: DriverDTO = {} as DriverDTO;
  originalDriver: DriverDTO = {} as DriverDTO;
  isLoading = true;
  isEditing = false;

  // Popup properties
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupType: 'success' | 'error' | 'info' = 'info';
  provinces = Object.values(Province);
  selectedProvince: Province | null = null;

  constructor(private router: Router, private driverService: Driver) {}

  ngOnInit() {
    this.loadDriverData();
  }

  loadDriverData() {
    this.isLoading = true;
    this.driverService.getCurrentDriver().subscribe({
      next: (data) => {
        // Ensure driverLocation exists
        if (!data.driverLocation) {
          data.driverLocation = {
            suburb: '',
            city: '',
            address: '',
            postalCode: '',
            province: Province.GAUTENG,
          };
        }

        // DEEP COPY - this is the fix!
        this.driver = JSON.parse(JSON.stringify(data));
        this.originalDriver = JSON.parse(JSON.stringify(data));

        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        // Initialize with empty location even on error
        this.driver.driverLocation = {
          suburb: '',
          city: '',
          address: '',
          postalCode: '',
          province: Province.GAUTENG,
        };
        // DEEP COPY for error case too
        this.originalDriver = JSON.parse(JSON.stringify(this.driver));
      },
    });
  }

  hasChanges(): boolean {
    // Add null checks for driverLocation
    if (!this.driver.driverLocation || !this.originalDriver.driverLocation) {
      return false;
    }

    const d = this.driver.driverLocation;
    const o = this.originalDriver.driverLocation;

    const changes =
      d.suburb !== o.suburb ||
      d.city !== o.city ||
      d.address !== o.address ||
      d.postalCode !== o.postalCode ||
      d.province !== o.province;

    return changes;
  }

  saveChanges() {
    // Check if there are any changes
    if (!this.hasChanges()) {
      this.showPopupMessage('No Changes', 'The location remained unchanged.', 'info');
      return;
    }

    // Make a copy to avoid mutation during save
    const driverToSave = JSON.parse(JSON.stringify(this.driver));

    this.driverService.updateCurrentDriver(driverToSave).subscribe({
      next: (updatedParent) => {
        // DEEP COPY the response
        this.driver = JSON.parse(JSON.stringify(updatedParent));
        this.originalDriver = JSON.parse(JSON.stringify(updatedParent));

        this.isEditing = false;
        this.showPopupMessage('Success', `Location updated successfully ${this.driver.driverName}.`, 'success');
      },
      error: (error) => {
        this.showPopupMessage('Error', 'Error updating location. Please try again.', 'error');
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
    this.router.navigate(['/drivers-dashboard']);
  }

  goBack() {
    this.router.navigate(['/drivers-dashboard']);
  }

  capitalizeRole(value: string): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  formatProvinceDisplay(province: Province): string {
    return province
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  }
}
