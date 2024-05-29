import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../../../services/admin/admin.service';
import { User } from '../../../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environments';
import { ButtonComponent } from '../../../components/button/button.component';
import { catchError, of } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel-admin-user',
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './panel-admin-user.component.html',
  styleUrl: './panel-admin-user.component.scss'
})
export class PanelAdminUserComponent implements OnInit {
  @ViewChild('modalDeleteUser') modalDeleteUser!: ElementRef<HTMLDialogElement>; // Référence à l'élément <dialog>
  @ViewChild('modalEditUser') modalEditUser!: ElementRef<HTMLDialogElement>; // Référence à l'élément <dialog>
  users : User[] = [];
  imageUrl?: string;
  currentUserIdToDelete ?: number;
  editUserForm!: FormGroup;

  constructor(private adminService : AdminService, private fb : FormBuilder) {
    this.editUserForm = this.fb.group({
      id: [''],
      email: ['',[Validators.required, Validators.email]],
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      city: ['',Validators.required],
      address: ['',Validators.required],
    });
  }
  
  

  ngOnInit(): void {
    this.imageUrl = `${environment.localhost}/uploads/`;
    this.getAllUsers();
  }

  openModalDeleteUser(id:number): void {
    this.modalDeleteUser.nativeElement.showModal();
    // Placer le focus sur le premier élément interactif de la modal
    const focusableElements = this.modalDeleteUser.nativeElement.querySelectorAll<HTMLElement>('button, [tabindex="0"], a[href], input, select, textarea');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
        this.currentUserIdToDelete = id;
    }
  }

  closeModalDeleteUser(): void {
      this.modalDeleteUser.nativeElement.close();
  }

  openModalEditUser(user: User): void {
    this.modalEditUser.nativeElement.showModal();
    this.editUserForm.patchValue({
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      city: user.city,
      address: user.address,
    });
    // Placer le focus sur le premier élément interactif de la modal
    const focusableElements = this.modalEditUser.nativeElement.querySelectorAll<HTMLElement>('button, [tabindex="0"], a[href], input, select, textarea');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
        
    }
  }

  closeModalEditUser(): void {
      this.modalEditUser.nativeElement.close();      
  }


  getAllUsers() {
    this.adminService.getAllUsers().pipe(
      catchError(error => {
        console.error('Une erreur est survenue lors de la récupération des utilisateurs:', error);
        return of([]);
      })
    ).subscribe((data) => {
      console.log(data);
      this.users = data as User[];
    });
  }

  deleteUser(id: number) {
    this.adminService.deleteUserProfile(id).pipe(
      catchError(error => {
        console.error('Une erreur est survenue lors de la suppression de l\'utilisateur:', error);
        return of(null);
      })
    ).subscribe(() => {
      this.getAllUsers();
      this.closeModalDeleteUser();
    });
  }

  updateUser() {
    const userIdToUpdate = this.editUserForm.get('id')?.value;
    const newUserDate =  {
      email: this.editUserForm.get('email')?.value,
      firstname: this.editUserForm.get('firstname')?.value,
      lastname: this.editUserForm.get('lastname')?.value,
      city: this.editUserForm.get('city')?.value,
      address: this.editUserForm.get('address')?.value,
    }
    this.adminService.updateUser(userIdToUpdate, newUserDate).pipe(
      catchError(error => {
        console.error('Une erreur est survenue lors de la mise à jour de l\'utilisateur:', error);
        return of(null);
      })
    ).subscribe(() => {
      this.getAllUsers();
      this.closeModalEditUser();
    });
  }
}
