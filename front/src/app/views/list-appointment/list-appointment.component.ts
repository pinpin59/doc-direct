import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../../../interfaces/appointment.interface';
import { HealthProfessional } from '../../../../interfaces/healthProfessional.interface';
import { User } from '../../../../interfaces/user.interface';
import { AppointmentService } from '../../../../services/appointment/appointment.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { CardAppointmentComponent } from '../../components/card-appointment/card-appointment.component';

@Component({
  selector: 'app-list-appointment',
  standalone: true,
  imports: [CommonModule,CardAppointmentComponent],
  templateUrl: './list-appointment.component.html',
  styleUrl: './list-appointment.component.scss'
})
export class ListAppointmentComponent implements OnInit{

  currentUser?: User;
  currentHealthProfessional?: HealthProfessional;
  currentAppointment ?: Appointment[];
  constructor(private appointmentService : AppointmentService, private authService : AuthService) { }

  ngOnInit(): void {
    this.loadAppointmentsByCurrentUser();
  }

  loadAppointmentsByCurrentUser(){
    if(this.authService.getUserInfoFromToken()){
      this.currentUser = this.authService.getUserInfoFromToken() as User;
      if(this.currentUser.id){
        this.getAllAppointmentsByUserId(this.currentUser.id);
      }
    }else{
      this.currentHealthProfessional = this.authService.getHealthProfessionalInfoFromToken() as HealthProfessional;
      this.getAllAppointmentsByHealthProfessionalId(this.currentHealthProfessional.id);
    }
  }

  getAllAppointmentsByUserId(userId:number){
    this.appointmentService.getAllAppointmentByUserId(userId).subscribe((data) => {
      this.currentAppointment = data as Appointment[];
      console.log(this.currentAppointment);
      
    });
  }

  getAllAppointmentsByHealthProfessionalId(healthProfessionalId:number){
    this.appointmentService.getAllAppointmentByHealthProfessionalId(healthProfessionalId).subscribe((data) => {
      this.currentAppointment = data as Appointment[];
    });
  }

  handleAppointmentAction(event: any): void {
    this.loadAppointmentsByCurrentUser();
  }
}
