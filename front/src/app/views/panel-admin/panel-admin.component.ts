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

@Component({
  selector: 'app-panel-admin',
  standalone: true,
  imports: [CommonModule, CardAppointmentComponent,StatusPipe, FormsModule, ButtonComponent, NgMultiSelectDropDownModule],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.scss'
})
export class PanelAdminComponent implements OnInit{
  @ViewChild('modalFilter') modal!: ElementRef<HTMLDialogElement>; // Référence à l'élément <dialog>

  healthProfessionalsStatus?: HealthProfessional[];
  selectedStatus: string = 'pending';
  selectedStatusFilter: any = '';
  dropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    allowSearchFilter: false
  };
  dropdownListFilter = [
    { item_id: 'pending', item_text: 'En attente' },
    { item_id: 'verified', item_text: 'Validé' },
    { item_id: 'rejected', item_text: 'Rejeté' }
  ];


  constructor(private heatlhProfessionalService : HealthProfessionalService) { }

  ngOnInit(): void {
    this.getHealthProfessionalsByStatus(HealthProfessionalStatus.PENDING)
  }

  getHealthProfessionalsByStatus(status:HealthProfessionalStatus){
    this.heatlhProfessionalService.getHealthProfessionalByStatus(status).subscribe((data) => {
      this.healthProfessionalsStatus = data;
      console.log(this.healthProfessionalsStatus);
    });
  }

  onChangeStatus(event: any) {
    this.selectedStatus = event.target.value; // Met à jour la variable avec le statut sélectionné
  }

  changeHealthProfessionalStatus(id: number){
    const status = this.selectedStatus as HealthProfessionalStatus;
    this.heatlhProfessionalService.changeHealthProfessionalStatus(id, status).subscribe((data) => {
      console.log(data);
      this.getHealthProfessionalsByStatus(HealthProfessionalStatus.PENDING);
    });
  }
  
  openModal(): void {
    this.modal.nativeElement.showModal();
    // Placer le focus sur le premier élément interactif de la modal
    const focusableElements = this.modal.nativeElement.querySelectorAll<HTMLElement>('button, [tabindex="0"], a[href], input, select, textarea');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
  }

  closeModal(): void {
      this.modal.nativeElement.close();
  }

  onSubmitFilter(): void {
    this.closeModal();
    this.getHealthProfessionalsByStatus(this.selectedStatusFilter[0].item_id);
    
  }

}
