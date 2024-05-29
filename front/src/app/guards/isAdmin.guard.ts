import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserRoles } from '../enums/user-roles.enum';

export const isAdminGuard: CanActivateFn = (route, state) => {
  
  if (inject(AuthService).getUserInfoFromToken() && inject(AuthService).getUserInfoFromToken().role === UserRoles.Admin) {    
    return true;
  } else {
    return inject(Router).parseUrl('/login-user');
  }
};
