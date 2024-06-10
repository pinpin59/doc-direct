import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../../interfaces/user.interface';
import { AuthService } from '../../../../services/auth/auth.service';
import { AlertComponent } from '../../components/alert/alert.component';
import { UserRoles } from '../../enums/user-roles.enum';

@Component({
  selector: 'app-registation-user',
  standalone: true,
  imports: [AlertComponent, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registration-user.component.html',
  styleUrl: './registration-user.component.scss'
})
export class RegistrationUserComponent implements OnInit{

  registrationForm!: FormGroup;
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private authService : AuthService, private router : Router) {
    this.registrationForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      passwordConfirm: ['',Validators.required],
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      city: ['',Validators.required],
      address: ['',Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmitRegistration(){
    if(this.registrationForm?.valid){
      
      if(this.registrationForm?.value.password !== this.registrationForm?.value.passwordConfirm){
        this.errorMsg = 'Votre mot de passe est différent de la confirmation de mot de passe.';
        return;
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*\d)(?=.*[a-z]).{12,}$/;
      if (!passwordRegex.test(this.registrationForm?.value.password)) {
        this.errorMsg = 'Le mot de passe doit contenir au moins 12 caractères, une lettre majuscule, une lettre minuscule et un chiffre.';
        return;
      }
      // Call the registration method      
    }else{
      this.errorMsg = 'Veuillez remplir tous les champs *';
      return;
    }
    const userData: User = {
      email: this.registrationForm?.value.email,
      password: this.registrationForm?.value.password,
      firstname: this.registrationForm?.value.firstname,
      lastname: this.registrationForm?.value.lastname,
      city: this.registrationForm?.value.city,
      address: this.registrationForm?.value.address,
      role : UserRoles.User
    };     
    this.registrationUser(userData);
  }

  registrationUser(user:User){
    this.authService.registerUser(user).subscribe(
      (data) => {
        this.router.navigate(['/login-user']);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
        this.errorMsg = 'Une erreur est survenue lors de l\'enregistrement.';
      }
    );
  }
}
