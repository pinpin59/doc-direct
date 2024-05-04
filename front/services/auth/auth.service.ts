import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { SessionQuery } from '../../src/app/session/session.query';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { SessionStore } from '../../src/app/session/session.store';
import {jwtDecode} from 'jwt-decode';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private sessionStore: SessionStore, private sessionQuery: SessionQuery) {}

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-user`, { email, password }).pipe(
        tap((response:any) => {
            const userToken = response.token;
            // Stocker le jeton dans SessionQuery et store
            this.sessionStore.update({ userToken });
            this.sessionQuery.selectUserToken().subscribe((userToken) => {
                console.log('Token:', userToken);
            });
        }),
        catchError((error) => {
            console.error('Erreur lors de la connexion:', error);
            return throwError(error);
        })
    );
  }

  registerUser(user:User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-user`, user);
  }

  LoginHealtProfessionalComponent(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-health-professional`, { email, password }).pipe(
        tap((response:any) => {
            const healthProfessionalToken = response.token;
            // Stocker le jeton dans SessionQuery et store
            this.sessionStore.update({ healthProfessionalToken });
            this.sessionQuery.selectHealtProfessionalToken().subscribe((healthProfessionalToken) => {
                console.log('Token:', healthProfessionalToken);
            });
        }),
        catchError((error) => {
            console.error('Erreur lors de la connexion:', error);
            return throwError(error);
        })
    );
  }


  // Get the user token from the store
  getUserToken(): string | null {    
    return this.sessionQuery.getValue().userToken;
  }

  getHealthProfessionalToken(): string | null {
    return this.sessionQuery.getValue().healthProfessionalToken;
  }


  // Decode the ID token and return its payload
  decodeToken(token:string | null): any {
    const idToken = token;
    if (idToken) {
      return jwtDecode(idToken);
    }
    return null;
  }

  // Get user information from the ID token
  getUserInfoFromToken(): any {
    const accessToken = this.sessionQuery.getValue().userToken;
    const decodedToken = this.decodeToken(accessToken);
    if (decodedToken) {
      console.log('Decoded token:', decodedToken);
      return decodedToken;
    }
    return null;
  }

  getHealthProfessionalInfoFromToken(): any {
    const accessToken = this.sessionQuery.getValue().healthProfessionalToken;
    const decodedToken = this.decodeToken(accessToken);
    if (decodedToken) {
      console.log('Decoded token:', decodedToken);
      return decodedToken;
    }
    return null;
  }

  // Check if the access token is valid
  isAccessUserTokenValid(): boolean {

    const accessToken = this.sessionQuery.getValue().userToken;

    if (!accessToken) {
      return false;
    }

    const decodedToken = this.decodeToken(accessToken);
    if (!decodedToken) {
      return false;
    }

    // Check if the token is expired
    const currentTime = Date.now() / 1000; // Convert to seconds
    console.log(decodedToken);
  
    return decodedToken.exp > currentTime;
  }

  isAccessHealthProfessionalTokenValid(): boolean {

    const accessToken = this.sessionQuery.getValue().healthProfessionalToken;

    if (!accessToken) {
      return false;
    }

    const decodedToken = this.decodeToken(accessToken);
    if (!decodedToken) {
      return false;
    }

    // Check if the token is expired
    const currentTime = Date.now() / 1000; // Convert to seconds
    console.log(decodedToken);
  
    return decodedToken.exp > currentTime;
  }
}


