import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParentDTO } from '../../dto/parentDTO';

@Injectable({
  providedIn: 'root'
})
export class Parents {


   private apiUrl = environment.apiUrl;
   
  constructor(private http: HttpClient) { }

    register(user: ParentDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/api/parents/register`, user, 
      {
        headers: { 'Content-Type': 'application/json' }
      });
  }

   getCurrentParent(): Observable<ParentDTO> {
    const headers = new HttpHeaders({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

    return this.http.get<ParentDTO>(`${this.apiUrl}/auth/api/parents/profile`, { headers });
  }
  
}
