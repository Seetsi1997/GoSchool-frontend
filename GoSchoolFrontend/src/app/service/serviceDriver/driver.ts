import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DriverDTO } from '../../dto/driverDTO';

@Injectable({
  providedIn: 'root'
})
export class Driver {


   private apiUrl = environment.apiUrl;
   
  constructor(private http: HttpClient) { }

    register(user: DriverDTO ): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/api/drivers/register`, user, {
        headers: { 'Content-Type': 'application/json' }
      });
  }
  
}
