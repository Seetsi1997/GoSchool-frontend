import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

   private apiUrl = environment.apiUrl;
   
  constructor(private http: HttpClient) { }

    register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/api/users/register`, user);
  }
  
}
