import { Component, Input, OnInit } from '@angular/core';
import { HealthProfessional } from '../../../../interfaces/healthProfessional.interface';
import { CommonModule } from '@angular/common';
import { TimeSlot } from '../../../../interfaces/avaibility.interface';

@Component({
  selector: 'app-card-health-professional',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-health-professional.component.html',
  styleUrl: './card-health-professional.component.scss'
})
export class CardHealthProfessionalComponent implements OnInit{
  
  @Input() healthProfessional!: HealthProfessional
  availabilityByDay: { [day: string]: TimeSlot[] } = {};

  daysOfWeek: string[] = [];
  daysOfWeekWithDates: { day: string, date: Date }[] = [];

  constructor() { }
  
  ngOnInit(): void {
    this.getDaysOfWeekFromToday();
    this.availabilityByDay = {
      'Lundi': [
          { day: 'Lundi', startTime: '09:00', endTime: '10:00', isAvailable: true },
          { day: 'Lundi', startTime: '10:00', endTime: '11:00', isAvailable: true },
          { day: 'Lundi', startTime: '11:00', endTime: '12:00', isAvailable: false },
      ],
      'Mardi': [
          { day: 'Mardi', startTime: '09:00', endTime: '10:00', isAvailable: true },
          { day: 'Mardi', startTime: '10:00', endTime: '11:00', isAvailable: true },
          { day: 'Mardi', startTime: '11:00', endTime: '12:00', isAvailable: false },
      ],
      'Mercredi': [
          { day: 'Mercredi', startTime: '09:00', endTime: '10:00', isAvailable: false },
          { day: 'Mercredi', startTime: '10:00', endTime: '11:00', isAvailable: true },
          { day: 'Mercredi', startTime: '11:00', endTime: '12:00', isAvailable: true },
      ],
      'Jeudi': [
          { day: 'Jeudi', startTime: '09:00', endTime: '10:00', isAvailable: true },
          { day: 'Jeudi', startTime: '10:00', endTime: '11:00', isAvailable: true },
          { day: 'Jeudi', startTime: '11:00', endTime: '12:00', isAvailable: false },
      ],
      'Vendredi': [
          { day: 'Vendredi', startTime: '09:00', endTime: '10:00', isAvailable: true },
          { day: 'Vendredi', startTime: '10:00', endTime: '11:00', isAvailable: false },
          { day: 'Vendredi', startTime: '11:00', endTime: '12:00', isAvailable: true },
      ],
      'Samedi': [
          { day: 'Samedi', startTime: '09:00', endTime: '10:00', isAvailable: true },
          { day: 'Samedi', startTime: '10:00', endTime: '11:00', isAvailable: false },
          { day: 'Samedi', startTime: '11:00', endTime: '12:00', isAvailable: true },
      ],
      'Dimanche': [
          { day: 'Dimanche', startTime: '09:00', endTime: '10:00', isAvailable: false },
          { day: 'Dimanche', startTime: '10:00', endTime: '11:00', isAvailable: true },
          { day: 'Dimanche', startTime: '11:00', endTime: '12:00', isAvailable: true },
      ]
  };
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
  
      for (let i = 0; i < 7; i++) {
        const dayIndex = (today.getDay() + i) % 7;
        const dayName = daysOfWeek[dayIndex];

        // Calculer la date du jour actuel plus i jours
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        

        // Ajouter le jour de la semaine et la date correspondante au tableau
        this.daysOfWeekWithDates.push({ day: dayName, date });
    }
  }

  test(rdv:any){
    console.log(rdv);
    
  }

}
