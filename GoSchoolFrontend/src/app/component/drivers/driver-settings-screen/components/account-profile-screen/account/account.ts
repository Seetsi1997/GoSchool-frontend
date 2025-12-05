import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from '../../../../../../service/serviceDriver/driver';
import { SvgService } from '../../../../../../service/SvgService/svg-service';
import { DomSanitizer } from '@angular/platform-browser';
import { DriverDTO } from '../../../../../../dto/driverDTO';

@Component({
  selector: 'app-account',
  imports: [CommonModule],
  providers: [Driver, SvgService],
  templateUrl: './account.html',
  styleUrls: ['./account.css']
})
export class Account  implements OnInit {
  @Input() activeItem: string = 'profile';
  @Output() menuItemClick = new EventEmitter<string>();
  
    
   driver: DriverDTO = {} as DriverDTO;
   isLoading = true;
   driverFirstName = '';
   driverUUID = '';
   profileItems: any[] = [];
   menuItems: any[] = [];

  constructor(private router: Router, private driverService: Driver, private svgService: SvgService,  private sanitizer: DomSanitizer) { }

    ngOnInit() {
    this.loadDriverData();
  
  }

    onMenuItemClick(itemId: string) {
    this.menuItemClick.emit(itemId);
  }

  private loadMenuAndLogoutItems() {
  const menuIcons = ['profile'];

  this.svgService.preloadSvgs(menuIcons).subscribe(svgs => {
   
     this.profileItems = [
      { id: 'profile', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[0]) },
    ];
  });
}


  loadDriverData() {
    this.isLoading = true;
    this.driverService.getCurrentDriver().subscribe({
      next: (data) => {
        this.driverFirstName = this.capitalizeRole(data.driverName ?? '');
        this.driverUUID = data.driverUUID;
        this.driver = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading driver data:', error);
        this.isLoading = false;
      },
    });
  }

  capitalizeRole(value:string | undefined | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  getDisplayName(): string {
    if (this.driver.driverName || this.driver.contact) {
      return this.capitalizeRole(this.driver.driverName);
    }
    return this.driverFirstName || 'User';
  }

  settingsScreen() {
    this.router.navigate(['/drivers-dashboard/settings/account']);
  }
}
