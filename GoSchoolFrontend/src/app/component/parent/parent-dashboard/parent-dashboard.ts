import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Logout } from '../../auth/logout/logout';
import { Router, RouterModule } from '@angular/router';
import { AddScreen } from '../add-screen/add-screen';
import { HomeScreen } from '../home-screen/home-screen';

@Component({
  selector: 'app-parent-dashboard',
  imports: [CommonModule, Logout, RouterModule],
  templateUrl: './parent-dashboard.html',
  styleUrl: './parent-dashboard.css'
})
export class ParentDashboard {
  isSidebarOpen = false;
  activeItem: string = 'home';

  @ViewChild(Logout) logoutComponent!: Logout;

  constructor(private router: Router){}

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
  this.router.navigate(['/parent-dashboard/home'])
  this.closeSidebar();
}

addScreen() {
  this.setActive('add');
  this.router.navigate(['/parent-dashboard/add']);
  this.closeSidebar();
}
settingsScreen() {
  this.setActive('settings');
  this.router.navigate(['/parent-dashboard/settings']);
  this.closeSidebar();
}


}
