import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { SessionQuery } from '../../session/session.query';
import { User } from '../../../../interfaces/user.interface';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environments';
import { HealthProfessional } from '../../../../interfaces/healthProfessional.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  profilePicture: string | null = null;
  currentUser : HealthProfessional | User = {} as HealthProfessional | User;
  imageUrl?: string;

  constructor(private userService : UserService, private authService: AuthService, private sessionQuery : SessionQuery) { }
    
  ngOnInit(): void {
    this.imageUrl = `${environment.localhost}/uploads/`;
    this.sessionQuery.select().subscribe((session) => {
      this.currentUser = this.authService.getUserInfoFromToken() || this.authService.getHealthProfessionalInfoFromToken();      
    });
    console.log(this.currentUser);
  }


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
            if(currentUserId && file && this.isUser()){
              const response = await this.userService.uploadProfilePictureUser(currentUserId,file).toPromise();
              //update token
              this.authService.updateTokenUser(response.token);
              this.currentUser = this.authService.getUserInfoFromToken();
              console.log(this.currentUser);
            }else if(currentUserId && file && this.isHealthProfessional()){
              const response = await this.userService.uploadProfilePictureHealthProfessional(currentUserId,file).toPromise();
              //update token
              this.authService.updateTokenHealthProfessional(response.token);
              this.currentUser = this.authService.getHealthProfessionalInfoFromToken();
              console.log(this.currentUser);
            } 
        } catch (error) {
            console.error('Erreur lors de l\'upload de la photo de profil :', error);
        }
    }
}

  // Méthode pour vérifier si l'utilisateur est un professionnel de la santé
  isHealthProfessional(): boolean {
    return this.currentUser && 'profession' in this.currentUser;
  }

  // Méthode pour vérifier si l'utilisateur est un utilisateur standard
  isUser(): boolean {
      return this.currentUser && 'role' in this.currentUser;
  }
}
