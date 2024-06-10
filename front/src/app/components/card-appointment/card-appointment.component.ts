import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from '../../../../interfaces/appointment.interface';
import { HealthProfessionalService } from '../../../../services/health-professional/health-professional.service';
import { HealthProfessional } from '../../../../interfaces/healthProfessional.interface';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../../services/appointment/appointment.service';
import { User } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-card-appointment',
  standalone: true,
  imports: [CommonModule],
templateUrl: './card-appointment.component.html',
  styleUrl: './card-appointment.component.scss'
})
export class CardAppointmentComponent implements OnInit{
  @Input({required:true}) appointment?: Appointment;
  @Input({required:true}) isUser?: boolean;
  @Output() appointmentAction = new EventEmitter<any>();

  healthProfessional ?: HealthProfessional;
  user?:User;

  constructor(private heatlhProfessionalService : HealthProfessionalService, private userService : UserService, private appointmentService : AppointmentService) { }

  ngOnInit(): void {
    if(this.appointment){
      this.getHealthProfessionalById(this.appointment.healthProfessionalId);
      this.getUserById(this.appointment.userId);
    }
  }

  getHealthProfessionalById(healthProfessionalId:number){
    this.heatlhProfessionalService.getHealthProfessionalById(healthProfessionalId).subscribe((data) => {
      this.healthProfessional = data;
      console.log(this.healthProfessional);
    });
  }

  getUserById(userId:number){
    this.heatlhProfessionalService.getUserById(userId).subscribe((data) => {
      console.log(data);
      
      this.user = data;
    });
  }

  deleteAppointmentById(appointmentId:number){
    this.appointmentService.deleteAppointmentById(appointmentId).subscribe((data) => {
      this.onAction();
    });
  }

  //Action de l'output
  onAction(): void {
    this.appointmentAction.emit();
  }

}
