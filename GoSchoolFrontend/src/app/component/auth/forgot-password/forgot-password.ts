import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../service/serviceAuth/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [Auth],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

  email: string = '';
  message: string = '';
  error: string = ''; 
  constructor(private router: Router, private auth: Auth) { }

   cancel() {
     this.router.navigate(['/login']);
  }


  onSubmit(): void {
    this.message = '';
    this.error = '';
    this.auth.forgotPassword(this.email).subscribe({
      next: (response) => {
        this.message = 'Password reset link sent to your email address.';
        this.router.navigate(["/login"])
      },
      error: (err) => {
        this.error = 'Error sending password reset link. Please check your email address.';
        console.error(err);
      }
    });
  }

}
