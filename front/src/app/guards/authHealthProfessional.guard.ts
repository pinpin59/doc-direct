import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

export const authHealthProfessional: CanActivateFn = (route, state) => {
  if (inject(AuthService).getHealthProfessionalToken()) {
    return true; // Le professionel est connecté et peut accéder à la page
  } else {
    // Rediriger vers la page de connexion
    return inject(Router).parseUrl('/login-healt-professional');
  }
};
