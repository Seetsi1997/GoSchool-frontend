import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Role } from '../../../constant/role';
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-account-setup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account-setup.html',
  styleUrls: ['./account-setup.css'],
})
export class AccontSetup implements OnInit{
  @Input() form!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  role = Object.values(Role);
  selectedRole: Role | null = null;
  showPassword = false;
  showConfirmPassword = false;

  validationMessages: { [key: string]: { [key: string]: string } } = {
    firstName: {
      required: 'Name is required',
      minlength: 'Name must be at least 2 characters long',
      maxlength: 'Name cannot be more than 30 characters long',
      pattern: 'Name can only contain letters and spaces',
    },
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address',
      pattern: 'Only Gmail addresses are allowed',
    },
    password: {
      required: 'Password is required',
      minlength: 'Min 8 chars',
      maxlength: 'Max 15 chars',
      pattern: 'Requires A-Z, a-z, 0-9, special char, no spaces',
    },
    confirmPassword: {
      required: 'Password confirmation is required',
      pattern: 'Passwords must match',
    },
    role: {
      required: 'Role is required',
    },
    contact: {
      required: 'Contact is required',
      pattern: 'Contact must be 10 or 11 digits, numbers only',
    },
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.role = this.role.filter(r => r !== 'ADMIN');
  }

  

  static passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { mismatch: true } : null;
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
    if (errors['mismatch']) return this.validationMessages.confirmPassword.pattern;

    return null;
  }

  goNext() {
    const stepControls = ['firstName', 'email', 'contact', 'password', 'confirmPassword', 'role'];
    stepControls.forEach((control) => this.form.get(control)?.markAsTouched());

    // Check both controls AND form group (so mismatch stops navigation)
    const valid =
      stepControls.every((control) => this.form.get(control)?.valid) &&
      !this.form.hasError('mismatch');

    if (valid) {
      this.nextStep.emit();
    }
  }

  goPrevious() {
    this.previousStep.emit();
  }
}
