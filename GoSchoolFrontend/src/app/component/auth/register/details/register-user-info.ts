import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-register-user-info',
  imports: [CommonModule, RouterModule],
  templateUrl: './register-user-info.html',
  styleUrls: ['./register-user-info.css']
})
export class RegisterUserInfo {
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  constructor(private router: Router) {}

  goNext() {
    this.nextStep.emit();
  }

  goPrevious() {
   this.router.navigate(['/login']);
  }
}