import { Component, Input, OnInit } from '@angular/core';
import { HealthProfessional } from '../../../../interfaces/healthProfessional.interface';
import { CommonModule } from '@angular/common';
import { Avaibility } from '../../../../interfaces/avaibility.interface';
import { AvailabilityService } from '../../../../services/availability/availability.service';
import { Appointment } from '../../../../interfaces/appointment.interface';
import { Router } from '@angular/router';
import { User } from '../../../../interfaces/user.interface';
import { AuthService } from '../../../../services/auth/auth.service';
import { DateFormatterPipe } from '../../pipes/date-formatter.pipe';
import { environment } from '../../../../environments/environments';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AlertComponent } from '../alert/alert.component';
@Component({
    selector: 'app-card-health-professional',
    standalone: true,
    templateUrl: './card-health-professional.component.html',
    styleUrl: './card-health-professional.component.scss',
    imports: [CommonModule, DateFormatterPipe, FontAwesomeModule, AlertComponent]
})

export class CardHealthProfessionalComponent implements OnInit{
  
  @Input() healthProfessional!: HealthProfessional
  availabilities: Avaibility[] = [];
  currentUser?: User;
  selectedAvailability?: Avaibility;
  groupedAvailabilities: any = [];
  imageUrl?: string;
  faUser = faUser;
  errorMsg: string = '';

  constructor(private availabilityService : AvailabilityService , private router : Router, private authService : AuthService) { }
  
  ngOnInit(): void {
    this.imageUrl = `${environment.localhost}/uploads/`;
    this.currentUser = this.authService.getUserInfoFromToken() as User;    
    this.getAvaibilityByHealthProfessionalId()
  }

  onSelectAvailability(availability: Avaibility):void {
    this.selectedAvailability = availability;
    if(this.selectedAvailability.dateOfWeek && this.selectedAvailability && this.currentUser){
      const appointment : Appointment = {
        healthProfessionalId: this.healthProfessional.id,
        userId: this.currentUser?.id ?? 0,
        appointmentAddress: this.healthProfessional.address,
        appointmentCity : this.healthProfessional.city,
        appointmentTime: this.selectedAvailability.startTime,
        appointmentDate: this.selectedAvailability.dateOfWeek,
      }
      const appointmentJson = JSON.stringify(appointment);
      sessionStorage.setItem('currentAppointment', appointmentJson);
      this.router.navigate(['/confirmation-appointment']);
    }
    if(!this.currentUser){
      this.errorMsg = "Vous n'êtes pas autorisé à prendre un rendez-vous"
    }
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
    
    // Crée un objet pour regrouper les disponibilités par jour de la semaine
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();
    
    const currentTime = `${currentHours < 10 ? '0' + currentHours : currentHours}:${currentMinutes < 10 ? '0' + currentMinutes : currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
      
    const groupedObj = availabilities.reduce((acc, availability) => {
        const dayOfWeek = availability.dayOfWeek;
        
        if (!acc[dayOfWeek]) {
            acc[dayOfWeek] = [];
        }
        
        acc[dayOfWeek].push(availability);    
            
        return acc;
    }, {});
    

    
    
   
    // Liste des jours de la semaine
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

     // Détermine le jour actuel
     const currentDayIndex = new Date().getDay();
    
     // Réorganise les jours de la semaine pour commencer par le jour actuel
     const orderedDaysOfWeek = [
         ...daysOfWeek.slice(currentDayIndex),
         ...daysOfWeek.slice(0, currentDayIndex)
     ];
     
    // Filtre les horaires passés pour le jour actuel
    if (groupedObj[daysOfWeek[currentDayIndex]]) {
      groupedObj[daysOfWeek[currentDayIndex]] = groupedObj[daysOfWeek[currentDayIndex]].filter((availability: { startTime: string; }) => {
        
          return availability.startTime > currentTime;
      });
    }    
     // Crée un tableau d'objets avec les jours de la semaine et les disponibilités correspondantes
     this.groupedAvailabilities = orderedDaysOfWeek.map(dayOfWeek => ({
         dayOfWeek,
         availabilities: groupedObj[dayOfWeek] || [] // Si le jour n'a pas d'availabilities, utilise  un tableau vide
     }));
     
     return this.groupedAvailabilities;
  }

  navigateToConfirmationAppointment(params:any) {    
    this.router.navigate(['/confirmation-appointment']);
  }

  formatHours(dateString:string): string {
    // Séparez les parties de la date
    const [hours, minutes, secondes] = dateString.split(':');
    // Recomposez la date au format DD-MM
    const formattedDate = `${hours}h${minutes}`;
    return formattedDate; 
  }
}
