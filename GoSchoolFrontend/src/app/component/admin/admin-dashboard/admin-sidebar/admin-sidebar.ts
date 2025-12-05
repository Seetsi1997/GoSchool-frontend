import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  imports: [CommonModule],
  templateUrl: './admin-sidebar.html',
  styleUrls: ['./admin-sidebar.css']
})
export class AdminSidebar {
  activeSection = 'home'; 
  @Output() sectionChange = new EventEmitter<string>();

  select(section: string) {
    this.activeSection = section;
    this.sectionChange.emit(section);
  }
}



