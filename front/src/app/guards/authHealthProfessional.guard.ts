import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

export const authHealthProfessional: CanActivateFn = (route, state) => {
  if (inject(AuthService).getHealthProfessionalToken()) {
    console.log('Le professionel de santé est connecté');
    return true; // Le professionel est connecté, autorisez l'accès à la route
  } else {
    // Le professionel n'est pas connecté, redirigez vers la page de connexion
    return inject(Router).parseUrl('/login-healt-professional');
  }
};
