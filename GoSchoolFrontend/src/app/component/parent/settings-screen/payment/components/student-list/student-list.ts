import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentDTO } from '../../../../../../dto/studentDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css']
})
export class StudentList {

  @Input() student: StudentDTO | null = null;
  @Input() students: StudentDTO[] =[];
  @Input() isLoading = false;
  @Input() error = '';
  @Input() loadingMessage = '';
  
  @Output() studentSelected = new EventEmitter<StudentDTO>();

  onStudentSelected(student: StudentDTO) {
    this.studentSelected.emit(student);
  }

   getDriverName(): string {
    if (!this.student?.driverDto) return '';
    return `${this.student.driverDto.driverName || ''}`.trim();
  }

  // Check if driver exists and has any data
  hasDriverInfo(): boolean {
    return !!this.student?.driverDto && (
      !!this.student.driverDto.driverName
    );
  }

  capitalizeLetters(value: string): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }


}
