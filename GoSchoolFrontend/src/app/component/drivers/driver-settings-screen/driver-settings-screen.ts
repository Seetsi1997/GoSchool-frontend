import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DriverDTO } from '../../../dto/driverDTO';
import { Driver } from '../../../service/serviceDriver/driver';
import { SvgService } from '../../../service/SvgService/svg-service';
import { Role } from '../../constant/role';
import { Account } from "./components/account-profile-screen/account/account";
import { Profile } from "../../parent/settings-screen/settings/profile/profile";
import { DriverProfile } from './components/driver-profile/driver-profile';

@Component({
  selector: 'app-driver-settings-screen',
  imports: [CommonModule, Account, DriverProfile],
   providers: [Driver, SvgService],
  templateUrl: './driver-settings-screen.html',
  styleUrl: './driver-settings-screen.css'
})
export class DriverSettingsScreen {
  selectedTab = 'account'; 
  driver: DriverDTO = {} as DriverDTO;
   isLoading = true;
    driverFirstName = '';
    role: Role | undefined = undefined;

   privacyItems: any[] = [];
     
      constructor(
        private router: Router,
        private svgService: SvgService,
        private sanitizer: DomSanitizer,
        private driverService: Driver
      ) {}
    
      ngOnInit() {
        this.loadMenuAndLogoutItems();
        this.loadDriverData();
      }
    
      private loadMenuAndLogoutItems() {
        const menuIcons = ['mail','call','location'];
    
        this.svgService.preloadSvgs(menuIcons).subscribe(svgs => {
        
          this.privacyItems = [
            { id: 'mail', text: 'Email', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[0]) },
            { id: 'call', text: 'Call', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[1]) },
            { id: 'location', text: 'Location', svg: this.sanitizer.bypassSecurityTrustHtml(svgs[2]) },
          ];
        });
      }
    
      
  loadDriverData() {
    this.isLoading = true;
    this.driverService.getCurrentDriver().subscribe({
      next: (data) => {
        this.driverFirstName = this.capitalizeRole(data.driverName ?? '');
        this.role = data.role;
        this.driver = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading driver data:', error);
        this.isLoading = false;
      },
    });
  }
      goBack() {
        this.router.navigate(['/parent-dashboard/settings']);
      }
  setTab(tab: string) {
    this.selectedTab = tab;
  }

    getDisplayName(): string {
    if (this.driver.driverName || this.driver.contact) {
      return this.capitalizeRole(this.driver.driverName);
    }
    return this.driverFirstName || 'User';
  }

   capitalizeRole(role: string | undefined | null): string {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }
}
