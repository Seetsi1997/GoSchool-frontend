import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Role } from '../../component/constant/role';
import { LocationDTO } from '../../dto/ LocationDTO';
import { DriverDTO } from '../../dto/driverDTO';
import { DriverRouteDetailsDTO } from '../../dto/driverRouteDetailsDTO';
import { StudentDTO } from '../../dto/studentDTO';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  
  private apiUrl = environment.apiUrl;

 constructor(private http: HttpClient) {
 
}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage', token);
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createRoute(driverId: string, body: any) {
    const headers = this.getAuthHeaders();
    console.log('Creating route with headers:', headers);
    
    return this.http.post<DriverRouteDetailsDTO>(
      `${this.apiUrl}/auth/api/drivers/${driverId}/routes`,
      body,
      { headers }
    ).pipe(
      catchError(error => {
        console.error('API Error in createRoute:', error);
        return throwError(() => error);
      })
    );
  }

getRoutes(driverId: string): Observable<any> {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found!');
    return throwError(() => new Error('No token'));
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

   console.log("Token being sent:", token);
  console.log("Headers being sent:", headers);

  return this.http.get(`${this.apiUrl}/auth/api/drivers/${driverId}/routes`, { headers });
}

getRoute(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.get(`${this.apiUrl}/auth/api/drivers/me/routes`, { headers });
}


  updateRoute(driverId: string, routeId: string, body: any) {
    return this.http.put(
      `${this.apiUrl}/auth/api/drivers/${driverId}/routes/${routeId}`, 
      body,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => {
        console.error('API Error in updateRoute:', error);
        return throwError(() => error);
      })
    );
  }

  deleteRoute(driverId: string, routeId: string) {
    return this.http.delete(
      `${this.apiUrl}/auth/api/drivers/${driverId}/routes/${routeId}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => {
        console.error('API Error in deleteRoute:', error);
        return throwError(() => error);
      })
    );
  }
}