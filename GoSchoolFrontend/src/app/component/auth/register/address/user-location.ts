import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Province } from '../../../constant/province';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-location',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-location.html',
  styleUrls: ['./user-location.css'],
})
export class UserLocation {
  @Input() form!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  provinces = Object.values(Province);
  selectedProvince: Province | null = null;

  validationMessages: { [key: string]: { [key: string]: string } } = {
    city: {
      required: 'City is required',
      minlength: 'City must be at least 5 characters long',
      maxlength: 'City cannot be more than 30 characters long',
      pattern: 'City can only contain letters and spaces',
    },
    address: {
      required: 'Address is required',
      minlength: 'Address must be at least 2 characters long',
      pattern: 'Address can only contain letters and spaces',
    },
    postalCode: {
      required: 'Postal code is required',
      pattern: 'Postal code must be exactly 4 digits, numbers only',
    },

    province: {
      required: 'Province is required',
    },
  };

  constructor(private router: Router) {}

  getErrorMessage(controlName: string) {
    const control = this.form.get(controlName);
    if (!control || !control.errors || !control.touched) return null;

    const errors = control.errors;
    const messages = this.validationMessages[controlName];

    if (errors['required']) return messages.required;
    if (errors['minlength']) return messages.minlength;
    if (errors['maxlength']) return messages.maxlength;
    if (errors['pattern']) return messages.pattern;

    return null;
  }
  
 goNext() {
  const stepControls = ['city', 'address', 'postalCode', 'province'];
  stepControls.forEach(control => this.form.get(control)?.markAsTouched());

  const valid = stepControls.every(control => this.form.get(control)?.valid);
  if (valid) {
    this.nextStep.emit();
  }
}

goPrevious() {
  this.previousStep.emit();
}

}
