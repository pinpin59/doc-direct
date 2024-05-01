import { Component, Input, OnInit } from '@angular/core';
import { HealthProfessional } from '../../../../interfaces/healthProfessional.interface';
import { CommonModule } from '@angular/common';
import { Avaibility, TimeSlot } from '../../../../interfaces/avaibility.interface';
import { AvailabilityService } from '../../../../services/availability/availability.service';
import { Appointment } from '../../../../interfaces/appointment.interface';
import { Router } from '@angular/router';
import { DateFormatterPipe } from "../../pipes/date-formatter.pipe";
import { SharedModule } from '../../shared/shared.module';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'app-card-health-professional',
    standalone: true,
    templateUrl: './card-health-professional.component.html',
    styleUrl: './card-health-professional.component.scss',
    imports: [CommonModule, SharedModule]
})
export class CardHealthProfessionalComponent implements OnInit{
  
  @Input() healthProfessional!: HealthProfessional
  availabilities: Avaibility[] = [];
  selectedAvailability?: Avaibility; // Ou définir un type plus précis si nécessaire
  groupedAvailabilities: any = [];

  constructor(private availabilityService : AvailabilityService , private router : Router, private sharedService: SharedService) { }
  
  ngOnInit(): void {    
    this.getAvaibilityByHealthProfessionalId()
  }

  onSelectAvailability(availability: Avaibility):void {
    this.selectedAvailability = availability;
    if(this.selectedAvailability.dateOfWeek && this.selectedAvailability){
      const appointment : Appointment = {
        healthProfessionalId: this.healthProfessional.id,
        userId: 1,
        appointmentAdress: this.healthProfessional.adress,
        appointmentCity : this.healthProfessional.city,
        appointmentTime: this.selectedAvailability.startTime,
        appointmentDate: this.selectedAvailability.dateOfWeek,
      }
      //this.sharedService.setData(appointment);
      const appointmentJson = JSON.stringify(appointment);
        // Stocker l'objet appointment en localStorage
        sessionStorage.setItem('currentAppointment', appointmentJson);
        // Naviguer vers la page de confirmation
      this.router.navigate(['/confirmation-appointment']);
    }
    
    
    //this.navigateToConfirmationAppointment(appointment);    
  }

  async getAvaibilityByHealthProfessionalId(){
    try {
      const data: Avaibility[] = await this.availabilityService.getAvailabilityByHealthProfessionalId(this.healthProfessional.id).toPromise() as Avaibility[];
      this.availabilities = [...data];      
      this.groupAvailabilitiesByDayOfWeek(this.availabilities);
    }
    catch (error) {
      console.error(error);
    }
    
  }

  groupAvailabilitiesByDayOfWeek(availabilities: any[]): any[] {
    // Créez un objet pour regrouper les disponibilités par jour de la semaine
    const groupedObj = availabilities.reduce((acc, availability) => {
        const dayOfWeek = availability.dayOfWeek;
        if (!acc[dayOfWeek]) {
            acc[dayOfWeek] = [];
        }
        acc[dayOfWeek].push(availability);
        return acc;
    }, {});

    // Convertissez l'objet en un tableau d'objets, où chaque objet représente un jour de la semaine
    this.groupedAvailabilities = Object.entries(groupedObj).map(([dayOfWeek, availabilities]) => {      
      return {
        dayOfWeek,
        availabilities: availabilities
    };
    });
    console.log(this.groupedAvailabilities);
    
    return this.groupedAvailabilities;
  }

  navigateToConfirmationAppointment(params:any) {
    this.router.navigate(['/confirmation-appointment']);
  }

  formatDate(dateString:string): string {
    // Séparez les parties de la date
    const [year, month, day] = dateString.split('-');

    // Recomposez la date au format DD-MM
    const formattedDate = `${day}-${month}`;

    return formattedDate;
}
}
