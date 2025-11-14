import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentDTO } from '../../../../../dto/studentDTO';
import { Parents } from '../../../../../service/serviceParent/parents';
import { StudentService } from '../../../../../service/serviceStudent/student-service';
import { StudentEntity } from '../../../../../model/student';

@Component({
  selector: 'app-my-children',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [Parents, StudentService],
  templateUrl: './my-children.html',
  styleUrls: ['./my-children.css'],
})
export class MyChildren implements OnInit {
  students: StudentDTO[] = [];
  isLoading = false;
  error = '';
  selectedStudent: StudentDTO | null = null;
  loadingMessage = 'Loading students...';

  showEditPopup = false;
  studentToEdit: StudentDTO | null = null;
  isSaving = false;

  // Only grades 8-12 as specified in the enum
  availableGrades = [
    { value: 'GRADE_8', label: 'Grade 8' },
    { value: 'GRADE_9', label: 'Grade 9' },
    { value: 'GRADE_10', label: 'Grade 10' },
    { value: 'GRADE_11', label: 'Grade 11' },
    { value: 'GRADE_12', label: 'Grade 12' },
  ];

  constructor(
    private router: Router,
    private parentService: Parents,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.debugLocalStorage();
  }

  debugLocalStorage() {
    console.log('=== LOCAL STORAGE DEBUG ===');
    console.log('parentId:', localStorage.getItem('uuid'));
    console.log('parentUUID:', localStorage.getItem('parentUUID')); // This will be null
    console.log('token:', localStorage.getItem('token') ? 'Exists' : 'Missing');
    console.log('userUUID:', localStorage.getItem('uuid'));
    console.log('role:', localStorage.getItem('role'));
    console.log('All localStorage items:');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      console.log(`  ${key}: ${localStorage.getItem(`${key}`) ?? 'null'}`);
    }
    console.log('=== END DEBUG ===');
  }

  loadStudents(): void {
    this.isLoading = true;
    this.error = '';
    this.loadingMessage = 'Loading students...';

    const startTime = Date.now();
    const minimumLoadTime = 2000;

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
      },
    });
  }

showStudentDetail(student: StudentDTO) {
  this.selectedStudent = student;
  console.log('Student parent data:', {
    parentName: student.parentName,
    parentUUID: student.parentUUID, // This will be null until you fix the DTO
    parentEmail: student.parentEmail,
    parentPhone: student.parentPhoneNumber
  });
}

  closeStudentDetail() {
    this.selectedStudent = null;
  }

  openEditPopup(student: StudentDTO) {
    this.studentToEdit = { ...student }; // Create a copy
    this.showEditPopup = true;
  }

  closeEditPopup() {
    this.showEditPopup = false;
    this.studentToEdit = null;
    this.isSaving = false;
  }

 saveStudentChanges() {
  if (!this.studentToEdit) return;

  this.isSaving = true;

  // Use the ACTUAL parent UUID from student data, not the User UUID from localStorage
  const actualParentUUID = this.studentToEdit.parentUUID;
  console.log('Actual Parent UUID from student:', actualParentUUID);
  console.log('User UUID from localStorage:', localStorage.getItem('parentUUID'));
  console.log('parentUUID:', localStorage.getItem('parentUUID'));


  const updateData: StudentDTO = {
  studentGrade: this.studentToEdit.studentGrade,
  monthlyPaymentAmount: this.studentToEdit.monthlyPaymentAmount,
  paymentStatus: this.studentToEdit.paymentStatus,
  studentFirstName: this.studentToEdit.studentFirstName,
  studentSurname: this.studentToEdit.studentSurname,
  parentName: this.studentToEdit.parentName,
  parentPhoneNumber: this.studentToEdit.parentPhoneNumber,
  parentEmail: this.studentToEdit.parentEmail,
  studentUUID: this.studentToEdit.studentUUID,
  paymentRecordDTO: this.studentToEdit.paymentRecordDTO,
  parentAddress: this.studentToEdit.parentAddress,
  parentCity: this.studentToEdit.parentCity,
  parentPostalCode: this.studentToEdit.parentPostalCode,
  parentProvince: this.studentToEdit.parentProvince,
  parentUUID: this.studentToEdit.parentUUID,
  schoolName: this.studentToEdit.schoolName // Add this line
};

  if (actualParentUUID) {
    // Use the ACTUAL parent UUID (Parent entity UUID)
    this.studentService.updateStudents(actualParentUUID, this.studentToEdit.studentUUID, updateData)
      .subscribe({
        next: (updatedStudent) => {
          this.isSaving = false;
          // Update local data
          const index = this.students.findIndex(s => s.studentUUID === updatedStudent.studentUUID);
          if (index !== -1) {
            this.students[index] = { ...this.students[index], ...updatedStudent };
          }
          if (this.selectedStudent && this.selectedStudent.studentUUID === updatedStudent.studentUUID) {
            this.selectedStudent = { ...this.selectedStudent, ...updatedStudent };
          }
          this.closeEditPopup();
          console.log('Student updated successfully!');
        },
        error: (err) => {
          this.isSaving = false;
          console.error('Error updating student:', err);
          this.error = 'Failed to update student. Please try again.';
        },
      });
  } else {
    this.isSaving = false;
    this.error = 'Parent information not found. Please contact support.';
    console.error('Parent UUID is null in student data');
  }
} 


  goBack() {
    this.router.navigate(['/parent-dashboard/settings']);
  }

  formatGrade(grade: string | null | undefined): string {
    if (!grade) {
      return 'Not assigned';
    }

    // Find the grade label from availableGrades
    const gradeObj = this.availableGrades.find((g) => g.value === grade);
    return gradeObj ? gradeObj.label : grade.replace('GRADE_', 'Grade ');
  }

  capitalizeLetters(value: string): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
