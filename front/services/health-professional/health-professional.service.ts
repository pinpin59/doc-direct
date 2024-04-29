import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionQuery } from '../../src/app/session/session.query';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { SessionStore } from '../../src/app/session/session.store';

@Injectable({
  providedIn: 'root'
})

export class HealthProfessionalService {

    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient, private sessionQuery: SessionQuery) {}

    private getHeaders(): HttpHeaders {
        const userToken = this.sessionQuery.getValue().userToken;
        let headers = new HttpHeaders();
        if (userToken) {
        headers = headers.set('Authorization', `Bearer ${userToken}`);
        }
        return headers;
    }

  // Get all health professionals
    getHealthProfessionals(): Observable<any> {
        return this.http.get(`${this.apiUrl}/health-professionals`, { headers: this.getHeaders() });
    }
  
}
