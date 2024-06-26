import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { ButtonComponent } from '../../components/button/button.component';
import { SessionQuery } from '../../session/session.query';
import { SessionStore } from '../../session/session.store';
import { AlertComponent } from '../../components/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,ButtonComponent, RouterModule,AlertComponent, CommonModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.scss'
})
export class LoginUserComponent implements OnInit {

  formLoginUser :FormGroup;
  errorMsg : string = '';

  constructor(private authService : AuthService, private fb: FormBuilder, private sessionQuery :SessionQuery, private sessionStore:SessionStore, private router : Router) {
    this.formLoginUser = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {}

  async login(email: string, password: string) {
    try {
      const response = await this.authService.loginUser(email, password).pipe(first()).toPromise();
    } catch (error) {
      this.errorMsg = 'Erreur lors de la tentative votre tentative ! Veuillez réessayer.';
      console.error('Une erreur est survenue lors de la connexion de l\'utilisateur', error);
    }
  }

  
  async onSubmit() {
    // Vérifiez si le formulaire est valide
    if (this.formLoginUser.valid) {
        const { email, password } = this.formLoginUser.value;

        try {
            // Appelez la méthode de connexion et attendez le résultat
            await this.login(email, password);

            // Vérifiez si les informations de l'utilisateur sont présentes dans le store
            const userInfo = this.authService.isAccessUserTokenValid();
            
            if (userInfo) {
              // Si les informations de l'utilisateur sont correctes, redirige vers la nouvelle page
              this.router.navigate(['/list-health-professional']);
            } else {
                console.error('Les informations de l\'utilisateur ne sont pas présentes dans le store.');
            }
        } catch (error) {
            // Gérez les erreurs d'authentification
            console.error('Erreur lors de l\'authentification:', error);
        }
    } else {
        this.errorMsg = 'Veuillez remplir tous les champs';
    }
  }

}
 