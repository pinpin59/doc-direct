import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionQuery } from '../../src/app/session/session.query';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AvailabilityService {

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
    
    getAvailabilityByHealthProfessionalId(healthProfessionalId: number) {
        return this.http.get(`${this.apiUrl}/availability/health-professional/${healthProfessionalId}`, { headers: this.getHeaders() });
    }
  
}
