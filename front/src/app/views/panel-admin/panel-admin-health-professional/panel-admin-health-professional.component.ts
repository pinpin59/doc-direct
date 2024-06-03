import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-panel-admin-health-professional',
  standalone: true,
  imports: [CommonModule, CardAppointmentComponent,StatusPipe,FaIconComponent, FormsModule,ReactiveFormsModule, ButtonComponent, NgMultiSelectDropDownModule],
  templateUrl: './panel-admin-health-professional.component.html',
  styleUrl: './panel-admin-health-professional.component.scss'
})
export class PanelAdminHealthProfessionalComponent {
  @ViewChild('modalFilter') modal!: ElementRef<HTMLDialogElement>; // Référence à l'élément <dialog>
  @ViewChild('modalDeleteHealthProfessional') modalDeleteHealthProfessional!: ElementRef<HTMLDialogElement>; // Référence à l'élément <dialog>
  @ViewChild('modalEditHealthProfessional') modalEditHealthProfessional!: ElementRef<HTMLDialogElement>; // Référence à l'élément <dialog>
  
  currentUser?: User;
  currentIdToDelete ?: number;
  faDeleteLeft = faDeleteLeft;
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
  editFormHealthProfessional!: FormGroup;
  
  constructor(private adminService : AdminService, private authService : AuthService, private fb : FormBuilder) {
    this.editFormHealthProfessional = this.fb.group({
      id: [''],
      firstname: ['',Validators.required],
      lastname: ['', Validators.required],
      city: ['',Validators.required],
      address: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      profession : ['',Validators.required],
      status: ['',Validators.required],
    });
  }

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
        this.getHealthProfessionalsByStatus(status);
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

  // Fonction pour ouvrir la modal de suppression de profil
  openModalDeleteHealthProfessional(id:number): void {
    this.modalDeleteHealthProfessional.nativeElement.showModal();
    this.currentIdToDelete = id;
    // Placer le focus sur le premier élément interactif de la modal
    const focusableElements = this.modalDeleteHealthProfessional.nativeElement.querySelectorAll<HTMLElement>('button, [tabindex="0"], a[href], input, select, textarea');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
  }

  // Fonction pour ouvrir la modal de suppression de profil
  closeModalDeleteHealthProfessional(): void {
      this.modalDeleteHealthProfessional.nativeElement.close();
  }

  // Fonction pour ouvrir la modal d'édition de profil
  openModalEditHealthProfessional(healthProfessional: HealthProfessional): void {
    this.modalEditHealthProfessional.nativeElement.showModal();
    this.editFormHealthProfessional.patchValue({
      id: healthProfessional.id,
      firstname: healthProfessional.firstname,
      lastname: healthProfessional.lastname,
      city: healthProfessional.city,
      address: healthProfessional.address,
      email: healthProfessional.email,
      profession: healthProfessional.profession,
      status: healthProfessional.status,
    });
    // Placer le focus sur le premier élément interactif de la modal
    const focusableElements = this.modalEditHealthProfessional.nativeElement.querySelectorAll<HTMLElement>('button, [tabindex="0"], a[href], input, select, textarea');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
  }

  // Fonction pour fermer la modal d'édition de profil
  closeModalEditHealthProfessional(): void {
      this.modalEditHealthProfessional.nativeElement.close();
  }

  // Fonction pour ouvrir la modal de suppression de profil
  onSubmitFilter(): void {
    this.closeModal();
    this.getHealthProfessionalsByStatus(this.selectedStatusFilter[0].item_id);
  }

  // Fonction pour supprimer un professionnel de santé
  onSubmitDeleteHealthProfessional(): void {
    if(this.currentIdToDelete){
      this.adminService.deleteHealthProfessionalProfile(this.currentIdToDelete).subscribe((data) => {
        this.getHealthProfessionalsByStatus(this.selectedStatus as HealthProfessionalStatus);
        this.closeModalDeleteHealthProfessional();
      });
    }
  }

  // Fonction pour modifier un professionnel de santé
  onSubmitEditHealthProfessional(): void {
    if(this.editFormHealthProfessional.valid){
      const healthProfessional = this.editFormHealthProfessional.value as HealthProfessional;
      this.adminService.updateHealthProfessional(this.editFormHealthProfessional.value.id,healthProfessional).subscribe((data) => {
        this.getHealthProfessionalsByStatus(this.editFormHealthProfessional.value.status as HealthProfessionalStatus);
        this.closeModalEditHealthProfessional();
      });
    }
  }

}
