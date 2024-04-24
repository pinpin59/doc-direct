import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {faCoffee, faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import { SharedModule } from '../../../shared/shared.module';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-default-header',
  standalone: true,
  imports: [CommonModule, SharedModule,FaIconComponent],
  templateUrl: './default-header.component.html',
  styleUrl: './default-header.component.scss'
})
export class DefaultHeaderComponent implements OnInit {

  constructor() { } 

  isExpanded: boolean = false;
  faXmark = faXmark;
  faBars = faBars;

  toggleNavbar() {
    console.log(this.isExpanded);
    
      this.isExpanded = !this.isExpanded;      
  }
  ngOnInit(): void {
    
  }
}
 