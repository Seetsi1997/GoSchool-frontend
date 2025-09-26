import { Component } from '@angular/core';
import { RegisterUserInfo } from "./details/register-user-info";
import { UserLocation } from './address/user-location';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccontSetup } from './account-setup/account-setup';
import { ReviewSubmit } from './review-submit/review-submit';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RegisterUserInfo, UserLocation, AccontSetup, ReviewSubmit],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  currentStep = 1;

  constructor(private router: Router) {}

  onNextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    } else {
      // Final step: maybe submit data
      console.log('All steps done!');
      this.router.navigate(['/login']);
    }
  }

  onPreviousStep() {
    if (this.currentStep === 1) {
      // Go back to login page
      this.router.navigate(['/login']);
    } else {
      this.currentStep--;
    }
  }
}
