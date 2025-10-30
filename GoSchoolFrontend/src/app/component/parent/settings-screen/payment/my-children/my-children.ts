import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentDTO } from '../../../../../dto/studentDTO';
import { Parents } from '../../../../../service/serviceParent/parents';

@Component({
  selector: 'app-my-children',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [Parents],
  templateUrl: './my-children.html',
  styleUrls: ['./my-children.css']
})
export class MyChildren implements OnInit {
  students: StudentDTO[] = [];
  isLoading = false;
  error = '';
  selectedStudent: StudentDTO | null = null;
  loadingMessage = 'Loading students...';


  constructor(private router: Router, private parentService: Parents) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.error = '';
    this.loadingMessage = 'Loading students...';

    const startTime = Date.now();
    const minimumLoadTime = 2000; // 2 seconds

    this.parentService.getAllStudentsForParent().subscribe({
      next: (data) => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minimumLoadTime - elapsed);

        setTimeout(() => {
          this.students = data;
          this.isLoading = false;
          
          this.students.forEach((student, index) => {
            console.log(`Student ${index} grade:`, student.studentGrade);
          });
        }, remaining);
      },
      error: (err) => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minimumLoadTime - elapsed);

        setTimeout(() => {
          this.error = 'Failed to load students. Please check your connection and try again.';
          this.isLoading = false;
          console.error('Error loading students:', err);
        }, remaining);
      }
    });
  }
  
  showStudentDetail(student: StudentDTO) {
    this.selectedStudent = student;
  }

  closeStudentDetail() {
    this.selectedStudent = null;
  }

  goBack() {
    this.router.navigate(['/parent-dashboard/settings']);
  }

  // Add null checking
  formatGrade(grade: string | null | undefined): string {
    if (!grade) {
      return 'Not assigned';
    }
    
    return grade.replace('GRADE_', 'Grade ');
  }

  capitalizeLetters(value: string): string {
    if (!value) return '';
    return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' '); 
  }
}