import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ParentDTO } from '../../../dto/parentDTO';
import { Parents } from '../../../service/serviceParent/parents';
import { Logout } from '../../auth/logout/logout';

@Component({
  selector: 'app-parent-dashboard',
  imports: [CommonModule, Logout, RouterModule, RouterModule, FormsModule],
  providers: [Parents],
  templateUrl: './parent-dashboard.html',
  styleUrl: './parent-dashboard.css'
})
export class ParentDashboard  implements OnInit{
  isSidebarOpen = false;
  activeItem: string = '';
  parent: ParentDTO = {} as ParentDTO;
  isLoading = true;

  @ViewChild(Logout) logoutComponent!: Logout;

  constructor(private router: Router, private parentService:  Parents){}

  ngOnInit() {
    this.loadParentData();
  }

loadParentData() {
  this.isLoading = true;
  this.parentService.getCurrentParent().subscribe({
    next: (data) => {
      data.firstName = this.capitalizeRole(data.firstName ?? '');
      data.surname = this.capitalizeRole(data.surname ?? '');

      
      this.parent = data;
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error loading parent data:', error);
      this.isLoading = false;
    },
  });
}


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
  this.router.navigate(['/parent-dashboard/add-upload']);
  this.closeSidebar();
}
settingsScreen() {
  this.setActive('settings');
  this.router.navigate(['/parent-dashboard/settings']);
  this.closeSidebar();
}

capitalizeRole(role: string | undefined | null): string {
  if (!role) return '';
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}
}
