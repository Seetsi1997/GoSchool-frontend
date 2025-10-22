import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-upload-proof-of-payment',
  imports: [CommonModule, RouterModule],
  templateUrl: './upload-proof-of-payment.html',
  styleUrl: './upload-proof-of-payment.css'
})
export class UploadProofOfPayment {

  constructor(private router: Router){}
goBack() {
    this.router.navigate(['/parent-dashboard/add-upload']);
  }

}
