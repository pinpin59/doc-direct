import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../../../../../interfaces/user.interface';
import { environment } from '../../../../../../environments/environments';
import { HealthProfessional } from '../../../../../../interfaces/healthProfessional.interface';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { UserService } from '../../../../../../services/user/user.service';
import { SessionQuery } from '../../../../session/session.query';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-user.component.html',
  styleUrl: '../../profile.component.scss'
})
export class ProfileUserComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  profilePicture: string | null = null;
  currentUser?: User ;
  imageUrl?: string;

  constructor(private userService : UserService, private authService: AuthService, private sessionQuery : SessionQuery) { }
    
  ngOnInit(): void {
    this.imageUrl = `${environment.localhost}/uploads/`;
    this.sessionQuery.select().subscribe((session) => {
    const userInfo = this.authService.getUserInfoFromToken();
    this.currentUser = userInfo as User;
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
            const currentUserId = this.currentUser?.id;
            if(currentUserId && file){
              const response = await this.userService.uploadProfilePictureUser(currentUserId,file).toPromise();
              //update token
              this.authService.updateTokenUser(response.token);
              this.currentUser = this.authService.getUserInfoFromToken();
            }
        } catch (error) {
            console.error('Erreur lors de l\'upload de la photo de profil :', error);
        }
    }
}

 
}
