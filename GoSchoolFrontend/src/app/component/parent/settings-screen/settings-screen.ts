import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings-screen',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './settings-screen.html',
  styleUrls: ['./settings-screen.css']
})
export class SettingsScreen {
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  // Check if we're on the base settings route (no child route active)
  isBaseSettingsRoute(): boolean {
    return this.router.url === '/parent-dashboard/settings' || 
           this.router.url === '/parent-dashboard/settings/';
  }

  openProfile() {
    this.router.navigate(['profile'], { relativeTo: this.activatedRoute });
  }

  openPersonalDetails() {
    this.router.navigate(['personal-details'], { relativeTo: this.activatedRoute });
  }

  openTransactionsHistory() {
    this.router.navigate(['transactions-history'], { relativeTo: this.activatedRoute });
  }

  openMyChildren() {
    this.router.navigate(['my-children'], { relativeTo: this.activatedRoute });
  }

  openChangePassword() {
    this.router.navigate(['change-password'], { relativeTo: this.activatedRoute });
  }

  openTermsAndPrivacy() {
    this.router.navigate(['terms-privacy'], { relativeTo: this.activatedRoute });
  }
}