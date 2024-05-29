import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardAppointmentComponent } from '../../components/card-appointment/card-appointment.component';
import { HealthProfessionalService } from '../../../../services/health-professional/health-professional.service';
import { HealthProfessionalStatus } from '../../enums/health-professional-status.enum';
import { HealthProfessional } from '../../../../interfaces/healthProfessional.interface';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StatusPipe } from '../../pipes/status.pipe';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.scss'
})
export class PanelAdminComponent{
  
}
