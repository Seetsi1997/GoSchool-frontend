import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';
import { PaymentRecordEntity } from '../../model/paymentRecord';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

   // Upload proof of payment
  uploadProofOfPayment(formData: FormData): Observable<any> {
  const token = localStorage.getItem('token');
  console.log('Token exists:', !!token);
  console.log('API URL:', `${this.apiUrl}/auth/api/payments/upload`);

  // For FormData, let browser set Content-Type automatically
  return this.http.post(`${this.apiUrl}/auth/api/payments/upload`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

  // Get payment history for a student
  getStudentPayments(studentId: string): Observable<PaymentRecordEntity[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<PaymentRecordEntity[]>(`${this.apiUrl}/auth/api/payments/student/${studentId}`, { headers });
  }

  // Get all payments (for admin)
  getAllPayments(): Observable<PaymentRecordEntity[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<PaymentRecordEntity[]>(`${this.apiUrl}/auth/api/payments`, { headers });
  }
}
