import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings-screen',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './settings-screen.html',
  styleUrls: ['./settings-screen.css']
})
export class SettingsScreen {
  
  constructor(private router: Router) {}

  openProfile() {
    this.router.navigate(['/parent-dashboard/settings/profile']);
  }

  openPersonalDetails() {
    this.router.navigate(['/parent-dashboard/settings/personal-details']);
  }

  openTransactionsHistory() {
    this.router.navigate(['/parent-dashboard/settings/transactions-history']);
  }

  openMyChildren() {
    this.router.navigate(['/parent-dashboard/settings/my-children']);
  }

  openChangePassword() {
    this.router.navigate(['/parent-dashboard/settings/change-password']);
  }

  openTermsAndPrivacy() {
    this.router.navigate(['/parent-dashboard/settings/terms-privacy']);
  }
}