import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit{
  @Input({required:true}) message!: string;
  @Input() color?: string;
  @Input() class?: string;
  constructor() { }

  ngOnInit(): void {
    if(!this.color){
      this.color = 'text-danger'
    }else{
      this.color = 'text-'+this.color
    }
  }
}
