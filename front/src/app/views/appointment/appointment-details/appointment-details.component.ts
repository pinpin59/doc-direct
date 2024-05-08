import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss'
})
export class AppointmentDetailsComponent implements OnInit{
  myParam: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
      // Accéder aux paramètres de route
      this.route.params.subscribe(params => {
        console.log(params);
        
          this.myParam = params['myParam'];
          console.log(this.myParam);
      });
  }
}
