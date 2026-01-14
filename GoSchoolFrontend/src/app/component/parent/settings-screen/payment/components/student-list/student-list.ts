import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentDTO } from '../../../../../../dto/studentDTO';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css']
})
export class StudentList {

  @Input() students: StudentDTO[] = [];
  @Input() isLoading = false;
  @Input() error = '';
  @Input() loadingMessage = '';

  @Output() studentSelected = new EventEmitter<StudentDTO>();

  onStudentSelected(student: StudentDTO) {
    this.studentSelected.emit(student);
  }

  getDriverName(student: StudentDTO): string {
   if (!student || !student.driverDto) return '';
    return student.driverDto.driverName ?? '';
  }

  hasDriverInfo(student: StudentDTO): boolean {
     if (!student) return false;
    return !!student?.driverDto?.driverName;
  }

  capitalizeLetters(value: string): string {
    if (!value) return '';
    return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
