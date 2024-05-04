import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '../../../../interfaces/appointment.interface';
import { HealthProfessionalService } from '../../../../services/health-professional/health-professional.service';
import { HealthProfessional } from '../../../../interfaces/healthProfessional.interface';
import { CommonModule } from '@angular/common';

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
  healthProfessional ?: HealthProfessional;
  constructor(private heatlhProfessionalService : HealthProfessionalService) { }

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


}
