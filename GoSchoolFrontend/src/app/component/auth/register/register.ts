import { Component } from '@angular/core';
import { RegisterUserInfo } from "./details/register-user-info";
import { UserLocation } from './address/user-location';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReviewSubmit } from './review-submit/review-submit';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Auth } from '../../../service/serviceAuth/auth';
import { AccontSetup } from './account-setup/account-setup';
import { Observable } from 'rxjs';
import { Parents } from '../../../service/serviceParent/parents';
import { Driver } from '../../../service/serviceDriver/driver';
import { Role } from '../../constant/role';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RegisterUserInfo, UserLocation, AccontSetup, ReviewSubmit],
  providers: [Auth, Parents, Driver],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  currentStep = 1;
  form!: FormGroup;

  constructor(
    private router: Router,
    private auth: Auth,
    private parents: Parents,
    private driver: Driver
  ) {
    this.form = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[A-Za-z\s]+$/),
        ]),
        surname: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[A-Za-z\s]+$/),
        ]),
        contact: new FormControl('', [Validators.required, Validators.pattern(/^\d{10,11}$/)]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+\-]+@gmail\.com$/),
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern(/^[A-Za-z\s]+$/),
        ]),
        address: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[A-Za-z0-9\s,.-]+$/),
        ]),
        postalCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
        province: new FormControl(null, Validators.required),
       /* username: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z\\s]+$'),
        ]),*/
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
          Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ]),
        role: new FormControl(null, Validators.required),
      },
      { validators: AccontSetup.passwordMatchValidator }
    );
  }

  // Step navigation
  onNextStep() {
    if (this.isStepValid()) this.currentStep++;
  }
  onPreviousStep() {
    this.currentStep > 1 ? this.currentStep-- : this.router.navigate(['/login']);
  }

  // Final submit called by ReviewSubmit
 onSubmitForm() {
  console.log('Parent onSubmitForm called'); 
  Object.keys(this.form.controls).forEach(ctrl =>
    this.form.get(ctrl)?.markAsTouched()
  );

  if (!this.form.valid) {
    console.log('Form invalid!');
    return;
  }

  const formData = this.form.value;
  console.log('Submitting form:', formData);

  let request$: Observable<any>;
  switch (formData.role) {
    case Role.DRIVER: request$ = this.driver.register(formData); break;
    case Role.PARENT: request$ = this.parents.register(formData); break;
    default: request$ = this.auth.register(formData);
  }

  request$.subscribe({
    next: () => this.router.navigate(['/login']),
    error: err => console.error('Registration error', err)
  });
}


  getStepControls(): string[] {
    switch (this.currentStep) {
      case 1:
        return ['firstName', 'surname', 'contact', 'email'];
      case 2:
        return ['city', 'address', 'postalCode', 'province'];
      case 3:
        return ['firstName', 'email', 'password', 'confirmPassword', 'role'];
      case 4:
        return Object.keys(this.form.controls);
      default:
        return [];
    }
  }

  isStepValid(): boolean {
    const controls = this.getStepControls();
    return controls.every((name) => this.form.get(name)?.valid);
  }
}
