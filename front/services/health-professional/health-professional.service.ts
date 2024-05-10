import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionQuery } from '../../src/app/session/session.query';
import { Observable } from 'rxjs';
import { HealthProfessional } from '../../interfaces/healthProfessional.interface';

@Injectable({
  providedIn: 'root'
})

export class HealthProfessionalService {

    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient, private sessionQuery: SessionQuery) {}

    private getHeaders(): HttpHeaders {
        const HealthProfessional = this.sessionQuery.getValue().healthProfessionalToken;
        
        let headers = new HttpHeaders();
        if (HealthProfessional) {
        headers = headers.set('Authorization', `Bearer ${HealthProfessional}`);
        }
        console.log('Headers:', headers);
        
        return headers;
    }

  // Get all health professionals
    getHealthProfessionals(): Observable<any> {
        return this.http.get(`${this.apiUrl}/health-professionals`, { headers: this.getHeaders() });
    }

    // Get health professional by id
    getHealthProfessionalById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/health-professionals/${id}`, { headers: this.getHeaders() });
    }

    createHealthProfessional(healthProfessional: HealthProfessional): Observable<any> {
        return this.http.post(`${this.apiUrl}/health-professionals`, healthProfessional, { headers: this.getHeaders() });
    }
    
  
}
