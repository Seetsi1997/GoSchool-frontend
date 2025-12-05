import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../service/serviceAuth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [Auth],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  showPassword = false;
  showConfirmPassword = false;
  loginError = '';
  userRole: string | null = null;
  signInMessage = '';
  userName: string | null = null;
  loginForm!: FormGroup;
  loading = false;

  validationMessages: { [key: string]: { [key: string]: string } } = {
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
  };

  constructor(private router: Router, private auth: Auth, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    });
  }

  getErrorMessage(controlName: string) {
    const control = this.loginForm.get(controlName);
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

  forgetPassword() {
    this.router.navigate(['/forgot-password']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
  // Clear previous errors when form is submitted again
  this.loginError = '';

  if (this.loginForm.valid) {
    this.loading = true;

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.auth.login(email, password).subscribe({
      next: (response: any) => {
        // Save session info
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('userRole', response.role);
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('userId', response.uuid);
        sessionStorage.setItem('userName', response.firstName);

        this.userRole = response.role;
        this.userName = response.firstName;
        this.loginError = '';

        this.loading = false;

        // Navigate based on role
        switch (this.userRole) {
          case 'DRIVER':
            this.router.navigate(['/drivers-dashboard']);
            break;
          case 'PARENT':
            this.router.navigate(['/parent-dashboard']);
            break;
          case 'ADMIN':
            this.router.navigate(['/admin-dashboard']);
          default:
            this.router.navigate(['/admin-dashboard']);
        }
      },
      error: (err) => {
        this.loading = false;

        // Clear any existing session data
        sessionStorage.clear();

        // Extract user-friendly error message
        if (err.error?.error) {
          this.loginError = err.error.error;
        } else if (err.status === 401) {
          this.loginError = 'Wrong email or password';
        } else if (err.status === 0) {
          this.loginError = 'Network error. Please check your connection.';
        } else {
          this.loginError = 'Login failed. Please try again.';
        }

        this.userRole = null;
        this.userName = null;
      },
    });
  } else {
    this.loginForm.markAllAsTouched();
  }
}
}
