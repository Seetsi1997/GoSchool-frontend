import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, RouterModule],
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.css']
})
export class ChangePassword {
  showCurrentPassword= false;
  showPassword = false;
  showConfirmPassword = false;


  constructor(private router: Router) { } 
    goBack() {
    this.router.navigate(['/parent-dashboard/settings']);
  }

}
