import { Component, OnInit } from '@angular/core';
import { HealthProfessionalService } from '../../../../services/health-professional/health-professional.service';
import { HealthProfessional } from '../../../../interfaces/healthProfessional.interface';
import { first } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { HealthProfessionalStatus } from '../../enums/health-professional-status.enum';

@Component({
  selector: 'app-registation-healt-professional',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AlertComponent, CommonModule],
  templateUrl: './registration-health-professional.component.html',
  styleUrl: './registration-health-professional.component.scss'
})
export class RegistrationHealthProfessionalComponent implements OnInit {
  addHealthProfessionalForm: FormGroup;
  errorMsg: string = '';
    // Liste des jours de la semaine
    daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  
    // Liste des heures de 00h00 à 23h00
    hoursOfDay = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  constructor(private healthProfessionalService : HealthProfessionalService, private fb: FormBuilder) {

    this.addHealthProfessionalForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      profession: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmitRegistration(){
    if(this.addHealthProfessionalForm?.valid){
      if(this.addHealthProfessionalForm?.value.password !== this.addHealthProfessionalForm?.value.passwordConfirm){
        this.errorMsg = 'Le mot de passe et la confirmation du mot de passe sont différents.';
        return;
      }else{
        this.errorMsg = '';
        const healthProfessionalData = {
          email: this.addHealthProfessionalForm.value.email,
          password: this.addHealthProfessionalForm.value.password,
          firstname: this.addHealthProfessionalForm.value.firstname,
          lastname: this.addHealthProfessionalForm.value.lastname,
          city: this.addHealthProfessionalForm.value.city,
          address: this.addHealthProfessionalForm.value.address,
          profession: this.addHealthProfessionalForm.value.profession,
          status: HealthProfessionalStatus.PENDING
        } as HealthProfessional;
        this.healthProfessionalService.createHealthProfessional(healthProfessionalData).pipe(first()).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }else{
      this.errorMsg = 'Veuillez remplir tous les champs *';
      return;
    }
    console.log(this.addHealthProfessionalForm.value);
    
  }

  createHealthProfessional(healthProfessionalData :HealthProfessional){
    this.healthProfessionalService.createHealthProfessional(healthProfessionalData).pipe(first()).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
