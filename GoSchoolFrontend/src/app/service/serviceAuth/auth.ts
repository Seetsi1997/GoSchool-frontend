import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { DriverDTO } from '../../dto/driverDTO';
import { ParentDTO } from '../../dto/parentDTO';
import { UserLoginDTO } from '../../dto/userLoginDTO';
import { environment } from '../../env/env';
import { Users } from '../../model/Users';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = environment.apiUrl;
  public currentUser: any = null;
  private logoutTimer: any;

  constructor(private http: HttpClient) { }

register(user: any): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/auth/api/users/admin/register`,
    user,
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );
}


  getCurrentAdmin(): Observable<Users> {
    const token = localStorage.getItem('token');
    console.log("login admin token", token)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Users>(`${this.apiUrl}/auth/api/users/admin/profile`, { headers });
  }

  // Updated login method with proper error handling
  login(email: string, password: string): Observable<UserLoginDTO> {
    return this.http
      .post<UserLoginDTO>(
        `${environment.apiUrl}/auth/api/users/login`,
        { email, password },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),

        }

      )
      .pipe(
        tap((res: UserLoginDTO) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
          }
          localStorage.setItem('token', res.token);
          localStorage.setItem('uuid', res.uuid);
          localStorage.setItem('role', res.role);
          localStorage.setItem('firstName', res.firstName);
          localStorage.setItem('email', res.email);

          if (res.role === 'PARENT') {
            localStorage.setItem('parentUUID', res.parentUUID?.toString() || '');
            localStorage.setItem('parentFirstname', res.parentFirstName);

          }
          if (res.role === 'DRIVER') {
            localStorage.setItem('driverUUID', res.driverUUID?.toString() || '');
            localStorage.setItem('driverName', res.driverName);

          }

          if (res.role === 'ADMIN') {
            localStorage.setItem('uuid', res.uuid);
            localStorage.setItem('firstName', res.firstName);

          }


        }),
        catchError((error: HttpErrorResponse) => {
          // Suppress 401 errors from console entirely
          if (error.status !== 401) {
            console.error('Login error:', error);
          }

          // Re-throw without logging to console
          return throwError(() => ({
            ...error,
            // Optional: Prevent browser from logging to console
            message: 'Login failed'
          }));
        })
      );
  }

  logout(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
    });

    return this.http
      .post(
        `${this.apiUrl}/auth/api/users/logout`,
        {},
        {
          headers,
          responseType: 'json',
        }
      )
      .pipe(
        tap({
          next: () => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            this.currentUser = null;
            if (this.logoutTimer) clearTimeout(this.logoutTimer);
          },
          error: () => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            this.currentUser = null;
            if (this.logoutTimer) clearTimeout(this.logoutTimer);
          },
        })
      );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/api/users/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/api/users/reset-password`, {
      token,
      newPassword,
      confirmPassword,
    });
  }

  changePassword(currentPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      // Return an observable error instead of throwing
      return throwError(() => new Error('No authentication token found. Please login again.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = {
      currentPassword,
      newPassword,
      confirmPassword
    };

    return this.http.post(`${this.apiUrl}/auth/api/users/change-password`, body, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Don't log 401 errors to console
          if (error.status !== 401 && error.status !== 400) {
            console.error('Change password error:', error);
          }
          return throwError(() => error);
        })
      );
  }

  getListParent(): Observable<ParentDTO[]> {
    const token = localStorage.getItem('token');
    console.log("admin token", token)
    return this.http.get<ParentDTO[]>(`${this.apiUrl}/auth/api/users/admin/parents`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  getListDriver(): Observable<DriverDTO[]> {
    const token = localStorage.getItem('token');
    console.log("admin token", token)
    return this.http.get<DriverDTO[]>(`${this.apiUrl}/auth/api/users/admin/drivers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

}