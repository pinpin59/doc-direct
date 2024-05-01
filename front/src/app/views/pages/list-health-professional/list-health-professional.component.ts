import { Component, OnInit } from '@angular/core';
import { HealthProfessionalService } from '../../../../../services/health-professional/health-professional.service';
import { HealthProfessional } from '../../../../../interfaces/healthProfessional.interface';
import { CommonModule } from '@angular/common';
import { CardHealthProfessionalComponent } from '../../../components/card-health-professional/card-health-professional.component';
import { AvailabilityService } from '../../../../../services/availability/availability.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-list-health-professional',
  standalone: true,
  imports: [CommonModule, CardHealthProfessionalComponent],
  templateUrl: './list-health-professional.component.html',
  styleUrl: './list-health-professional.component.scss'
})
export class ListHealthProfessionalComponent implements OnInit{

  healthProfessionals: HealthProfessional[] = [];
  daysOfWeek: string[] = [];

  constructor(private healthProfessionalService : HealthProfessionalService, private avaibilityService : AvailabilityService) { }

  ngOnInit(): void {
    this.getHealthProfessionals();
  }

  getHealthProfessionals(){
    this.healthProfessionalService.getHealthProfessionals().subscribe((data) => {
      console.log(data);
      
      this.healthProfessionals = data;
    });
  }

 
} 
