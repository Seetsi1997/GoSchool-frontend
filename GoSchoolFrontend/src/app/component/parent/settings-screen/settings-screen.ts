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
  
  constructor(private router: Router) {}

  openProfile() {
    this.router.navigate(['/parent-dashboard/settings/settings-profile']);
  }

  openPersonalDetails() {
    this.router.navigate(['/parent-dashboard/settings/settings-personal-details']);
  }

  openTransactionsHistory() {
    this.router.navigate(['/parent-dashboard/settings/settings-transactions-history']);
  }

  openMyChildren() {
    this.router.navigate(['/parent-dashboard/settings/settings-my-children']);
  }

  openChangePassword() {
    this.router.navigate(['/parent-dashboard/settings/settings-change-password']);
  }

  openTermsAndPrivacy() {
    this.router.navigate(['/parent-dashboard/settings/settings-terms-privacy']);
  }
}