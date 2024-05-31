import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionQuery } from '../../src/app/session/session.query';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CsrfService {

    private apiUrl = `${environment.apiUrl}`;
    private csrfToken?: string;
    constructor(private http: HttpClient, private sessionQuery: SessionQuery) {}

    private getHeaders(): HttpHeaders {
        const healthProfessional = this.sessionQuery.getValue().healthProfessionalToken;
        console.log('HealthProfessionalToken:', healthProfessional);
        console.log(this.apiUrl);
        
        let headers = new HttpHeaders();
        if (healthProfessional) {
        headers = headers.set('Authorization', `Bearer ${healthProfessional}`);
        }
        
        return headers;
    }

    // Réccupère le csrf token
    getCsrfToken(): Observable<any> {
        return this.http.get(`${this.apiUrl}/csrf-token`, { headers: this.getHeaders(), withCredentials: true});
    }
 
    setCsrfToken(csrfToken: string): void {
        this.csrfToken = csrfToken;
    }

    getCsrfTokenValue(): string | undefined {
        return this.csrfToken;
    }

  
}