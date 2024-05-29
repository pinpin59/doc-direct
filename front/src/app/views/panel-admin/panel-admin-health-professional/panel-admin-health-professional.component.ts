import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ButtonComponent } from '../../../components/button/button.component';
import { CardAppointmentComponent } from '../../../components/card-appointment/card-appointment.component';
import { StatusPipe } from '../../../pipes/status.pipe';
import { HealthProfessional } from '../../../../../interfaces/healthProfessional.interface';
import { HealthProfessionalService } from '../../../../../services/health-professional/health-professional.service';
import { HealthProfessionalStatus } from '../../../enums/health-professional-status.enum';
import { User } from '../../../../../interfaces/user.interface';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserRoles } from '../../../enums/user-roles.enum';
import { AdminService } from '../../../../../services/admin/admin.service';

@Component({
  selector: 'app-panel-admin-health-professional',
  standalone: true,
  imports: [CommonModule, CardAppointmentComponent,StatusPipe, FormsModule, ButtonComponent, NgMultiSelectDropDownModule],
  templateUrl: './panel-admin-health-professional.component.html',
  styleUrl: './panel-admin-health-professional.component.scss'
})
export class PanelAdminHealthProfessionalComponent {
  @ViewChild('modalFilter') modal!: ElementRef<HTMLDialogElement>; // Référence à l'élément <dialog>

  currentUser?: User;
  healthProfessionalsStatus?: HealthProfessional[];
  selectedStatus: string = 'pending';
  selectedStatusFilter: any = '';
  msgContent: string = '';
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


  constructor(private adminService : AdminService, private authService : AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserInfoFromToken() as User
    if(this.currentUser?.role === UserRoles.Admin){
      this.getHealthProfessionalsByStatus(HealthProfessionalStatus.PENDING)
    }
  }

  getHealthProfessionalsByStatus(status:HealthProfessionalStatus){
    this.adminService.getHealthProfessionalByStatus(status).subscribe((data) => {
      this.healthProfessionalsStatus = data;
    });
  }

  onChangeStatus(event: any) {
    this.selectedStatus = event.target.value; // Met à jour la variable avec le statut sélectionné
  }

  changeHealthProfessionalStatus(id: number){
    const status = this.selectedStatus as HealthProfessionalStatus;
    if(this.currentUser?.role === UserRoles.Admin){
      this.adminService.updateHealthProfessionalStatus(id, status).subscribe((data) => {
        this.getHealthProfessionalsByStatus(HealthProfessionalStatus.PENDING);
      });
    }
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
