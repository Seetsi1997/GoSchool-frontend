import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Auth } from '../../../service/serviceAuth/auth';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserLoginDTO } from '../../../dto/userLoginDTO';
import { Role } from '../../constant/role';

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
    // initialize only loginForm
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
    if (this.loginForm.valid) {
      this.loading = true; // show spinner immediately

      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.auth.login(email, password).subscribe({
        next: (response: UserLoginDTO) => {
          // Save session info
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('userRole', response.role);
          sessionStorage.setItem('userEmail', response.email);
          sessionStorage.setItem('userId', response.uuid.toString());
          sessionStorage.setItem('userName', response.firstname);

          this.userRole = response.role as Role;
          this.userName = response.firstname;
          this.loginError = '';

          // Keep spinner visible until navigation starts
          setTimeout(() => {
            this.loading = false; 

            switch (this.userRole) {
              case Role.DRIVER:
                this.router.navigate(['/drivers-dashboard']);
                break;
              case Role.PARENT:
                this.router.navigate(['/parent-dashboard']);
                break;
              default:
                this.router.navigate(['/drivers-dashboard']);
            }
          }, 2000);
        },
        error: (err) => {
          this.loading = false;

          if (err.error?.error) {
            this.loginError = err.error.error;
          } else if (err.error?.message) {
            this.loginError = err.error.message;
          } else if (typeof err.error === 'string') {
            this.loginError = err.error;
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
