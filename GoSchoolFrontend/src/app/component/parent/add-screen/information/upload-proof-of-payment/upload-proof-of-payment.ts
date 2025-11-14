import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../../../../service/servicePayment/payment-service';
import { StudentService } from '../../../../../service/serviceStudent/student-service';
import { StudentEntity } from '../../../../../model/student';

@Component({
  selector: 'app-upload-proof-of-payment',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  providers: [PaymentService, StudentService],
  templateUrl: './upload-proof-of-payment.html',
  styleUrl: './upload-proof-of-payment.css'
})
export class UploadProofOfPayment {
  paymentForm: FormGroup;
  selectedFile: File | null = null;
  fileName: string = '';
  isLoading = false;
  message = '';
  messageType: 'success' | 'error' = 'error';
  students: StudentEntity[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private studentService: StudentService
  ) {
    this.paymentForm = this.fb.group({
      studentId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      method: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getMyStudents().subscribe({
      next: (students) => {
        this.students = students;
       // console.log('Loaded students:', students);
      },
      error: (error) => {
        this.showMessage('Failed to load students. Please try again.', 'error');
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        this.showMessage('Please select a PDF, JPEG, or PNG file', 'error');
        this.clearFileInput();
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        this.showMessage('File size must be less than 10MB', 'error');
        this.clearFileInput();
        return;
      }

      this.selectedFile = file;
      this.fileName = file.name;
      this.showMessage('', 'success');
     // console.log('File selected:', this.fileName);
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.fileName = '';
    this.clearFileInput();
    this.showMessage('', 'success');
  }

  private clearFileInput() {
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onSubmit() {
    /*console.log('Form valid:', this.paymentForm.valid);
    console.log('Form values:', this.paymentForm.value);
    console.log('Selected file:', this.selectedFile);*/

    if (this.paymentForm.invalid) {
      this.showMessage('Please fill all required fields', 'error');
      return;
    }

    if (!this.selectedFile) {
      this.showMessage('Please select a proof of payment file', 'error');

      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('studentId', this.paymentForm.get('studentId')?.value);
    formData.append('amount', this.paymentForm.get('amount')?.value);
    formData.append('method', this.paymentForm.get('method')?.value);
    formData.append('file', this.selectedFile);

    for (let pair of (formData as any).entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    this.paymentService.uploadProofOfPayment(formData).subscribe({
      next: (response: any) => {
       // console.log('Upload successful:', response);
        this.isLoading = false;
        this.showMessage(`File "${this.fileName}" uploaded successfully! Status: ${response.status}. Waiting for admin verification.`, 'success');
        
        // Reset form but keep the file name visible
        this.paymentForm.reset();
        
        setTimeout(() => {
          this.goBack();
        }, 3000);
      },
      error: (error) => {
        console.error('Upload error details:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error response:', error.error);
        
        this.isLoading = false;
        const errorMessage = error.error?.error || error.message || 'Upload failed. Please try again.';
        this.showMessage(`Error uploading "${this.fileName}": ${errorMessage}`, 'error');
      }
    });
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
  }

  goBack() {
    this.router.navigate(['/parent-dashboard/add-upload']);
  }
}