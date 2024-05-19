import { Component, ElementRef, ViewChild } from '@angular/core';
import { HealthProfessional } from '../../../../../../interfaces/healthProfessional.interface';
import { environment } from '../../../../../../environments/environments';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { UserService } from '../../../../../../services/user/user.service';
import { SessionQuery } from '../../../../session/session.query';
import { CommonModule } from '@angular/common';
import { StatusPipe } from '../../../../pipes/status.pipe';

@Component({
  selector: 'app-profile-health-professional',
  standalone: true,
  imports: [CommonModule, StatusPipe],
  templateUrl: './profile-health-professional.component.html',
  styleUrl: '../../profile.component.scss'
})
export class ProfileHealthProfessionalComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  profilePicture: string | null = null;
  currentHealthProfessional?: HealthProfessional ;
  imageUrl?: string;

  constructor(private userService : UserService, private authService: AuthService, private sessionQuery : SessionQuery) { }
    
  ngOnInit(): void {
    this.imageUrl = `${environment.localhost}/uploads/`;
    this.sessionQuery.select().subscribe((session) => {
    const healthProfessionalInfo = this.authService.getHealthProfessionalInfoFromToken();
    this.currentHealthProfessional = healthProfessionalInfo as HealthProfessional;
    });
  };

  


  // Fonction pour ouvrir le champ de sélection de fichier
  openFileInput(): void {
    
    if (this.fileInput) {      
      this.fileInput.nativeElement.click();
    }
  }

   // Fonction pour gérer la sélection de fichier
   async onFileChange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
        try {          
            const currentUserId = this.currentHealthProfessional?.id;
            if(currentUserId && file){
              const response = await this.userService.uploadProfilePictureHealthProfessional(currentUserId,file).toPromise();
              //update token
              this.authService.updateTokenHealthProfessional(response.token);
              this.currentHealthProfessional = this.authService.getHealthProfessionalInfoFromToken();
              console.log(this.currentHealthProfessional);
            }
        } catch (error) {
            console.error('Erreur lors de l\'upload de la photo de profil :', error);
        }
    }
}

}
