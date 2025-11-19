import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Driver } from '../../../service/serviceDriver/driver';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-screen.html',
  styleUrl: './home-screen.css'
})
export class HomeScreen implements OnInit {

  drivers: any[] = [];
  selectedDriver: any = null;
  currentIndex = 0;

  constructor(private driverService: Driver) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers() {
    this.driverService.getAllDrivers().subscribe({
      next: (data) => this.drivers = data,
      error: (err) => console.error('Failed to load drivers:', err)
    });
  }

  openModal(driver: any, index: number) {
    this.selectedDriver = driver;
    this.currentIndex = index;

    // Fetch route details if not already loaded
    if (!driver.routeDetails) {
      this.driverService.listRoutes(driver.driverUUID).subscribe({
        next: (routes) => this.selectedDriver.routeDetails = routes,
        error: () => this.selectedDriver.routeDetails = []
      });
    }
    (document.getElementById('modal-toggle') as HTMLInputElement).checked = true;
  }

  capitalizeRole(value: string | undefined | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}