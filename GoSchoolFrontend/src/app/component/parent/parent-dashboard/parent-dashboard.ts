import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ParentDTO } from '../../../dto/parentDTO';
import { Parents } from '../../../service/serviceParent/parents';
import { Logout } from '../../auth/logout/logout';
import { ParentSidebar } from './sidebar/parent-sidebar/parent-sidebar';

@Component({
  selector: 'app-parent-dashboard',
  imports: [CommonModule, Logout, RouterModule, RouterModule, FormsModule, ParentSidebar],
  providers: [Parents],
  templateUrl: './parent-dashboard.html',
  styleUrls: ['./parent-dashboard.css']
})
export class ParentDashboard implements OnInit {
  isSidebarOpen = false;
  activeItem: string = 'home';
  parent: ParentDTO = {} as ParentDTO;
  parentFirstName: string = ''; 
  parentEmail: string = '';
  isLoading = true;

  @ViewChild(Logout) logoutComponent!: Logout;

  constructor(
    private router: Router, 
    private parentService: Parents
  ) {}

  ngOnInit() {
    this.loadParentData();
    
  }

  loadParentData() {
    this.isLoading = true;
    this.parentService.getCurrentParent().subscribe({
      next: (data) => {
        this.parentFirstName = this.capitalizeRole(data.firstName ?? '');
        
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

  onSidebarToggle() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onMenuItemClick(itemId: string) {
    this.setActive(itemId);
    
    switch(itemId) {
      case 'home':
        this.homeScreen();
        break;
      case 'add':
        this.addScreen();
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
    this.closeSidebar();
  }

  setActive(item: string) {
    this.activeItem = item;
  }

  homeScreen() {
    this.router.navigate(['/parent-dashboard/home']);
    this.closeSidebar();
  }

  addScreen() {
    this.router.navigate(['/parent-dashboard/add-upload']);
    this.closeSidebar();
  }

  settingsScreen() {
    this.router.navigate(['/parent-dashboard/settings']);
    this.closeSidebar();
  }

  capitalizeRole(role: string | undefined | null): string {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }

  getDisplayName(): string {
    if (this.parent.firstName) {
      return this.capitalizeRole(this.parent.firstName);
    }
    return this.parentFirstName || 'User';
  }
}