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

  // Update student information

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
