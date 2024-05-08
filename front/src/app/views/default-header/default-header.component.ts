import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {faCoffee, faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { HealthProfessional } from '../../../../interfaces/healthProfessional.interface';
import { User } from '../../../../interfaces/user.interface';
import { AuthService } from '../../../../services/auth/auth.service';
import { SessionQuery } from '../../session/session.query';
import { SessionStore } from '../../session/session.store';


@Component({
  selector: 'app-default-header',
  standalone: true,
  imports: [CommonModule, RouterModule,FaIconComponent],
  templateUrl: './default-header.component.html',
  styleUrl: './default-header.component.scss'
})
export class DefaultHeaderComponent implements OnInit {

  constructor(private sessionStore : SessionStore, private sessionQuery : SessionQuery, private router: Router, private authService : AuthService) { } 

  isExpanded: boolean = false;
  faXmark = faXmark;
  faBars = faBars;
  currentUser : Array<HealthProfessional | User> = [];

 
  ngOnInit(): void {    
    this.sessionQuery.select().subscribe((session) => {
      this.currentUser = this.authService.getUserInfoFromToken() || this.authService.getHealthProfessionalInfoFromToken();      
    });
  }

  toggleNavbar(): void {    
    this.isExpanded = !this.isExpanded;      
  }

  // Méthode pour vérifier si l'utilisateur est un professionnel de la santé
  isHealthProfessional(): boolean {
    return this.currentUser && 'profession' in this.currentUser;
  }

  // Méthode pour vérifier si l'utilisateur est un utilisateur standard
  isUser(): boolean {
      return this.currentUser && 'role' in this.currentUser;
  }

  logout(): void{
    this.sessionStore.update({
      userToken: null,
      healthProfessionalToken: null
    });
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login-user']);
  }

  ngOnDestroy(): void {
    this.sessionStore.reset();
  }

}
 