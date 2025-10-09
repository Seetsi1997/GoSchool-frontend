import { Component } from '@angular/core';
import { ParentDashboard } from "../parent-dashboard/parent-dashboard";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-screen',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './add-screen.html',
  styleUrl: './add-screen.css'
})
export class AddScreen {

  constructor(private router: Router){}
  
goBack() {
    this.router.navigate(['/parent-dashboard/home']);
  }

}
