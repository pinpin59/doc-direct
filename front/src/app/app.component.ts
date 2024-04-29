import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultHeaderComponent } from './views/pages/default-header/default-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DefaultHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
