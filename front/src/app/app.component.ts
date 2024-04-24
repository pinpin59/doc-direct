import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultHeaderComponent } from './views/pages/default-header/default-header.component';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DefaultHeaderComponent, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
