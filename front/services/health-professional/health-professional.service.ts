import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionQuery } from '../../src/app/session/session.query';
import { Observable } from 'rxjs';
import { HealthProfessional } from '../../interfaces/healthProfessional.interface';
import { UserRoles } from '../../src/app/enums/user-roles.enum';
import { HealthProfessionalStatus } from '../../src/app/enums/health-professional-status.enum';
import { CsrfService } from '../csrf/csrf.service';

@Injectable({
  providedIn: 'root'
})

export class HealthProfessionalService {

    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient, private sessionQuery: SessionQuery, private csrfService : CsrfService) {}

    private getHeaders(): HttpHeaders {
        const healthProfessional = this.sessionQuery.getValue().healthProfessionalToken;
        const csrfToken = this.csrfService.getCsrfTokenValue(); // Récupére le jeton CSRF depuis le stockage local

        let headers = new HttpHeaders();
        
        if (healthProfessional) {
            headers = headers.set('Authorization', `Bearer ${healthProfessional}`);
        }
        if (csrfToken) {
            headers = headers.set('x-csrf-token', csrfToken); // Inclue le jeton CSRF dans les en-têtes
        }
        console.log(csrfToken);
        
        return headers;
    }

    // Réccupère les professionnels de santé
    getHealthProfessionals(): Observable<any> {
        return this.http.get(`${this.apiUrl}/health-professionals`, { headers: this.getHeaders() });
    }

    // Réccupère les professionnels de santé par id
    getHealthProfessionalById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/health-professionals/${id}`, { headers: this.getHeaders() });
    }

    

    createHealthProfessional(healthProfessional: HealthProfessional): Observable<any> {
        return this.http.post(`${this.apiUrl}/health-professionals`, healthProfessional, { headers: this.getHeaders(), withCredentials: true });
    }

    //Change le statut d'un professionnel de santé
    changeHealthProfessionalStatus(id: number, status: HealthProfessionalStatus): Observable<any> {
        return this.http.put(`${this.apiUrl}/health-professionals/status/${id}`, { status }, { headers: this.getHeaders(), withCredentials: true });
    }

    deleteHealthProfessionalProfile(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/health-professionals/${id}`, { headers: this.getHeaders(),  withCredentials: true });
    }

    uploadProfilePictureHealthProfessional(userId:number, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('profilePicture', file);
        console.log('formData:', formData);
        return this.http.post(`${this.apiUrl}/health-professionals/${userId}/upload-health-professional-profile-picture`, formData, { headers: this.getHeaders(), withCredentials: true});
    }
  
}
