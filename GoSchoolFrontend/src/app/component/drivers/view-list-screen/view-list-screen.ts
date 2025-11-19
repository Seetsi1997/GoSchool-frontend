import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentDTO } from '../../../dto/studentDTO';
import { Driver } from '../../../service/serviceDriver/driver';

@Component({
  selector: 'app-view-list-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-list-screen.html',
  styleUrls: ['./view-list-screen.css']
})
export class ViewListScreen implements OnInit {
  currentTab: string = 'all';
  searchQuery: string = '';
  assignedStudents: StudentDTO[] = [];
  paidStudents: StudentDTO[] = [];
  unpaidStudents: StudentDTO[] = [];
  hasStudents: boolean = false;

  constructor(private driverService: Driver) {}

  ngOnInit(): void {
    this.loadDriverStudents();
  }

  onTabChange(tab: string): void {
    this.currentTab = tab;
  }

  searchUsers(): void {
    console.log('Searching for:', this.searchQuery);
  }

  loadDriverStudents(): void {
    this.driverService.getCurrentDriver().subscribe({
      next: (driver) => {
        this.assignedStudents = driver?.assignedStudents || [];
        this.hasStudents = this.assignedStudents.length > 0;

        this.paidStudents = this.assignedStudents.filter(s => s.paymentStatus === 'PAID');
        this.unpaidStudents = this.assignedStudents.filter(s => s.paymentStatus !== 'PAID');
      },
      error: (err) => {
        console.error('Error loading students:', err);
        this.assignedStudents = [];
        this.paidStudents = [];
        this.unpaidStudents = [];
        this.hasStudents = false;
      }
    });
  }
}
