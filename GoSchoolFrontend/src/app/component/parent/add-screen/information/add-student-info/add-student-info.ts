import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentDTO } from '../../../../../dto/studentDTO';
import { Parents } from '../../../../../service/serviceParent/parents';
import { LearnerGrade } from '../../../../constant/learnerGrade';
import { PaymentStatus } from '../../../../constant/paymentStatus';

@Component({
  selector: 'app-add-student-info',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  providers: [Parents],
  templateUrl: './add-student-info.html',
  styleUrls: ['./add-student-info.css']
})
export class AddStudentInfo implements OnInit {
  studentForm!: FormGroup;
  parentId!: string;
  availableGrades: { value: LearnerGrade, label: string }[] = []; 
  currentParent: any = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private parents: Parents
  ) {}

  ngOnInit(): void {
    this.initializeGrades();
    this.loadCurrentParent();
    
    this.studentForm = this.fb.group({
      studentFirstName: ['', Validators.required],
      studentSurname: ['', Validators.required],
      studentGrade: ['', Validators.required],
      schoolName: ['', Validators.required],
      parentName: ['']
    });
  }

  initializeGrades() {
    this.availableGrades = [
      { value: LearnerGrade.GRADE_8, label: 'Grade 8' },
      { value: LearnerGrade.GRADE_9, label: 'Grade 9' },
      { value: LearnerGrade.GRADE_10, label: 'Grade 10' },
      { value: LearnerGrade.GRADE_11, label: 'Grade 11' },
      { value: LearnerGrade.GRADE_12, label: 'Grade 12' }
    ];
  }

loadCurrentParent() {
  this.parents.getCurrentParent().subscribe({
    next: (parent) => {
      this.currentParent = parent;
      const parentFullName = `${parent.firstName}`.trim();
      this.studentForm.patchValue({
        parentName: this.capitalizeRole(parentFullName) 
      });
    },
    error: (err) => {
      console.error('Error fetching parent:', err);
    }
  });
}

  submitStudent() {
    if (this.studentForm.invalid || !this.currentParent) {
      console.error('Form is invalid or parent not loaded');
      return;
    }

    const student: StudentDTO = {
      studentUUID: '',
      studentFirstName: this.studentForm.value.studentFirstName,
      studentSurname: this.studentForm.value.studentSurname,
      schoolName: this.studentForm.value.schoolName,
      monthlyPaymentAmount: 0,
      studentGrade: this.studentForm.value.studentGrade,
      parentName:  this.studentForm.value.parentName,
      paymentStatus: PaymentStatus.PENDING,
      paymentRecordDTO: [],
      parentPhoneNumber: this.currentParent.phoneNumber,
      parentEmail: this.currentParent.email,
      parentAddress: this.currentParent.address,
      parentCity: this.currentParent.city,
      parentPostalCode: this.currentParent.postalCode,
      parentProvince: this.currentParent.province,
      parentUUID: this.currentParent.parentUUID
    };

    const parentId = this.currentParent.parentUUID;
    
    this.parents.addStudent(parentId, student).subscribe({
      next: (res) => {
        console.log('Student added successfully', res);
        this.router.navigate(['/parent-dashboard/add-upload']);
      },
      error: (err) => {
        console.error('Error adding student:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/parent-dashboard/add-upload']);
  }

   capitalizeRole(role: string): string {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  }
}