import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { SessionQuery } from '../../session/session.query';
import { User } from '../../../../interfaces/user.interface';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environments';
import { HealthProfessional } from '../../../../interfaces/healthProfessional.interface';
import { ProfileUserComponent } from './profile-components/profile-user/profile-user.component';
import { ProfileHealthProfessionalComponent } from './profile-components/profile-health-professional/profile-health-professional.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProfileUserComponent, ProfileHealthProfessionalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  profilePicture: string | null = null;
  currentUser ?: User;
  currentHealthProfessional ?: HealthProfessional;
  imageUrl?: string;

  constructor(private userService : UserService, private authService: AuthService, private sessionQuery : SessionQuery) { }
    
  ngOnInit(): void {
    this.imageUrl = `${environment.localhost}/uploads/`;
    const userInfo = this.authService.getUserInfoFromToken();
    const healthProfessionalInfo = this.authService.getHealthProfessionalInfoFromToken();

      if (userInfo) {
        this.currentUser = userInfo as User;
      } else if (healthProfessionalInfo) {
        this.currentHealthProfessional = healthProfessionalInfo as HealthProfessional;
      }    
  };
}
