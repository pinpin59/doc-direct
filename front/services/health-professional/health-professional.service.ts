import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionQuery } from '../../src/app/session/session.query';
import { Observable } from 'rxjs';
import { HealthProfessional } from '../../interfaces/healthProfessional.interface';
import { UserRoles } from '../../src/app/enums/user-roles.enum';
import { HealthProfessionalStatus } from '../../src/app/enums/health-professional-status.enum';

@Injectable({
  providedIn: 'root'
})

export class HealthProfessionalService {

    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient, private sessionQuery: SessionQuery) {}

    private getHeaders(): HttpHeaders {
        const healthProfessional = this.sessionQuery.getValue().healthProfessionalToken;
        console.log('HealthProfessionalToken:', healthProfessional);
        
        let headers = new HttpHeaders();
        if (healthProfessional) {
        headers = headers.set('Authorization', `Bearer ${healthProfessional}`);
        }
        
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

    getHealthProfessionalByStatus(status: HealthProfessionalStatus): Observable<any> {
        return this.http.get(`${this.apiUrl}/health-professionals/status/${status}`, { headers: this.getHeaders() });
    }

    createHealthProfessional(healthProfessional: HealthProfessional): Observable<any> {
        return this.http.post(`${this.apiUrl}/health-professionals`, healthProfessional);
    }

    //Change health professional status
    changeHealthProfessionalStatus(id: number, status: HealthProfessionalStatus): Observable<any> {
        return this.http.put(`${this.apiUrl}/health-professionals/status/${id}`, { status }, { headers: this.getHeaders() });
    }
  
}
