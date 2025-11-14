import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../env/env';
import { StudentEntity } from '../../model/student';
import { StudentDTO } from '../../dto/studentDTO';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all students for the current parent
  getMyStudents(): Observable<StudentEntity[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<StudentEntity[]>(`${this.apiUrl}/auth/api/parents/me/students`, {
      headers,
    });
  }

  // Get student by ID
  getStudentById(studentId: string): Observable<StudentEntity> {
    const token = localStorage.getItem('token');
    const parentId = localStorage.getItem('parentId');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'X-Parent-ID': parentId || '',
    });

    return this.http.get<StudentEntity>(
      `${this.apiUrl}/auth/api/parents/me/students/${studentId}`,
      { headers }
    );
  }

  // Create a new student
  createStudent(studentData: any): Observable<StudentEntity> {
    const token = localStorage.getItem('token');
    const parentId = localStorage.getItem('parentId');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<StudentEntity>(
      `${this.apiUrl}/auth/api/parents/${parentId}/students`,
      studentData,
      { headers }
    );
  }

  // Update student
// Add proper error handling and headers
updateStudent(parentUUID: string, studentUUID: string, studentData: any) {
   const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}}`
  });

  return this.http.put(
    `http://localhost:8080/auth/api/parents/${parentUUID}/students/${studentUUID}`,
    studentData,
    { headers }
  ).pipe(
    catchError(error => {
      console.error('Update student error:', error);
      // Handle specific error cases
      if (error.status === 403) {
        // Handle permission denied
      }
      throw error;
    })
  );
}

  updateStudents(
    parentUUID: string,
    studentId: string,
    updateData: StudentDTO
  ): Observable<StudentEntity> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // FIX: Add the missing path segments
    return this.http.put<StudentEntity>(
      `${this.apiUrl}/auth/api/parents/${parentUUID}/students/${studentId}`,
      updateData,
      { headers }
    );
  }

  // Delete student
  deleteStudent(studentId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(`${this.apiUrl}/auth/api/students/${studentId}`, { headers });
  }
}
