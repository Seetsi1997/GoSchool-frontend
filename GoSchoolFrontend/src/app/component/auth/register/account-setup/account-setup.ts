import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { Role } from "../../../constant/role";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-account-setup',
  standalone: true,
   imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './account-setup.html',
  styleUrls: ['./account-setup.css']
})

export class AccontSetup {

  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  role = Object.values(Role);
  selectedRole: Role| null = null;

  constructor(private router: Router) {}

  goNext() {
    console.log('Selected role:', this.selectedRole); 
    this.nextStep.emit();
  }

  goPrevious() {
    this.previousStep.emit();
  }
}