import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserLoginDTO } from '../../dto/userLoginDTO';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = environment.apiUrl;
  public currentUser: any = null;
  private logoutTimer: any;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/api/users/register`, user);
  }

// Update your login method to store UUID as parentId
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
          console.log("Token saved:", res.token);
        }
        
        localStorage.setItem('uuid', res.uuid);
        localStorage.setItem('role', res.role);
        localStorage.setItem('firstname', res.firstname);
        localStorage.setItem('email', res.email);
        
        // QUICK FIX: If user is a parent, store UUID as parentId
        if (res.role === 'PARENT' || res.role === 'parent') {
          localStorage.setItem('parentId', res.uuid);
          console.log("Parent ID stored:", res.uuid);
        }
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

  /**
   * 
   * forgotPassword(payload: { phoneNumber: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/auth/api/users/forgot-password`, payload);
}
   * 
   */

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/api/users/reset-password`, {
      token,
      newPassword,
      confirmPassword,
    });
  }
}
