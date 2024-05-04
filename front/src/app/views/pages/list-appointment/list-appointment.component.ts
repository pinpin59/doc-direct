import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../../services/appointment/appointment.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { User } from '../../../../../interfaces/user.interface';
import { HealthProfessional } from '../../../../../interfaces/healthProfessional.interface';
import { CardAppointmentComponent } from '../../../components/card-appointment/card-appointment.component';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../../../../interfaces/appointment.interface';

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

}
