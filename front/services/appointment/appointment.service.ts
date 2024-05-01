import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionQuery } from '../../src/app/session/session.query';
import { Appointment } from '../../interfaces/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
    private apiUrl = `${environment.apiUrl}`;

    constructor(private http: HttpClient, private sessionQuery: SessionQuery) {}

    private getHeaders(): HttpHeaders {
        const userToken = this.sessionQuery.getValue().userToken;                
        let headers = new HttpHeaders();
        if (userToken) {
        headers = headers.set('Authorization', `Bearer ${userToken}`);
        }
        console.log('Headers:', headers);
        
        return headers;

    }

  // Appels API

  getAllAppointment() {
    return this.http.get(`${this.apiUrl}/appointments`, { headers: this.getHeaders() });
  }

  createAppointment(appointment: Appointment) {
    return this.http.post(`${this.apiUrl}/appointments`,appointment, { headers: this.getHeaders() });
  }

 
}