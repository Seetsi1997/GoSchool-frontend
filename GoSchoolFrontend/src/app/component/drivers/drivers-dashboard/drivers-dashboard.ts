import { Component, ViewChild } from '@angular/core';
import { Logout } from '../../auth/logout/logout';

import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drivers-dashboard',
  imports: [CommonModule, Logout, RouterModule],
  templateUrl: './drivers-dashboard.html',
  styleUrl: './drivers-dashboard.css',
})
export class DriversDashboard {
  isSidebarOpen = false;
  activeItem: string = 'home';

  @ViewChild(Logout) logoutComponent!: Logout;

  constructor(private router: Router) {}

  toggleSidebar(event: Event) {
    event.stopPropagation();
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  openLogoutDialog() {
    this.setActive('logout');
    this.logoutComponent.openDialog();
    this.closeSidebar();
  }

  setActive(item: string) {
    this.activeItem = item;
  }

  homeScreen() {
    this.setActive('home');
    this.router.navigate(['/drivers-dashboard/home']);
    this.closeSidebar();
  }

  viewScreen() {
    this.setActive('view');
    this.router.navigate(['/drivers-dashboard/view']);
    this.closeSidebar();
  }
  
   addScreen() {
    this.setActive('add');
    this.router.navigate(['/drivers-dashboard/add']);
    this.closeSidebar();
  }

  settingsScreen() {
    this.setActive('settings');
    this.router.navigate(['/drivers-dashboard/settings']);
    this.closeSidebar();
  }
}
