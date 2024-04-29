import { Component, OnInit } from '@angular/core';
import { HealthProfessionalService } from '../../../../../services/health-professional/health-professional.service';
import { HealthProfessional } from '../../../../../interfaces/healthProfessional.interface';
import { CommonModule } from '@angular/common';
import { CardHealthProfessionalComponent } from '../../../components/card-health-professional/card-health-professional.component';

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

  constructor(private healthProfessionalService : HealthProfessionalService) { }

  ngOnInit(): void {
    this.getHealthProfessionals();
    this.getDaysOfWeekFromToday();
  }

  getHealthProfessionals(){
    this.healthProfessionalService.getHealthProfessionals().subscribe((data) => {
      this.healthProfessionals = data;
    });
  }

  // Calcule les jours de la semaine à partir du jour actuel
  getDaysOfWeekFromToday(): void {
    const today = new Date();
    const daysOfWeek = [
        'Dimanche',
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi'
    ];

    // Commencez par le jour actuel et obtenez les jours suivants
    for (let i = 0; i < 7; i++) {
        const dayIndex = (today.getDay() + i) % 7;
        this.daysOfWeek.push(daysOfWeek[dayIndex]);
    }
}
} 
