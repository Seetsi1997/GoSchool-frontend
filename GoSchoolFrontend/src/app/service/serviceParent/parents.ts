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

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Register parent
  register(user: ParentDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/api/parents/register`, user, {
      headers: this.getHeaders() ,
    });
  }

  // Get current parent
  getCurrentParent(): Observable<ParentDTO> {
    return this.http.get<ParentDTO>(`${this.apiUrl}/auth/api/parents/profile`, { headers: this.getHeaders() });
  }

  // Update current parent
  updateCurrentParent(parent: ParentDTO): Observable<ParentDTO> {

    return this.http.put<ParentDTO>(`${this.apiUrl}/auth/api/parents/profile`, parent, {
      headers: this.getHeaders(),
    });
  }

  // Add new student as parent
  addStudent(parentId: string, student: StudentDTO): Observable<any> {
    
    return this.http.post(
      `${this.apiUrl}/auth/api/parents/${parentId}/students`,
      student,
      { headers: this.getHeaders() }
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

    return parentId;
  }

  getChildrenByParent(parentId: string) {
    return this.http.get<StudentDTO[]>(
      `${this.apiUrl}/auth/api/parents/${parentId}/children`,
      { headers: this.getHeaders() }
    );
  }

  getStudentsByParent(parentUUID: string) {
  return this.http.get<StudentDTO[]>(
    `${this.apiUrl}/auth/api/parents/${parentUUID}/students`
  );
}


}