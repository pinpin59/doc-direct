import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionQuery } from '../../src/app/session/session.query';
import { Observable } from 'rxjs';
import { CsrfService } from '../csrf/csrf.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient, private sessionQuery: SessionQuery, private csrfService : CsrfService) {}

    private getHeaders(): HttpHeaders {
        const userToken = this.sessionQuery.getValue().userToken;
        const csrfToken = this.csrfService.getCsrfTokenValue(); // Récupérer le jeton CSRF
        
        let headers = new HttpHeaders();
        if (userToken) {
        headers = headers.set('Authorization', `Bearer ${userToken}`);
        }
        if (csrfToken) {
        headers = headers.set('x-csrf-token', csrfToken);
        }        
        return headers;
    }

    getUserById(userId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/users/${userId}`, { headers: this.getHeaders() });
    }

    deleteUserProfile(userId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers: this.getHeaders(), withCredentials: true });
    }

    updateUserProfile(userId: number, user: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/users/${userId}`, user, { headers: this.getHeaders(), withCredentials: true});
    }

    uploadProfilePictureUser(userId:number, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('profilePicture', file);
        console.log('formData:', formData);
        return this.http.post(`${this.apiUrl}/users/${userId}/upload-user-profile-picture`, formData, { headers: this.getHeaders(), withCredentials: true});
    }

  
}
