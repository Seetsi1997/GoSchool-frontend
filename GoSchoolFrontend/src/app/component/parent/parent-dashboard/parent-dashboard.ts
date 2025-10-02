import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent-dashboard',
  imports: [CommonModule],
  templateUrl: './parent-dashboard.html',
  styleUrl: './parent-dashboard.css'
})
export class ParentDashboard {

  isSidebarOpen = false;

  toggleSidebar(event: Event) {
    event.stopPropagation(); 
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false; 
  }

}
