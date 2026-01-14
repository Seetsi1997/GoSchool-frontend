import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { Observable } from 'rxjs';
import { TransportApplicationEntity } from '../../model/transportApplication';
import { StudentDTO } from '../../dto/studentDTO';
import {TransportApplicationDTO } from '../../dto/transportApplicationDTO';

@Injectable({
  providedIn: 'root',
})
export class TransportService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  applyForTransport(body: any) {
    return this.http.post(`${this.apiUrl}/auth/api/transport/apply`, body, {
      headers: this.getHeaders(),
    });
  }

  /*getApplicationByParentAndRoute(parentId: string, routeId: string) {
    return this.http.get<any>(`${this.apiUrl}/applications/parent/${parentId}/route/${routeId}`);
  }*/

  // transport.service.ts
 /* getApplicationByParentAndRoute(
    parentId: string,
    routeId: string
  ): Observable<TransportApplicationEntity[]> {
    return this.http.get<TransportApplicationEntity | null>(
      `/applications/parent/${parentId}/route/${routeId}`,
      {
        headers: this.getHeaders(),
      }
    );
  }*/

  getApplicationByParentAndRoute(parentUUID: string, routeId: string): Observable<TransportApplicationEntity[]> {
    return this.http.get<TransportApplicationEntity[]>(
        `/applications/parent/${parentUUID}/route/${routeId}`,
        { headers: this.getHeaders() }
    );
}


  getStudentsForDriver(driverUUID: string) {
    return this.http.get<StudentDTO[]>(
      `${this.apiUrl}/auth/api/transport/${driverUUID}/students`,
      { headers: this.getHeaders() }
    );
  }
  getApplicationsByDriver(driverUUID: string) {
    return this.http.get<TransportApplicationDTO[]>(
      `${this.apiUrl}/auth/api/transport/${driverUUID}/applications`,
      { headers: this.getHeaders() }
    );
  }

  // Approve a transport application
  approveApplication(driverUUID: string, applicationId: string) {
    return this.http.post(
      `${this.apiUrl}/auth/api/transport/${driverUUID}/applications/${applicationId}/approve`,
      {},
      { headers: this.getHeaders() }
    );
  }

  // Reject a transport application
  rejectApplication(driverUUID: string, applicationId: string) {
    return this.http.post(
      `${this.apiUrl}/auth/api/transport/${driverUUID}/applications/${applicationId}/reject`,
      {},
      { headers: this.getHeaders() }
    );
  }

  getStudentsByParent(parentUUID: string) {
  return this.http.get<any[]>(
    `${this.apiUrl}/auth/api/parents/${parentUUID}/students`
  );
}

}
