import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DriverDTO } from '../../../dto/driverDTO';
import { DriverRouteDetailsDTO } from '../../../dto/driverRouteDetailsDTO';
import { Driver } from '../../../service/serviceDriver/driver';
import { RouterService } from '../../../service/serviceRoute/router-service';
import { TransportService } from '../../../service/serviceTransport/transport-service';
import { TransportApplicationEntity } from '../../../model/transportApplication';
import { ApplicationStatus } from '../../constant/applicationStatus';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  providers: [Driver, RouterService, TransportService],
  imports: [CommonModule, FormsModule],
  templateUrl: './home-screen.html',
  styleUrls: ['./home-screen.css']
})
export class HomeScreen implements OnInit {

  drivers: any[] = [];
  selectedDriver: any = null;
  currentIndex = 0;

  applyForm = {
    numberOfKids: 0,
    message: ''
  };

  selectedRoute: any = null;

  // Popup properties
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupType: 'success' | 'error' | 'info' = 'info';

  constructor(
    private driverService: Driver, 
    private routerService: RouterService,  
    private transportService: TransportService
  ) {}

  ngOnInit(): void {
    console.log('HomeScreen initialized');
    this.loadDrivers();
  }

  loadDrivers() {
    console.log('Fetching all drivers...');
    this.driverService.getAllDrivers().subscribe({
      next: (data: DriverDTO[]) => {
        this.drivers = data;
        console.log('Drivers loaded:', this.drivers);
      },
      error: (err) => console.error('Failed to load drivers:', err)
    });
  }

  openModal(driver: DriverDTO, index: number) {
    this.selectedDriver = driver;
    this.currentIndex = index;

    if (!driver.routeDetails || driver.routeDetails.length === 0) {
      this.routerService.getRoutes(driver.driverUUID).subscribe({
        next: (routes: DriverRouteDetailsDTO[]) => {
          this.selectedDriver!.routeDetails = routes || [];
        },
        error: (err) => {
          console.error('Failed to load routes:', err);
          this.selectedDriver!.routeDetails = [];
        }
      });
    }

    const modalToggle = document.getElementById('modal-toggle') as HTMLInputElement;
    if (modalToggle) modalToggle.checked = true;
  }

  openApplyModal(route: any) {
    this.selectedRoute = route;
    this.applyForm = { numberOfKids: 0, message: "" };
    (document.getElementById('apply-modal') as HTMLInputElement).checked = true;
  }

  // Show popup
showCustomPopup(type: 'success' | 'error' | 'info', title: string, message: string) {
  this.popupType = type;
  this.popupTitle = title;
  this.popupMessage = message;
  this.showPopup = true;
}

// Close popup
closePopup() {
  this.showPopup = false;
}

  // Submit transport application
submitApplication() {
  const parentUUID = localStorage.getItem('parentUUID');

  if (!parentUUID) {
    this.showCustomPopup('error', 'Not Logged In', 'Parent not logged in!');
    return;
  }

  if (!this.selectedRoute) {
    this.showCustomPopup('error', 'No Route Selected', 'Please select a route before applying.');
    return;
  }

  if (!this.applyForm.numberOfKids || this.applyForm.numberOfKids <= 0) {
    this.showCustomPopup('error', 'Invalid Input', 'Number of kids must be at least 1.');
    return;
  }

  // --------- NEW: Check if parent already applied ---------
this.transportService
  .getApplicationByParentAndRoute(parentUUID, this.selectedRoute.id)
  .subscribe({
    next: (app: TransportApplicationEntity | null) => {
      if (app && (app.applicationStatus === ApplicationStatus.PENDING || app.applicationStatus === ApplicationStatus.APPROVED)) {
        this.showCustomPopup(
          'error',
          'Already Applied',
          'You already applied for this route.'
        );
        return;
      }

      this.sendApplication(parentUUID);
    },
    error: () => this.sendApplication(parentUUID)
  });

}


sendApplication(parentUUID: string) {
  const payload = {
    parentId: parentUUID,
    routeId: this.selectedRoute.id,
    numberOfKids: this.applyForm.numberOfKids,
    message: this.applyForm.message
  };

  this.transportService.applyForTransport(payload).subscribe({
    next: () => {
      this.showCustomPopup('success', 'Success', 'Application submitted successfully!');

      // Close modal
      const applyModal = document.getElementById('apply-modal') as HTMLInputElement;
      if (applyModal) applyModal.checked = false;

      // Reset form
      this.applyForm = { numberOfKids: 0, message: '' };
    },
    error: (err) => {
      this.showCustomPopup('error', 'Error', 'Error submitting application.');
      console.error(err);
    }
  });
}


  capitalizeRole(value: string | undefined | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
