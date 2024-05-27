import { Component, ElementRef, ViewChild } from '@angular/core';
import { HealthProfessional } from '../../../../../../interfaces/healthProfessional.interface';
import { environment } from '../../../../../../environments/environments';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { UserService } from '../../../../../../services/user/user.service';
import { SessionQuery } from '../../../../session/session.query';
import { CommonModule } from '@angular/common';
import { StatusPipe } from '../../../../pipes/status.pipe';
import { ButtonComponent } from '../../../../components/button/button.component';
import { HealthProfessionalService } from '../../../../../../services/health-professional/health-professional.service';

@Component({
  selector: 'app-profile-health-professional',
  standalone: true,
  imports: [CommonModule, StatusPipe,ButtonComponent],
  templateUrl: './profile-health-professional.component.html',
  styleUrl: '../../profile.component.scss'
})
export class ProfileHealthProfessionalComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('modalDeleteProfileHealthProfessional') modalDeleteProfileHealthProfessional!: ElementRef<HTMLDialogElement>; // Référence à l'élément <dialog>
  @ViewChild('modalDeleteProfileHealthProfessionalConfirm') modalDeleteProfileHealthProfessionalConfirm!: ElementRef<HTMLDialogElement>; // Référence à l'élément <dialog>

  profilePicture: string | null = null;
  currentHealthProfessional?: HealthProfessional ;
  imageUrl?: string;

  constructor(private userService : UserService,private healthProfessionalService : HealthProfessionalService, private authService: AuthService, private sessionQuery : SessionQuery) { }
    
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
              const response = await this.healthProfessionalService.uploadProfilePictureHealthProfessional(currentUserId,file).toPromise();
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

// Fonction pour ouvrir la modal de suppression de profil
openModalDeleteProfileHealthProfessional(): void {
  this.modalDeleteProfileHealthProfessional.nativeElement.showModal();
  // Placer le focus sur le premier élément interactif de la modal
  const focusableElements = this.modalDeleteProfileHealthProfessional.nativeElement.querySelectorAll<HTMLElement>('button, [tabindex="0"], a[href], input, select, textarea');
  if (focusableElements.length > 0) {
      focusableElements[0].focus();
  }
}

closeModalDeleteProfileHealthProfessional(): void {
    this.modalDeleteProfileHealthProfessional.nativeElement.close();
}

// Fonction pour ouvrir la modal de confirmation de suppression de profil
openModalDeleteProfileHealthProfessionalConfirm() : void {
  this.modalDeleteProfileHealthProfessional.nativeElement.close();
  this.modalDeleteProfileHealthProfessionalConfirm.nativeElement.showModal();
  const focusableElements = this.modalDeleteProfileHealthProfessionalConfirm.nativeElement.querySelectorAll<HTMLElement>('button, [tabindex="0"], a[href], input, select, textarea');
  if (focusableElements.length > 0) {
      focusableElements[0].focus();
  }
}

closeModalDeleteProfileHealthProfessionalConfirm(): void {
  this.modalDeleteProfileHealthProfessionalConfirm.nativeElement.close();
}

//Function pour supprimer le profil utilisateur
deleteUser(): void {
  if(this.currentHealthProfessional?.id){
    this.healthProfessionalService.deleteHealthProfessionalProfile(this.currentHealthProfessional.id).subscribe((data) => {
      console.log(data);
      this.authService.logout();
    });
  }
}

}
