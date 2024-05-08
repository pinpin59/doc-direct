import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from '../../../../interfaces/appointment.interface';
import { HealthProfessionalService } from '../../../../services/health-professional/health-professional.service';
import { HealthProfessional } from '../../../../interfaces/healthProfessional.interface';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../../services/appointment/appointment.service';

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

  constructor(private heatlhProfessionalService : HealthProfessionalService, private appointmentService : AppointmentService) { }

  ngOnInit(): void {
    console.log(this.appointment);
    if(this.appointment)
      this.getHealthProfessionalById(this.appointment?.healthProfessionalId);
    
  }

  getHealthProfessionalById(healthProfessionalId:number){
    this.heatlhProfessionalService.getHealthProfessionalById(healthProfessionalId).subscribe((data) => {
      this.healthProfessional = data;
    });
  }

  deleteAppointmentById(appointmentId:number){
    this.appointmentService.deleteAppointmentById(appointmentId).subscribe((data) => {
      console.log('Appointment deleted');
      this.onAction();
    });
  }

  //Output action
  onAction(): void {
    this.appointmentAction.emit();
  }

}
