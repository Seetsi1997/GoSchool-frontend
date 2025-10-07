import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-personal-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './personal-details.html',
  styleUrl: './personal-details.css'
})
export class PersonalDetails {
 
   constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/parent-dashboard/settings']);
  }
}
