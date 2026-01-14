import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { catchError, Observable, throwError } from 'rxjs';
import { DriverNotificationDTO } from '../../dto/DriverNotificationDTO';
import { TransportApplicationDTO } from '../../dto/transportApplicationDTO';

@Injectable({
  providedIn: 'root'
})
export class ServiceDriverNotification {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    
    // DEBUG: Log token info
    console.log('Token from localStorage:', token ? 'Exists' : 'NULL/EMPTY');
    
    if (token) {
      try {
        // Decode JWT token to check its content
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Token payload:', payload);
        console.log('Token expires:', new Date(payload.exp * 1000));
        console.log('Current time:', new Date());
        console.log('Token has DRIVER role?', payload.roles?.includes('DRIVER') || payload.authorities?.includes('DRIVER'));
      } catch (e) {
        console.error('Error decoding token:', e);
      }
    }
    
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /** Get notifications for logged-in driver */
  getNotifications(): Observable<DriverNotificationDTO[]> {
    return this.http.get<DriverNotificationDTO[]>(
      `${this.apiUrl}/auth/api/driver/notifications`, 
      { headers: this.getHeaders() }
    );
  }

  /** Driver approves application */
  approveApplication(notificationId: string): Observable<TransportApplicationDTO> {
    console.log('Approving notification with ID:', notificationId);
    return this.http.put<TransportApplicationDTO>(
      `${this.apiUrl}/auth/api/driver/notifications/${notificationId}/approve`,
      {},
      { headers: this.getHeaders() }
    );
  }

  /** Mark notification as seen */
  markAsSeen(notificationId: string): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/auth/api/driver/notifications/${notificationId}/seen`,
      {},
      { headers: this.getHeaders() }
    );
  }

  /** Driver rejects application */
  rejectApplication(notificationId: string): Observable<TransportApplicationDTO> {
    console.log('Rejecting notification with ID:', notificationId);
    return this.http.put<TransportApplicationDTO>(
      `${this.apiUrl}/auth/api/driver/notifications/result/${notificationId}/reject`,
      {},
      { 
        headers: this.getHeaders()
        // Remove withCredentials: true unless specifically needed for CORS
      }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error in rejectApplication:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          headers: error.headers,
          error: error.error
        });
        return throwError(() => error);
      })
    );
  }
}
