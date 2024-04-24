import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { SessionQuery } from '../../src/app/session/session.query';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { SessionStore } from '../../src/app/session/session.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private sessionStore: SessionStore, private SessionQuery: SessionQuery) {}

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-user`, { email, password }).pipe(
        tap((response:any) => {
            // Supposons que la réponse contient un jeton d'authentification
            const token = response.token;
            // Stocker le jeton dans SessionQuery ou un autre service
            this.sessionStore.update({ token });
            this.SessionQuery.selectToken().subscribe((token) => {
                console.log('Token:', token);
            });
        }),
        catchError((error) => {
            console.error('Erreur lors de la connexion:', error);
            return throwError(error);
        })
    );
}


  registerUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-user`, { username, password });
  }

}


