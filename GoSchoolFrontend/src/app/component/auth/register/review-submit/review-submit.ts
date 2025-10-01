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

  goPrevious() {
    this.previousStep.emit();
  }

 onSubmit() { if (this.form.valid) this.submitForm.emit();}
}
