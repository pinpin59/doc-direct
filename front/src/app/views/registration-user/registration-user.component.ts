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
      password: ['',[Validators.required, Validators.minLength(6)]],
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
    console.log(this.registrationForm);
    
    if(this.registrationForm?.valid){
      if(this.registrationForm?.value.password !== this.registrationForm?.value.passwordConfirm){
        this.errorMsg = 'Votre mot de passe est différent de la confirmation de mot de passe.';
        return;
      }
      // Call the registration method      
    }else{
      if(this.registrationForm.controls['email'].errors?.['email']){
        this.errorMsg = 'Veuillez saisir un email valide.';
        return;
      }
      if(this.registrationForm.controls['password'].errors?.['minlength']){
        this.errorMsg = 'Le mot de passe doit contenir au moins 6 caractères.';
        return;
      }
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
    // Call the registration method
    this.authService.registerUser(user).subscribe((data) => {
      console.log(data);
      //Navigate to the login page
      //this.router.navigate(['/login']);
    });
  }
}
