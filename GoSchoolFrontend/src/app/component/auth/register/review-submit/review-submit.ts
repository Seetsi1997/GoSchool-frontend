import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-review-submit',
  imports: [CommonModule, RouterModule],
  templateUrl: './review-submit.html',
  styleUrls: ['./review-submit.css']
})

export class ReviewSubmit {
  @Input() form!: FormGroup; 
  @Output() previousStep = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<void>(); 

  loading = false;

  goPrevious() {
    this.previousStep.emit();
  }
  
  onSubmit() {
    Object.keys(this.form.controls).forEach(ctrl =>
      this.form.get(ctrl)?.markAsTouched()
    );

    if (this.form.valid) {
      this.loading = true;  
    
      // stop loading after action
      setTimeout(() => {
        this.submitForm.emit();
        this.loading = false; 
      }, 2000);

    } else {

      Object.keys(this.form.controls).forEach(ctrl => {
        const control = this.form.get(ctrl);
        if (control && control.invalid) {
          console.log(`${ctrl}:`, control.errors);
        }
      });
    }
  }
    capitalizeRole(role: string): string {
  if (!role) return '';
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}
}

