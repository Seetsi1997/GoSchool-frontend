import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../service/serviceAuth/auth';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  providers: [Auth],
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class Logout {
  @ViewChild('logoutDialog') logoutDialog!: ElementRef<HTMLDialogElement>;

  constructor(private router: Router, private auth: Auth) {}

  openDialog() {
    this.logoutDialog.nativeElement.showModal();
  }

  closeDialog() {
    this.logoutDialog.nativeElement.close();
  }

  confirmLogout() {
    this.auth.logout().subscribe({
      next: () => {
        this.handleLogout();
      },
      error: (err) => {
        console.error('Logout failed', err);
        this.handleLogout();
      }
    });
  }

  private handleLogout() {
    this.closeDialog();
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}