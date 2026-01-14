import { Component, ViewChild } from '@angular/core';
import { Logout } from '../../auth/logout/logout';

import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-drivers-dashboard',
  imports: [CommonModule, Logout, RouterModule, Sidebar, Logout],
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

  onSidebarToggle() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onMenuItemClick(itemId: string) {
    this.setActive(itemId);
    
    switch(itemId) {
      case 'home':
        this.homeScreen();
        break;
      case 'view':
        this.viewScreen();
        break;
      case 'add':
        this.addScreen();
        break;
      case 'notification':
        this.notificationScreen();
        break;
      case 'settings':
        this.settingsScreen();
        break;
      case 'logout':
        this.openLogoutDialog();
        break;
    }
  }

  openLogoutDialog() {
    this.setActive('logout');
    this.logoutComponent.openDialog();
  }

  setActive(item: string) {
    this.activeItem = item;
  }

  homeScreen() {
    this.router.navigate(['/drivers-dashboard/home']);
  }

  viewScreen() {
    this.router.navigate(['/drivers-dashboard/view']);
  }
  
  addScreen() {
    this.router.navigate(['/drivers-dashboard/add']);
  }

  notificationScreen() {
    this.router.navigate(['/drivers-dashboard/notification']);
  }
  settingsScreen() {
    this.router.navigate(['/drivers-dashboard/settings']);
  }
}
