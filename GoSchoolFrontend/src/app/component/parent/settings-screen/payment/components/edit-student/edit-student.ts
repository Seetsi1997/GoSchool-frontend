import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentDTO } from '../../../../../../dto/studentDTO';
import { LearnerGrade } from '../../../../../constant/learnerGrade';

@Component({
  selector: 'app-edit-student',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-student.html',
  styleUrls: ['./edit-student.css']
})
export class EditStudent implements OnChanges{
  @Input() student: StudentDTO | null = null;
  @Input() availableGrades: any[] = [];
  @Input() isSaving = false;
  
  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  // Local properties for two-way binding
  schoolName: string = '';
  studentGrade: string = '';

  private originalStudent: StudentDTO | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && this.student) {
      // Store original values - THIS WAS MISSING!
      this.originalStudent = { ...this.student };
      
      this.schoolName = this.student.schoolName || '';

      // Convert "Grade 12" -> "GRADE_12"
      this.studentGrade = this.convertLabelToEnum(this.student.studentGrade);
      
    }
  }

  convertLabelToEnum(label: string): string {
    if (!label) return '';
    
    const found = this.availableGrades.find(g => g.label === label);
    
    return found ? found.value : '';
  }

  onSave() {
    // Update the main student object with local values
    if (this.student) {
      this.student.schoolName = this.schoolName;
      this.student.studentGrade = this.studentGrade as any;
    }
    
    this.save.emit();
  }

  onClose() {
    this.close.emit();
  }

  capitalizeLetters(value: string): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  get canSave(): boolean {
    const hasRequiredFields = !!this.schoolName && !!this.studentGrade;
    const hasChanges = this.hasChanges();
    
    return hasRequiredFields && hasChanges && !this.isSaving;
  }

  private hasChanges(): boolean {
    if (!this.originalStudent) {
      return false;
    }

    const schoolChanged = this.schoolName !== this.originalStudent.schoolName;
    
    // Convert original grade to enum value for comparison
    const originalGradeValue = this.convertLabelToEnum(this.originalStudent.studentGrade || '');
    const gradeChanged = this.studentGrade !== originalGradeValue;
    
    return schoolChanged || gradeChanged;
  }

  getCurrentGradeLabel(): string {
    if (!this.studentGrade) return 'Not assigned';
    const grade = this.availableGrades.find(g => g.value === this.studentGrade);
    return grade ? grade.label : String(this.studentGrade);
  }

}