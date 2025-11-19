import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ParentDTO } from '../../dto/parentDTO';
import { StudentDTO } from '../../dto/studentDTO';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class Parents {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Register parent
  register(user: ParentDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/api/parents/register`, user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get current parent
  getCurrentParent(): Observable<ParentDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<ParentDTO>(`${this.apiUrl}/auth/api/parents/profile`, { headers });
  }

  // Update current parent
  updateCurrentParent(parent: ParentDTO): Observable<ParentDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put<ParentDTO>(`${this.apiUrl}/auth/api/parents/profile`, parent, {
      headers,
    });
  }

  // Add new student as parent
  addStudent(parentId: string, student: StudentDTO): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(
      `${this.apiUrl}/auth/api/parents/${parentId}/students`,
      student,
      { headers }
    );
  }

  // Get current student 
  getAllStudentsForParent(): Observable<StudentDTO[]> {
    const token = localStorage.getItem('token');
    const parentId = localStorage.getItem('parentUUID');



    if (!parentId) {
      return throwError(() => new Error('Please log in as a parent to view students.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-Parent-ID': parentId
    });

    return this.http.get<StudentDTO[]>(`${this.apiUrl}/auth/api/parents/me/students`, { headers }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  private getParentIdFromStorage(): string | null {
    const parentId =
      localStorage.getItem('parentId') ||
      localStorage.getItem('parentUUID') ||
      (localStorage.getItem('parent')
        ? JSON.parse(localStorage.getItem('parent')!).parentUUID
        : null);

    console.log('Retrieved parentId from storage:', parentId);
    return parentId;
  }

}