import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DriverDTO } from '../../../dto/driverDTO';
import { ParentDTO } from '../../../dto/parentDTO';
import { StudentDTO } from '../../../dto/studentDTO';
import { TransportApplicationDTO } from '../../../dto/transportApplicationDTO';
import { Users } from '../../../model/Users';
import { Auth } from '../../../service/serviceAuth/auth';
import { Parents } from '../../../service/serviceParent/parents';
import { TransportService } from '../../../service/serviceTransport/transport-service';
import { AdminLeftPanel } from './admin-left-panel/admin-left-panel';
import { AdminSidebar } from './admin-sidebar/admin-sidebar';
import { AdminTopbar } from './admin-topbar/admin-topbar';
import { DriverApplication } from './driver-card/driver-application/driver-application';
import { ParentChildren } from './parent-card/parent-children/parent-children';
import { AdminHomeView } from './admin-home-view/admin-home-view';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminSidebar, AdminHomeView],
  providers: [Auth, Parents, TransportService],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboard implements OnInit {

  admin: Users = {} as Users;
  isLoading = true;

  activeSection: string = 'home';

  drivers: DriverDTO[] = [];
  parents: ParentDTO[] = [];

  activeTab: 'drivers' | 'parents' = 'drivers';

  pageSize = 5;
  currentPage = 1;

  isProfileOpen = false;

  selectedDriver: DriverDTO | null = null;
  selectedParent: ParentDTO | null = null;

  constructor(
    private authService: Auth,
    private parentService: Parents
  ) {}

  ngOnInit() {
    this.loadAdminData();
    this.loadDrivers();
    this.loadParents();
    this.updatePageSize();
    window.addEventListener('resize', () => this.updatePageSize());
  }

  // ------------------ UI STATE ------------------

  onSidebarChange(section: string) {
    this.activeSection = section;
  }

  setTab(tab: 'drivers' | 'parents') {
    this.activeTab = tab;
    this.currentPage = 1;
    this.selectedDriver = null;
    this.selectedParent = null;
  }

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  selectDriver(driver: DriverDTO) {
    this.selectedDriver = driver;
    this.selectedParent = null;
  }

  selectParent(parent: ParentDTO) {
    this.selectedParent = parent;
    this.selectedDriver = null;
  }

  // ------------------ DATA ------------------

  loadAdminData() {
    this.isLoading = true;
    this.authService.getCurrentAdmin().subscribe({
      next: data => {
        this.admin = data;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  loadDrivers() {
    this.authService.getListDriver().subscribe(res => {
      this.drivers = res;
    });
  }

  loadParents() {
    this.authService.getListParent().subscribe(res => {
      this.parents = res;
    });
  }

  // ------------------ PAGINATION ------------------

  updatePageSize() {
    this.pageSize = window.innerWidth <= 767 ? 2 : 5;
    this.currentPage = 1;
  }
}
