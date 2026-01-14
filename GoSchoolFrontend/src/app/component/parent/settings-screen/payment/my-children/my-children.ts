import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DriverDTO } from '../../../../../dto/driverDTO';
import { StudentDTO } from '../../../../../dto/studentDTO';
import { Parents } from '../../../../../service/serviceParent/parents';
import { StudentService } from '../../../../../service/serviceStudent/student-service';
import { LearnerGrade } from '../../../../constant/learnerGrade';
import { EditStudent } from '../components/edit-student/edit-student';
import { StatusPopup } from '../components/status-popup/status-popup';
import { StudentDetail } from '../components/student-detail/student-detail';
import { StudentList } from '../components/student-list/student-list';


@Component({
  selector: 'app-my-children',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, StatusPopup, StudentList,  StudentDetail,  EditStudent],
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
  originalStudent: StudentDTO | null = null; 
  isSaving = false;

  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupType: 'success' | 'error' | 'info' = 'info';

  // Only grades 8-12 as specified in the enum
 availableGrades = [
    { value: LearnerGrade.GRADE_8, label: '8' },
    { value: LearnerGrade.GRADE_9, label: '9' },
    { value: LearnerGrade.GRADE_10, label: '10' },
    { value: LearnerGrade.GRADE_11, label: '11' },
    { value: LearnerGrade.GRADE_12, label: '12' },
  ];

  constructor(
    private router: Router,
    private parentService: Parents,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
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
        }, remaining);
      },
      error: (err) => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minimumLoadTime - elapsed);

        setTimeout(() => {
          this.error = 'Failed to load students. Please check your connection and try again.';
          this.isLoading = false;
        }, remaining);
      },
    });
  }

  showStudentDetail(student: StudentDTO) {
    this.selectedStudent = student;
  }

  closeStudentDetail() {
    this.selectedStudent = null;
  }

  openEditPopup(student: StudentDTO) {
    this.studentToEdit = { ...student }; 
    this.originalStudent = { ...student }; // Store original values for comparison
    this.showEditPopup = true;
  }

  closeEditPopup() {
    this.showEditPopup = false;
    this.studentToEdit = null;
    this.originalStudent = null; // Clear original values
    this.isSaving = false;
  }

saveStudentChanges() {
  if (!this.hasChanges()) {
    this.showPopupMessage('No Changes', 'No changes were made to your student information.', 'info');
    return;
  }
  if (!this.studentToEdit) return;

  this.isSaving = true;
  const actualParentUUID = this.studentToEdit.parentUUID;

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
    schoolName: this.studentToEdit.schoolName,
    driverDto: this.studentToEdit.driverDto?.driverName ? this.studentToEdit.driverDto : undefined
  };

  if (actualParentUUID) {
    this.studentService.updateStudents(actualParentUUID, this.studentToEdit.studentUUID, updateData)
      .subscribe({
        next: (updatedStudent) => {
          this.isSaving = false;
          const index = this.students.findIndex(s => s.studentUUID === updatedStudent.studentUUID);
          if (index !== -1) {
            this.students[index] = { ...this.students[index], ...updatedStudent };
          }
          if (this.selectedStudent && this.selectedStudent.studentUUID === updatedStudent.studentUUID) {
            this.selectedStudent = { ...this.selectedStudent, ...updatedStudent };
          }
          this.closeEditPopup();
          this.showPopupMessage('Success', 'Student information updated successfully!', 'success');
        },
        error: (err) => {
          this.isSaving = false;
          this.showPopupMessage('Error', 'Failed to update student. Please try again.', 'error');
        },
      });
  } else {
    this.isSaving = false;
    this.showPopupMessage('Error', 'Parent information not found. Please contact support.', 'error');
  }
}

private convertToDriverDTO(driver: any | null): DriverDTO | null {
  if (!driver) {
    return null;
  }

return {
  driverUUID: driver.driverUUID ?? '',
  driverName: driver.driverName ?? '',
  driverSurname: driver.driverSurname ?? '', 
  email: driver.email ?? '',
  contact: driver.userAccount ? driver.userAccount.phoneNumber : '',
  driverLocation: {
    address: driver.driverLocation.address,
    city: driver.driverLocation.city,
    postalCode: driver.driverLocation.postalCode,
    province: driver.driverLocation.province,
    suburb: driver.driverLocation.suburb,
  },
  totalNumberOfStudents: driver.totalNumberOfStudents ?? 0,
  assignedStudents: [],
  userId: driver.userAccount?.uuid ?? '',
  password: driver.userAccount ? driver.userAccount.password : '',
};
}
  // Fixed hasChanges method
  hasChanges(): boolean {
    if (!this.studentToEdit || !this.originalStudent) return false;

    // Compare only the editable fields
    return (
      this.studentToEdit.schoolName !== this.originalStudent.schoolName ||
      this.studentToEdit.studentGrade !== this.originalStudent.studentGrade
    );
  }

  // Alternative: More detailed change detection
  hasChangesDetailed(): boolean {
    if (!this.studentToEdit || !this.originalStudent) return false;

    const changedFields = this.getChangedFields();
    return changedFields.length > 0;
  }

  // Optional: Get list of changed fields for debugging
  getChangedFields(): string[] {
    if (!this.studentToEdit || !this.originalStudent) return [];

    const changedFields: string[] = [];

    if (this.studentToEdit.schoolName !== this.originalStudent.schoolName) {
      changedFields.push('schoolName');
    }
    if (this.studentToEdit.studentGrade !== this.originalStudent.studentGrade) {
      changedFields.push('studentGrade');
    }

    return changedFields;
  }

  showPopupMessage(title: string, message: string, type: 'success' | 'error' | 'info') {
    this.popupTitle = title;
    this.popupMessage = message;
    this.popupType = type;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  goBack() {
    this.router.navigate(['/parent-dashboard/settings']);
  }

  formatGrade(grade: string | null | undefined): string {
    if (!grade) {
      return 'Not assigned';
    }
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