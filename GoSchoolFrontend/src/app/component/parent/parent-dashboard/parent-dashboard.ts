import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Logout } from '../../auth/logout/logout';

@Component({
  selector: 'app-parent-dashboard',
  imports: [CommonModule, Logout],
  templateUrl: './parent-dashboard.html',
  styleUrl: './parent-dashboard.css'
})
export class ParentDashboard {
  isSidebarOpen = false;

  @ViewChild(Logout) logoutComponent!: Logout;

  toggleSidebar(event: Event) {
    event.stopPropagation();
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

 openLogoutDialog() {
  this.logoutComponent.openDialog();
}

}
