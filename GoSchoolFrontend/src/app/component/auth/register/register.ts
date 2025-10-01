import { Component } from '@angular/core';
import { RegisterUserInfo } from "./details/register-user-info";
import { UserLocation } from './address/user-location';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccontSetup } from './account-setup/account-setup';
import { ReviewSubmit } from './review-submit/review-submit';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Auth } from '../../../service/serviceAuth/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RegisterUserInfo, UserLocation, AccontSetup, ReviewSubmit],
  providers: [Auth],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  currentStep = 1;
  form!: FormGroup;

  constructor(private router: Router, private auth: Auth) {
    const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password && confirmPassword && password !== confirmPassword
        ? { mismatch: true }
        : null;
    };

    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[A-Za-z\s]+$/)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z\s]+$/)]),
      contact: new FormControl('', [Validators.required, Validators.pattern(/^\d{10,11}$/)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+\-]+@gmail\.com$/)]),
      city: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern(/^[A-Za-z\s]+$/)]),
      address: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z0-9\s,.-]+$/)]),
      postalCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
      province: new FormControl(null, Validators.required),
      username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^[a-zA-Z\\s]+$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      role: new FormControl(null, Validators.required),
    }, { validators: passwordMatchValidator });
  }

  // Step navigation
  onNextStep() { if (this.isStepValid()) this.currentStep++; }
  onPreviousStep() { this.currentStep > 1 ? this.currentStep-- : this.router.navigate(['/login']); }

  // Final submit called by ReviewSubmit
  onSubmitForm() {
    Object.keys(this.form.controls).forEach(ctrl => this.form.get(ctrl)?.markAsTouched());

    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Submitting form:', formData);

      this.auth.register(formData).subscribe({
        next: () => this.router.navigate(['/login']),
        error: err => console.error('Registration error', err)
      });
    } else {
      console.log('Form invalid!');
    }
  }

  getStepControls(): string[] {
    switch (this.currentStep) {
      case 1: return ['firstName','surname','contact','email'];
      case 2: return ['city','address','postalCode','province'];
      case 3: return ['firstName', 'email','password','confirmPassword','role'];
      case 4: return Object.keys(this.form.controls); 
      default: return [];
    }
  }

  isStepValid(): boolean {
    const controls = this.getStepControls();
    return controls.every(name => this.form.get(name)?.valid);
  }
}
