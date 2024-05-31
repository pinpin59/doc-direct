import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionQuery } from '../../src/app/session/session.query';
import { Observable } from 'rxjs';
import { HealthProfessionalStatus } from '../../src/app/enums/health-professional-status.enum';
import { CsrfService } from '../csrf/csrf.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient, private sessionQuery: SessionQuery, private csrfService : CsrfService) {}

    private getHeaders(): HttpHeaders {
        const userToken = this.sessionQuery.getValue().userToken;  
        const HealthProfessionalToken = this.sessionQuery.getValue().healthProfessionalToken;    
        const csrfToken = this.csrfService.getCsrfTokenValue(); // Récupérer le jeton CSRF depuis le stockage local

        let headers = new HttpHeaders();
        if (userToken) {
        headers = headers.set('Authorization', `Bearer ${userToken}`);
        }
        if (HealthProfessionalToken) {
            headers = headers.set('Authorization', `Bearer ${HealthProfessionalToken}`);
        }        
        if (csrfToken) {
        headers = headers.set('x-csrf-token', csrfToken);
        }
        return headers;
    }

    // Partie health professionals
 
    getHealthProfessionalByStatus(status: HealthProfessionalStatus): Observable<any> {
        return this.http.get(`${this.apiUrl}/admin/status/${status}`, { headers: this.getHeaders() });
    }

    updateHealthProfessionalStatus(id: number, status: HealthProfessionalStatus): Observable<any> {
        return this.http.put(`${this.apiUrl}/admin/status/${id}`, { status }, { headers: this.getHeaders(), withCredentials: true });
    }

    updateHealthProfessional(id: number, healthProfessional: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/admin/health-professionals/${id}`, healthProfessional, { headers: this.getHeaders(), withCredentials: true});
    }

    deleteHealthProfessionalProfile(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/admin/health-professionals/${id}`, { headers: this.getHeaders(), withCredentials: true});
    }

    // Partie users
    getAllUsers(): Observable<any> {
        return this.http.get(`${this.apiUrl}/admin/users`, { headers: this.getHeaders() });
    }

    updateUser(id: number, user: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/admin/users/${id}`, user, { headers: this.getHeaders(), withCredentials: true});
    }

    deleteUserProfile(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/admin/users/${id}`, { headers: this.getHeaders(), withCredentials: true});
    }
}