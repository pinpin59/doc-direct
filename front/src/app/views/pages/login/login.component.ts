import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { SessionQuery } from '../../../session/session.query';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formLoginUser :FormGroup;

  constructor(private authService : AuthService, private fb: FormBuilder, private sessionQuery :SessionQuery) {
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
            const userInfo = await this.sessionQuery.selectToken().pipe(first()).toPromise();
            
            if (userInfo) {
              console.log('Utilisateur connecté:', userInfo);
                // Si les informations de l'utilisateur sont correctes, redirigez vers la nouvelle page
            } else {
                console.error('Les informations de l\'utilisateur ne sont pas présentes dans le store.');
            }
        } catch (error) {
            // Gérez les erreurs d'authentification
            console.error('Erreur lors de l\'authentification:', error);
        }
    } else {
        console.log('Formulaire invalide');
    }
  }
}
 