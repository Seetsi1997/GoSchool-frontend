import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-review-submit',
  imports: [CommonModule, RouterModule],
  templateUrl: './review-submit.html',
  styleUrls: ['./review-submit.css']
})

export class ReviewSubmit {
 
  @Output() previousStep = new EventEmitter<void>();

  goPrevious() {
   this.previousStep.emit();
  }
}