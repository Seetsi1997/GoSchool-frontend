import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DriverDTO } from '../../dto/driverDTO';
import { environment } from '../../env/env';
import { DriverRouteDetails } from '../../model/DriverRouteDetails';
import { StudentDTO } from '../../dto/studentDTO';

@Injectable({
  providedIn: 'root',
})
export class Driver {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }


  register(user: DriverDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/api/drivers/register`, user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get current driver
  getCurrentDriver(): Observable<DriverDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<DriverDTO>(`${this.apiUrl}/auth/api/drivers/profile`, { headers });
  }

  // Update current driver
  updateCurrentDriver(drivers: DriverDTO): Observable<DriverDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put<DriverDTO>(`${this.apiUrl}/auth/api/drivers/profile`, drivers, {
      headers,
    });
  }

  getDriverByUserUUID(userUUID: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/api/drivers/me/${userUUID}`);
  }

  getAllDrivers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/api/drivers`, { responseType: 'json' });
  }

  listRoutes(driverUUID: string): Observable<DriverRouteDetails[]> {
    return this.http.get<DriverRouteDetails[]>(
      `${this.apiUrl}/auth/api/drivers/${driverUUID}/routes`
    );
  }

  createRoute(driverUUID: string, payload: DriverRouteDetails): Observable<DriverRouteDetails> {
    return this.http.post<DriverRouteDetails>(
      `${this.apiUrl}/auth/api/drivers/${driverUUID}/routes`,
      payload
    );
  }

  updateRoute(
    driverUUID: string,
    routeId: string,
    payload: DriverRouteDetails
  ): Observable<DriverRouteDetails> {
    return this.http.put<DriverRouteDetails>(
      `${this.apiUrl}/auth/api/drivers/${driverUUID}/routes/${routeId}`,
      payload
    );
  }

  deleteRoute(driverUUID: string, routeId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/auth/api/drivers/${driverUUID}/routes/${routeId}`
    );
  }

  getStudentsByDriverProvince(province: string) {
    return this.http.get<StudentDTO[]>(
      `${this.apiUrl}/auth/api/drivers/${province}/students`,
      { headers: this.getAuthHeaders() }
    );
  }

   assignDriverToStudent(driverId: string, studentId: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/auth/api/drivers/driver/${driverId}/assign/student/${studentId}`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }
}
