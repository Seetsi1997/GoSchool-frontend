import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DriverDTO } from '../../../../dto/driverDTO';
import { Driver } from '../../../../service/serviceDriver/driver';
import { SvgService } from '../../../../service/SvgService/svg-service';


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  providers: [Driver, SvgService],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar implements OnInit {
  @Input() isOpen = false;
  @Input() activeItem: string = 'home';
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() menuItemClick = new EventEmitter<string>();

  driver: DriverDTO = {} as DriverDTO;
  isLoading = true;
  driverFirstName = '';
  driverContact = '';
  menuItems: any[] = [];
  logoutItems: any[] = [];
  profileItems: any[] = [];

  constructor(private driverService: Driver, private svgService: SvgService,  private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadDriverData();
    this.loadMenuAndLogoutItems();
  
  }

  loadDriverData() {
    this.isLoading = true;
    this.driverService.getCurrentDriver().subscribe({
      next: (data) => {
        this.driverFirstName = this.capitalizeRole(data.driverName ?? '');
        this.driverContact = data.contact;
        this.driver = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading driver data:', error);
        this.isLoading = false;
      },
    });
  }

  // Menu items
private loadMenuAndLogoutItems() {
  const menuIcons = ['profile','home', 'view', 'add', 'settings', 'logout'];

  this.svgService.preloadSvgs(menuIcons).subscribe(svgs => {
   
     this.profileItems = [
      { id: 'profile', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[0]) },
    ];

    this.menuItems = [
      { id: 'home', text: 'Home', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[1]) },
      { id: 'view', text: 'View', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[2]) },
      { id: 'add', text: 'Add', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[3]) },
      { id: 'settings', text: 'Settings', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[4]) },
    ];

    this.logoutItems = [
      { id: 'logout', text: 'Logout', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[5]) },
    ];
  });
}

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  onMenuItemClick(itemId: string) {
    this.menuItemClick.emit(itemId);
    this.toggleSidebar();
  }

  capitalizeRole(role: string | undefined | null): string {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }

  getDisplayName(): string {
    if (this.driver.driverName || this.driver.contact) {
      return this.capitalizeRole(this.driver.driverName);
    }
    return this.driverFirstName || 'User';
  }
}