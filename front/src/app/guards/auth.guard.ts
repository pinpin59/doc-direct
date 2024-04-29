import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    if(inject(AuthService).getHealthProfessionalToken() || inject(AuthService).getUserToken()){
        return true;
    }else{
        return inject(Router).parseUrl('/login-user');
    }
};
