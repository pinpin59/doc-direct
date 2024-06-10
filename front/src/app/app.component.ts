import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultHeaderComponent } from './views/default-header/default-header.component';
import { DefaultFooterComponent } from './views/default-footer/default-footer.component';
import { CsrfService } from '../../services/csrf/csrf.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DefaultHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
    
    constructor(private csrfService : CsrfService) { }
    
    ngOnInit(): void {
      this.getCsrfToken();
    }

    getCsrfToken() {
      this.csrfService.getCsrfToken().subscribe(
          (data) => {
              this.csrfService.setCsrfToken(data.csrfToken);
          },
          (error) => {
              console.error('Erreur lors de la récupération du jeton CSRF:', error);
          }
      );
  }
    
   
}
