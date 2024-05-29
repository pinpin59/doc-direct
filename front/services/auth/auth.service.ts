import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { SessionQuery } from '../../src/app/session/session.query';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { SessionStore } from '../../src/app/session/session.store';
import {jwtDecode} from 'jwt-decode';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private sessionStore: SessionStore, private sessionQuery: SessionQuery, private router : Router) {}

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-user`, { email, password }).pipe(
        tap((response:any) => {
            const userToken = response.token;
            // Stocker le jeton dans SessionQuery et store
            this.sessionStore.update({
              userToken: userToken,
              healthProfessionalToken: null
            });
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

  logout(): void{
    this.sessionStore.update({
      userToken: null,
      healthProfessionalToken: null
    });
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login-user']);
  }

  updateTokenUser(token: string): void {
    this.sessionStore.update({ userToken: token });
  }

  updateTokenHealthProfessional(token: string): void {
    this.sessionStore.update({ healthProfessionalToken: token });
  }

  registerUser(user:User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-user`, user);
  }

  registerHealthProfessional(healthProfessional: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-health-professional`, healthProfessional);
  }

  loginHealtProfessionalComponent(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-health-professional`, { email, password }).pipe(
        tap((response:any) => {
            const healthProfessionalToken = response.token;
            // Stocker le jeton dans SessionQuery et store
            this.sessionStore.update({
              userToken: null,
              healthProfessionalToken: healthProfessionalToken
            });
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


  // Récupérer le jeton de l'utilisateur dans le store
  getUserToken(): string | null {    
    return this.sessionQuery.getValue().userToken;
  }

  getHealthProfessionalToken(): string | null {
    return this.sessionQuery.getValue().healthProfessionalToken;
  }


  // Décode le jeton
  decodeToken(token:string | null): any {
    const idToken = token;
    if (idToken) {
      return jwtDecode(idToken);
    }
    return null;
  }

  // Récupérer les informations de l'utilisateur à partir du jeton
  getUserInfoFromToken(): any {
    const accessToken = this.sessionQuery.getValue().userToken;
    const decodedToken = this.decodeToken(accessToken);
    if (decodedToken) {
      console.log('Decoded token:', decodedToken);
      return decodedToken;
    }
    return null;
  }

  // Récupérer les informations du professionnel de la santé à partir du jeton
  getHealthProfessionalInfoFromToken(): any {
    const accessToken = this.sessionQuery.getValue().healthProfessionalToken;
    const decodedToken = this.decodeToken(accessToken);
    if (decodedToken) {
      console.log('Decoded token:', decodedToken);
      return decodedToken;
    }
    return null;
  }
 
  // Vérifie si le jeton de l'utilisateur est valide
  isAccessUserTokenValid(): boolean {

    const accessToken = this.sessionQuery.getValue().userToken;

    if (!accessToken) {
      return false;
    }

    const decodedToken = this.decodeToken(accessToken);
    if (!decodedToken) {
      return false;
    }

    const currentTime = Date.now() / 1000; // Convertir en secondes

    if(decodedToken.exp > currentTime){
      return true;
    }else{      
      this.sessionStore.update({
        userToken: null,
        healthProfessionalToken: null
      });
      localStorage.clear();
      sessionStorage.clear();
      return false;
    }
    
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

    // Vérifiez si le jeton a expiré
    const currentTime = Date.now() / 1000; // Convertie en secondes  
    return decodedToken.exp > currentTime;
  }
}


