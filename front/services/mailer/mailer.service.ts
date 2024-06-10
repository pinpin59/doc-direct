import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionQuery } from '../../src/app/session/session.query';
import { Observable } from 'rxjs';
import { CsrfService } from '../csrf/csrf.service';

@Injectable({
  providedIn: 'root'
})

export class MailerService {

    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient, private sessionQuery: SessionQuery, private csrfService : CsrfService) {}

    private getHeaders(): HttpHeaders {
        const csrfToken = this.csrfService.getCsrfTokenValue(); // Récupére le jeton CSRF depuis le stockage local

        let headers = new HttpHeaders();
       
        if (csrfToken) {
            headers = headers.set('x-csrf-token', csrfToken); // Inclue le jeton CSRF dans les en-têtes
        }
        
        return headers;
    }

    // Réccupère les professionnels de santé
    sendMail(mail: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/send-mail`, mail, { headers: this.getHeaders(), withCredentials: true });
    }
  
}
