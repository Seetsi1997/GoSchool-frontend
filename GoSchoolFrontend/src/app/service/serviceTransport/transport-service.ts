import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { Observable } from 'rxjs';
import { TransportApplicationEntity } from '../../model/transportApplication';

@Injectable({
  providedIn: 'root',
})
export class TransportService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  applyForTransport(body: any) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/auth/api/transport/apply`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /*getApplicationByParentAndRoute(parentId: string, routeId: string) {
    return this.http.get<any>(`${this.apiUrl}/applications/parent/${parentId}/route/${routeId}`);
  }*/

  // transport.service.ts
  getApplicationByParentAndRoute(
    parentId: string,
    routeId: string
  ): Observable<TransportApplicationEntity | null> {
    return this.http.get<TransportApplicationEntity | null>(
      `/applications/parent/${parentId}/route/${routeId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }
}
