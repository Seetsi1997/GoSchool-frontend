import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Auth } from '../../../service/serviceAuth/auth';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  providers: [Auth],
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword implements OnInit {
  resetForm!: FormGroup;
  token: string = '';
  message: string = '';
  error: string = '';
  isLoading: boolean = false;
  showPassword = false;
  showConfirmPassword = false;
  resetPasswordModal = false;
  isSuccess = false;
  showErrorPopup = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get token from query params
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'] || '';
    });

    // Initialize form
    this.resetForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/
            ),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/
            ),
          ],
        ],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  navigateToLogin(): void {
    this.resetPasswordModal = false;
    this.router.navigate(['/sign-in']);
  }
  

  onSubmit(): void {
    if (this.resetForm.invalid || !this.token) {
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.message = '';

    const { password, confirmPassword } = this.resetForm.value;

    this.authService
      .resetPassword(this.token, password, confirmPassword)
      .subscribe({
        next: () => {
          this.message = 'Your password has been reset successfully.';
          this.resetForm.reset();
          this.isLoading = false;
          this.resetPasswordModal = true;
          this.isSuccess = true;
          this.showErrorPopup = false;
        },
        error: (err: { error: { error: string } }) => {
          this.error =
            err.error?.error || 'Failed to reset password. Please try again.';
          this.isLoading = false;
          this.showErrorPopup = true;
          this.isSuccess = false;
          setTimeout(() => {
            this.resetPasswordModal = false;
            this.showErrorPopup = false;
          }, 3000);
        },
      });
  }
}
