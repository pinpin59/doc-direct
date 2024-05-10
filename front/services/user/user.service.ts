import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionQuery } from '../../src/app/session/session.query';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient, private sessionQuery: SessionQuery) {}

    private getHeaders(): HttpHeaders {
        const userToken = this.sessionQuery.getValue().userToken;
        console.log('UserToken:', userToken);
        
        let headers = new HttpHeaders();
        if (userToken) {
        headers = headers.set('Authorization', `Bearer ${userToken}`);
        }
        console.log('Headers:', headers);
        
        return headers;
    }



    uploadProfilePictureUser(userId:number, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('profilePicture', file); // Utilisez la clé correcte
        console.log('formData:', formData);
        return this.http.post(`${this.apiUrl}/users/${userId}/upload-user-profile-picture`, formData, { headers: this.getHeaders() });
    }

    
  
}
