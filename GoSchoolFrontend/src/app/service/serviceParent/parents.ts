import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Parents {


   private apiUrl = environment.apiUrl;
   
  constructor(private http: HttpClient) { }

    register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/api/parents/register`, user);
  }
  
}
