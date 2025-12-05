import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DriverDTO } from '../../../dto/driverDTO';
import { ParentDTO } from '../../../dto/parentDTO';
import { Users } from '../../../model/Users';
import { Auth } from '../../../service/serviceAuth/auth';
import { AdminSidebar } from './admin-sidebar/admin-sidebar';
import { DriverCard } from './driver-card/driver-card';
import { ParentCard } from './parent-card/parent-card';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule, ParentCard, DriverCard, AdminSidebar],
  providers: [Auth],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {

  admin: Users = {} as Users;
  isLoading = true;
  firstName = '';
  contact = '';
  activeSection: string = 'home';
  drivers: DriverDTO[] = [];
  parents: ParentDTO[] = [];
  activeTab: 'drivers' | 'parents' = 'drivers';
  pageSize = 5;
  currentPage = 1;
  isProfileOpen = false;

  constructor(private authService: Auth) { }


  ngOnInit() {
    this.loadAdminData();
    this.loadParents();
    this.loadDrivers();
    this.updatePageSize();
    window.addEventListener('resize', () => this.updatePageSize());
  }

  loadAdminData() {
    this.isLoading = true;
    this.authService.getCurrentAdmin().subscribe({
      next: (data) => {

        console.log("Admin data:", data);

        this.firstName = this.capitalizeRole(data.firstName ?? '');
        this.contact = data.phoneNumber;
        this.admin = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading admin data:', error);
        this.isLoading = false;
      },
    });
  }

  capitalizeRole(role: string | undefined | null): string {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }


  setTab(tab: 'drivers' | 'parents') {
    this.activeTab = tab;
    if (tab === 'drivers') {
      this.loadDrivers();
    } else {
      this.loadParents();
    }
  }

  loadDrivers() {
    this.authService.getListDriver().subscribe(res => {
      this.drivers = res;
    });
  }

  loadParents() {
    this.authService.getListParent().subscribe({
      next: res => {
        this.parents = res;
      },
      error: err => {
        console.error('HTTP Error:', err);
        console.error('Error status:', err.status);
        console.error('Error statusText:', err.statusText);
      }
    });
  }

  onSidebarChange(section: string) {
    this.activeSection = section;
  }

  updatePageSize() {
    const width = window.innerWidth;

    if (width <= 767) {
      this.pageSize = 2;
    } else {
      this.pageSize = 5;
    }

    this.currentPage = 1;
  }

  get paginatedDrivers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.drivers.slice(start, start + this.pageSize);
  }

  get paginatedParents() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.parents.slice(start, start + this.pageSize);
  }

  totalPages(list: any[]) {
    return Math.ceil(list.length / this.pageSize);
  }

  toggleProfile() {
  this.isProfileOpen = !this.isProfileOpen;
}
}
