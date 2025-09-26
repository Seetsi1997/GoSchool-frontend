import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { Province } from "../../../constant/province";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-location',
   standalone: true,  
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-location.html',
  styleUrls: ['./user-location.css']
})
export class UserLocation {
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  provinces = Object.values(Province);
  selectedProvince: Province | null = null;

  constructor(private router: Router) {}

  goNext() {
    console.log('Selected province:', this.selectedProvince); 
    this.nextStep.emit();
  }

  goPrevious() {
   this.previousStep.emit();
  }

}