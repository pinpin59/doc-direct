import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

export const authUserGuard: CanActivateFn = (route, state) => {
  console.log(inject(AuthService).getUserToken());
  
  if (inject(AuthService).isAccessUserTokenValid()) {    
    return true; // L'utilisateur est connecté, autorisez l'accès à la route
  } else {
    // L'utilisateur n'est pas connecté, redirigez vers la page de connexion
    return inject(Router).parseUrl('/login-user');
  }
};
