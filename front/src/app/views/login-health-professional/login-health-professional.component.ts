import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from '../../../../services/auth/auth.service';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-login-healt-professional',
  standalone: true,
  imports: [RouterModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './login-health-professional.component.html',
  styleUrl: './login-health-professional.component.scss'
})
export class LoginHealthProfessionalComponent implements OnInit {
  
  formLoginHealthProfessional :FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.formLoginHealthProfessional = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  async loginHealthProfessional(email: string, password: string) {
    try {
      const response = await this.authService.LoginHealtProfessionalComponent(email, password).pipe(first()).toPromise();
    } catch (error) {
      console.error('Une erreur est survenue lors de la connexion de l\'utilisateur', error);
    }
  }

  async onSubmit() {
    // Vérifiez si le formulaire est valide
    if (this.formLoginHealthProfessional.valid) {
        const { email, password } = this.formLoginHealthProfessional.value;

        try {
            // Appelez la méthode de connexion et attendez le résultat
            await this.loginHealthProfessional(email, password);

            // Vérifiez si les informations de l'utilisateur sont présentes dans le store
            const userInfo = this.authService.isAccessHealthProfessionalTokenValid();
            
            if (userInfo) {
              this.router.navigate(['/home']);
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
