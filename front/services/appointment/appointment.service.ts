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
        const HealthProfessionalToken = this.sessionQuery.getValue().healthProfessionalToken;              
        let headers = new HttpHeaders();
        if (userToken) {
        headers = headers.set('Authorization', `Bearer ${userToken}`);
        }
        if (HealthProfessionalToken) {
            headers = headers.set('Authorization', `Bearer ${HealthProfessionalToken}`);
        }        
        return headers;
    }

  // Appels API

  getAllAppointment() {
    return this.http.get(`${this.apiUrl}/appointments`, { headers: this.getHeaders() });
  }

  getAllAppointmentByUserId(userId: number) {
    return this.http.get(`${this.apiUrl}/appointments/user/${userId}`, { headers: this.getHeaders() });
  }

  getAllAppointmentByHealthProfessionalId(healthProfessionalId: number) {
    return this.http.get(`${this.apiUrl}/appointments/health-professional/${healthProfessionalId}`, { headers: this.getHeaders() });
  }

  createAppointment(appointment: Appointment) {
    return this.http.post(`${this.apiUrl}/appointments`,appointment, { headers: this.getHeaders() });
  }

  deleteAppointmentById(appointmentId: number) {
    return this.http.delete(`${this.apiUrl}/appointments/${appointmentId}`, { headers: this.getHeaders() });
  }
 
}