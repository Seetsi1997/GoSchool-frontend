import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentDTO } from '../../../../../../dto/studentDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-detail',
  imports: [CommonModule],
  templateUrl: './student-detail.html',
  styleUrls: ['./student-detail.css']
})
export class StudentDetail {
  @Input() student: StudentDTO | null = null;
  @Input() availableGrades: any[] = [];
  
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<StudentDTO>();

  onClose() {
    this.close.emit();
  }

  onEdit() {
    if (this.student) {
      this.edit.emit(this.student);
    }
  }

  // Safe getter methods for driver information
  getDriverContact(): string {
    if (!this.student?.driverDto) return '';
    
    const driver = this.student.driverDto;
    
    return driver.contact || '';
  }

  getDriverAddress(): string {
    return this.student?.driverDto?.driverLocation?.address || '';
  }

  getDriverEmail(): string {
    return this.student?.driverDto?.email || '';
  }

  getDriverName(): string {
    if (!this.student?.driverDto) return '';
    return `${this.student.driverDto.driverName || ''} ${this.student.driverDto.driverSurname || ''}`.trim();
  }

  // Check if driver exists and has any data
  hasDriverInfo(): boolean {
    return !!this.student?.driverDto && (
      !!this.student.driverDto.driverName ||
      !!this.student.driverDto.email ||
      !!this.getDriverContact() ||
      !!this.getDriverAddress()
    );
  }

  capitalizeLetters(value: string): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  formatGrade(grade: string | null | undefined): string {
    if (!grade) return 'Not assigned';
    const gradeObj = this.availableGrades.find((g) => g.value === grade);
    return gradeObj ? gradeObj.label : grade.replace('GRADE_', 'Grade ');
  }
}
