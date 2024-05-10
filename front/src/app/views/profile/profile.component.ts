import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { SessionQuery } from '../../session/session.query';
import { User } from '../../../../interfaces/user.interface';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environments';

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
  currentUser?: User;
  imageUrl?: string;

  constructor(private userService : UserService, private authService: AuthService) { }
    
  ngOnInit(): void {
    this.imageUrl = `${environment.localhost}/uploads/`;
    this.currentUser = this.authService.getUserInfoFromToken() as User;    
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
            // Appelez la fonction du service pour uploader le fichier
            const currentUserId = this.currentUser?.id;
            if(currentUserId && file){
              const response = await this.userService.uploadProfilePictureUser(currentUserId,file).toPromise();
              // Gérez la réponse de l'API (par exemple, mettre à jour l'interface utilisateur)
              console.log('Photo de profil mise à jour avec succès:', response);
              //update token
              this.authService.updateTokenUser(response.token);
              this.currentUser = this.authService.getUserInfoFromToken() as User;
              console.log(this.currentUser);
            }

            
            
        } catch (error) {
            // Gérez les erreurs de manière appropriée
            console.error('Erreur lors de l\'upload de la photo de profil :', error);
            // Vous pouvez afficher un message d'erreur à l'utilisateur ici
        }
    }
}
}
