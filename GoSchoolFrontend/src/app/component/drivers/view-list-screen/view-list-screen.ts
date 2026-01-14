import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentDTO } from '../../../dto/studentDTO';
import { Driver } from '../../../service/serviceDriver/driver';
import { PaymentStatus } from '../../constant/paymentStatus';

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
  
  // Removed hasStudents since we'll check per tab

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
        
        // Filter students by payment status
        this.paidStudents = this.assignedStudents.filter(s => s.paymentStatus === PaymentStatus.PAID);
        this.unpaidStudents = this.assignedStudents.filter(s => s.paymentStatus !== PaymentStatus.PAID);
      },
      error: (err) => {
        console.error('Error loading students:', err);
        this.assignedStudents = [];
        this.paidStudents = [];
        this.unpaidStudents = [];
      }
    });
  }

  // Method to check if current tab has students
  hasStudentsInCurrentTab(): boolean {
    switch(this.currentTab) {
      case 'all':
        return this.assignedStudents.length > 0;
      case 'paid':
        return this.paidStudents.length > 0;
      case 'unpaid':
        return this.unpaidStudents.length > 0;
      default:
        return false;
    }
  }

  
  capitalizeWords(value: string | undefined | null): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}