import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../../../../../interfaces/user.interface';
import { environment } from '../../../../../../environments/environments';
import { HealthProfessional } from '../../../../../../interfaces/healthProfessional.interface';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { UserService } from '../../../../../../services/user/user.service';
import { SessionQuery } from '../../../../session/session.query';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../components/button/button.component';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './profile-user.component.html',
  styleUrl: '../../profile.component.scss'
})
export class ProfileUserComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('modalDeleteProfileUser') modalDeleteProfileUser!: ElementRef<HTMLDialogElement>; // Référence à l'élément <dialog>
  @ViewChild('modalDeleteProfileUserConfirm') modalDeleteProfileUserConfirm!: ElementRef<HTMLDialogElement>; // Référence à l'élément <dialog>


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

  // Fonction pour ouvrir la modal de suppression de profil
  openModalDeleteProfileUser(): void {
    this.modalDeleteProfileUser.nativeElement.showModal();
    // Placer le focus sur le premier élément interactif de la modal
    const focusableElements = this.modalDeleteProfileUser.nativeElement.querySelectorAll<HTMLElement>('button, [tabindex="0"], a[href], input, select, textarea');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
  }

  closeModalDeleteProfileUser(): void {
      this.modalDeleteProfileUser.nativeElement.close();
  }

  // Fonction pour ouvrir la modal de confirmation de suppression de profil
  openModalDeleteProfileUserConfirm() : void {
    this.modalDeleteProfileUser.nativeElement.close();
    this.modalDeleteProfileUserConfirm.nativeElement.showModal();
    const focusableElements = this.modalDeleteProfileUserConfirm.nativeElement.querySelectorAll<HTMLElement>('button, [tabindex="0"], a[href], input, select, textarea');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
  }

  closeModalDeleteProfileUserConfirm(): void {
    this.modalDeleteProfileUserConfirm.nativeElement.close();
  }

  //Function pour supprimer le profil utilisateur
  deleteUser(): void {
    if(this.currentUser?.id){
      this.userService.deleteUserProfile(this.currentUser.id).subscribe((data) => {
        console.log(data);
        this.authService.logout();
      });
    }
  }
}
