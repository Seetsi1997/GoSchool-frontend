import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-user-info',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register-user-info.html',
  styleUrls: ['./register-user-info.css'],
})
export class RegisterUserInfo {
  @Input() form!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  constructor(private router: Router) {}

  validationMessages: { [key: string]: { [key: string]: string } } = {
    firstName: {
      required: 'Name is required',
      minlength: 'Name must be at least 2 characters long',
      maxlength: 'Name cannot be more than 30 characters long',
      pattern: 'Name can only contain letters and spaces',
    },
    surname: {
      required: 'Surname is required',
      minlength: 'Surname must be at least 2 characters long',
      pattern: 'Surname can only contain letters and spaces',
    },
    contact: {
      required: 'Contact is required',
      pattern: 'Contact must be 10 or 11 digits, numbers only',
    },
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address',
      pattern: 'Only Gmail addresses are allowed',
    },
  };

  getErrorMessage(controlName: string) {
    const control = this.form.get(controlName);
    if (!control || !control.errors || !control.touched) return null;

    const errors = control.errors;
    const messages = this.validationMessages[controlName];

    if (errors['required']) return messages.required;
    if (errors['minlength']) return messages.minlength;
    if (errors['maxlength']) return messages.maxlength;
    if (errors['pattern']) return messages.pattern;
    if (errors['email']) return messages.email;

    return null;
  }

  goNext() {
    const stepControls = ['firstName', 'surname', 'contact', 'email'];
    stepControls.forEach((control) => this.form.get(control)?.markAsTouched());

    const valid = stepControls.every((control) => this.form.get(control)?.valid);
    if (valid) {
      this.nextStep.emit();
    }
  }

  goPrevious() {
    this.router.navigate(['/login']);
  }
}
