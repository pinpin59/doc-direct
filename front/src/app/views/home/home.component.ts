import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonComponent, FaIconComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>; // Référence à l'élément <dialog>
  @ViewChild('modalTest') modalTest!: ElementRef<HTMLDialogElement>; // Référence à l'élément <dialog>
  faArrowRight = faArrowRight;
  faCheck = faCheck;

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

  
}
