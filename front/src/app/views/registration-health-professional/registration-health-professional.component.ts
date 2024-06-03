import { Component, OnInit } from '@angular/core';
import { HealthProfessionalService } from '../../../../services/health-professional/health-professional.service';
import { HealthProfessional } from '../../../../interfaces/healthProfessional.interface';
import { first } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { HealthProfessionalStatus } from '../../enums/health-professional-status.enum';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registation-healt-professional',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AlertComponent, CommonModule, NgMultiSelectDropDownModule],
  templateUrl: './registration-health-professional.component.html',
  styleUrl: './registration-health-professional.component.scss'
})
export class RegistrationHealthProfessionalComponent implements OnInit {
  addHealthProfessionalForm: FormGroup;
  errorMsg: string = '';
  dropdownListLundi:any = [
    { item_id: 1, item_text: '00:00' },
 
  ];
  dropdownSettings:any = {
    singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
  };
    // Liste des jours de la semaine
    daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  
    // Liste des heures de 00h00 à 23h00
    hoursOfDay = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  constructor(private authService: AuthService, private fb: FormBuilder, private router : Router) {

    this.addHealthProfessionalForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      passwordConfirm: ['',Validators.required],
      lastname: ['',Validators.required],
      firstname: ['',Validators.required],
      city: ['',Validators.required],
      address: ['',Validators.required],
      profession: ['',Validators.required],
      lundi: [[]],
      mardi: [[]],
      mercredi: [[]],
      jeudi: [[]],
      vendredi: [[]],
      samedi: [[]],
      dimanche: [[]],
    });
  }

  ngOnInit(): void {
    this.dropdownListLundi = [];
    for (let i = 0; i < 24; i++) {
      const hour = (i < 10 ? '0' : '') + i + ':00';
      this.dropdownListLundi.push({ item_id: i, item_text: hour });
    }
  }

  onSubmitRegistration(){
    if(this.addHealthProfessionalForm?.valid){
      if(this.addHealthProfessionalForm?.value.password !== this.addHealthProfessionalForm?.value.passwordConfirm){
        this.errorMsg = 'Le mot de passe et la confirmation du mot de passe sont différents.';
        return;
      }else{
        // Création de la variable d'avaibilities à partir des données du formulaire
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*\d)(?=.*[a-z]).{12,}$/;
        if (!passwordRegex.test(this.addHealthProfessionalForm?.value.password)) {
          this.errorMsg = 'Le mot de passe doit contenir au moins 12 caractères, une lettre majuscule, une lettre minuscule et un chiffre.';
          return;
        }
        this.errorMsg = '';
        const availabilities = [];
        for (const day of ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']) {
          if (this.addHealthProfessionalForm.value[day]) {
            for (const availability of this.addHealthProfessionalForm.value[day]) {
              availabilities.push({
                dayOfWeek: day,
                startTime: availability.item_text
              });
            }
          }
        } 

        const healthProfessionalData = {
          email: this.addHealthProfessionalForm.value.email,
          password: this.addHealthProfessionalForm.value.password,
          firstname: this.addHealthProfessionalForm.value.firstname,
          lastname: this.addHealthProfessionalForm.value.lastname,
          city: this.addHealthProfessionalForm.value.city,
          address: this.addHealthProfessionalForm.value.address,
          profession: this.addHealthProfessionalForm.value.profession,
          status: HealthProfessionalStatus.PENDING,
          availabilities: availabilities  // Ajout des disponibilités
        } as HealthProfessional;
      
        this.authService.registerHealthProfessional(healthProfessionalData).pipe(first()).subscribe(
          (data) => {
            this.router.navigate(['/login-health-professional']);
          },
          (error) => {
            this.errorMsg = 'Une erreur est survenue lors de l\'enregistrement du professionnel de santé.';
            console.error(error);
          }
        );
      }
    }else{
      this.errorMsg = 'Veuillez remplir tous les champs *';      
      return;
    }    
  }

 
  
  
}
