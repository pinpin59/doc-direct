import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { SessionStore } from './session/session.store';
import { SessionQuery } from './session/session.query';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { persistState } from '@datorama/akita';


const storage = persistState();
const provideStore = [{ provide: 'persistStorage', useValue: storage }];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore,
    SessionStore,
    SessionQuery,
  ],
};
