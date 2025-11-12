import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../../../service/serviceAuth/auth';


@Component({
  selector: 'app-change-password',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
providers: [Auth],
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.css']
})
export class ChangePassword {
  showCurrentPassword = false;
  showPassword = false;
  showConfirmPassword = false;
  passwordForm: FormGroup;
  isLoading = false;
  message = '';
  messageType: 'success' | 'error' = 'error';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: Auth
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  // Getter methods for easy access in template
  get currentPassword() { return this.passwordForm.get('currentPassword'); }
  get newPassword() { return this.passwordForm.get('newPassword'); }
  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }

  goBack() {
    this.router.navigate(['/parent-dashboard/settings']);
  }

  togglePasswordVisibility(field: string) {
    switch (field) {
      case 'current':
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      case 'new':
        this.showPassword = !this.showPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  getPasswordFieldType(field: string): string {
    switch (field) {
      case 'current':
        return this.showCurrentPassword ? 'text' : 'password';
      case 'new':
        return this.showPassword ? 'text' : 'password';
      case 'confirm':
        return this.showConfirmPassword ? 'text' : 'password';
      default:
        return 'password';
    }
  }

  onSubmit() {
    // Mark all fields as touched to trigger validation messages
    this.passwordForm.markAllAsTouched();

    if (this.passwordForm.valid) {
      this.isLoading = true;
      this.message = '';

      const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

      // Check if new password is different from current password
      if (currentPassword === newPassword) {
        this.showMessage('New password must be different from current password', 'error');
        this.isLoading = false;
        return;
      }

      this.userService.changePassword(currentPassword, newPassword, confirmPassword)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.showMessage('Password changed successfully!', 'success');
            // Reset form on success
            setTimeout(() => {
              this.passwordForm.reset();
              this.goBack();
            }, 2000);
          },
          error: (error) => {
            this.isLoading = false;
            this.showMessage(error || 'Failed to change password. Please try again.', 'error');
          }
        });
    } else {
      this.showMessage('Please fill all fields correctly', 'error');
    }
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
  }
}