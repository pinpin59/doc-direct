import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MailerService } from '../../../../../services/mailer/mailer.service';
import { AlertComponent } from '../../../components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, AlertComponent, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
    formMail !: FormGroup;
    errorMsg: string = '';

    constructor(private fb: FormBuilder, private mailerService : MailerService) {
      this.formMail = this.fb.group({
        from: ['', Validators.required],
        to: ['kevinpintar59160@gmail.com'],
        subject: ['', Validators.required],
        message: ['', Validators.required],
      });
    }
  
    ngOnInit(): void {
    }

    sendMail() {      
      if (this.formMail?.valid) {
          this.mailerService.sendMail(this.formMail.value).pipe(first()).subscribe(
              (data) => {
                  this.formMail.reset();
                  this.errorMsg = '';
              },
              (error) => {
                  console.error('Erreur lors de l\'envoi du mail:', error);
              }
          );
      } else {
          this.errorMsg = 'Veuillez remplir tous les champs';
      }
  }
}
