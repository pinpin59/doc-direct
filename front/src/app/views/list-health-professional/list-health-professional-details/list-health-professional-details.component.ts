import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../../../../interfaces/appointment.interface';
import { HealthProfessional } from '../../../../../interfaces/healthProfessional.interface';
import { AppointmentService } from '../../../../../services/appointment/appointment.service';
import { HealthProfessionalService } from '../../../../../services/health-professional/health-professional.service';

@Component({
  selector: 'app-list-health-professional-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-health-professional-details.component.html',
  styleUrl: './list-health-professional-details.component.scss'
})
export class ListHealthProfessionalDetailsComponent implements OnInit {

    currentAppointment?:Appointment;
    currentHealthProfessional?:HealthProfessional;
    comment?: string;

    constructor(private router : Router, private healthProfessionalService : HealthProfessionalService, private appointmentService: AppointmentService) { }
  
    ngOnInit(): void {
      // Récupére l'objet appointment stocké en localStorage
      const appointmentJson = sessionStorage.getItem('currentAppointment');
      if (appointmentJson) {
          this.currentAppointment = JSON.parse(appointmentJson);
          console.log(this.currentAppointment);
          if(this.currentAppointment?.healthProfessionalId){
            this.getHealthProfessionalById(this.currentAppointment.healthProfessionalId);
          }          
      } else {
          this.router.navigate(['/list-health-professional']);
      }
  }

  async getHealthProfessionalById(id: number){
    this.healthProfessionalService.getHealthProfessionalById(id).subscribe((data) => {
      this.currentHealthProfessional = data;
      console.log(this.currentHealthProfessional);
    });
  }

  cancelAppointment(): void {
    sessionStorage.removeItem('currentAppointment');
    this.router.navigate(['/list-health-professional']);
  }

  createAppointment(): void {
    if(this.currentAppointment){
      console.log(this.currentAppointment);
      
      this.comment ? this.currentAppointment.comment = this.comment : null;
      this.appointmentService.createAppointment(this.currentAppointment).pipe(first()).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/list-health-professional']);
      });
    }
  }

  
} 
