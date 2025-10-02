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
      this.loading = true;  // tart loading
      console.log('Child emit firing, form valid =', this.form.valid);

    
      setTimeout(() => {
        this.submitForm.emit();
        this.loading = false; // stop loading after action
      }, 2000);

    } else {
      console.log('Child form invalid. Invalid controls:');
      Object.keys(this.form.controls).forEach(ctrl => {
        const control = this.form.get(ctrl);
        if (control && control.invalid) {
          console.log(`${ctrl}:`, control.errors);
        }
      });
    }
  }
}

