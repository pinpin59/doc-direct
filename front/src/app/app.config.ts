import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { SessionStore } from './session/session.store';
import { SessionQuery } from './session/session.query';
import { persistState } from '@datorama/akita';
import { DateFormatterPipe } from './pipes/date-formatter.pipe';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);
const storage = persistState();
const provideStore = [{ provide: 'persistStorage', useValue: storage }];

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore,
    SessionStore,
    SessionQuery,
    { provide: LOCALE_ID, useValue: 'fr' }, // Définir la locale française

  ],

};
