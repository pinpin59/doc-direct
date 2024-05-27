import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultHeaderComponent } from './views/default-header/default-header.component';
import { DefaultFooterComponent } from './views/default-footer/default-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DefaultHeaderComponent, DefaultFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
