import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-my-children',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './my-children.html',
  styleUrl: './my-children.css'
})
export class MyChildren {

  selectedStudent: any = null;
  constructor(private router: Router) { }

  // Sample student data
  student1 = {
    id: 'STU001',
    name: 'Bafo Doe',
    school: 'Sidinani Senior Secondary School',
    grade: 'Grade 11',
    dob: '2007-05-15',
    parentName: 'Parent Doe',
    email: 'bafo.doe@school.com',
    phone: '+1234567890',
    address: '123 Main St, City, State'
  };

  student2 = {
    id: 'STU002',
    name: 'John Doe',
    school: 'Mimosa Senior Secondary School',
    grade: 'Grade 10',
    dob: '2008-03-22',
    parentName: 'Parent Doe',
    email: 'john.doe@school.com',
    phone: '+1234567891',
    address: '124 Main St, City, State'
  };

  showStudentDetail(student: any) {
    this.selectedStudent = student;
  }

  closeStudentDetail() {
    this.selectedStudent = null;
  }

  goBack() {
    this.router.navigate(['/parent-dashboard/settings']);
  }

}
